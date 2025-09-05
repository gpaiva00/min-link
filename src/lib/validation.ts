import { z } from "zod";

// URL validation schema
export const urlSchema = z
  .string()
  .url()
  .refine(
    (url) => {
      try {
        const parsedUrl = new URL(url);

        // Only allow http and https protocols
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          return false;
        }

        // Block localhost and private IPs
        const hostname = parsedUrl.hostname.toLowerCase();
        const blockedHosts = [
          "localhost",
          "127.0.0.1",
          "0.0.0.0",
          "::1",
          "local",
        ];

        if (blockedHosts.some((blocked) => hostname.includes(blocked))) {
          return false;
        }

        // Block private IP ranges
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (ipRegex.test(hostname)) {
          const parts = hostname.split(".").map(Number);
          // 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
          if (
            parts[0] === 10 ||
            (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
            (parts[0] === 192 && parts[1] === 168)
          ) {
            return false;
          }
        }

        return true;
      } catch {
        return false;
      }
    },
    {
      message: "URL inválida ou não permitida",
    }
  );

// Turnstile validation schema
export const turnstileSchema = z.object({
  token: z.string().min(1, "Token do Turnstile é obrigatório"),
});

// Link creation schema
export const createLinkSchema = z.object({
  url: urlSchema,
  turnstileToken: z.string().min(1, "Verificação de segurança é obrigatória"),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

// Validate Turnstile token
export async function validateTurnstile(
  token: string,
  ip?: string
): Promise<boolean> {
  // Allow bypass in development with specific test token
  if (process.env.NODE_ENV === "development" && token === "test-token-bypass") {
    console.log(`[Turnstile] Development bypass for IP: ${ip}`);
    return true;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.NEXT_PUBLIC_TURNSTILE_SECRET_KEY || "",
          response: token,
          remoteip: ip || "",
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile validation error:", error);
    return false;
  }
}

// Get client IP from request
export function getClientIP(request: Request): string {
  // Priority order for IP headers
  const ipHeaders = [
    "cf-connecting-ip", // Cloudflare
    "x-real-ip", // Nginx
    "x-forwarded-for", // Standard proxy header
    "x-client-ip", // Apache
    "x-forwarded", // General forwarded
    "forwarded-for", // RFC 7239
    "forwarded", // RFC 7239
  ];

  for (const header of ipHeaders) {
    const value = request.headers.get(header);
    if (value) {
      // Handle comma-separated IPs (take the first one)
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) {
        console.log(`[IP Detection] Found IP from ${header}: ${ip}`);
        return ip;
      }
    }
  }

  // Fallback for development
  if (process.env.NODE_ENV === "development") {
    console.log(`[IP Detection] Using development fallback IP`);
    return "127.0.0.1";
  }

  console.log(`[IP Detection] No valid IP found, using fallback`);
  return "unknown";
}

// Validate IP address format
function isValidIP(ip: string): boolean {
  // IPv4 regex
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // IPv6 regex (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}
