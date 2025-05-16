import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SunIcon, MoonIcon, LanguageIcon } from "@heroicons/react/24/outline";

import HeaderMenu from "./HeaderMenu";
import HeaderFavicon from "./HeaderFavicon";
import { DiscordIcon } from "@/components/Icons/Discord";

import { useIsDarkMode } from "@/hooks/useIsDarkMode";

export default function Header() {
  const isDarkMode = useIsDarkMode();

  const { t, i18n } = useTranslation();

  return (
    <header className="bg-base-100/80 sticky top-0 z-30 backdrop-blur-sm">
      <nav className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <HeaderMenu
              tabIndex={0}
              className="menu dropdown-content menu-sm rounded-box bg-base-200 z-[1] mt-3 w-52 p-2 shadow"
            />
          </div>
          <HeaderFavicon
            className="btn btn-ghost text-primary hidden text-xl lg:inline-flex"
            to="/"
          />
        </div>
        <div className="navbar-center">
          <HeaderMenu className="menu menu-horizontal hidden px-1 lg:flex" />
          <HeaderFavicon
            className="btn btn-ghost text-primary text-xl lg:hidden"
            to="/"
          />
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-circle btn-ghost"
            onClick={() =>
              i18n.changeLanguage(i18n.language === "th" ? "en-US" : "th")
            }
            aria-label={t("toggleLanguage")}
          >
            <LanguageIcon className="size-5" />
          </button>
          <label className="btn btn-circle btn-ghost swap swap-rotate">
            <input
              type="checkbox"
              aria-label={t("toggleTheme")}
              className="theme-controller"
              value={isDarkMode ? "light" : "dark"}
            />
            <SunIcon className={`swap-${isDarkMode ? "on" : "off"} size-5`} />
            <MoonIcon className={`swap-${isDarkMode ? "off" : "on"} size-5`} />
          </label>
          <Link
            className="btn btn-soft btn-primary hidden lg:inline-flex"
            to="/invite"
          >
            <DiscordIcon className="size-5 fill-current" />
            {t("addToDiscord")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
