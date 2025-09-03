import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Lista de idiomas suportados
  locales,
  
  // Idioma padrão usado quando nenhum idioma corresponde
  defaultLocale,
  
  // Estratégia de detecção de idioma
  localeDetection: true,
  
  // Prefixo de rota para idiomas
  localePrefix: 'always'
});

export const config = {
  // Matcher para aplicar o middleware em todas as rotas relevantes
  matcher: [
    // Incluir todas as rotas exceto arquivos estáticos, API e requisições RSC
    '/((?!api|_next/static|_next/image|favicon.ico|.*\._rsc.*|.*\.png$|.*\.jpg$|.*\.jpeg$|.*\.gif$|.*\.svg$|.*\.ico$|.*\.webp$|.*\.css$|.*\.js$|.*\.json$|.*\.xml$|.*\.txt$).*)'
  ]
};