# PRD - minLink: Encurtador de URLs

**Versão:** 1.0  
**Data:** Setembro de 2025  
**Autor:** Equipe de Produto MinLink  
**Status:** Aprovado

---

## 1. Visão Geral do Produto

### 1.1 Resumo Executivo

O **minLink** é um encurtador de URLs moderno, rápido e seguro, desenvolvido para simplificar o compartilhamento de links longos e complexos. A plataforma oferece uma solução completa com analytics avançados, proteção contra spam e uma interface intuitiva.

### 1.2 Proposta de Valor

- **Simplicidade**: Interface limpa e intuitiva para encurtar URLs rapidamente
- **Performance**: Cache Redis para respostas ultra-rápidas
- **Segurança**: Proteção robusta contra spam e ataques maliciosos
- **Analytics**: Insights detalhados sobre cliques e engajamento
- **Confiabilidade**: Infraestrutura escalável e monitoramento em tempo real

### 1.3 Visão do Produto

Ser a plataforma de encurtamento de URLs mais confiável e eficiente do mercado, oferecendo uma experiência superior tanto para usuários casuais quanto para empresas que precisam de analytics detalhados.

---

## 2. Objetivos e Metas Mensuráveis

### 2.1 Objetivos Primários

1. **Facilitar o compartilhamento de URLs**: Reduzir URLs longas em códigos curtos e memoráveis
2. **Fornecer analytics valiosos**: Oferecer insights sobre cliques, localização e comportamento
3. **Garantir alta disponibilidade**: Manter uptime de 99.9% ou superior
4. **Proteger contra abuso**: Implementar medidas robustas de segurança

### 2.2 Metas Mensuráveis (6 meses)

- **Performance**: Tempo de resposta < 200ms para 95% das requisições
- **Disponibilidade**: Uptime de 99.9%
- **Segurança**: 0 incidentes de segurança críticos
- **Usabilidade**: Taxa de conversão > 85% na criação de links
- **Escalabilidade**: Suporte a 10.000+ links criados por dia

### 2.3 KPIs Principais

- Tempo médio de resposta da API
- Taxa de disponibilidade do serviço
- Número de links criados por dia/mês
- Taxa de cliques em links encurtados
- Número de tentativas de spam bloqueadas

---

## 3. Público-Alvo e Personas

### 3.1 Público-Alvo Primário

**Usuários Individuais**

- Pessoas que compartilham links em redes sociais
- Profissionais que enviam links por email ou mensagens
- Estudantes e pesquisadores

**Pequenas e Médias Empresas**

- Equipes de marketing digital
- Empresas que fazem campanhas online
- Startups que precisam rastrear engajamento

### 3.2 Personas

#### Persona 1: "Ana, a Profissional de Marketing"

- **Idade**: 28-35 anos
- **Cargo**: Analista de Marketing Digital
- **Necessidades**: Rastrear performance de campanhas, links limpos para redes sociais
- **Dores**: URLs longas quebram o layout, falta de dados de engajamento
- **Objetivos**: Aumentar CTR, medir ROI de campanhas

#### Persona 2: "Carlos, o Empreendedor"

- **Idade**: 30-45 anos
- **Cargo**: Fundador de Startup
- **Necessidades**: Ferramenta confiável e gratuita, analytics básicos
- **Dores**: Custos elevados de ferramentas premium, complexidade desnecessária
- **Objetivos**: Economizar recursos, focar no core business

#### Persona 3: "Maria, a Usuária Casual"

- **Idade**: 20-50 anos
- **Perfil**: Usuária de redes sociais
- **Necessidades**: Simplicidade, rapidez
- **Dores**: Interfaces complicadas, muitos passos para encurtar
- **Objetivos**: Compartilhar links rapidamente

---

## 4. Requisitos Funcionais Detalhados

### 4.1 Funcionalidades Core

#### RF001 - Encurtamento de URLs

**Descrição**: Sistema deve permitir encurtar URLs longas em códigos únicos
**Critérios de Aceitação**:

- Aceitar URLs válidas (http/https)
- Gerar códigos únicos de 6 caracteres
- Validar URLs antes do processamento
- Retornar URL encurtada e URL de preview

#### RF002 - Redirecionamento

**Descrição**: Redirecionar usuários para URL original ao acessar link encurtado
**Critérios de Aceitação**:

- Redirecionamento HTTP 307 (Temporary Redirect)
- Tempo de resposta < 100ms
- Registrar analytics do clique
- Funcionar para URLs inativas (soft delete)

#### RF003 - Página de Preview

**Descrição**: Exibir informações do link antes do redirecionamento
**Critérios de Aceitação**:

