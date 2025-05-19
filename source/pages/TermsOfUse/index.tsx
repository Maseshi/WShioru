import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

export default function TermsOfUse() {
  const [content, setContent] = useState<string>("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getContent = async () => {
      try {
        const module = await import(
          `@/assets/documents/${i18n.language}/terms-of-use.md?raw`
        );
        setContent(module.default || module);
      } catch (error) {
        console.error(error);
        setContent(t("documentNotFound", { locate: i18n.language }));
      }
    };
    getContent();
  }, [t, i18n.language]);

  return (
    <article>
      <title>{`${t("termsOfUse")} | Shioru's`}</title>
      <meta name="description" content={t("servicesGoal")} />
      <meta property="og:title" content={`${t("termsOfUse")} | Shioru's`} />
      <meta property="og:description" content={t("servicesGoal")} />
      <meta property="og:url" content="https://shiorus.web.app/terms-of-use" />
      <header className="hero">
        <div className="hero-content text-center">
          <div>
            <div className="py-4 text-center text-5xl font-bold">✅</div>
            <h1 className="text-success text-center text-5xl font-bold">
              {t("termsOfUse")}
            </h1>
            <p>{t("servicesGoal")}</p>
            <time>
              {t("lastUpdatedAt", {
                date: new Date("10/5/2025").toLocaleDateString(),
              })}
            </time>
          </div>
        </div>
      </header>
      <section className="prose lg:prose-xl container mx-auto px-4 py-8">
        <Markdown>{content}</Markdown>
      </section>
    </article>
  );
}
