import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import { DiscordIcon } from "@/components/Icons/Discord";

import { useAnchorScroller } from "@/hooks/useAnchorScroller";

export default function Footer() {
  useAnchorScroller();

  const { t } = useTranslation();

  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <div className="flex items-center gap-4">
            <img
              className="size-12 rounded-full"
              src="/android-chrome-512x512.png"
              alt={t("shioruAvatarAlternate")}
              width="48px"
              height="48px"
            />
            <span className="text-xl font-bold">Shioru's</span>
          </div>
          <p className="max-w-md">{t("aboutShioruWebsite")}</p>
          <Link className="btn btn-soft btn-primary" to="/invite">
            <DiscordIcon className="size-5 fill-current" /> {t("addToDiscord")}
          </Link>
        </aside>
        <nav>
          <h6 className="footer-title">{t("quickLinks")}</h6>
          <Link className="link link-hover" to="/#features">
            {t("features")}
          </Link>
          <Link className="link link-hover" to="/#stats">
            {t("stats")}
          </Link>
          <Link className="link link-hover" to="/#commands">
            {t("commands")}
          </Link>
          <Link className="link link-hover" to="/#chat">
            {t("chat")}
          </Link>
          <Link className="link link-hover" to="/#status">
            {t("status")}
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">{t("legal")}</h6>
          <Link className="link link-hover" to="/terms-of-use">
            {t("termsOfUse")}
          </Link>
          <Link className="link link-hover" to="/privacy-policy">
            {t("privacyPolicy")}
          </Link>
          <Link className="link link-hover" to="/cookie-policy">
            {t("cookiePolicy")}
          </Link>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            <Trans
              i18nKey="copyright"
              values={{ year: new Date().getFullYear(), name: "Maseshi" }}
              components={{
                a: (
                  <a
                    className="link link-primary"
                    href="https://maseshi.web.app"
                    aria-label="Maseshi"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}
              t={t}
            />
          </p>
        </aside>
      </footer>
    </>
  );
}
