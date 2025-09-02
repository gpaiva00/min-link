# MinLink - Encurtador de URLs

Um encurtador de URLs moderno e rápido construído com Next.js 14, TypeScript, Prisma e Redis.

## ✨ Características

- 🚀 **Rápido**: Cache Redis para performance otimizada
- 🔒 **Seguro**: Proteção contra spam com Cloudflare Turnstile
- 📊 **Analytics**: Estatísticas detalhadas de cliques
- 🌍 **Geolocalização**: Rastreamento por país e cidade
- 📱 **Responsivo**: Interface moderna e mobile-first
- 🛡️ **Rate Limiting**: Proteção contra abuso
- 🎯 **Preview**: Página de pré-visualização antes do redirecionamento

## 🛠️ Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Cache**: Upstash Redis
- **Estilização**: Tailwind CSS
- **Validação**: Zod
- **Proteção**: Cloudflare Turnstile
- **Deploy**: Vercel (recomendado)

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ ou Bun
- PostgreSQL
- Conta Upstash (Redis)
- Conta Cloudflare (Turnstile)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/min-link.git
cd min-link
```

### 2. Instale as dependências

```bash
# Com Bun (recomendado)
bun install

# Ou com npm
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Preencha as variáveis no arquivo `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/minlink?schema=public"

# Redis (Upstash)
NEXT_PUBLIC_UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your-turnstile-site-key"
NEXT_PUBLIC_TURNSTILE_SECRET_KEY="your-turnstile-secret-key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="MinLink"

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS="10"
RATE_LIMIT_WINDOW_MS="900000"

# Optional: Analytics
VERCEL_ANALYTICS_ID="your-vercel-analytics-id"
NEXT_PUBLIC_GOOGLE_ANALYTICS="G-XXXXXXXXXX"
```

### 4. Configure o banco de dados

```bash
# Gere o cliente Prisma
bun prisma generate

# Execute as migrações
bun prisma db push

# (Opcional) Visualize o banco
bun prisma studio
```

### 5. Execute o projeto

```bash
# Desenvolvimento
bun dev

# Produção
bun build
bun start
```

O projeto estará disponível em `http://localhost:3000`.

## 🔧 Configuração dos Serviços

### PostgreSQL

1. Crie um banco de dados PostgreSQL
2. Configure a `DATABASE_URL` no arquivo `.env.local`

### Upstash Redis

1. Crie uma conta em [upstash.com](https://upstash.com)
2. Crie um banco Redis
3. Copie a URL e Token REST para o `.env.local`

### Cloudflare Turnstile

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá para "Turnstile" e crie um novo site
3. Copie a Site Key e Secret Key para o `.env.local`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── shorten/          # API para encurtar URLs
│   │   └── stats/            # API para estatísticas
│   ├── go/[code]/            # Redirecionamento
│   ├── preview/[code]/       # Página de pré-visualização
│   ├── privacy/              # Política de Privacidade
│   ├── terms/                # Termos de Uso
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página inicial
│   └── globals.css           # Estilos globais
└── lib/
    ├── prisma.ts             # Cliente Prisma
    ├── redis.ts              # Cliente Redis
    ├── rate-limit.ts         # Sistema de rate limiting
    ├── utils.ts              # Funções utilitárias
    └── validation.ts         # Esquemas de validação
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. O deploy será automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Netlify

## 📊 APIs

### POST /api/shorten

Encurta uma URL.

```json
{
  "url": "https://example.com",
  "turnstileToken": "token-do-turnstile"
}
```

### GET /api/stats/[code]

Obtém estatísticas de um link.

```json
{
  "totalClicks": 150,
  "uniqueClicks": 120,
  "clicksByDay": [...],
  "clicksByCountry": [...],
  "topReferrers": [...]
}
```

## 🔒 Segurança

- Rate limiting por IP
- Validação de URLs
- Proteção contra spam com Turnstile
- Sanitização de dados
- Headers de segurança

### ⚠️ Configuração Segura de Credenciais

**IMPORTANTE**: Nunca commite credenciais reais no repositório!

1. **Use sempre variáveis de ambiente**: Todas as credenciais devem estar em arquivos `.env` ou `.env.local`
2. **Verifique o .gitignore**: Certifique-se que `.env` está listado no `.gitignore`
3. **Revogue credenciais expostas**: Se credenciais foram commitadas acidentalmente:
   - Revogue imediatamente no serviço (Neon DB, Upstash, etc.)
   - Gere novas credenciais
   - Limpe o histórico do Git se necessário
4. **Use .env.example**: Mantenha um template sem valores reais
5. **Configure CI/CD**: Use secrets do GitHub/Vercel para deploy

**Exemplo de .env seguro**:
```env
# ✅ Correto - usando variáveis
NEXT_PUBLIC_DATABASE_URL=${DATABASE_URL}

# ❌ Errado - credenciais hardcoded
NEXT_PUBLIC_DATABASE_URL="postgresql://user:pass@host/db"
```

## 📝 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

- Abra uma [issue](https://github.com/seu-usuario/min-link/issues)
- Entre em contato: gabrielalvesdepaiva@icloud.com

---

Feito com ❤️ por Gabriel Paiva
