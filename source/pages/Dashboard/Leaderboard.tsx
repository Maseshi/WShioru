import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";

interface UserLevel {
  id: string;
  username: string;
  avatar: string;
  exp: number;
  level: number;
}

type LeaderboardMode = "guild" | "global";

export default function Leaderboard() {
  const { t } = useTranslation();
  const { guildId } = useParams();
  const [users, setUsers] = useState<UserLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<LeaderboardMode>("guild");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);

      try {
        const database = getDatabase();
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);

        if (!snapshot.exists()) {
          setUsers([]);
          return;
        }

        const allUsers = snapshot.val();
        const leaderboard: UserLevel[] = [];

        for (const [userId, userData] of Object.entries(allUsers)) {
          const user = userData as Record<string, unknown>;
          const guilds = (user.guilds as string[]) ?? [];

          // For guild mode, only include users in this guild
          if (mode === "guild" && !guilds.includes(guildId!)) continue;

          const username = (user.username as string) ?? userId;
          const avatar = (user.avatar as string) ?? "";

          if (mode === "guild") {
            // Use guild-specific leveling, fallback to global
            const guildLeveling = (
              user.guildLeveling as Record<
                string,
                { exp: number; level: number }
              >
            )?.[guildId!];
            const leveling = guildLeveling ??
              (user.leveling as { exp: number; level: number } | undefined);

            leaderboard.push({
              id: userId,
              username,
              avatar,
              exp: leveling?.exp ?? 0,
              level: leveling?.level ?? 0,
            });
          } else {
            // Global: use global leveling
            const leveling = user.leveling as
              | { exp: number; level: number }
              | undefined;

            leaderboard.push({
              id: userId,
              username,
              avatar,
              exp: leveling?.exp ?? 0,
              level: leveling?.level ?? 0,
            });
          }
        }

        leaderboard.sort((a, b) =>
          b.level !== a.level ? b.level - a.level : b.exp - a.exp
        );
        setUsers(leaderboard.slice(0, 50));
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [guildId, mode]);

  return (
    <>
      <title>{`${t("dashboard.leaderboard", "Leaderboard")} | Shioru's`}</title>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {t("dashboard.leaderboard", "Leaderboard")}
          </h1>
          <div className="join">
          <button
            className={`btn join-item btn-sm ${mode === "guild" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setMode("guild")}
          >
            {t("dashboard.guildMode", "Server")}
          </button>
          <button
            className={`btn join-item btn-sm ${mode === "global" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setMode("global")}
          >
            {t("dashboard.globalMode", "Global")}
          </button>
        </div>
        </div>
        <p className="mt-2 text-sm text-base-content/50">
          {t("dashboard.leaderboardPageDesc", "View the top members ranked by level and experience.")}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-xl bg-base-200 p-8 text-center">
          <p className="text-base-content/60">
            {t(
              "dashboard.noLeaderboard",
              "No leveling data found."
            )}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t("dashboard.user", "User")}</th>
                <th>{t("dashboard.level", "Level")}</th>
                <th>{t("dashboard.exp", "EXP")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index < 3 ? "font-semibold" : ""}
                >
                  <td>
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && index + 1}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="size-6 rounded-full"
                        />
                      ) : (
                        <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs">
                          {user.username.charAt(0)}
                        </div>
                      )}
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>{user.level}</td>
                  <td>{user.exp.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
