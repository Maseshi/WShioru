import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import {
  Cog6ToothIcon,
  MusicalNoteIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

export default function HomeDashboard() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Cog6ToothIcon className="size-5" />,
      title: t("homeDashboard.language", "Language Settings"),
      description: t(
        "homeDashboard.languageDesc",
        "Set the bot's language per server.",
      ),
      iconColor: "text-blue-500 bg-blue-500/10",
      cardColor: "bg-blue-500/5",
      shadowColor: "shadow-blue-500/10",
    },
    {
      icon: <MusicalNoteIcon className="size-5" />,
      title: t("homeDashboard.djs", "DJ Mode"),
      description: t(
        "homeDashboard.djsDesc",
        "Control who can manage music playback.",
      ),
      iconColor: "text-purple-500 bg-purple-500/10",
      cardColor: "bg-purple-500/5",
      shadowColor: "shadow-purple-500/10",
    },
    {
      icon: <BellIcon className="size-5" />,
      title: t("homeDashboard.notification", "Notifications"),
      description: t(
        "homeDashboard.notificationDesc",
        "Configure 30+ event notifications with custom embeds.",
      ),
      iconColor: "text-amber-500 bg-amber-500/10",
      cardColor: "bg-amber-500/5",
      shadowColor: "shadow-amber-500/10",
    },
    {
      icon: <ChatBubbleLeftRightIcon className="size-5" />,
      title: t("homeDashboard.chat", "Chat System"),
      description: t(
        "homeDashboard.chatDesc",
        "Create custom conversations and scripts per server.",
      ),
      iconColor: "text-cyan-500 bg-cyan-500/10",
      cardColor: "bg-cyan-500/5",
      shadowColor: "shadow-cyan-500/10",
    },
    {
      icon: <ShieldCheckIcon className="size-5" />,
      title: t("homeDashboard.security", "Security"),
      description: t(
        "homeDashboard.securityDesc",
        "Anti-bot protection and captcha verification.",
      ),
      iconColor: "text-red-500 bg-red-500/10",
      cardColor: "bg-red-500/5",
      shadowColor: "shadow-red-500/10",
    },
    {
      icon: <TrophyIcon className="size-5" />,
      title: t("homeDashboard.leaderboard", "Leaderboard"),
      description: t(
        "homeDashboard.leaderboardDesc",
        "Track member activity with per-server leveling.",
      ),
      iconColor: "text-yellow-500 bg-yellow-500/10",
      cardColor: "bg-yellow-500/5",
      shadowColor: "shadow-yellow-500/10",
    },
  ];

  return (
    <section className="bg-primary/5 py-16" id="dashboard">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left - Floating overlapping cards */}
          <div className="relative h-[420px] lg:order-first">
            {features.map((feature, index) => {
              // Position cards in a scattered layout
              const positions = [
                { top: "0%", left: "0%", z: 3 },
                { top: "5%", left: "48%", z: 5 },
                { top: "30%", left: "8%", z: 4 },
                { top: "28%", left: "52%", z: 2 },
                { top: "58%", left: "0%", z: 6 },
                { top: "55%", left: "45%", z: 1 },
              ];
              const pos = positions[index];
              const isBehind = pos.z <= 2;

              return (
                <div
                  className={`animate-wander absolute w-[48%] rounded-xl p-5 ${feature.cardColor} ${
                    isBehind ? "opacity-40 blur-[1px] shadow-sm" : `shadow-2xl ${feature.shadowColor} backdrop-blur-sm`
                  }`}
                  key={index}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    zIndex: pos.z,
                    animationDelay: `${-index * 1.3}s`,
                  }}
                >
                  <div
                    className={`mb-3 inline-flex rounded-lg p-2.5 ${feature.iconColor}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-base-content/60">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right - Title + description + CTA */}
          <div className="text-center lg:order-last lg:text-right">
            <div className="py-4 text-5xl font-bold lg:text-right">🎛️</div>
            <h2 className="text-4xl font-bold">
              <Trans i18nKey="homeDashboard.title" t={t}>
                Manage Everything From Your
                <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
                  {" "}
                  Browser
                </span>
              </Trans>
            </h2>
            <p className="mx-auto mt-4 max-w-lg lg:ml-auto lg:mr-0">
              {t(
                "homeDashboard.subtitle",
                "No commands needed. Configure your bot visually with our powerful dashboard.",
              )}
            </p>
            <div className="mt-8">
              <Link to="/dashboard" className="btn btn-wide btn-primary">
                {t("homeDashboard.cta", "Open Dashboard")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