- Mostrar URL de destino
- Exibir título da página (quando disponível)
- Botão para copiar link encurtado
- Opção para prosseguir ou cancelar
- Design responsivo

#### RF004 - Analytics de Cliques

**Descrição**: Coletar e armazenar dados de cliques para análise
**Critérios de Aceitação**:

- Registrar IP, User-Agent, Referer
- Capturar geolocalização (país/cidade)
- Timestamp preciso
- Não impactar performance do redirecionamento

### 4.2 Funcionalidades de Segurança

#### RF005 - Proteção Anti-Spam

**Descrição**: Implementar Cloudflare Turnstile para validação humana
**Critérios de Aceitação**:

- Validar token antes de criar link
- Rejeitar tokens inválidos ou expirados
- Interface integrada e responsiva
- Fallback para casos de falha

#### RF006 - Rate Limiting

**Descrição**: Limitar número de requisições por IP
**Critérios de Aceitação**:

- Máximo 10 links por IP por hora
- Headers HTTP informativos
- Mensagens de erro claras
- Reset automático após período

#### RF007 - Validação de URLs

**Descrição**: Validar e sanitizar URLs de entrada
**Critérios de Aceitação**:

- Bloquear protocolos não-HTTP/HTTPS
- Rejeitar IPs privados e localhost
- Normalizar URLs (adicionar protocolo se necessário)
- Validar formato e acessibilidade

### 4.3 Funcionalidades de Interface

#### RF008 - Interface Principal

**Descrição**: Página inicial para encurtamento de URLs
**Critérios de Aceitação**:

- Campo de entrada para URL
- Botão de submit com loading state
- Exibição de resultado com opções de cópia
- Mensagens de erro claras
- Design mobile-first

#### RF009 - Feedback Visual

**Descrição**: Fornecer feedback imediato para ações do usuário
**Critérios de Aceitação**:

- Loading states durante processamento
- Confirmação visual ao copiar links
- Mensagens de sucesso/erro
- Animações suaves e não intrusivas

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance

- **Tempo de Resposta**: < 200ms para 95% das requisições
- **Throughput**: Suporte a 1000+ requisições simultâneas
- **Cache**: Redis com TTL otimizado para links frequentes
- **CDN**: Distribuição global de assets estáticos

### 5.2 Escalabilidade

- **Horizontal Scaling**: Arquitetura stateless para múltiplas instâncias
- **Database**: PostgreSQL com índices otimizados
- **Auto-scaling**: Baseado em CPU e memória
- **Load Balancing**: Distribuição inteligente de carga

### 5.3 Disponibilidade

- **Uptime**: 99.9% (8.76 horas de downtime/ano)
- **Redundância**: Multi-region deployment
- **Backup**: Backup automático diário do banco
- **Monitoring**: Alertas em tempo real

### 5.4 Segurança

- **HTTPS**: Certificados SSL/TLS obrigatórios
- **Headers**: Security headers (HSTS, CSP, etc.)
- **Sanitização**: Validação rigorosa de inputs
- **Rate Limiting**: Proteção contra DDoS
- **Logs**: Auditoria completa de ações

### 5.5 Usabilidade

- **Responsividade**: Suporte a dispositivos móveis e desktop
- **Acessibilidade**: Conformidade com WCAG 2.1 AA
- **Internacionalização**: Suporte inicial em português
- **Performance UX**: Loading states e feedback imediato

### 5.6 Manutenibilidade

- **Código**: TypeScript com tipagem rigorosa
- **Testes**: Cobertura mínima de 80%
- **Documentação**: API e código documentados
- **Monitoramento**: Logs estruturados e métricas

---

## 6. Fluxos de Usuário e Casos de Uso

### 6.1 Fluxo Principal: Encurtar URL

```
1. Usuário acessa página inicial
2. Insere URL no campo de entrada
3. Completa verificação Turnstile
4. Clica em "Encurtar"
5. Sistema valida URL
6. Sistema verifica rate limit
7. Sistema gera código único
8. Sistema salva no banco de dados
9. Sistema retorna URL encurtada
10. Usuário copia link ou acessa preview
```

### 6.2 Fluxo Secundário: Acessar Link Encurtado

```
1. Usuário clica em link encurtado
2. Sistema busca URL original
3. Sistema registra analytics
4. Sistema redireciona para URL original
```

### 6.3 Fluxo Alternativo: Preview do Link

```
1. Usuário acessa URL de preview (/preview/[code])
2. Sistema busca dados do link
3. Sistema exibe informações (URL, título)
4. Usuário pode:
   a. Copiar link encurtado
   b. Prosseguir para URL original
   c. Voltar/cancelar
```

