import { redis, CACHE_KEYS, CACHE_TTL } from "./redis";
import { prisma } from "./prisma";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5");
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"); // 15 minutes

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  try {
    const key = CACHE_KEYS.RATE_LIMIT(ip);
    const now = Date.now();

    // Try to get from Redis first
    const cached = await redis.get(key);

    if (cached) {
      try {
        // Se cached já é um objeto, usar diretamente; senão, fazer parse
        const data =
          typeof cached === "object" ? cached : JSON.parse(cached as string);

        // Verificar se ainda está dentro da janela de tempo
        if (now < data.resetTime) {
          if (data.count >= MAX_REQUESTS) {
            return {
              success: false,
              remaining: 0,
              resetTime: data.resetTime,
            };
          }

          // Incrementar contador
          const newCount = data.count + 1;
          const newData = { count: newCount, resetTime: data.resetTime };

          // Calculate TTL dynamically based on remaining window time
          const ttlSeconds = Math.ceil((data.resetTime - now) / 1000);
          await redis.setex(key, ttlSeconds, JSON.stringify(newData));

          // Update database for persistence
          await prisma.rateLimit.upsert({
            where: { ip },
            update: {
              count: newCount,
              resetTime: new Date(data.resetTime),
              updatedAt: new Date(),
            },
            create: {
              ip,
              count: newCount,
              resetTime: new Date(data.resetTime),
            },
          });

          const remaining = Math.max(0, MAX_REQUESTS - newCount);

          return {
            success: true,
            remaining,
            resetTime: data.resetTime,
          };
        } else {
          // Janela expirou, limpar cache
          await redis.del(key);
        }
      } catch (parseError) {
        await redis.del(key);
      }
    }

    // Create new rate limit window
    const resetTime = now + WINDOW_MS;
    const data = {
      count: 1,
      resetTime,
    };

    // Calculate TTL based on window time
    const ttlSeconds = Math.ceil(WINDOW_MS / 1000);

    // Store in Redis
    await redis.setex(key, ttlSeconds, JSON.stringify(data));

    // Also store in database for persistence
    await prisma.rateLimit.upsert({
      where: { ip },
      update: {
        count: 1,
        resetTime: new Date(resetTime),
        updatedAt: new Date(),
      },
      create: {
        ip,
        count: 1,
        resetTime: new Date(resetTime),
      },
    });

    const remaining = MAX_REQUESTS - 1;

    return {
      success: true,
      remaining,
      resetTime,
    };
  } catch (error) {
    console.error("Rate limit check error:", error);

    // Fallback to database only
    try {
      const existing = await prisma.rateLimit.findUnique({
        where: { ip },
      });

      const now = new Date();

      if (existing && existing.resetTime > now) {
        if (existing.count >= MAX_REQUESTS) {
          return {
            success: false,
            remaining: 0,
            resetTime: existing.resetTime.getTime(),
          };
        }

        const newCount = existing.count + 1;
        await prisma.rateLimit.update({
          where: { ip },
          data: {
            count: newCount,
            updatedAt: now,
          },
        });

        const remaining = Math.max(0, MAX_REQUESTS - newCount);

        return {
          success: true,
          remaining,
          resetTime: existing.resetTime.getTime(),
        };
      }

      // Create new rate limit
      const resetTime = new Date(Date.now() + WINDOW_MS);
      await prisma.rateLimit.upsert({
        where: { ip },
        update: {
          count: 1,
          resetTime,
          updatedAt: now,
        },
        create: {
          ip,
          count: 1,
          resetTime,
        },
      });

      const remaining = MAX_REQUESTS - 1;

      return {
        success: true,
        remaining,
        resetTime: resetTime.getTime(),
      };
    } catch (dbError) {
      console.error("Database rate limit fallback error:", dbError);
      // Allow request if both Redis and DB fail
      return {
        success: true,
        remaining: MAX_REQUESTS - 1,
        resetTime: Date.now() + WINDOW_MS,
      };
    }
  }
}
