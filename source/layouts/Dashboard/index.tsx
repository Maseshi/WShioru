import { Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import DashboardNavbar from "@/layouts/Dashboard/Navbar";
import Sidebar from "@/layouts/Dashboard/Sidebar";
import DashboardFooter from "@/layouts/Dashboard/Footer";
import {
  Bars3Icon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import NoMatch from "@/pages/NoMatch";
import Header from "@/layouts/Default/Header";
import Footer from "@/layouts/Default/Footer";

const DRAWER_ID = "dashboard-drawer";

export default function DashboardLayout() {
  const { t } = useTranslation();
  const { user, guilds, loading, error, logout, retry } = useAuth();
  const { guildId } = useParams();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <DashboardNavbar />
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
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
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <NoMatch />
        <Footer />
      </>
    );
  }

  const guild = guilds.find((g) => g.id === guildId);

  return (
    <>
      <DashboardNavbar />
      <div className="drawer lg:drawer-open">
        <input
          id={DRAWER_ID}
          type="checkbox"
          className="drawer-toggle"
          defaultChecked
        />

        <div className="drawer-content flex h-[calc(100vh-4rem)] flex-col overflow-y-auto">
          <div className="flex-1 p-6">
            {/* Mobile header */}
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <label
                htmlFor={DRAWER_ID}
                className="btn btn-square btn-ghost btn-sm"
              >
                <Bars3Icon className="size-5" />
              </label>
              <div className="flex items-center gap-2">
                {guild?.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.webp?size=64`}
                    alt={guild?.name}
                    className="size-7 rounded-lg"
                  />
                ) : (
                  <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-lg text-xs font-bold">
                    {guild?.name?.charAt(0) ?? "?"}
                  </div>
                )}
                <span className="text-sm font-semibold">
                  {guild?.name ?? "Server"}
                </span>
              </div>
            </div>
            {/* Page Content */}
            <div className="container mx-auto">
              <Outlet />
            </div>
          </div>
          <DashboardFooter />
        </div>

        <aside className="drawer-side is-drawer-close:overflow-visible h-[calc(100vh-4rem)] overflow-y-auto">
          <label
            htmlFor={DRAWER_ID}
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <Sidebar drawerId={DRAWER_ID} />
        </aside>
      </div>

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
