import Link from "next/link";
import {
  ScaleIcon,
  ShieldIcon,
  AlertTriangleIcon,
  UserIcon,
  FileTextIcon,
  GlobeIcon,
  MailIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  CopyrightIcon,
  BanIcon,
} from "lucide-react";

export const metadata = {
  title: "Termos de Uso | MinLink",
  description:
    "Termos de uso do MinLink - Condições para utilização do nosso serviço de encurtamento de URLs.",
};

function TableOfContents() {
  const sections = [
    {
      id: "aceitacao-termos",
      title: "1. Aceitação dos Termos",
      icon: BookOpenIcon,
    },
    {
      id: "descricao-servico",
      title: "2. Descrição do Serviço",
      icon: GlobeIcon,
    },
    { id: "uso-aceitavel", title: "3. Uso Aceitável", icon: UserIcon },
    {
      id: "limitacoes-servico",
      title: "4. Limitações do Serviço",
      icon: AlertTriangleIcon,
    },
    {
      id: "propriedade-intelectual",
      title: "5. Propriedade Intelectual",
      icon: CopyrightIcon,
    },
    { id: "privacidade", title: "6. Privacidade", icon: ShieldIcon },
    {
      id: "isencao-garantias",
      title: "7. Isenção de Garantias",
      icon: AlertTriangleIcon,
    },
    {
      id: "limitacao-responsabilidade",
      title: "8. Limitação de Responsabilidade",
      icon: ScaleIcon,
    },
    { id: "indenizacao", title: "9. Indenização", icon: ScaleIcon },
    {
      id: "modificacoes-servico",
      title: "10. Modificações do Serviço",
      icon: FileTextIcon,
    },
    { id: "encerramento", title: "11. Encerramento", icon: BanIcon },
    { id: "lei-aplicavel", title: "12. Lei Aplicável", icon: ScaleIcon },
    {
      id: "alteracoes-termos",
      title: "13. Alterações nos Termos",
      icon: FileTextIcon,
    },
    { id: "contato", title: "14. Contato", icon: MailIcon },
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

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 border-zinc-800 border rounded-full flex items-center justify-center">
              <ScaleIcon className="h-8 w-8 text-primary-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-500 mb-4">
            Termos de Uso
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Condições e regras para utilização do serviço MinLink
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
              <section id="aceitacao-termos" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <BookOpenIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    1. Aceitação dos Termos
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Ao acessar e usar o MinLink, você concorda em cumprir e
                    estar vinculado a estes Termos de Uso. Se você não concordar
                    com qualquer parte destes termos, não deve usar nosso
                    serviço.
                  </p>
                  <p>
                    Estes termos se aplicam a todos os visitantes, usuários e
                    outras pessoas que acessam ou usam o serviço.
                  </p>
                </div>
              </section>

              <section id="descricao-servico" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <GlobeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    2. Descrição do Serviço
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    O MinLink é um serviço gratuito de encurtamento de URLs que
                    permite aos usuários criar versões mais curtas de links
                    longos.
                  </p>
                  <p>O serviço inclui:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Encurtamento de URLs</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Redirecionamento para URLs originais</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Estatísticas básicas de cliques</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Verificação de segurança contra spam</div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="uso-aceitavel" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    3. Uso Aceitável
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Você concorda em NÃO usar o serviço para:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Atividades ilegais ou fraudulentas</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Distribuição de malware, vírus ou conteúdo malicioso
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Spam ou envio de mensagens não solicitadas</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Violação de direitos autorais ou propriedade intelectual
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Assédio, discriminação ou conteúdo ofensivo</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Tentativas de contornar medidas de segurança</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Uso automatizado excessivo que possa sobrecarregar o
                        serviço
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="limitacoes-servico" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <AlertTriangleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    4. Limitações do Serviço
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    O MinLink é fornecido "como está" e pode ter as seguintes
                    limitações:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Disponibilidade não garantida 24/7</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Limites de taxa para prevenir abuso</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Possibilidade de manutenção programada</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Remoção de links que violem estes termos</div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="propriedade-intelectual" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <CopyrightIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    5. Propriedade Intelectual
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    O serviço MinLink e todo o seu conteúdo, recursos e
                    funcionalidades são propriedade exclusiva do MinLink e são
                    protegidos por leis de direitos autorais, marcas registradas
                    e outras leis de propriedade intelectual.
                  </p>
                  <p>
                    Você mantém todos os direitos sobre as URLs que encurta, mas
                    concede ao MinLink uma licença para processar e exibir essas
                    URLs conforme necessário para fornecer o serviço.
                  </p>
                </div>
              </section>

              <section id="privacidade" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ShieldIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    6. Privacidade
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Sua privacidade é importante para nós. Nossa coleta e uso de
                    informações pessoais em conexão com o serviço é descrita em
                    nossa Política de Privacidade.
                  </p>
                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <Link
                      href="/privacy"
                      className="text-primary-500 hover:text-primary-400 transition-colors inline-flex items-center gap-2"
                    >
                      <ShieldIcon className="h-4 w-4" />
                      Leia nossa Política de Privacidade
                    </Link>
                  </div>
                </div>
              </section>

              <section id="isencao-garantias" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <AlertTriangleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    7. Isenção de Garantias
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    O serviço é fornecido "como está" e "conforme disponível"
                    sem garantias de qualquer tipo, expressas ou implícitas,
                    incluindo, mas não se limitando a:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Garantias de comercialização</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Adequação para um propósito específico</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Não violação de direitos de terceiros</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Funcionamento ininterrupto ou livre de erros</div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="limitacao-responsabilidade" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ScaleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    8. Limitação de Responsabilidade
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Em nenhuma circunstância o MinLink será responsável por
                    danos diretos, indiretos, incidentais, especiais,
                    consequenciais ou punitivos, incluindo, mas não se limitando
                    a:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Perda de lucros ou receita</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Perda de dados ou informações</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Interrupção de negócios</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Danos resultantes do uso ou incapacidade de usar o
                        serviço
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="indenizacao" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ScaleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    9. Indenização
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Você concorda em indenizar, defender e isentar o MinLink de
                    todas as reivindicações, responsabilidades, danos, perdas,
                    custos e despesas decorrentes de:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Seu uso do serviço</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Violação destes Termos de Uso</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Violação de direitos de terceiros</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        Qualquer conteúdo que você submeter através do serviço
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="modificacoes-servico" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    10. Modificações do Serviço
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Reservamo-nos o direito de modificar ou descontinuar o
                    serviço (ou qualquer parte dele) temporária ou
                    permanentemente, com ou sem aviso prévio.
                  </p>
                  <p>
                    Não seremos responsáveis perante você ou terceiros por
                    qualquer modificação, suspensão ou descontinuação do
                    serviço.
                  </p>
                </div>
              </section>

              <section id="encerramento" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <BanIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    11. Encerramento
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Podemos encerrar ou suspender seu acesso ao serviço
                    imediatamente, sem aviso prévio, por qualquer motivo,
                    incluindo, mas não se limitando à violação destes Termos de
                    Uso.
                  </p>
                  <p>
                    Após o encerramento, seu direito de usar o serviço cessará
                    imediatamente.
                  </p>
                </div>
              </section>

              <section id="lei-aplicavel" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ScaleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    12. Lei Aplicável
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Estes Termos de Uso são regidos e interpretados de acordo
                    com as leis do Brasil, sem consideração aos princípios de
                    conflito de leis.
                  </p>
                  <p>
                    Qualquer disputa decorrente destes termos será resolvida nos
                    tribunais competentes do Brasil.
                  </p>
                </div>
              </section>

              <section id="alteracoes-termos" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    13. Alterações nos Termos
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Reservamo-nos o direito de modificar estes Termos de Uso a
                    qualquer momento. Alterações significativas serão
                    notificadas através do site.
                  </p>
                  <p>
                    O uso continuado do serviço após alterações constitui
                    aceitação dos novos termos.
                  </p>
                </div>
              </section>

              <section id="contato" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <MailIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    14. Contato
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Se você tiver dúvidas sobre estes Termos de Uso, entre em
                    contato conosco:
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
