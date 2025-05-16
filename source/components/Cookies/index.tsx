import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { CookieIcon } from "@/components/Icons/Cookie";

import { useCookie } from "@/hooks/useCookie";

export default function Cookies() {
  const { t } = useTranslation();
  const { get, set } = useCookie();

  const [accept, setAccept] = useState(
    get("cookies") === "allow" ? true : false,
  );

  const handleDenyCookiesPolicy = () => {
    set("cookies", "deny", { expires: 60 });
    setAccept(false);
  };
  const handleAllowCookiesPolicy = () => {
    set("cookies", "allow", { expires: 60 });
    setAccept(true);
  };

  return (
    <div
      role="alert"
      className={`alert alert-vertical sm:alert-horizontal bg-base-100/80 fixed inset-x-4 bottom-4 z-30 mx-auto max-w-md rounded-xl shadow-md backdrop-blur-sm transition-all ease-in-out ${accept ? "hidden" : ""}`}
    >
      <CookieIcon className="text-primary size-6" />
      <div>
        <h3 className="font-bold">{t("thisSiteUseCookie")}</h3>
        <p className="text-xs">
          <Trans i18nKey="weUseThirdPartyCookie" t={t}>
            We use third-party cookies to personalize content, ads, and analyze
            site traffic.
            <a
              className="link link-secondary"
              href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=th"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </Trans>
        </p>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-sm" onClick={handleDenyCookiesPolicy}>
          {t("deny")}
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleAllowCookiesPolicy}
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
