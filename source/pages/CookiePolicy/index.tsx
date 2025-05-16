import Markdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function CookiePolicy() {
  const [content, setContent] = useState<string>("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getContent = async () => {
      try {
        const module = await import(
          `@/assets/documents/${i18n.language}/cookie-policy.md?raw`
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
      <title>Cookie Policy | Shioru's</title>
      <meta
        name="description"
        content="Learn more about the cookies we collect from Shioru."
      />
      <meta property="og:title" content="Cookie Policy | Shioru's" />
      <header className="hero">
        <div className="hero-content text-center">
          <div>
            <div className="py-4 text-center text-5xl font-bold">🍪</div>
            <h1 className="text-center text-5xl font-bold text-yellow-800">
              {t("cookiePolicy")}
            </h1>
            <p>{t("learnMoreAboutCookiesPolicy")}</p>
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
