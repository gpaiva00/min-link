import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "minLink - Encurtador de URL Gratuito",
  description:
    "Encurte suas URLs de forma rápida, segura e gratuita. Compartilhe links mais limpos e acompanhe estatísticas básicas.",
  keywords: "encurtador de url, link curto, url shortener, compartilhar links",
  authors: [{ name: "Gabriel Paiva" }],
  creator: "minLink",
  publisher: "minLink",
  robots: "index, follow",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "minLink - Encurtador de URL Gratuito",
    description: "Encurte suas URLs de forma rápida, segura e gratuita.",
    siteName: "minLink",
  },
  twitter: {
    card: "summary_large_image",
    title: "minLink - Encurtador de URL Gratuito",
    description: "Encurte suas URLs de forma rápida, segura e gratuita.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        ></script>
      </head>
      <body
        className={`${inter.className} min-h-screen bg-background flex flex-col`}
      >
        <header className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center h-16">
              <a
                href="/"
                className="text-2xl flex gap-2 items-center font-bold text-primary-500"
              >
                <img src="/logo.png" className="w-6 h-6" />
                minLink
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} minLink. Todos os direitos
                reservados.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="/privacy"
                  className="text-gray-500 hover:underline text-sm"
                >
                  Política de Privacidade
                </a>
                <a
                  href="/terms"
                  className="text-gray-500 hover:underline text-sm"
                >
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}
