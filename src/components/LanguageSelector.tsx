"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface LanguageSelectorProps {
  currentLocale?: string;
}

const languages = [
  { code: "pt-BR", name: "Português", flag: "🇧🇷" },
  { code: "en-US", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export default function LanguageSelector({
  currentLocale,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Detectar idioma atual da URL ou usar padrão
  const detectedLocale = currentLocale || pathname.split("/")[1] || "pt-BR";
  const validLocale =
    languages.find((lang) => lang.code === detectedLocale)?.code || "pt-BR";
  const currentLanguage =
    languages.find((lang) => lang.code === validLocale) || languages[0];

  function handleLanguageChange(newLocale: string) {
    // Remove o locale atual do pathname e adiciona o novo
    const segments = pathname.split("/").filter(Boolean);

    // Verifica se o primeiro segmento é um locale válido
    const hasLocaleInPath =
      segments.length > 0 &&
      languages.some((lang) => lang.code === segments[0]);

    // Constrói o caminho sem o locale atual
    const pathWithoutLocale = hasLocaleInPath
      ? "/" + segments.slice(1).join("/")
      : pathname;

    // Garante que o caminho termine corretamente
    const cleanPath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
    const newPath = `/${newLocale}${cleanPath}`;

    // Usar router.push para navegação que funciona melhor com Next.js
    router.push(newPath);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500  focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:block">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar o dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 z-20 bottom-full mb-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3 ${
                    language.code === validLocale
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                  {language.code === validLocale && (
                    <svg
                      className="w-4 h-4 ml-auto text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
