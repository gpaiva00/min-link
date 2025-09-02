import Link from "next/link";
import {
  ShieldIcon,
  EyeIcon,
  LockIcon,
  UserIcon,
  FileTextIcon,
  GlobeIcon,
  MailIcon,
  ArrowLeftIcon,
} from "lucide-react";

export const metadata = {
  title: "Política de Privacidade | MinLink",
  description:
    "Política de privacidade do MinLink - Como coletamos, usamos e protegemos seus dados.",
};

function TableOfContents() {
  const sections = [
    {
      id: "informacoes-coletamos",
      title: "1. Informações que Coletamos",
      icon: EyeIcon,
    },
    {
      id: "como-usamos",
      title: "2. Como Usamos suas Informações",
      icon: UserIcon,
    },
    {
      id: "compartilhamento",
      title: "3. Compartilhamento de Informações",
      icon: GlobeIcon,
    },
    {
      id: "cookies",
      title: "4. Cookies e Tecnologias Similares",
      icon: FileTextIcon,
    },
    { id: "retencao-dados", title: "5. Retenção de Dados", icon: LockIcon },
    { id: "seguranca", title: "6. Segurança", icon: ShieldIcon },
    { id: "seus-direitos", title: "7. Seus Direitos", icon: UserIcon },
    {
      id: "servicos-terceiros",
      title: "8. Serviços de Terceiros",
      icon: GlobeIcon,
    },
    {
      id: "alteracoes",
      title: "9. Alterações nesta Política",
      icon: FileTextIcon,
    },
    { id: "contato", title: "10. Contato", icon: MailIcon },
  ];

  return (
    <div className="card mb-8">
      <h2 className="text-xl font-semibold text-primary-500 mb-4 flex items-center gap-2">
        <FileTextIcon className="h-5 w-5" />
        Índice
      </h2>
      <nav className="space-y-2">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-3 p-2 rounded-lg text-gray-300 hover:text-primary-500 hover:bg-zinc-800/50 transition-colors duration-200"
            >
              <IconComponent className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{section.title}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 border-zinc-800 border rounded-full flex items-center justify-center">
              <ShieldIcon className="h-8 w-8 text-primary-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-500 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Transparência sobre como coletamos, usamos e protegemos seus dados
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <span className="text-sm text-gray-400">Última atualização:</span>
            <span className="text-sm font-medium text-primary-500">
              {new Date().toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TableOfContents />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              <section id="informacoes-coletamos" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <EyeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    1. Informações que Coletamos
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    O MinLink coleta as seguintes informações quando você usa
                    nosso serviço:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          URLs fornecidas:
                        </strong>{" "}
                        As URLs que você deseja encurtar
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Endereço IP:
                        </strong>{" "}
                        Para controle de rate limiting e análise de tráfego
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Informações do navegador:
                        </strong>{" "}
                        User-agent para estatísticas básicas
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Dados de clique:
                        </strong>{" "}
                        Quando alguém acessa um link encurtado
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Localização aproximada:
                        </strong>{" "}
                        País e cidade baseados no IP
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Referenciador:
                        </strong>{" "}
                        Site de origem dos cliques
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="como-usamos" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    2. Como Usamos suas Informações
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Utilizamos as informações coletadas para:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Fornecer o serviço de encurtamento de URLs</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Prevenir abuso e spam através de rate limiting</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Gerar estatísticas básicas de uso dos links</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Melhorar a qualidade e segurança do serviço</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Cumprir obrigações legais quando necessário</div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="compartilhamento" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <GlobeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    3. Compartilhamento de Informações
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Não vendemos, alugamos ou compartilhamos suas informações
                    pessoais com terceiros, exceto nas seguintes situações:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Quando exigido por lei ou ordem judicial</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Para proteger nossos direitos, propriedade ou segurança
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Com provedores de serviços que nos ajudam a operar o
                        site (hospedagem, análise)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Em caso de fusão, aquisição ou venda de ativos</div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="cookies" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    4. Cookies e Tecnologias Similares
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Utilizamos cookies e tecnologias similares para:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Verificação de segurança (Cloudflare Turnstile)</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Análise de tráfego e uso do site</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Exibição de anúncios relevantes</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Melhorar a experiência do usuário</div>
                    </li>
                  </ul>
                  <p className="mt-4">
                    Você pode desabilitar cookies em seu navegador, mas isso
                    pode afetar a funcionalidade do site.
                  </p>
                </div>
              </section>

              <section id="retencao-dados" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <LockIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    5. Retenção de Dados
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Mantemos suas informações pelo tempo necessário para
                    fornecer nossos serviços:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Links encurtados:
                        </strong>{" "}
                        Indefinidamente, a menos que solicitada a remoção
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Dados de clique:
                        </strong>{" "}
                        Por até 2 anos para análise estatística
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Logs de IP:
                        </strong>{" "}
                        Por até 30 dias para segurança
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">Cache:</strong> Por
                        períodos curtos para melhorar performance
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="seguranca" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ShieldIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    6. Segurança
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Implementamos medidas de segurança técnicas e
                    organizacionais para proteger suas informações contra acesso
                    não autorizado, alteração, divulgação ou destruição.
                  </p>
                  <p>
                    No entanto, nenhum método de transmissão pela internet é
                    100% seguro, e não podemos garantir segurança absoluta.
                  </p>
                </div>
              </section>

              <section id="seus-direitos" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    7. Seus Direitos
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Você tem o direito de:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Solicitar informações sobre dados que coletamos sobre
                        você
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Solicitar correção de informações incorretas</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Solicitar exclusão de seus dados (quando aplicável)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Retirar consentimento para processamento de dados
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Apresentar reclamações às autoridades competentes
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="servicos-terceiros" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <GlobeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    8. Serviços de Terceiros
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Nosso site utiliza serviços de terceiros que podem coletar
                    informações:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Cloudflare:
                        </strong>{" "}
                        Para segurança e CDN
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">Vercel:</strong>{" "}
                        Para hospedagem
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Google Analytics:
                        </strong>{" "}
                        Para análise de tráfego
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-primary-500">
                          Provedores de anúncios:
                        </strong>{" "}
                        Para monetização
                      </div>
                    </li>
                  </ul>
                  <p className="mt-4">
                    Estes serviços têm suas próprias políticas de privacidade
                    que recomendamos que você leia.
                  </p>
                </div>
              </section>

              <section id="alteracoes" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    9. Alterações nesta Política
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Podemos atualizar esta política de privacidade
                    periodicamente. Alterações significativas serão notificadas
                    através do site.
                  </p>
                  <p>
                    O uso continuado do serviço após alterações constitui
                    aceitação da nova política.
                  </p>
                </div>
              </section>

              <section id="contato" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <MailIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    10. Contato
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Se você tiver dúvidas sobre esta política de privacidade ou
                    sobre como tratamos seus dados, entre em contato conosco:
                  </p>
                  <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-primary-500" />
                        <strong className="text-primary-500">Email:</strong>
                        <span>gabrielalvesdepaiva@icloud.com</span>
                      </p>
                      {/* <p className="flex items-center gap-2">
                        <GlobeIcon className="h-4 w-4 text-primary-500" />
                        <strong className="text-primary-500">Endereço:</strong> 
                        <span>[Seu endereço comercial]</span>
                      </p> */}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Back to Home Button */}
            <div className="mt-12 pt-8 border-t border-zinc-700">
              <Link
                href="/"
                className="btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
