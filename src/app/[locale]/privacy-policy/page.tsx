import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPolicy");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t("title")}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              {t("lastUpdated")}: 23 de janeiro de 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.introduction.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.introduction.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.dataCollection.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("sections.dataCollection.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t("sections.dataCollection.items.urls")}</li>
                <li>{t("sections.dataCollection.items.analytics")}</li>
                <li>{t("sections.dataCollection.items.technical")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.dataUsage.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("sections.dataUsage.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t("sections.dataUsage.items.service")}</li>
                <li>{t("sections.dataUsage.items.analytics")}</li>
                <li>{t("sections.dataUsage.items.security")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.dataSharing.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.dataSharing.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.cookies.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.cookies.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.security.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.security.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.contact.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}