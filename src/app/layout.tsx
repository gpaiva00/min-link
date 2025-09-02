import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MinLink - Encurtador de URL Gratuito",
  description:
    "Encurte suas URLs de forma rápida, segura e gratuita. Compartilhe links mais limpos e acompanhe estatísticas básicas.",
  keywords: "encurtador de url, link curto, url shortener, compartilhar links",
  authors: [{ name: "MinLink" }],
  creator: "MinLink",
  publisher: "MinLink",
  robots: "index, follow",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "MinLink - Encurtador de URL Gratuito",
    description: "Encurte suas URLs de forma rápida, segura e gratuita.",
    siteName: "MinLink",
  },
  twitter: {
    card: "summary_large_image",
    title: "MinLink - Encurtador de URL Gratuito",
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
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-primary-500">
                  minLink
                </a>
              </div>
              {/* <nav className="hidden md:flex space-x-8">
                <a
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Privacidade
                </a>
                <a
                  href="/terms-of-service"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Termos
                </a>
              </nav> */}
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-primary text-sm">
                © {new Date().getFullYear()} minLink. Todos os direitos
                reservados.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="/privacy-policy"
                  className="text-gray-300 hover:underline text-sm"
                >
                  Política de Privacidade
                </a>
                <a
                  href="/terms-of-service"
                  className="text-gray-300 hover:underline text-sm"
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
