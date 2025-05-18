import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { getDatabase, ref, get } from "firebase/database";

import shioruSandImage from "@/assets/images/shioru-stand.webp";

import { DiscordIcon } from "@/components/Icons/Discord";

interface Guild {
  createdAt: string;
  description: string;
  iconURL: string;
  joinedAt: string;
  language: {
    locale: string;
    type: string;
  };
  memberCount: number;
  name: string;
  preferredLocale: string;
  verified: boolean;
}

export default function HomeGreeting() {
  const [guilds, setGuilds] = useState<Guild[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const getGuilds = async () => {
      const database = getDatabase();
      const guildsRef = ref(database, "guilds");
      const guildsSnapshot = await get(guildsRef);

      if (guildsSnapshot.exists()) {
        const guildsData = guildsSnapshot.val();
        const guildsRandData = Object.values<Guild>(guildsData)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setGuilds(guildsRandData);
      }
    };
    getGuilds();
  }, []);

  return (
    <section className="relative" id="greeting">
      <div className="hero min-h-screen">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2">
          <img
            className="animate-float mx-auto h-80 max-w-sm lg:order-last lg:h-auto"
            src={shioruSandImage}
            alt={t("shioruStandAlternate")}
          />
          <div className="text-center lg:order-first lg:text-left">
            <h1 className="text-5xl font-bold">
              <Trans i18nKey="greeting" t={t}>
                Meet
                <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
                  Shioru
                </span>
                , Your trusted companion on Discord
              </Trans>
            </h1>
            <p className="py-6">{t("greetingDescription")}</p>
            <div className="flex gap-2 pb-6 max-md:flex-col">
              <Link
                className="btn btn-wide btn-primary max-lg:mx-auto"
                to="/invite"
              >
                <DiscordIcon className="size-5 fill-current" />{" "}
                {t("addToDiscord")}
              </Link>
              <Link
                className="btn btn-wide btn-outline btn-secondary max-lg:mx-auto"
                to="/#commands"
              >
                {t("viewCommands")}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="avatar-group -space-x-4">
                {guilds?.length
                  ? guilds.map((guild, index) => (
                      <div
                        className={`avatar ${guild.iconURL ? "" : "avatar-placeholder"}`}
                        key={index}
                      >
                        <div
                          className={`bg-neutral ${guild.iconURL ? "" : "text-neutral-content"} w-8`}
                        >
                          {guild.iconURL ? (
                            <img
                              src={guild.iconURL}
                              alt={guild.name}
                              width="32px"
                              height="32px"
                            />
                          ) : (
                            <span>{guild.name.charAt(0)}</span>
                          )}
                        </div>
                      </div>
                    ))
                  : Array.from({ length: 3 }, (_, index) => (
                      <div className="avatar avatar-placeholder" key={index}>
                        <div className="skeleton bg-neutral w-8" />
                      </div>
                    ))}
              </div>
              <small>
                <Trans i18nKey="trustedByServers" t={t}>
                  Trusted by over <b>100+</b> Discord servers
                </Trans>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="bg-secondary/20 absolute -top-20 -right-20 size-64 rounded-full blur-3xl" />
      <div className="bg-primary/20 absolute -bottom-32 -left-20 size-80 rounded-full blur-3xl" />
    </section>
  );
}
