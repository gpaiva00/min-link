import { getRequestConfig } from 'next-intl/server';

// Idiomas suportados
export const locales = ['pt-BR', 'en-US', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];

// Idioma padrão
export const defaultLocale: Locale = 'pt-BR';

export default getRequestConfig(async ({ locale }) => {
  // Garantir que locale sempre tenha um valor válido
  const validLocale = locale && locales.includes(locale as Locale) ? locale : defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});

// Função para detectar idioma do navegador
export function detectBrowserLanguage(acceptLanguage: string): Locale {
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim());

  for (const lang of languages) {
    // Verificar correspondência exata
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
    
    // Verificar correspondência por código de idioma base
    const baseLang = lang.split('-')[0];
    switch (baseLang) {
      case 'pt':
        return 'pt-BR';
      case 'en':
        return 'en-US';
      case 'fr':
        return 'fr';
      case 'es':
        return 'es';
    }
  }

  return defaultLocale;
}