import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

export default function PrivacyPolicy() {
  const [content, setContent] = useState<string>("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getContent = async () => {
      try {
        const module = await import(
          `@/assets/documents/${i18n.language}/privacy-policy.md?raw`
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
      <title>Privacy Policy | Shioru's</title>
      <meta
        name="description"
        content="The information we collect includes the retention of Shioru user's information."
      />
      <meta property="og:title" content="Privacy Policy | Shioru's" />
      <meta
        property="og:description"
        content="The information we collect includes the retention of Shioru user's information."
      />
      <header className="hero">
        <div className="hero-content text-center">
          <div>
            <div className="py-4 text-center text-5xl font-bold">🛡️</div>
            <h1 className="text-primary text-center text-5xl font-bold">
              {t("privacyPolicy")}
            </h1>
            <p>{t("weCareAboutYourPrivacy")}</p>
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
