import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Main from "@/layouts/Default/Main";
import DashboardNav from "@/layouts/Dashboard/Navbar";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import DashboardFooter from "@/layouts/Dashboard/Footer";

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, guilds, loading, error, login, logout, retry } = useAuth();

  if (loading) {
    return (
      <>
        <DashboardNav />
        <Main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </Main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <title>{`${t("dashboard.title", "Dashboard")} | Shioru's`}</title>
        <DashboardNav />
        <Main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <ExclamationTriangleIcon className="text-warning mx-auto mb-4 size-12" />
            <h2 className="mb-2 text-xl font-bold">
              {t("dashboard.serviceUnavailable", "Service Unavailable")}
            </h2>
            <p className="text-base-content/50 mb-6">
              {t(
                "dashboard.serviceUnavailableDesc",
                "Unable to connect to the server. Please try again later.",
              )}
            </p>
            <button className="btn btn-primary" onClick={retry}>
              {t("dashboard.retry", "Try Again")}
            </button>
          </div>
        </Main>
      </>
    );
  }

  if (!user) {
    login();
    return (
      <>
        <title>{`${t("dashboard.title", "Dashboard")} | Shioru's`}</title>
        <DashboardNav />
        <Main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </Main>
      </>
    );
  }

  return (
    <>
      <title>{`${t("dashboard.title", "Dashboard")} | Shioru's`}</title>
      <DashboardNav />
      <Main className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-clip">
        <section className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="animate-fade-in-up mb-10 flex items-center gap-4">
            {user.avatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=64`}
                alt={user.username}
                className="ring-primary/20 ring-offset-base-100 size-14 rounded-full ring-2 ring-offset-2"
              />
            ) : (
              <div className="bg-primary/20 flex size-14 items-center justify-center rounded-full text-xl font-bold">
                {user.username.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-base-content/50 text-sm">
                {t("dashboard.welcomeBack", "Welcome back")}
              </p>
              <h1 className="text-2xl font-bold tracking-tight">
                {user.globalName ?? user.username}
              </h1>
            </div>
          </div>

          {/* Section title */}
          <div className="animate-fade-in-up mb-6 flex items-end justify-between" style={{ animationDelay: "0.1s" }}>
            <div>
              <h2 className="text-lg font-semibold">
                {t("dashboard.selectServer", "Select a server")}
              </h2>
              <p className="text-base-content/50 mt-1 text-sm">
                {t(
                  "dashboard.selectServerDesc",
                  "Choose a server you want to manage.",
                )}
              </p>
            </div>
            <span className="badge badge-ghost">
              {guilds.length} {t("dashboard.servers", "servers")}
            </span>
          </div>

          {/* Guild grid */}
          {guilds.length === 0 ? (
            <div className="border-base-content/5 bg-base-200/50 rounded-2xl border p-12 text-center">
              <ServerIcon className="text-base-content/20 mx-auto mb-4 size-12" />
              <p className="text-base-content/50">
                {t(
                  "dashboard.noGuilds",
                  "No servers found. Make sure the bot is in your server.",
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guilds.map((guild, index) => (
                <Link
                  key={guild.id}
                  to={`/dashboard/${guild.id}`}
                  className="animate-fade-in-up group border-base-content/5 bg-base-200/50 hover:border-primary/20 hover:bg-base-200 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:shadow-xl"
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    {guild.icon ? (
                      <img
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=64`}
                        alt={guild.name}
                        className="size-12 rounded-xl"
                      />
                    ) : (
                      <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl text-lg font-bold">
                        {guild.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold">{guild.name}</h3>
                      <p className="text-base-content/40 text-xs">
                        ID: {guild.id}
                      </p>
                    </div>
                    <ArrowRightIcon className="text-base-content/20 group-hover:text-primary size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Animated decorative background */}
        <div className="animate-drift bg-secondary/10 pointer-events-none absolute -top-20 right-10 size-96 -z-10 rounded-full blur-3xl" />
        <div className="animate-drift bg-primary/10 pointer-events-none absolute bottom-10 -left-20 size-80 -z-10 rounded-full blur-3xl" style={{ animationDelay: "-7s" }} />
        <div className="animate-drift bg-accent/5 pointer-events-none absolute top-1/2 left-1/2 size-64 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ animationDelay: "-14s" }} />
        <DashboardFooter />
      </Main>

      {/* Logout confirmation modal */}
      <dialog id="logout-modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {t("dashboard.logoutConfirmTitle", "Logout")}
          </h3>
          <p className="text-base-content/60 py-4">
            {t(
              "dashboard.logoutConfirmDesc",
              "Are you sure you want to logout?",
            )}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">
                {t("dashboard.cancel", "Cancel")}
              </button>
            </form>
            <button
              className="btn btn-error"
              onClick={() => {
                const modal = document.getElementById("logout-modal") as HTMLDialogElement;
                modal?.close();
                logout();
              }}
            >
              {t("dashboard.logout", "Logout")}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
