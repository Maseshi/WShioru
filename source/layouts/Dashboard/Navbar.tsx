import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowRightStartOnRectangleIcon,
  LanguageIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

export default function DashboardNav() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isDarkMode = useIsDarkMode();

  return (
    <header className="bg-base-200/80 sticky top-0 z-30 backdrop-blur-sm">
      <nav className="navbar">
        <div className="flex-1 space-x-2">
          {/* Logo */}
          <Link to="/dashboard" className="btn btn-ghost">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img
                  src="/assets/images/shioru.webp"
                  alt={t("shioruAvatarAlternate", "Shioru")}
                  width="32"
                  height="32"
                />
              </div>
            </div>
            <span className="text-sm font-semibold">Shioru's</span>
          </Link>
          <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium">
            {t("dashboard.title", "Dashboard")}
          </span>
        </div>

        <div className="flex-none">
          {/* User */}
          {user && (
            <div className="flex items-center">
              <div className="hidden items-center gap-2 mr-2 sm:flex">
                {user.avatar ? (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=32`}
                    alt={user.username}
                    className="size-7 rounded-full"
                  />
                ) : (
                  <div className="bg-primary/10 flex size-7 items-center justify-center rounded-full text-xs font-bold">
                    {user.username.charAt(0)}
                  </div>
                )}
                <span className="text-sm">
                  {user.globalName ?? user.username}
                </span>
              </div>
              <button
                className="btn btn-ghost btn-square btn-sm text-base-content/50"
                onClick={() =>
                  i18n.changeLanguage(i18n.language === "th" ? "en-US" : "th")
                }
                title={t("toggleLanguage", "Toggle language")}
              >
                <LanguageIcon className="size-4" />
              </button>
              <label className="btn btn-ghost btn-square btn-sm text-base-content/50 swap swap-rotate">
                <input
                  type="checkbox"
                  aria-label={t("toggleTheme", "Toggle theme")}
                  className="theme-controller"
                  value={isDarkMode ? "light" : "dark"}
                />
                <SunIcon
                  className={`swap-${isDarkMode ? "on" : "off"} size-4`}
                />
                <MoonIcon
                  className={`swap-${isDarkMode ? "off" : "on"} size-4`}
                />
              </label>
              <button
                onClick={() => {
                  const modal = document.getElementById(
                    "logout-modal",
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
                className="btn btn-ghost btn-sm text-base-content/50 hover:text-error gap-1.5"
                title={t("dashboard.logout", "Logout")}
              >
                <ArrowRightStartOnRectangleIcon className="size-4" />
                <span className="hidden sm:inline">
                  {t("dashboard.logout", "Logout")}
                </span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