### 6.4 Casos de Uso Detalhados

#### UC001: Encurtar URL para Redes Sociais

**Ator**: Usuário final
**Pré-condições**: Ter uma URL válida para encurtar
**Fluxo**:

1. Usuário cola URL longa no campo
2. Completa verificação de segurança
3. Recebe URL encurtada
4. Copia e compartilha nas redes sociais
   **Pós-condições**: URL encurtada funcional e rastreável

#### UC002: Rastrear Performance de Campanha

**Ator**: Profissional de Marketing
**Pré-condições**: Ter links de campanha criados
**Fluxo**:

1. Cria múltiplos links para diferentes canais
2. Distribui links nas campanhas
3. Monitora cliques e engajamento
4. Analisa dados para otimização
   **Pós-condições**: Dados de analytics disponíveis

#### UC003: Verificar Segurança do Link

**Ator**: Usuário cauteloso
**Pré-condições**: Receber link encurtado suspeito
**Fluxo**:

1. Acessa URL de preview em vez do link direto
2. Verifica URL de destino
3. Decide se quer prosseguir
4. Clica em "Continuar" ou fecha a página
   **Pós-condições**: Usuário informado sobre destino

---

## 7. Cronograma e Marcos Principais

### 7.1 Fases do Projeto

#### Fase 1: MVP (Concluída)

**Duração**: 4 semanas  
**Status**: ✅ Concluída

- ✅ Estrutura básica do projeto
- ✅ API de encurtamento
- ✅ Interface principal
- ✅ Sistema de redirecionamento
- ✅ Integração com banco de dados

#### Fase 2: Segurança e Performance (Concluída)

**Duração**: 3 semanas  
**Status**: ✅ Concluída

- ✅ Implementação do Turnstile
- ✅ Rate limiting
- ✅ Cache Redis
- ✅ Validação de URLs
- ✅ Página de preview

#### Fase 3: Analytics e Melhorias (Em Andamento)

**Duração**: 4 semanas  
**Status**: 🔄 Em Progresso

- ✅ Sistema de analytics básico
- ✅ Geolocalização de cliques
- 🔄 Dashboard de estatísticas
- 🔄 Exportação de dados
- ⏳ API pública

#### Fase 4: Otimização e Escala (Planejada)

**Duração**: 6 semanas  
**Status**: ⏳ Planejada

- ⏳ Otimização de performance
- ⏳ Implementação de CDN
- ⏳ Auto-scaling
- ⏳ Monitoramento avançado
- ⏳ Testes de carga

### 7.2 Marcos Críticos

| Marco                    | Data Prevista | Status | Descrição                         |
| ------------------------ | ------------- | ------ | --------------------------------- |
| MVP Launch               | ✅ Concluído  | ✅     | Versão básica funcional           |
| Security Hardening       | ✅ Concluído  | ✅     | Proteções anti-spam implementadas |
| Analytics Beta           | Fev 2025      | 🔄     | Dashboard básico de estatísticas  |
| Public API               | Mar 2025      | ⏳     | API pública para desenvolvedores  |
| Performance Optimization | Abr 2025      | ⏳     | Otimizações de escala             |
| v1.0 Release             | Mai 2025      | ⏳     | Versão estável para produção      |

---

## 8. Métricas de Sucesso

### 8.1 Métricas Técnicas

#### Performance

- **Tempo de Resposta Médio**: < 150ms
- **P95 Response Time**: < 200ms
- **P99 Response Time**: < 500ms
- **Throughput**: > 1000 req/s

#### Disponibilidade

- **Uptime**: > 99.9%
- **MTTR (Mean Time to Recovery)**: < 5 minutos
- **MTBF (Mean Time Between Failures)**: > 30 dias

#### Segurança

- **Taxa de Bloqueio de Spam**: > 99%
- **Falsos Positivos**: < 1%
- **Tentativas de Ataque Bloqueadas**: 100%

### 8.2 Métricas de Produto

#### Adoção

- **Links Criados/Dia**: Meta de 1000+
- **Usuários Únicos/Mês**: Meta de 5000+
- **Taxa de Retenção**: > 60% (usuários que retornam)

#### Engajamento

- **Taxa de Cliques**: > 15% dos links criados
- **Tempo na Página de Preview**: > 10 segundos
- **Taxa de Conversão (URL → Link)**: > 85%

#### Qualidade

- **Taxa de Erro**: < 0.1%
- **Links Quebrados**: < 0.01%
- **Satisfação do Usuário**: > 4.5/5 (quando implementado feedback)

### 8.3 Métricas de Negócio

