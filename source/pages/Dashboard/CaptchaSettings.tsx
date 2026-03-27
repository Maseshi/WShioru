import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGuildSettings } from "@/hooks/useGuildSettings";

interface CaptchaData {
  enable: boolean;
  text: string;
  role: string;
}

export default function CaptchaSettings() {
  const { t } = useTranslation();
  const { guildId } = useParams();

  const { data, loading, saving, error, save, setData } =
    useGuildSettings<CaptchaData>(guildId!, "captcha", {
      enable: false,
      text: "",
      role: "",
    });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <>
      <title>{`${t("dashboard.captcha", "Captcha")} | Shioru's`}</title>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t("dashboard.captcha", "Captcha")}
        </h1>
        <p className="mt-2 text-sm text-base-content/50">
          {t("dashboard.captchaPageDesc", "Require new members to solve a captcha before accessing the server.")}
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
                  {t("dashboard.captchaEnable", "Enable Captcha")}
                </h2>
                <p className="text-sm text-base-content/60">
                  {t(
                    "dashboard.captchaEnableDesc",
                    "Require new members to verify with a captcha before accessing the server."
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
                <h2 className="card-title text-lg">
                  {t("dashboard.captchaText", "Captcha Text")}
                </h2>
                <p className="text-sm text-base-content/60">
                  {t(
                    "dashboard.captchaTextDesc",
                    "The text that the captcha will display for members to type."
                  )}
                </p>
                <input
                  type="text"
                  className="input input-bordered mt-3 w-full max-w-xs"
                  placeholder={t(
                    "dashboard.captchaTextPlaceholder",
                    "e.g. I agree to the rules"
                  )}
                  value={data.text}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, text: e.target.value }))
                  }
                  onBlur={() => save({ text: data.text })}
                />
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title text-lg">
                  {t("dashboard.captchaRole", "Verified Role ID")}
                </h2>
                <p className="text-sm text-base-content/60">
                  {t(
                    "dashboard.captchaRoleDesc",
                    "The role to assign when a member passes verification."
                  )}
                </p>
                <input
                  type="text"
                  className="input input-bordered mt-3 w-full max-w-xs"
                  placeholder="123456789012345678"
                  value={data.role}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  onBlur={() => save({ role: data.role })}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
