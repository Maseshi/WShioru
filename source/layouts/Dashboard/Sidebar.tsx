import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import {
  Cog6ToothIcon,
  MusicalNoteIcon,
  BellIcon,
  ShieldCheckIcon,
  LanguageIcon,
  ArrowLeftIcon,
  TrophyIcon,
  ShieldExclamationIcon,
  ChatBubbleLeftRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  drawerId: string;
}

export default function Sidebar({ drawerId }: SidebarProps) {
  const { t } = useTranslation();
  const { guilds } = useAuth();
  const { guildId } = useParams();
  const navigate = useNavigate();

  const guild = guilds.find((g) => g.id === guildId);

  const navItems = [
    {
      to: `/dashboard/${guildId}`,
      icon: Cog6ToothIcon,
      label: t("dashboard.overview", "Overview"),
      end: true,
    },
    {
      to: `/dashboard/${guildId}/language`,
      icon: LanguageIcon,
      label: t("dashboard.language", "Language"),
    },
    {
      to: `/dashboard/${guildId}/djs`,
      icon: MusicalNoteIcon,
      label: t("dashboard.djs", "DJ Mode"),
    },
    {
      to: `/dashboard/${guildId}/notification`,
      icon: BellIcon,
      label: t("dashboard.notification", "Notifications"),
    },
    {
      to: `/dashboard/${guildId}/antibot`,
      icon: ShieldCheckIcon,
      label: t("dashboard.antibot", "Anti-Bot"),
    },
    {
      to: `/dashboard/${guildId}/leaderboard`,
      icon: TrophyIcon,
      label: t("dashboard.leaderboard", "Leaderboard"),
    },
    {
      to: `/dashboard/${guildId}/captcha`,
      icon: ShieldExclamationIcon,
      label: t("dashboard.captcha", "Captcha"),
    },
    {
      to: `/dashboard/${guildId}/chat`,
      icon: ChatBubbleLeftRightIcon,
      label: t("dashboard.chat", "Chat"),
    },
  ];

  return (
    <div className="bg-base-200/80 is-drawer-close:w-14 is-drawer-open:w-full flex min-h-full flex-col items-start">
      {/* Navigation */}
      <ul className="menu w-full grow">
        {/* Guild switcher */}
        <li className="dropdown mb-6">
          <div
            tabIndex={0}
            role="button"
            className="hover:bg-base-content/5 flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-colors"
          >
            {guild?.icon ? (
              <img
                src={`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.webp?size=64`}
                alt={guild.name}
                className="is-drawer-close:size-6 size-10 rounded-xl"
              />
            ) : (
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl font-bold">
                {guild?.name?.charAt(0) ?? "?"}
              </div>
            )}
            <div className="flex-1">
              <p className="is-drawer-close:hidden truncate text-sm font-semibold">
                {guild?.name ?? "Server"}
              </p>
              <p className="text-base-content/40 is-drawer-close:hidden text-xs">
                ID: {guild?.id ?? ""}
              </p>
            </div>
            <ChevronUpDownIcon className="is-drawer-close:hidden size-5" />
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu border-base-content/5 bg-base-100/50 z-50 mt-2 ml-0 max-h-60 w-full overflow-y-auto rounded-xl border p-2 shadow-lg backdrop-blur"
          >
            {guilds.map((g) => (
              <li key={g.id}>
                <button
                  className={`flex items-center gap-2 ${g.id === guildId ? "active" : ""}`}
                  onClick={() => {
                    navigate(`/dashboard/${g.id}`);
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  {g.icon ? (
                    <img
                      src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.webp?size=32`}
                      alt={g.name}
                      className="size-6 rounded-lg"
                    />
                  ) : (
                    <div className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-lg text-xs font-bold">
                      {g.name.charAt(0)}
                    </div>
                  )}
                  <span className="truncate text-sm">{g.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </li>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl px-3 py-2.5",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-base-content/70 hover:bg-base-content/5 hover:text-base-content",
                ].join(" ")
              }
              data-tip={item.label}
            >
              <item.icon className="size-4" />
              <span className="is-drawer-close:hidden">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="menu border-base-content/5 mt-4 w-full border-t pt-4">
        <li>
          {/* Collapse button */}
          <label
            className="rounded-xl px-3 py-2"
            htmlFor={drawerId}
            aria-label="open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
            <span className="is-drawer-close:hidden">
              {t("dashboard.collapse", "Collapse")}
            </span>
          </label>
        </li>

        <li>
          {/* Back button */}
          <NavLink className="rounded-xl px-3 py-2.5" to="/dashboard">
            <ArrowLeftIcon className="size-4" />
            <span className="is-drawer-close:hidden">
              {t("dashboard.backToGuilds", "Back to servers")}
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
