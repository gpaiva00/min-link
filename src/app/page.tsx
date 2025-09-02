"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { normalizeUrl, copyToClipboard } from "@/lib/utils";
import { CheckIcon, DollarSignIcon, ShieldIcon, ZapIcon } from "lucide-react";

interface ShortenResponse {
  success: boolean;
  data?: {
    id: string;
    code: string;
    url: string;
    title?: string;
    shortUrl: string;
    previewUrl: string;
    createdAt: string;
  };
  error?: string;
  details?: string[];
  resetTime?: number;
}

interface FormData {
  url: string;
  turnstileToken: string;
}

// Importar TurnstileWidget dinamicamente sem SSR
const TurnstileWidget = dynamic(() => import("@/components/TurnstileWidget"), {
  ssr: false,
});

export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    url: "",
    turnstileToken: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const normalizedUrl = normalizeUrl(formData.url);

      // Aguardar token do Turnstile se ainda não estiver disponível
      let turnstileToken = formData.turnstileToken;
      if (!turnstileToken) {
        // Tentar executar o Turnstile novamente
        if (typeof window !== "undefined" && (window as any).turnstile) {
          const turnstileElement = document.querySelector(".cf-turnstile");
          if (turnstileElement) {
            (window as any).turnstile.execute();
          }
        }

        // Aguardar até 5 segundos pelo token
        const maxWait = 5000;
        const startTime = Date.now();
        while (!turnstileToken && Date.now() - startTime < maxWait) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          turnstileToken = formData.turnstileToken;
        }

        if (!turnstileToken) {
          throw new Error(
            "Falha na verificação de segurança. Tente novamente."
          );
        }
      }

      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: normalizedUrl,
          turnstileToken: turnstileToken,
        }),
      });

      const data: ShortenResponse = await response.json();

      if (data.success) {
        setFormData({ url: "", turnstileToken: "" });
        // Reset Turnstile
        if (typeof window !== "undefined" && (window as any).turnstile) {
          (window as any).turnstile.reset();
        }
        // Redirecionar para a página de preview
        router.push(`/preview/${data.data?.code}`);
      } else {
        setError(data.error || "Erro desconhecido");
        if (data.details) {
          setError(data.details.join(", "));
        }
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTurnstileCallback = (token: string) => {
    setFormData((prev) => ({ ...prev, turnstileToken: token }));
  };

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-500">
          Encurte seus links
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Transforme URLs longas em links curtos e elegantes.
        </p>
      </div>

      {/* Main Form */}
      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-50 mb-2"
            >
              Cole sua URL aqui
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              placeholder="https://exemplo.com/sua-url-muito-longa"
              className="input"
              required
              disabled={isLoading}
            />
          </div>

          {/* Turnstile Widget - Modo Implícito */}
          <TurnstileWidget
            siteKey={siteKey}
            onCallback={handleTurnstileCallback}
          />

          <button
            type="submit"
            disabled={isLoading || !formData.url}
            className="btn-primary"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Encurtando...
              </>
            ) : (
              "Encurtar URL"
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="alert-error mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erro</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="h-14 w-14 border-zinc-800 border rounded-full flex items-center justify-center mx-auto mb-4">
            <ZapIcon className="text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-primary-500 mb-2">
            Rápido
          </h3>
          <p className="text-gray-500">
            Encurte seus links em segundos com nossa interface simples e
            intuitiva.
          </p>
        </div>

        <div className="text-center">
          <div className="h-14 w-14 border-zinc-800 border rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldIcon className="text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-primary-500 mb-2">
            Seguro
          </h3>
          <p className="text-gray-500">
            Proteção contra spam e links maliciosos com verificação de
            segurança.
          </p>
        </div>

        <div className="text-center">
          <div className="h-14 w-14 border-zinc-800 border rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSignIcon className="text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-primary-500 mb-2">
            Gratuito
          </h3>
          <p className="text-gray-500">
            Sem limites, sem cadastro. Use quantas vezes quiser, completamente
            grátis.
          </p>
        </div>
      </div>
    </div>
  );
}
