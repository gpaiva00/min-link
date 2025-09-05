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
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

function TableOfContents({ t }: { t: (key: string) => string }) {
  const sections = [
    { id: "introduction", title: t("sections.introduction.title"), icon: FileTextIcon },
    { id: "data-collection", title: t("sections.dataCollection.title"), icon: EyeIcon },
    { id: "data-usage", title: t("sections.dataUsage.title"), icon: UserIcon },
    { id: "data-sharing", title: t("sections.dataSharing.title"), icon: GlobeIcon },
    { id: "cookies", title: t("sections.cookies.title"), icon: FileTextIcon },
    { id: "security", title: t("sections.security.title"), icon: ShieldIcon },
    { id: "contact", title: t("sections.contact.title"), icon: MailIcon },
  ];

  return (
    <div className="card mb-8">
      <h2 className="text-xl font-semibold text-primary-500 mb-4 flex items-center gap-2">
        <FileTextIcon className="h-5 w-5" />
        {t('toc')}
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

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
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
            {t('title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            {t('description')}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <span className="text-sm text-gray-400">{t('lastUpdated')}</span>
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
              {/* Introduction */}
              <section id="introduction" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.introduction.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.introduction.content')}</p>
                </div>
              </section>

              {/* Data Collection */}
              <section id="data-collection" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <EyeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.dataCollection.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.dataCollection.content')}</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.dataCollection.items.urls')}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.dataCollection.items.analytics')}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.dataCollection.items.technical')}</div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Data Usage */}
              <section id="data-usage" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.dataUsage.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.dataUsage.content')}</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.dataUsage.items.service')}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.dataUsage.items.analytics')}</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>{t('sections.dataUsage.items.security')}</div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <GlobeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.dataSharing.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.dataSharing.content')}</p>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.cookies.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.cookies.content')}</p>
                </div>
              </section>

              {/* Security */}
              <section id="security" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <ShieldIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.security.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.security.content')}</p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 border-zinc-800 border rounded-full flex items-center justify-center">
                    <MailIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-500">
                    {t('sections.contact.title')}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>{t('sections.contact.content')}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
