import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGuildSettings } from "@/hooks/useGuildSettings";
import EmbedBuilder, {
  defaultEmbed,
  type EmbedData,
} from "@/components/EmbedBuilder";

interface NotificationEvent {
  enable: boolean;
  channelId: string;
  content: string;
  embed?: EmbedData;
}

type NotificationData = Record<string, NotificationEvent>;

const EVENT_GROUPS: { label: string; events: { key: string; label: string }[] }[] = [
  {
    label: "Members",
    events: [
      { key: "guildMemberAdd", label: "Member Join" },
      { key: "guildMemberRemove", label: "Member Leave" },
      { key: "guildMemberUpdate", label: "Member Update" },
      { key: "guildBanAdd", label: "Member Banned" },
      { key: "guildBanRemove", label: "Member Unbanned" },
    ],
  },
  {
    label: "Channels",
    events: [
      { key: "channelCreate", label: "Channel Created" },
      { key: "channelDelete", label: "Channel Deleted" },
      { key: "channelUpdate", label: "Channel Updated" },
      { key: "channelPinsUpdate", label: "Channel Pins Updated" },
    ],
  },
  {
    label: "Roles",
    events: [
      { key: "roleCreate", label: "Role Created" },
      { key: "roleDelete", label: "Role Deleted" },
      { key: "roleUpdate", label: "Role Updated" },
    ],
  },
  {
    label: "Messages & Threads",
    events: [
      { key: "threadCreate", label: "Thread Created" },
      { key: "threadDelete", label: "Thread Deleted" },
      { key: "threadUpdate", label: "Thread Updated" },
    ],
  },
  {
    label: "Server",
    events: [
      { key: "inviteCreate", label: "Invite Created" },
      { key: "inviteDelete", label: "Invite Deleted" },
      { key: "webhooksUpdate", label: "Webhook Updated" },
      { key: "guildIntegrationsUpdate", label: "Integration Updated" },
      { key: "voiceStateUpdate", label: "Voice State Updated" },
    ],
  },
  {
    label: "Emojis & Stickers",
    events: [
      { key: "emojiCreate", label: "Emoji Created" },
      { key: "emojiDelete", label: "Emoji Deleted" },
      { key: "emojiUpdate", label: "Emoji Updated" },
      { key: "stickerCreate", label: "Sticker Created" },
      { key: "stickerDelete", label: "Sticker Deleted" },
      { key: "stickerUpdate", label: "Sticker Updated" },
    ],
  },
];

export default function NotificationSettings() {
  const { t } = useTranslation();
  const { guildId } = useParams();

  const { data, loading, saving, error, setData } =
    useGuildSettings<NotificationData>(guildId!, "notification", {});

  const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

  const saveEvent = async (eventName: string, body: Partial<NotificationEvent>) => {
    try {
      const res = await fetch(
        `${API_URL}/api/guilds/${guildId}/notification/${eventName}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setData((prev) => ({
        ...prev,
        [eventName]: { ...getEvent(eventName), ...body },
      }));
    } catch {
      // error handled silently
    }
  };

  const getEvent = (name: string): NotificationEvent =>
    data[name] ?? { enable: false, channelId: "", content: "" };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <>
      <title>{`${t("dashboard.notification", "Notifications")} | Shioru's`}</title>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t("dashboard.notification", "Notifications")}
        </h1>
        <p className="mt-2 text-sm text-base-content/50">
          {t("dashboard.notificationPageDesc", "Send automatic messages when events happen in your server.")}
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-8">
        {EVENT_GROUPS.map((group) => (
          <div key={group.label}>
            <h2 className="mb-3 text-sm font-semibold text-base-content/50 uppercase tracking-wider">
              {t(`dashboard.eventGroup.${group.label}`, group.label)}
            </h2>
            <div className="flex flex-col gap-4">
              {group.events.map(({ key: eventName, label }) => {
                const event = getEvent(eventName);

                return (
                  <div key={eventName} className="card bg-base-200">
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <h3 className="card-title text-lg">
                          {t(`dashboard.event.${eventName}`, label)}
                        </h3>
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={event.enable}
                          disabled={saving}
                          onChange={(e) =>
                            saveEvent(eventName, { enable: e.target.checked })
                          }
                        />
                      </div>

                      {event.enable && (
                        <div className="mt-4 flex flex-col gap-3">
                          <div>
                            <label className="label text-sm font-medium">
                              {t("dashboard.channelId", "Channel ID")}
                            </label>
                            <input
                              type="text"
                              className="input input-bordered w-full"
                              placeholder="123456789012345678"
                              value={event.channelId}
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  [eventName]: {
                                    ...event,
                                    channelId: e.target.value,
                                  },
                                }))
                              }
                              onBlur={() =>
                                saveEvent(eventName, {
                                  channelId: event.channelId,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="label text-sm font-medium">
                              {t("dashboard.messageContent", "Message Content")}
                            </label>
                            <textarea
                              className="textarea textarea-bordered w-full"
                              rows={3}
                              placeholder={t(
                                "dashboard.messageContentPlaceholder",
                                "Welcome {user} to the server!"
                              )}
                              value={event.content}
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  [eventName]: {
                                    ...event,
                                    content: e.target.value,
                                  },
                                }))
                              }
                              onBlur={() =>
                                saveEvent(eventName, { content: event.content })
                              }
                            />
                          </div>

                          {/* Embed Builder */}
                          <div className="border-base-content/5 mt-2 border-t pt-4">
                            <div className="mb-3 flex items-center justify-between">
                              <label className="label text-sm font-medium">
                                {t("dashboard.customEmbed", "Custom Embed")}
                              </label>
                              <input
                                type="checkbox"
                                className="toggle toggle-sm toggle-primary"
                                checked={!!event.embed}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setData((prev) => ({
                                      ...prev,
                                      [eventName]: {
                                        ...event,
                                        embed: defaultEmbed,
                                      },
                                    }));
                                  } else {
                                    const { embed: _embed, ...rest } = event;
                                    setData((prev) => ({
                                      ...prev,
                                      [eventName]: rest as NotificationEvent,
                                    }));
                                    saveEvent(eventName, { embed: undefined });
                                  }
                                }}
                              />
                            </div>
                            {event.embed && (
                              <EmbedBuilder
                                data={event.embed}
                                onChange={(embed) =>
                                  setData((prev) => ({
                                    ...prev,
                                    [eventName]: { ...event, embed },
                                  }))
                                }
                                onSave={() =>
                                  saveEvent(eventName, { embed: event.embed })
                                }
                                saving={saving}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
