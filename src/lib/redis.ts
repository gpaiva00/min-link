import { Redis } from "@upstash/redis";

if (
  !process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL ||
  !process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error("Missing Redis environment variables");
}

export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN,
});

// Cache keys
export const CACHE_KEYS = {
  LINK: (code: string) => `link:${code}`,
  RATE_LIMIT: (ip: string) => `rate_limit:${ip}`,
  CLICKS: (code: string) => `clicks:${code}`,
} as const;

// Cache TTL (Time To Live) in seconds
export const CACHE_TTL = {
  LINK: 60 * 60 * 24, // 24 hours
  RATE_LIMIT: 60 * 15, // 15 minutes
  CLICKS: 60 * 60, // 1 hour
} as const;
