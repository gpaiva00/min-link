import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypassa i18n para rotas de redirecionamento
  const isGoRoute = pathname.startsWith('/go');
  const isRootShortCode = /^\/[a-zA-Z0-9]{4,8}(?:\/)?$/.test(pathname);

  if (isGoRoute || isRootShortCode) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

const intlMiddleware = createMiddleware({
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
    // Incluir todas as rotas exceto arquivos estáticos, API, rota de links encurtados (/go) e requisições RSC
    '/((?!api|go|_next/static|_next/image|favicon.ico|.*\._rsc.*|.*\.png$|.*\.jpg$|.*\.jpeg$|.*\.gif$|.*\.svg$|.*\.ico$|.*\.webp$|.*\.css$|.*\.js$|.*\.json$|.*\.xml$|.*\.txt$).*)'
  ]
};