import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createLinkSchema,
  validateTurnstile,
  getClientIP,
} from "@/lib/validation";
import { generateUniqueCode } from "@/lib/utils";
import { checkRateLimit } from "@/lib/rate-limit";
import { redis, CACHE_KEYS, CACHE_TTL } from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIP = getClientIP(request);

    // Validate input
    const validation = createLinkSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: validation.error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    const { url, turnstileToken } = validation.data;

    // Check rate limit
    const rateLimitResult = await checkRateLimit(clientIP);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitas tentativas. Tente novamente em alguns minutos.",
          resetTime: rateLimitResult.resetTime,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
          },
        }
      );
    }

    // Validate Turnstile token
    const isValidToken = await validateTurnstile(turnstileToken, clientIP);
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Falha na verificação de segurança. Tente novamente." },
        { status: 400 }
      );
    }

    // Generate unique code
    const code = await generateUniqueCode();

    // Get URL title (optional)
    let title: string | null = null;
    try {
      const response = await fetch(url, {
        method: "HEAD",
        headers: {
          "User-Agent": "MinLink Bot 1.0",
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (response.ok) {
        const fullResponse = await fetch(url, {
          headers: {
            "User-Agent": "MinLink Bot 1.0",
          },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        const html = await fullResponse.text();
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) {
          title = titleMatch[1].trim().substring(0, 200); // Limit title length
        }
      }
    } catch (error) {
      // Ignore title fetch errors
      console.log("Failed to fetch title for:", url);
    }

    // Create link in database
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shortUrl = `${baseUrl}/go/${code}`;

    const link = await prisma.link.create({
      data: {
        code,
        url,
        shortUrl,
        title,
        createdBy: clientIP,
      },
    });

    // Cache the link
    try {
      await redis.setex(
        CACHE_KEYS.LINK(code),
        CACHE_TTL.LINK,
        JSON.stringify(link)
      );
    } catch (error) {
      console.error("Failed to cache link:", error);
    }

    // Return success response

    return NextResponse.json({
      success: true,
      data: {
        id: link.id,
        code: link.code,
        url: link.url,
        title: link.title,
        shortUrl,
        previewUrl: `${baseUrl}/preview/${code}`,
        createdAt: link.createdAt,
      },
      rateLimit: {
        remaining: rateLimitResult.remaining - 1,
        resetTime: rateLimitResult.resetTime,
      },
    });
  } catch (error) {
    console.error("Error creating short link:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente." },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
