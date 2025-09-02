import { redis, CACHE_KEYS, CACHE_TTL } from './redis';
import { prisma } from './prisma';

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10');
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  try {
    const key = CACHE_KEYS.RATE_LIMIT(ip);
    const now = Date.now();
    const windowStart = now - WINDOW_MS;
    
    // Try to get from Redis first
    const cached = await redis.get(key);
    
    if (cached) {
      const data = JSON.parse(cached as string);
      const resetTime = data.resetTime;
      
      if (now < resetTime) {
        const remaining = Math.max(0, MAX_REQUESTS - data.count);
        
        if (data.count >= MAX_REQUESTS) {
          return {
            success: false,
            remaining: 0,
            resetTime,
          };
        }
        
        // Increment counter
        data.count += 1;
        await redis.setex(key, CACHE_TTL.RATE_LIMIT, JSON.stringify(data));
        
        return {
          success: true,
          remaining: remaining - 1,
          resetTime,
        };
      }
    }
    
    // Create new rate limit window
    const resetTime = now + WINDOW_MS;
    const data = {
      count: 1,
      resetTime,
    };
    
    // Store in Redis
    await redis.setex(key, CACHE_TTL.RATE_LIMIT, JSON.stringify(data));
    
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
    
    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
      resetTime,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    
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
        
        await prisma.rateLimit.update({
          where: { ip },
          data: {
            count: existing.count + 1,
            updatedAt: now,
          },
        });
        
        return {
          success: true,
          remaining: MAX_REQUESTS - existing.count - 1,
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
      
      return {
        success: true,
        remaining: MAX_REQUESTS - 1,
        resetTime: resetTime.getTime(),
      };
    } catch (dbError) {
      console.error('Database rate limit fallback error:', dbError);
      // Allow request if both Redis and DB fail
      return {
        success: true,
        remaining: MAX_REQUESTS - 1,
        resetTime: Date.now() + WINDOW_MS,
      };
    }
  }
}