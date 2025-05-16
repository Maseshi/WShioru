import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import {
  CheckCircleIcon,
  CodeBracketIcon,
  RectangleStackIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface Stats {
  commands: number;
  guilds: number;
  users: number;
  worked: number;
}

export default function HomeStats() {
  const [stats, setStats] = useState<Stats | null>();

  const { t } = useTranslation();

  useEffect(() => {
    const getStats = async () => {
      const database = getDatabase();
      const statsRef = ref(database, "statistics/size");
      const statsSnapshot = await get(statsRef);

      if (statsSnapshot.exists()) {
        const statsData = statsSnapshot.val();
        setStats(statsData);
      }
    };
    getStats();
  }, []);

  return (
    <section
      className="to-primary/5 bg-gradient-to-b from-transparent py-16"
      id="stats"
    >
      <div className="container mx-auto px-4">
        <div className="stats bg-secondary/10 shadow-secondary stats-vertical lg:stats-horizontal w-full justify-stretch rounded-xl shadow-2xl/10">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <CodeBracketIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">{t("commands")}</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.commands as number)}
            </div>
            <div className="stat-desc">{t("allCommandsAvailable")}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <RectangleStackIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">{t("guilds")}</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.guilds as number)}
            </div>
            <div className="stat-desc">{t("guildThatShioruHasJoined")}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <UserGroupIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">{t("members")}</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.users as number)}
            </div>
            <div className="stat-desc">{t("allCountedMembers")}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <CheckCircleIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">{t("worked")}</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.worked as number)}
            </div>
            <div className="stat-desc">{t("allSuccessTasks")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
