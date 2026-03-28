import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGuildSettings } from "@/hooks/useGuildSettings";

interface AntibotData {
  enable: boolean;
  all: boolean;
  bots: string[];
}

export default function AntibotSettings() {
  const { t } = useTranslation();
  const { guildId } = useParams();
  const [newBot, setNewBot] = useState("");

  const { data, loading, saving, error, save } = useGuildSettings<AntibotData>(
    guildId!,
    "antibot",
    { enable: false, all: false, bots: [] }
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const addBot = () => {
    if (!newBot.trim()) return;
    if (data.bots.includes(newBot.trim())) return;
    save({ bots: [...data.bots, newBot.trim()] });
    setNewBot("");
  };

  const removeBot = (id: string) => {
    save({ bots: data.bots.filter((b) => b !== id) });
  };

  return (
    <>
      <title>{`${t("dashboard.antibot", "Anti-Bot")} | Shioru's`}</title>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t("dashboard.antibot", "Anti-Bot")}
        </h1>
        <p className="mt-2 text-sm text-base-content/50">
          {t("dashboard.antibotPageDesc", "Automatically kick unauthorized bots when they join your server.")}
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title text-lg">
                  {t("dashboard.antibotEnable", "Enable Anti-Bot")}
                </h2>
                <p className="text-sm text-base-content/60">
                  {t(
                    "dashboard.antibotEnableDesc",
                    "Automatically kick unauthorized bots from the server."
                  )}
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={data.enable}
                disabled={saving}
                onChange={(e) => save({ enable: e.target.checked })}
              />
            </div>
          </div>
        </div>

        {data.enable && (
          <>
            <div className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title text-lg">
                      {t("dashboard.antibotAll", "Kick All Bots")}
                    </h2>
                    <p className="text-sm text-base-content/60">
                      {t(
                        "dashboard.antibotAllDesc",
                        "Kick all bots except Shioru. If disabled, only bots in the list below will be kicked."
                      )}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={data.all}
                    disabled={saving}
                    onChange={(e) => save({ all: e.target.checked })}
                  />
                </div>
              </div>
            </div>

            {!data.all && (
              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-lg">
                    {t("dashboard.antibotList", "Bot Blocklist")}
                  </h2>
                  <p className="text-sm text-base-content/60">
                    {t(
                      "dashboard.antibotListDesc",
                      "Add bot IDs that should be kicked when they join."
                    )}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1"
                      placeholder={t("dashboard.botIdPlaceholder", "Bot ID")}
                      value={newBot}
                      onChange={(e) => setNewBot(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addBot()}
                    />
                    <button
                      className="btn btn-primary"
                      disabled={saving}
                      onClick={addBot}
                    >
                      {t("dashboard.add", "Add")}
                    </button>
                  </div>
                  {data.bots.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {data.bots.map((bot) => (
                        <span key={bot} className="badge badge-lg gap-2">
                          {bot}
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => removeBot(bot)}
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
