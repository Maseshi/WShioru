import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DashboardFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-base-content/40">
        <span>© {year} Maseshi. {t("dashboard.allRightsReserved", "All rights reserved.")}</span>
        <div className="flex gap-3">
          <Link to="/terms-of-use" className="hover:text-base-content transition-colors">
            {t("termsOfUse", "Terms of Use")}
          </Link>
          <Link to="/privacy-policy" className="hover:text-base-content transition-colors">
            {t("privacyPolicy", "Privacy Policy")}
          </Link>
          <Link to="/cookie-policy" className="hover:text-base-content transition-colors">
            {t("cookiePolicy", "Cookie Policy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
