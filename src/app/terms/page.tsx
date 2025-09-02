import Link from 'next/link';

export const metadata = {
  title: 'Termos de Uso | MinLink',
  description: 'Termos de uso do MinLink - Regras e condições para uso do serviço.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
        
        <p className="text-gray-600 mb-8">
          <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Ao usar o MinLink, você concorda em cumprir estes termos de uso. 
                Se você não concordar com qualquer parte destes termos, não use nosso serviço.
              </p>
              <p>
                Estes termos se aplicam a todos os usuários do serviço, incluindo visitantes, 
                usuários registrados e outros que acessam ou usam o serviço.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descrição do Serviço</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O MinLink é um serviço gratuito de encurtamento de URLs que permite:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encurtar URLs longas em links mais curtos e gerenciáveis</li>
                <li>Visualizar estatísticas básicas de cliques</li>
                <li>Acessar uma página de prévia antes do redirecionamento</li>
                <li>Usar o serviço sem necessidade de registro</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Uso Aceitável</h2>
            <div className="space-y-4 text-gray-700">
              <p>Você concorda em NÃO usar o MinLink para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encurtar URLs que contenham conteúdo ilegal, prejudicial ou ofensivo</li>
                <li>Distribuir malware, vírus ou qualquer código malicioso</li>
                <li>Realizar atividades de phishing ou fraude</li>
                <li>Violar direitos autorais ou propriedade intelectual</li>
                <li>Enviar spam ou conteúdo não solicitado</li>
                <li>Contornar medidas de segurança ou rate limiting</li>
                <li>Usar o serviço para atividades comerciais em larga escala sem autorização</li>
                <li>Interferir no funcionamento normal do serviço</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitações do Serviço</h2>
            <div className="space-y-4 text-gray-700">
              <p>O MinLink possui as seguintes limitações:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Rate Limiting:</strong> Limite de criação de links por IP</li>
                <li><strong>Validação de URLs:</strong> Apenas URLs HTTP/HTTPS são aceitas</li>
                <li><strong>Bloqueio de IPs locais:</strong> URLs localhost e IPs privados são bloqueados</li>
                <li><strong>Verificação de segurança:</strong> Captcha obrigatório para criação de links</li>
                <li><strong>Disponibilidade:</strong> O serviço pode ficar indisponível temporariamente</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propriedade Intelectual</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O MinLink e todo seu conteúdo, recursos e funcionalidades são propriedade 
                exclusiva dos proprietários do serviço e são protegidos por leis de direitos autorais, 
                marcas registradas e outras leis de propriedade intelectual.
              </p>
              <p>
                Você não pode reproduzir, distribuir, modificar ou criar trabalhos derivados 
                sem autorização expressa por escrito.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacidade e Dados</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Sua privacidade é importante para nós. Nossa coleta e uso de informações 
                pessoais é regida por nossa Política de Privacidade, que faz parte destes termos.
              </p>
              <p>
                Ao usar o serviço, você concorda com a coleta e uso de informações 
                conforme descrito na Política de Privacidade.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Isenção de Responsabilidade</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O MinLink é fornecido "como está" e "conforme disponível" sem garantias 
                de qualquer tipo, expressas ou implícitas.
              </p>
              <p>Não garantimos que:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>O serviço atenderá às suas necessidades específicas</li>
                <li>O serviço será ininterrupto, oportuno, seguro ou livre de erros</li>
                <li>Os resultados obtidos do uso do serviço serão precisos ou confiáveis</li>
                <li>Defeitos no serviço serão corrigidos</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitação de Responsabilidade</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, 
                incidentais, especiais, consequenciais ou punitivos, incluindo, mas não limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Perda de lucros, dados ou uso</li>
                <li>Interrupção de negócios</li>
                <li>Danos resultantes do uso ou incapacidade de usar o serviço</li>
                <li>Danos causados por conteúdo de terceiros acessado através de nossos links</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indenização</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Você concorda em indenizar e isentar o MinLink de qualquer reclamação, 
                dano, obrigação, perda, responsabilidade, custo ou dívida, e despesas 
                (incluindo honorários advocatícios) decorrentes de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Seu uso do serviço</li>
                <li>Violação destes termos</li>
                <li>Violação de direitos de terceiros</li>
                <li>Qualquer conteúdo que você enviar através do serviço</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modificações do Serviço</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Reservamos o direito de modificar ou descontinuar o serviço (ou qualquer parte dele) 
                temporária ou permanentemente, com ou sem aviso prévio.
              </p>
              <p>
                Não seremos responsáveis por qualquer modificação, suspensão ou 
                descontinuação do serviço.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Rescisão</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos encerrar ou suspender seu acesso ao serviço imediatamente, 
                sem aviso prévio, por qualquer motivo, incluindo violação destes termos.
              </p>
              <p>
                Após a rescisão, seu direito de usar o serviço cessará imediatamente.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Lei Aplicável</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Estes termos são regidos pelas leis do Brasil, sem consideração aos 
                princípios de conflito de leis.
              </p>
              <p>
                Qualquer disputa será resolvida nos tribunais competentes do Brasil.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Alterações nos Termos</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Reservamos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão notificadas através do site.
              </p>
              <p>
                O uso continuado do serviço após alterações constitui aceitação dos novos termos.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contato</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> legal@minlink.com</p>
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