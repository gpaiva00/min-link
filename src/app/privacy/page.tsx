import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | MinLink',
  description: 'Política de privacidade do MinLink - Como coletamos, usamos e protegemos seus dados.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
        
        <p className="text-gray-600 mb-8">
          <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informações que Coletamos</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O MinLink coleta as seguintes informações quando você usa nosso serviço:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>URLs fornecidas:</strong> As URLs que você deseja encurtar</li>
                <li><strong>Endereço IP:</strong> Para controle de rate limiting e análise de tráfego</li>
                <li><strong>Informações do navegador:</strong> User-agent para estatísticas básicas</li>
                <li><strong>Dados de clique:</strong> Quando alguém acessa um link encurtado</li>
                <li><strong>Localização aproximada:</strong> País e cidade baseados no IP</li>
                <li><strong>Referenciador:</strong> Site de origem dos cliques</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Como Usamos suas Informações</h2>
            <div className="space-y-4 text-gray-700">
              <p>Utilizamos as informações coletadas para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer o serviço de encurtamento de URLs</li>
                <li>Prevenir abuso e spam através de rate limiting</li>
                <li>Gerar estatísticas básicas de uso dos links</li>
                <li>Melhorar a qualidade e segurança do serviço</li>
                <li>Cumprir obrigações legais quando necessário</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compartilhamento de Informações</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quando exigido por lei ou ordem judicial</li>
                <li>Para proteger nossos direitos, propriedade ou segurança</li>
                <li>Com provedores de serviços que nos ajudam a operar o site (hospedagem, análise)</li>
                <li>Em caso de fusão, aquisição ou venda de ativos</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies e Tecnologias Similares</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verificação de segurança (Cloudflare Turnstile)</li>
                <li>Análise de tráfego e uso do site</li>
                <li>Exibição de anúncios relevantes</li>
                <li>Melhorar a experiência do usuário</li>
              </ul>
              <p>
                Você pode desabilitar cookies em seu navegador, mas isso pode afetar 
                a funcionalidade do site.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Retenção de Dados</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Mantemos suas informações pelo tempo necessário para fornecer nossos serviços:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Links encurtados:</strong> Indefinidamente, a menos que solicitada a remoção</li>
                <li><strong>Dados de clique:</strong> Por até 2 anos para análise estatística</li>
                <li><strong>Logs de IP:</strong> Por até 30 dias para segurança</li>
                <li><strong>Cache:</strong> Por períodos curtos para melhorar performance</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Segurança</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <p>
                No entanto, nenhum método de transmissão pela internet é 100% seguro, 
                e não podemos garantir segurança absoluta.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Seus Direitos</h2>
            <div className="space-y-4 text-gray-700">
              <p>Você tem o direito de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Solicitar informações sobre dados que coletamos sobre você</li>
                <li>Solicitar correção de informações incorretas</li>
                <li>Solicitar exclusão de seus dados (quando aplicável)</li>
                <li>Retirar consentimento para processamento de dados</li>
                <li>Apresentar reclamações às autoridades competentes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Serviços de Terceiros</h2>
            <div className="space-y-4 text-gray-700">
              <p>Nosso site utiliza serviços de terceiros que podem coletar informações:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cloudflare:</strong> Para segurança e CDN</li>
                <li><strong>Vercel:</strong> Para hospedagem</li>
                <li><strong>Google Analytics:</strong> Para análise de tráfego</li>
                <li><strong>Provedores de anúncios:</strong> Para monetização</li>
              </ul>
              <p>
                Estes serviços têm suas próprias políticas de privacidade que recomendamos que você leia.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Alterações nesta Política</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos atualizar esta política de privacidade periodicamente. 
                Alterações significativas serão notificadas através do site.
              </p>
              <p>
                O uso continuado do serviço após alterações constitui aceitação da nova política.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contato</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Se você tiver dúvidas sobre esta política de privacidade ou sobre como 
                tratamos seus dados, entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@minlink.com</p>
                <p><strong>Endereço:</strong> [Seu endereço comercial]</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/"
            className="btn-primary inline-flex items-center"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}