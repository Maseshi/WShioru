import { useTranslation } from "react-i18next";
import type { EmbedData } from "./types";

interface EmbedEditorProps {
  data: EmbedData;
  update: (partial: Partial<EmbedData>) => void;
  onSave: () => void;
  saving?: boolean;
}

export default function EmbedEditor({
  data,
  update,
  onSave,
  saving,
}: EmbedEditorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      {/* Author */}
      <div className="rounded-xl border border-base-content/5 p-4">
        <h3 className="mb-3 text-sm font-semibold">
          {t("dashboard.embedAuthor", "Author")}
        </h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="input input-bordered input-sm w-full"
            placeholder={t("dashboard.embedAuthorName", "Author name")}
            value={data.author.name}
            onChange={(e) =>
              update({ author: { ...data.author, name: e.target.value } })
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              className="input input-bordered input-sm"
              placeholder={t("dashboard.embedAuthorURL", "Author URL")}
              value={data.author.url}
              onChange={(e) =>
                update({ author: { ...data.author, url: e.target.value } })
              }
            />
            <input
              type="text"
              className="input input-bordered input-sm"
              placeholder={t("dashboard.embedAuthorIcon", "Author icon URL")}
              value={data.author.iconURL}
              onChange={(e) =>
                update({
                  author: { ...data.author, iconURL: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="rounded-xl border border-base-content/5 p-4">
        <h3 className="mb-3 text-sm font-semibold">
          {t("dashboard.embedBody", "Body")}
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered input-sm flex-1"
              placeholder={t("dashboard.embedTitle", "Title")}
              value={data.title}
              onChange={(e) => update({ title: e.target.value })}
            />
            <input
              type="color"
              className="input input-bordered input-sm w-12 p-1"
              value={data.color || "#5865F2"}
              onChange={(e) => update({ color: e.target.value })}
            />
          </div>
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder={t("dashboard.embedURL", "Title URL")}
            value={data.url}
            onChange={(e) => update({ url: e.target.value })}
          />
          <textarea
            className="textarea textarea-bordered textarea-sm"
            rows={4}
            placeholder={t("dashboard.embedDescription", "Description")}
            value={data.description}
            onChange={(e) => update({ description: e.target.value })}
          />
        </div>
      </div>

      {/* Images */}
      <div className="rounded-xl border border-base-content/5 p-4">
        <h3 className="mb-3 text-sm font-semibold">
          {t("dashboard.embedImages", "Images")}
        </h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder={t("dashboard.embedThumbnail", "Thumbnail URL")}
            value={data.thumbnail}
            onChange={(e) => update({ thumbnail: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder={t("dashboard.embedImage", "Image URL")}
            value={data.image}
            onChange={(e) => update({ image: e.target.value })}
          />
        </div>
      </div>

      {/* Fields */}
      <div className="rounded-xl border border-base-content/5 p-4">
        <h3 className="mb-3 text-sm font-semibold">
          {t("dashboard.embedFields", "Fields")}
        </h3>
        <div className="flex flex-col gap-3">
          {data.fields.map((field, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-xs text-base-content/40">
                {t("dashboard.embedField", "Field")} {i + 1}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  placeholder={t("dashboard.embedFieldName", "Name")}
                  value={field.name}
                  onChange={(e) => {
                    const fields = [...data.fields];
                    fields[i] = { ...fields[i], name: e.target.value };
                    update({ fields });
                  }}
                />
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  placeholder={t("dashboard.embedFieldValue", "Value")}
                  value={field.value}
                  onChange={(e) => {
                    const fields = [...data.fields];
                    fields[i] = { ...fields[i], value: e.target.value };
                    update({ fields });
                  }}
                />
              </div>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  checked={field.inline}
                  onChange={(e) => {
                    const fields = [...data.fields];
                    fields[i] = { ...fields[i], inline: e.target.checked };
                    update({ fields });
                  }}
                />
                <span className="text-xs">
                  {t("dashboard.embedFieldInline", "Inline")}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-base-content/5 p-4">
        <h3 className="mb-3 text-sm font-semibold">
          {t("dashboard.embedFooter", "Footer")}
        </h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder={t("dashboard.embedFooterText", "Footer text")}
            value={data.footer.text}
            onChange={(e) =>
              update({ footer: { ...data.footer, text: e.target.value } })
            }
          />
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder={t("dashboard.embedFooterIcon", "Footer icon URL")}
            value={data.footer.iconURL}
            onChange={(e) =>
              update({ footer: { ...data.footer, iconURL: e.target.value } })
            }
          />
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              checked={!!data.timestamp}
              onChange={(e) =>
                update({
                  timestamp: e.target.checked
                    ? new Date().toISOString()
                    : "",
                })
              }
            />
            <span className="text-xs">
              {t("dashboard.embedTimestamp", "Show timestamp")}
            </span>
          </label>
        </div>
      </div>

      <button
        className="btn btn-primary btn-sm"
        disabled={saving}
        onClick={onSave}
      >
        {t("dashboard.save", "Save")}
      </button>
    </div>
  );
}
