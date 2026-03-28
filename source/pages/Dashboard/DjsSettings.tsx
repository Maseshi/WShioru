import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGuildSettings } from "@/hooks/useGuildSettings";

interface DjsData {
  enable: boolean;
  only: boolean;
  roles: string[];
  users: string[];
}

export default function DjsSettings() {
  const { t } = useTranslation();
  const { guildId } = useParams();
  const [newRole, setNewRole] = useState("");
  const [newUser, setNewUser] = useState("");

  const { data, loading, saving, error, save } = useGuildSettings<DjsData>(
    guildId!,
    "djs",
    { enable: false, only: false, roles: [], users: [] }
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const addRole = () => {
    if (!newRole.trim()) return;
    if (data.roles.includes(newRole.trim())) return;
    save({ roles: [...data.roles, newRole.trim()] });
    setNewRole("");
  };

  const removeRole = (id: string) => {
    save({ roles: data.roles.filter((r) => r !== id) });
  };

  const addUser = () => {
    if (!newUser.trim()) return;
    if (data.users.includes(newUser.trim())) return;
    save({ users: [...data.users, newUser.trim()] });
    setNewUser("");
  };

  const removeUser = (id: string) => {
    save({ users: data.users.filter((u) => u !== id) });
  };

  return (
    <>
      <title>{`${t("dashboard.djs", "DJ Mode")} | Shioru's`}</title>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t("dashboard.djs", "DJ Mode")}
        </h1>
        <p className="mt-2 text-sm text-base-content/50">
          {t("dashboard.djsPageDesc", "Restrict music controls to specific roles or users.")}
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
                  {t("dashboard.djsEnable", "Enable DJ Mode")}
                </h2>
                <p className="text-sm text-base-content/60">
                  {t(
                    "dashboard.djsEnableDesc",
                    "Restrict music controls to specific roles or users."
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
                      {t("dashboard.djsOnly", "DJ Only")}
                    </h2>
                    <p className="text-sm text-base-content/60">
                      {t(
                        "dashboard.djsOnlyDesc",
                        "Only DJs can control music. Others cannot use music commands."
                      )}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={data.only}
                    disabled={saving}
                    onChange={(e) => save({ only: e.target.checked })}
                  />
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title text-lg">
                  {t("dashboard.djRoles", "DJ Roles")}
                </h2>
                <p className="text-sm text-base-content/60">
                  {t(
                    "dashboard.djRolesDesc",
                    "Add role IDs that can control music."
                  )}
                </p>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder={t("dashboard.roleIdPlaceholder", "Role ID")}
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addRole()}
                  />
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={addRole}
                  >
                    {t("dashboard.add", "Add")}
                  </button>
                </div>
                {data.roles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.roles.map((role) => (
                      <span key={role} className="badge badge-lg gap-2">
                        {role}
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => removeRole(role)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title text-lg">
                  {t("dashboard.djUsers", "DJ Users")}
                </h2>
                <p className="text-sm text-base-content/60">
                  {t(
                    "dashboard.djUsersDesc",
                    "Add user IDs that can control music."
                  )}
                </p>
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder={t("dashboard.userIdPlaceholder", "User ID")}
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addUser()}
                  />
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={addUser}
                  >
                    {t("dashboard.add", "Add")}
                  </button>
                </div>
                {data.users.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.users.map((user) => (
                      <span key={user} className="badge badge-lg gap-2">
                        {user}
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => removeUser(user)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
