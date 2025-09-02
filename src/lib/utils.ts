import { nanoid } from "nanoid";
import { prisma } from "./prisma";
import { redis, CACHE_KEYS, CACHE_TTL } from "./redis";

// Generate unique short code
export async function generateUniqueCode(length: number = 6): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const code = nanoid(length);

    // Check if code exists in database
    const existing = await prisma.link.findUnique({
      where: { code },
    });

    if (!existing) {
      return code;
    }

    attempts++;
    // Increase length if too many collisions
    if (attempts > 5) {
      length++;
    }
  }

  throw new Error("Failed to generate unique code");
}

// Get link from cache or database
export async function getLinkByCode(code: string) {
  try {
    // Try cache first
    const cached = await redis.get(CACHE_KEYS.LINK(code));

    if (cached) {
      // Se o cached já é um objeto, retorna diretamente
      if (typeof cached === "object") {
        return cached;
      }
      // Se é string, faz o parse
      if (typeof cached === "string") {
        return JSON.parse(cached);
      }
    }

    // Fallback to database
    const link = await prisma.link.findUnique({
      where: { code, isActive: true },
    });

    if (link) {
      // Cache the result
      await redis.setex(
        CACHE_KEYS.LINK(code),
        CACHE_TTL.LINK,
        JSON.stringify(link)
      );
    }

    return link;
  } catch (error) {
    console.error("Error getting link by code:", error);

    // Fallback to database only
    return await prisma.link.findUnique({
      where: { code, isActive: true },
    });
  }
}

// Increment click count and log event
export async function incrementClickCount(
  linkId: string,
  eventData: {
    ip: string;
    userAgent: string;
    referer: string;
    country: string;
    city: string;
  }
) {
  try {
    // Update database
    const [updatedLink] = await Promise.all([
      prisma.link.update({
        where: { id: linkId },
        data: {
          clicks: { increment: 1 },
        },
      }),
      // Log click event
      prisma.clickEvent.create({
        data: {
          linkId,
          ip: eventData.ip,
          userAgent: eventData.userAgent,
          referer: eventData.referer,
          country: eventData.country,
          city: eventData.city,
        },
      }),
    ]);

    // Update cache
    const cacheKey = CACHE_KEYS.LINK(updatedLink.code);
    await redis.setex(cacheKey, CACHE_TTL.LINK, JSON.stringify(updatedLink));

    return updatedLink;
  } catch (error) {
    console.error("Failed to increment click count:", error);
    throw error;
  }
}

// Format URL for display
export function formatUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch {
    return url;
  }
}

// Get domain from URL
export function getDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return "unknown";
  }
}

// Get domain from URL (alternative function)
export function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
}

// Validate and normalize URL
export function normalizeUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

// Copy to clipboard (client-side)
export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  }

  // Fallback for older browsers
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return Promise.resolve(successful);
  } catch {
    return Promise.resolve(false);
  }
}
