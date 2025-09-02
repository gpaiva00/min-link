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
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "unknown";
}
