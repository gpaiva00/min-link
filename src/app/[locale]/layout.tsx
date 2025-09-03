import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import LanguageSelector from "@/components/LanguageSelector";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = await getMessages();
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return {
    title: {
      default: t('meta.title'),
      template: `%s | minLink`,
    },
    description: t('meta.description'),
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
        "pt-BR": `${process.env.NEXT_PUBLIC_APP_URL}/pt-BR`,
        "en-US": `${process.env.NEXT_PUBLIC_APP_URL}/en-US`,
        "fr": `${process.env.NEXT_PUBLIC_APP_URL}/fr`,
        "es": `${process.env.NEXT_PUBLIC_APP_URL}/es`,
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
      locale: locale.replace('-', '_'),
      url: process.env.NEXT_PUBLIC_APP_URL,
      title: t('meta.title'),
      description: t('meta.description'),
      siteName: "minLink",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: t('meta.title'),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@minlink",
      creator: "@gpaiva00",
      title: t('meta.title'),
      description: t('meta.description'),
      images: {
        url: "/og.png",
        alt: t('meta.title'),
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
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validar se o idioma é suportado
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Obter mensagens para o idioma atual
  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <html lang={locale}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9285587738161693" />
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        ></script>
      </head>
      <body
        className={`${inter.className} min-h-screen bg-background flex flex-col`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <a
                  href="/"
                  className="text-2xl flex gap-2 items-center font-bold text-primary-500"
                >
                  <img src="/logo.png" className="w-6 h-6" />
                  minLink
                </a>
                <LanguageSelector />
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-500 text-sm">
                  {t("copyright")}
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a
                    href={`/${locale}/privacy-policy`}
                    className="text-gray-500 hover:underline text-sm"
                  >
                    {t("privacyPolicy")}
                  </a>
                  <a
                    href={`/${locale}/terms-of-service`}
                    className="text-gray-500 hover:underline text-sm"
                  >
                    {t("termsOfService")}
                  </a>
                </div>
              </div>
            </div>
          </footer>

          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}