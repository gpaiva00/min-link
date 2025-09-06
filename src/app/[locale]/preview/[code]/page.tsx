"use client";

import { notFound } from "next/navigation";
import { getLinkByCode, getDomainFromUrl, copyToClipboard } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CopyIcon,
  CheckIcon,
  ShieldIcon,
  ExternalLinkIcon,
  ShieldAlertIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface PreviewPageProps {
  params: {
    code: string;
  };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const { code } = params;
  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const t = useTranslations("preview");

  useEffect(() => {
    async function fetchLink() {
      try {
        const linkData = await getLinkByCode(code);
        if (!linkData) {
          notFound();
        }
        setLink(linkData);
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchLink();
  }, [code]);

  const handleCopyShortUrl = async () => {
    if (!link) return;

    const shortUrl = link.shortUrl || `${window.location.origin}/${code}`;
    const success = await copyToClipboard(shortUrl);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!link) {
    notFound();
  }

  const domain = getDomainFromUrl(link.url);
  const isSecure = link.url.startsWith("https://");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Warning Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-500">
          {t("linkPreview")}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {t("checkDestination")}
        </p>
      </div>

      {/* Link Information Card */}
      <div className="card p-8 mb-8">
        <div className="flex items-start space-x-4">
          {/* Security Icon */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
              isSecure ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            {isSecure ? (
              <ShieldIcon className="text-green-800" />
            ) : (
              <ShieldAlertIcon className="text-yellow-600" />
            )}
          </div>

          {/* Link Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-lg font-semibold text-gray-50 truncate">
                {link.title || domain}
              </h2>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isSecure
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {isSecure ? t("secure") : t("notSecure")}
              </span>
            </div>
            <div className="gap-4 flex flex-col sm:flex-row items-center mb-4">
              <div className="bg-gray-200 rounded-lg p-4 w-full">
                <p className="text-sm font-mono text-gray-800 break-all">
                  {link.shortUrl || `${window.location.origin}/${code}`}
                </p>
              </div>
              <button
                onClick={handleCopyShortUrl}
                className="btn-primary transition-all sm:w-40 duration-200 space-x-2"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>{t("copied")}</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    <span>{t("copy")}</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-sm text-gray-500">
              <span>
                {t("domain")}: {domain}
              </span>
              <span>•</span>
              <span>
                {t("clicks")}: {link.clicks}
              </span>
              <span>•</span>
              <span>
                {t("created")}: {" "}
                {new Date(link.createdAt).toLocaleDateString(t("locale"))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      {/* <div className="card p-6 mb-8 text-center bg-gray-50">
        <p className="text-sm text-gray-500 mb-4">Publicidade</p>
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
          <p className="text-gray-400 text-sm">
            Espaço reservado para anúncios
          </p>
          <p className="text-gray-400 text-xs mt-2">
            (AdSense ou outro provedor)
          </p>
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="btn-outline">
          {t("createNewLink")}
        </Link>
        <Link
          href={`/go/${code}`}
          locale={false}
          target="_blank"
          className="btn-primary space-x-2"
        >
          <ExternalLinkIcon className="w-4 h-4 mr-2" />
          {t("goToSite")}
        </Link>
      </div>
    </div>
  );
}
