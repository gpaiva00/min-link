import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "termsOfService" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function TermsOfServicePage() {
  const t = useTranslations("termsOfService");

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
                {t("sections.acceptance.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.acceptance.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.serviceDescription.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.serviceDescription.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.userResponsibilities.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("sections.userResponsibilities.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t("sections.userResponsibilities.items.legal")}</li>
                <li>{t("sections.userResponsibilities.items.harmful")}</li>
                <li>{t("sections.userResponsibilities.items.spam")}</li>
                <li>{t("sections.userResponsibilities.items.malware")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.prohibitedUse.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("sections.prohibitedUse.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t("sections.prohibitedUse.items.illegal")}</li>
                <li>{t("sections.prohibitedUse.items.copyright")}</li>
                <li>{t("sections.prohibitedUse.items.phishing")}</li>
                <li>{t("sections.prohibitedUse.items.abuse")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.serviceAvailability.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.serviceAvailability.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.limitation.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.limitation.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t("sections.modifications.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("sections.modifications.content")}
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