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
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "termsOfService" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

function TableOfContents({ t }: { t: any }) {
  const sections = [
    {
      id: "aceitacao-termos",
      title: t("sections.acceptance.title"),
      icon: BookOpenIcon,
    },
    {
      id: "descricao-servico",
      title: t("sections.description.title"),
      icon: GlobeIcon,
    },
    { id: "uso-aceitavel", title: t("sections.usage.title"), icon: UserIcon },
    {
      id: "limitacoes-servico",
      title: t("sections.limitations.title"),
      icon: AlertTriangleIcon,
    },
    {
      id: "propriedade-intelectual",
      title: t("sections.intellectualProperty.title"),
      icon: CopyrightIcon,
    },
    { id: "privacidade", title: t("sections.privacy.title"), icon: ShieldIcon },
    {
      id: "isencao-garantias",
      title: t("sections.disclaimer.title"),
      icon: AlertTriangleIcon,
    },
    {
      id: "limitacao-responsabilidade",
      title: t("sections.liability.title"),
      icon: ScaleIcon,
    },
    {
      id: "indenizacao",
      title: t("sections.indemnification.title"),
      icon: ScaleIcon,
    },
    {
      id: "modificacoes-servico",
      title: t("sections.modifications.title"),
      icon: FileTextIcon,
    },
    {
      id: "encerramento",
      title: t("sections.termination.title"),
      icon: BanIcon,
    },
    {
      id: "lei-aplicavel",
      title: t("sections.governingLaw.title"),
      icon: ScaleIcon,
    },
    {
      id: "alteracoes-termos",
      title: t("sections.changes.title"),
      icon: FileTextIcon,
    },
    { id: "contato", title: t("sections.contact.title"), icon: MailIcon },
  ];

  return (
    <div className="card mb-8">
      <h2 className="text-xl font-semibold text-primary-500 mb-4 flex items-center gap-2">
        <FileTextIcon className="h-5 w-5" />
        {t("toc")}
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

export default async function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  
  const t = await getTranslations({ locale, namespace: 'termsOfService' });
  const tPrivacy = await getTranslations({ locale, namespace: 'privacyPolicy' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
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
            {t("pageTitle")}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            {t("pageDescription")}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <span className="text-sm text-gray-400">{t("lastUpdated")}:</span>
            <span className="text-sm font-medium text-primary-500">
              {new Date().toLocaleDateString(locale)}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TableOfContents t={t} />
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
                    {t("sections.acceptance.title")}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t("sections.acceptance.content1")}</p>
                  <p>{t("sections.acceptance.content2")}</p>
                </div>
              </section>

              <section id="descricao-servico" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <GlobeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t("sections.description.title")}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t("sections.description.content1")}</p>
                  <p>{t("sections.description.content2")}</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t("sections.description.list1")}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t("sections.description.list2")}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t("sections.description.list3")}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t("sections.description.list4")}</div>
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
                    {t('sections.usage.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.prohibitedUse.content')}</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.prohibitedUse.items.illegal')}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.prohibitedUse.items.copyright')}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.prohibitedUse.items.phishing')}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.prohibitedUse.items.abuse')}</div>
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
                    {t('sections.limitations.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.limitations.content')}</p>
                </div>
              </section>

              <section id="propriedade-intelectual" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <CopyrightIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.intellectualProperty.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.intellectualProperty.content')}</p>
                </div>
              </section>

              <section id="privacidade" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ShieldIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.privacy.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    {t('sections.privacy.content')}
                  </p>
                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <Link
                      href={`/${locale}/privacy-policy`}
                      className="text-primary-500 hover:text-primary-400 transition-colors inline-flex items-center gap-2"
                    >
                      <ShieldIcon className="h-4 w-4" />
                      {tPrivacy('title')}
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
                    {t('sections.disclaimer.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.disclaimer.content')}</p>
                </div>
              </section>

              <section id="limitacao-responsabilidade" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ScaleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.liability.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.liability.content')}</p>
                </div>
              </section>

              <section id="indenizacao" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ScaleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.indemnification.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.indemnification.content')}</p>
                </div>
              </section>

              <section id="modificacoes-servico" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.modifications.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.modifications.content')}</p>
                </div>
              </section>

              <section id="encerramento" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <BanIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.termination.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.termination.content')}</p>
                </div>
              </section>

              <section id="lei-aplicavel" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ScaleIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.governingLaw.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.governingLaw.content')}</p>
                </div>
              </section>

              <section id="alteracoes-termos" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.changes.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.changes.content')}</p>
                </div>
              </section>

              <section id="contato" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <MailIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.contact.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    {t('sections.contact.content')}
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
                href={`/${locale}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                {tNav('home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
