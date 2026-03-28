import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGuildSettings } from "@/hooks/useGuildSettings";

interface LanguageData {
  type: string;
  locale: string;
}

const LOCALES = ["en-US", "th", "ja", "ko", "zh-CN", "zh-TW", "ru", "hi"];
const TYPES = ["CUSTOM", "USER", "GUILD"];

export default function LanguageSettings() {
  const { t } = useTranslation();
  const { guildId } = useParams();

  const { data, loading, saving, error, save } = useGuildSettings<LanguageData>(
    guildId!,
    "language",
    { type: "USER", locale: "en-US" }
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <>
      <title>{`${t("dashboard.language", "Language")} | Shioru's`}</title>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t("dashboard.language", "Language")}
        </h1>
        <p className="mt-2 text-sm text-base-content/50">
          {t("dashboard.languagePageDesc", "Choose how the bot determines which language to use for this server.")}
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
            <h2 className="card-title text-lg">
              {t("dashboard.languageType", "Language Type")}
            </h2>
            <p className="text-sm text-base-content/60">
              {t(
                "dashboard.languageTypeDesc",
                "Choose how the bot determines which language to use."
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  className={`btn btn-sm ${data.type === type ? "btn-primary" : "btn-outline"}`}
                  disabled={saving}
                  onClick={() => save({ type })}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {data.type === "CUSTOM" && (
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title text-lg">
                {t("dashboard.locale", "Locale")}
              </h2>
              <p className="text-sm text-base-content/60">
                {t(
                  "dashboard.localeDesc",
                  "Select the language when using CUSTOM type."
                )}
              </p>
              <select
                className="select select-bordered mt-3 w-full max-w-xs"
                value={data.locale}
                disabled={saving}
                onChange={(e) => save({ locale: e.target.value })}
              >
                {LOCALES.map((locale) => (
                  <option key={locale} value={locale}>
                    {locale}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
