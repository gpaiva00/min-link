import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "minLink - Encurtador de URL Gratuito e Seguro",
    template: "%s | minLink",
  },
  description:
    "Encurte suas URLs de forma rápida, segura e gratuita com o minLink. Compartilhe links mais limpos, acompanhe estatísticas detalhadas de cliques, geolocalização e analytics avançados. Proteção anti-spam e performance otimizada.",
  keywords: [
    "encurtador de url",
    "link curto",
    "url shortener",
    "compartilhar links",
    "analytics de links",
    "estatísticas de cliques",
    "geolocalização",
    "proteção anti-spam",
    "redis cache",
    "cloudflare turnstile",
    "qr code generator",
    "marketing digital",
    "rastreamento de links",
    "minlink",
  ],
  authors: [{ name: "Gabriel Paiva", url: "https://github.com/gpaiva00" }],
  creator: "Gabriel Paiva",
  publisher: "minLink",
  category: "Technology",
  classification: "Web Application",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
    languages: {
      "pt-BR": process.env.NEXT_PUBLIC_APP_URL,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "minLink - Encurtador de URL Gratuito e Seguro",
    description:
      "Encurte suas URLs de forma rápida, segura e gratuita com o minLink. Compartilhe links mais limpos, acompanhe estatísticas detalhadas de cliques, geolocalização e analytics avançados. Proteção anti-spam e performance otimizada.",
    siteName: "minLink",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "minLink - Encurtador de URL Gratuito com Analytics Avançados",
        type: "image/png",
      },
    ],
    videos: [],
    audio: [],
  },
  twitter: {
    card: "summary_large_image",
    site: "@minlink",
    creator: "@gpaiva00",
    title: "minLink - Encurtador de URL Gratuito e Seguro",
    description:
      "Encurte suas URLs de forma rápida, segura e gratuita com o minLink. Compartilhe links mais limpos, acompanhe estatísticas detalhadas de cliques, geolocalização e analytics avançados. Proteção anti-spam e performance otimizada.",
    images: {
      url: "/og.png",
      alt: "minLink - Encurtador de URL Gratuito com Analytics Avançados",
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_SITE_VERIFICATION,
  },
  appleWebApp: {
    capable: true,
    title: "minLink",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "minLink",
    "application-name": "minLink",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#3b82f6",
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
        <meta name="google-adsense-account" content="ca-pub-9285587738161693" />
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "minLink",
              description:
                "Encurte suas URLs de forma rápida, segura e gratuita com o minLink. Compartilhe links mais limpos, acompanhe estatísticas detalhadas de cliques, geolocalização e analytics avançados.",
              url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              creator: {
                "@type": "Person",
                name: "Gabriel Paiva",
                url: "https://github.com/gabrielpaiv",
              },
              publisher: {
                "@type": "Organization",
                name: "minLink",
                url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
              },
              featureList: [
                "Encurtamento de URLs gratuito",
                "Analytics detalhados de cliques",
                "Geolocalização de visitantes",
                "Proteção anti-spam com Cloudflare Turnstile",
                "Cache Redis para performance otimizada",
                "Geração de QR Code",
                "Interface responsiva",
                "Página de preview de segurança",
              ],
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: "1.0.0",
              dateCreated: "2024-01-15",
              dateModified: "2025-09-02",
            }),
          }}
        />
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
