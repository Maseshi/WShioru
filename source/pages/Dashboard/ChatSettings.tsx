import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGuildSettings } from "@/hooks/useGuildSettings";

interface Conversation {
  prompts: string[];
  replies: string[];
  script?: string;
}

interface ChatData {
  conversations: Conversation[];
  alternatives: string[];
}

export default function ChatSettings() {
  const { t } = useTranslation();
  const { guildId } = useParams();

  const { data, loading, saving, error, save, setData } =
    useGuildSettings<ChatData>(guildId!, "chat", {
      conversations: [],
      alternatives: [],
    });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPrompts, setEditPrompts] = useState("");
  const [editReplies, setEditReplies] = useState("");
  const [editScript, setEditScript] = useState("");

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const startAdd = () => {
    setEditIndex(-1);
    setEditPrompts("");
    setEditReplies("");
    setEditScript("");
  };

  const startEdit = (index: number) => {
    const conv = data.conversations[index];
    setEditIndex(index);
    setEditPrompts(conv.prompts.join(", "));
    setEditReplies(conv.replies.join(", "));
    setEditScript(conv.script ?? "");
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  const saveEdit = () => {
    const prompts = editPrompts
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const replies = editReplies
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!prompts.length || !replies.length) return;

    const entry: Conversation = { prompts, replies };
    if (editScript.trim()) entry.script = editScript.trim();

    const updated = [...data.conversations];
    if (editIndex === -1) {
      updated.push(entry);
    } else if (editIndex !== null) {
      updated[editIndex] = entry;
    }

    save({ conversations: updated });
    setEditIndex(null);
  };

  const removeConversation = (index: number) => {
    const updated = data.conversations.filter((_, i) => i !== index);
    save({ conversations: updated });
  };

  return (
    <>
      <title>{`${t("dashboard.chat", "Chat")} | Shioru's`}</title>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {t("dashboard.chat", "Chat")}
          </h1>
          <button className="btn btn-primary btn-sm gap-1" onClick={startAdd}>
            + {t("dashboard.addConversation", "Add Conversation")}
          </button>
        </div>
        <p className="mt-2 text-sm text-base-content/50">
          {t(
            "dashboard.chatPageDesc",
            "Add custom conversations for this server. The bot checks these patterns before using AI."
          )}
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Edit / Add form */}
      {editIndex !== null && (
        <div className="card mb-6 bg-base-200">
          <div className="card-body gap-4">
            <h2 className="card-title text-lg">
              {editIndex === -1
                ? t("dashboard.addConversation", "Add Conversation")
                : t("dashboard.editConversation", "Edit Conversation")}
            </h2>
            <div>
              <label className="label text-sm font-medium">
                {t("dashboard.prompts", "Prompts")}
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder={t(
                  "dashboard.promptsPlaceholder",
                  "hello, hi, hey (comma separated)"
                )}
                value={editPrompts}
                onChange={(e) => setEditPrompts(e.target.value)}
              />
            </div>
            <div>
              <label className="label text-sm font-medium">
                {t("dashboard.replies", "Replies")}
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder={t(
                  "dashboard.repliesPlaceholder",
                  "Hello!, Hi there! (comma separated)"
                )}
                value={editReplies}
                onChange={(e) => setEditReplies(e.target.value)}
              />
            </div>
            <div>
              <label className="label text-sm font-medium">
                {t("dashboard.script", "Script")}
                <span className="ml-1 text-xs text-base-content/40">
                  {t("dashboard.scriptOptional", "(optional)")}
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full font-mono text-sm"
                rows={2}
                placeholder={t(
                  "dashboard.scriptPlaceholder",
                  "e.g. Math.random() < 0.5 ? 'Heads!' : 'Tails!'"
                )}
                value={editScript}
                onChange={(e) => setEditScript(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                disabled={saving}
                onClick={saveEdit}
              >
                {t("dashboard.save", "Save")}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={cancelEdit}>
                {t("dashboard.cancel", "Cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conversations list */}
      {data.conversations.length === 0 ? (
        <div className="rounded-xl bg-base-200 p-8 text-center">
          <p className="text-base-content/60">
            {t(
              "dashboard.noConversations",
              "No custom conversations for this server yet."
            )}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.conversations.map((conv, index) => (
            <div key={index} className="card bg-base-200">
              <div className="card-body py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">
                        {t("dashboard.prompts", "Prompts")}:
                      </span>{" "}
                      {conv.prompts.join(", ")}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-medium">
                        {t("dashboard.replies", "Replies")}:
                      </span>{" "}
                      {conv.replies.join(", ")}
                    </p>
                    {conv.script && (
                      <p className="mt-1 font-mono text-xs text-base-content/50">
                        {t("dashboard.script", "Script")}: {conv.script}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => startEdit(index)}
                    >
                      {t("dashboard.edit", "Edit")}
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-error"
                      onClick={() => removeConversation(index)}
                    >
                      {t("dashboard.delete", "Delete")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
