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
          <p className="mt-4 text-gray-600">Carregando...</p>
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
          Prévia do Link
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Verifique o destino antes de continuar
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
                {isSecure ? "Seguro" : "Não seguro"}
              </span>
            </div>
            <div className="space-x-4 flex flex-row items-center mb-4">
              <div className="bg-gray-200 rounded-lg p-4 w-full">
                <p className="text-sm font-mono text-gray-800 break-all">
                  {link.shortUrl || `${window.location.origin}/${code}`}
                </p>
              </div>
              <button
                onClick={handleCopyShortUrl}
                className="btn-primary transition-all w-40 duration-200 space-x-2"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Domínio: {domain}</span>
              <span>•</span>
              <span>Cliques: {link.clicks}</span>
              <span>•</span>
              <span>
                Criado: {new Date(link.createdAt).toLocaleDateString("pt-BR")}
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
          Criar novo link
        </Link>
        <Link
          href={`/go/${code}`}
          target="_blank"
          className="btn-primary space-x-2"
        >
          <ExternalLinkIcon className="w-4 h-4 mr-2" />
          Ir para o site
        </Link>
      </div>

      {/* Safety Notice */}
      {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Dica de Segurança
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Sempre verifique se o link é confiável antes de clicar. Evite
                inserir informações pessoais em sites desconhecidos.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

// Generate metadata for SEO
async function generateMetadata({ params }: PreviewPageProps) {
  const { code } = params;
  const link = await getLinkByCode(code);

  if (!link) {
    return {
      title: "Link não encontrado",
      description: "O link solicitado não foi encontrado.",
    };
  }

  const domain = getDomainFromUrl(link.url);

  return {
    title: `Prévia: ${link.title || domain} | MinLink`,
    description: `Você está sendo redirecionado para ${domain}. Verifique o destino antes de continuar.`,
    robots: "noindex, nofollow",
  };
}