#### Crescimento

- **Crescimento Mensal de Usuários**: > 20%
- **Crescimento de Links Criados**: > 25%
- **Viral Coefficient**: > 1.2

#### Eficiência

- **Custo por Link Criado**: < R$ 0,01
- **Custo por Usuário Ativo**: < R$ 1,00
- **ROI de Infraestrutura**: > 300%

---

## 9. Restrições e Dependências

### 9.1 Restrições Técnicas

#### Infraestrutura

- **Plataforma**: Vercel (limitações de cold start)
- **Banco de Dados**: PostgreSQL (limites de conexão)
- **Cache**: Upstash Redis (limites de memória)
- **CDN**: Vercel Edge Network

#### Tecnológicas

- **Framework**: Next.js 14 (App Router)
- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript (tipagem rigorosa)
- **ORM**: Prisma (limitações de query)

### 9.2 Restrições de Negócio

#### Orçamentárias

- **Infraestrutura**: Orçamento limitado para serviços premium
- **Desenvolvimento**: Equipe pequena (1-2 desenvolvedores)
- **Marketing**: Sem orçamento para aquisição paga

#### Regulatórias

- **LGPD**: Conformidade com lei de proteção de dados
- **Termos de Uso**: Políticas claras de uso aceitável
- **Privacidade**: Minimização de coleta de dados

### 9.3 Dependências Externas

#### Serviços Críticos

- **Cloudflare Turnstile**: Proteção anti-spam
- **Upstash Redis**: Cache e rate limiting
- **Vercel**: Hospedagem e deployment
- **PostgreSQL**: Armazenamento de dados

#### APIs Terceiros

- **Geolocalização**: Headers do Vercel
- **Metadata**: Fetch de títulos de páginas
- **Monitoramento**: Vercel Analytics

### 9.4 Riscos e Mitigações

#### Riscos Técnicos

| Risco                 | Probabilidade | Impacto | Mitigação                    |
| --------------------- | ------------- | ------- | ---------------------------- |
| Falha do Redis        | Média         | Alto    | Fallback para banco de dados |
| Limite de conexões DB | Alta          | Médio   | Connection pooling otimizado |
| Cold start Vercel     | Alta          | Baixo   | Warming requests automáticas |
| Spam massivo          | Média         | Alto    | Rate limiting agressivo      |

#### Riscos de Negócio

| Risco                          | Probabilidade | Impacto | Mitigação               |
| ------------------------------ | ------------- | ------- | ----------------------- |
| Crescimento além da capacidade | Média         | Alto    | Monitoramento e alertas |
| Custos de infraestrutura       | Alta          | Médio   | Otimização contínua     |
| Concorrência                   | Alta          | Médio   | Foco em diferenciação   |
| Mudanças regulatórias          | Baixa         | Alto    | Monitoramento legal     |

### 9.5 Dependências de Desenvolvimento

#### Ferramentas

- **Bun**: Package manager e runtime
- **Prisma**: ORM e migrations
- **Tailwind CSS**: Framework de estilização
- **TypeScript**: Tipagem estática

#### Integrações

- **GitHub**: Controle de versão
- **Vercel**: CI/CD automático
- **Upstash**: Redis gerenciado
- **Neon/Supabase**: PostgreSQL gerenciado

---

## 10. Considerações Finais

### 10.1 Próximos Passos

1. **Implementar Dashboard de Analytics** (Prioridade Alta)
2. **Desenvolver API Pública** (Prioridade Média)
3. **Otimizar Performance** (Prioridade Alta)
4. **Implementar Testes Automatizados** (Prioridade Alta)
5. **Criar Documentação de API** (Prioridade Média)

### 10.2 Critérios de Sucesso do PRD

Este PRD será considerado bem-sucedido quando:

- ✅ Todas as funcionalidades core estiverem implementadas
- ✅ Métricas de performance forem atingidas
- ✅ Sistema estiver estável em produção
- 🔄 Analytics básicos estiverem funcionais
- ⏳ Feedback dos usuários for positivo (> 4.0/5)

### 10.3 Aprovações

| Stakeholder   | Cargo           | Status        | Data     |
| ------------- | --------------- | ------------- | -------- |
| Gabriel       | Tech Lead       | ✅ Aprovado   | Jan 2025 |
| Equipe Dev    | Desenvolvedores | 🔄 Em Revisão | -        |
| Product Owner | -               | ⏳ Pendente   | -        |

---

**Documento vivo**: Este PRD será atualizado conforme o projeto evolui e novos requisitos surgem.

**Última atualização**: Janeiro 2025  
**Próxima revisão**: Fevereiro 2025
