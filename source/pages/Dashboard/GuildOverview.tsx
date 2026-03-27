import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useAuth } from "@/contexts/AuthContext";
import {
  LanguageIcon,
  MusicalNoteIcon,
  BellIcon,
  ShieldCheckIcon,
  TrophyIcon,
  ShieldExclamationIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  UsersIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface GuildInfo {
  name: string;
  memberCount: number;
  joinedAt: string;
  createdAt: string;
  preferredLocale: string;
  verified: boolean;
  description: string;
}

export default function GuildOverview() {
  const { t } = useTranslation();
  const { guildId } = useParams();
  const { guilds } = useAuth();
  const [guildInfo, setGuildInfo] = useState<GuildInfo | null>(null);

  useEffect(() => {
    const fetchGuildInfo = async () => {
      const database = getDatabase();
      const guildRef = ref(database, `guilds/${guildId}`);
      const snapshot = await get(guildRef);
      if (snapshot.exists()) {
        setGuildInfo(snapshot.val());
      }
    };
    fetchGuildInfo();
  }, [guildId]);

  const guild = guilds.find((g) => g.id === guildId);

  const cards = [
    {
      to: `/dashboard/${guildId}/language`,
      icon: LanguageIcon,
      title: t("dashboard.language", "Language"),
      desc: t(
        "dashboard.languageDesc",
        "Set the bot's language for this server."
      ),
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      to: `/dashboard/${guildId}/djs`,
      icon: MusicalNoteIcon,
      title: t("dashboard.djs", "DJ Mode"),
      desc: t("dashboard.djsDesc", "Control who can manage music playback."),
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      to: `/dashboard/${guildId}/notification`,
      icon: BellIcon,
      title: t("dashboard.notification", "Notifications"),
      desc: t(
        "dashboard.notificationDesc",
        "Configure event notifications."
      ),
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      to: `/dashboard/${guildId}/antibot`,
      icon: ShieldCheckIcon,
      title: t("dashboard.antibot", "Anti-Bot"),
      desc: t(
        "dashboard.antibotDesc",
        "Protect your server from unwanted bots."
      ),
      color: "text-red-500 bg-red-500/10",
    },
    {
      to: `/dashboard/${guildId}/leaderboard`,
      icon: TrophyIcon,
      title: t("dashboard.leaderboard", "Leaderboard"),
      desc: t(
        "dashboard.leaderboardDesc",
        "View the top members by experience."
      ),
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      to: `/dashboard/${guildId}/captcha`,
      icon: ShieldExclamationIcon,
      title: t("dashboard.captcha", "Captcha"),
      desc: t(
        "dashboard.captchaDesc",
        "Verify new members with captcha."
      ),
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      to: `/dashboard/${guildId}/chat`,
      icon: ChatBubbleLeftRightIcon,
      title: t("dashboard.chat", "Chat"),
      desc: t(
        "dashboard.chatDesc2",
        "Manage custom conversations and scripts."
      ),
      color: "text-cyan-500 bg-cyan-500/10",
    },
  ];

  return (
    <>
      <title>
        {`${guild?.name ?? "Server"} - ${t("dashboard.title", "Dashboard")} | Shioru's`}
      </title>

      {/* Welcome banner */}
      <div className={`relative mb-8 overflow-hidden rounded-2xl p-8 ${guild?.icon ? "bg-base-200" : "bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10"}`}>
        {/* Guild icon as blurred color background */}
        {guild?.icon && (
          <>
            <img
              src={`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.webp?size=256`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20 blur-3xl saturate-150"
            />
            <img
              src={`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.webp?size=256`}
              alt=""
              className="absolute -right-10 -bottom-10 size-48 rounded-full object-cover opacity-15 blur-2xl"
            />
          </>
        )}
        <div className="relative z-10">
          <div className="flex items-center gap-5">
            {guild?.icon ? (
              <img
                src={`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.webp?size=128`}
                alt={guild.name}
                className="size-16 rounded-2xl shadow-lg ring-2 ring-white/10"
              />
            ) : (
              <div className="bg-primary/20 text-primary flex size-16 items-center justify-center rounded-2xl text-2xl font-bold shadow-lg">
                {guild?.name?.charAt(0) ?? "?"}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {guild?.name ?? t("dashboard.overview", "Overview")}
              </h1>
              <p className="mt-1 text-base-content/50">
                {t(
                  "dashboard.overviewDesc",
                  "Manage your server settings from here."
                )}
              </p>
            </div>
          </div>

          {/* Server stats inside banner */}
          {guildInfo && (
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="flex items-center gap-2 rounded-xl bg-base-100/30 px-3 py-2 backdrop-blur-sm">
                <UsersIcon className="size-5 text-base-content/40" />
                <div>
                  <p className="text-sm font-bold">
                    {(guildInfo.memberCount ?? 0).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-base-content/40">
                    {t("dashboard.memberCount", "Members")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-base-100/30 px-3 py-2 backdrop-blur-sm">
                <CalendarDaysIcon className="size-5 text-base-content/40" />
                <div>
                  <p className="text-sm font-bold">
                    {guildInfo.joinedAt
                      ? new Date(guildInfo.joinedAt).toLocaleDateString()
                      : "-"}
                  </p>
                  <p className="text-[10px] text-base-content/40">
                    {t("dashboard.botJoinedAt", "Bot Joined")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-base-100/30 px-3 py-2 backdrop-blur-sm">
                <GlobeAltIcon className="size-5 text-base-content/40" />
                <div>
                  <p className="text-sm font-bold">
                    {guildInfo.preferredLocale ?? "-"}
                  </p>
                  <p className="text-[10px] text-base-content/40">
                    {t("dashboard.preferredLocale", "Locale")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-base-100/30 px-3 py-2 backdrop-blur-sm">
                <CheckBadgeIcon className="size-5 text-base-content/40" />
                <div>
                  <p className="text-sm font-bold">
                    {guildInfo.verified
                      ? t("dashboard.yes", "Yes")
                      : t("dashboard.no", "No")}
                  </p>
                  <p className="text-[10px] text-base-content/40">
                    {t("dashboard.verified", "Verified")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group relative overflow-hidden rounded-2xl border border-base-content/5 bg-base-200/50 p-5 transition-all duration-200 hover:border-base-content/10 hover:bg-base-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex size-10 items-center justify-center rounded-xl ${card.color}`}
              >
                <card.icon className="size-5" />
              </div>
              <ArrowRightIcon className="size-4 text-base-content/20 transition-transform group-hover:translate-x-1 group-hover:text-base-content/50" />
            </div>
            <h2 className="mt-4 font-semibold">{card.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-base-content/50">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
