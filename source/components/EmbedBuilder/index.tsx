import { useTranslation } from "react-i18next";
import type { EmbedData } from "./types";

interface EmbedBuilderProps {
  data: EmbedData;
  onChange: (data: EmbedData) => void;
  onSave: () => void;
  saving?: boolean;
}

export default function EmbedBuilder({
  data,
  onChange,
  onSave,
  saving,
}: EmbedBuilderProps) {
  const { t } = useTranslation();

  const update = (partial: Partial<EmbedData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Editor */}
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

      {/* Preview */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-base-content/50">
          {t("dashboard.embedPreview", "Preview")}
        </h3>
        <div className="rounded-lg border-l-4 bg-[#2b2d31] p-4 text-white" style={{ borderColor: data.color || "#5865F2" }}>
          {/* Author */}
          {data.author.name && (
            <div className="mb-2 flex items-center gap-2 text-xs">
              {data.author.iconURL && (
                <img
                  src={data.author.iconURL}
                  alt=""
                  className="size-6 rounded-full"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              {data.author.url ? (
                <a
                  href={data.author.url}
                  className="font-medium text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.author.name}
                </a>
              ) : (
                <span className="font-medium">{data.author.name}</span>
              )}
            </div>
          )}

          {/* Title */}
          {data.title && (
            <div className="mb-1 font-semibold">
              {data.url ? (
                <a
                  href={data.url}
                  className="text-[#00a8fc] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.title}
                </a>
              ) : (
                data.title
              )}
            </div>
          )}

          {/* Description */}
          {data.description && (
            <p className="mb-2 text-sm text-[#dbdee1] whitespace-pre-wrap">
              {data.description}
            </p>
          )}

          {/* Thumbnail + Fields layout */}
          <div className="flex gap-4">
            <div className="min-w-0 flex-1">
              {/* Fields */}
              {data.fields.some((f) => f.name || f.value) && (
                <div className="mb-2 grid grid-cols-3 gap-2">
                  {data.fields.map(
                    (field, i) =>
                      (field.name || field.value) && (
                        <div
                          key={i}
                          className={field.inline ? "col-span-1" : "col-span-3"}
                        >
                          {field.name && (
                            <div className="text-xs font-semibold">
                              {field.name}
                            </div>
                          )}
                          {field.value && (
                            <div className="text-xs text-[#dbdee1]">
                              {field.value}
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              )}
            </div>

            {/* Thumbnail */}
            {data.thumbnail && (
              <img
                src={data.thumbnail}
                alt=""
                className="size-20 rounded object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>

          {/* Image */}
          {data.image && (
            <img
              src={data.image}
              alt=""
              className="mt-2 max-h-64 w-full rounded object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}

          {/* Footer */}
          {(data.footer.text || data.timestamp) && (
            <div className="mt-2 flex items-center gap-2 text-xs text-[#a0a3a6]">
              {data.footer.iconURL && (
                <img
                  src={data.footer.iconURL}
                  alt=""
                  className="size-5 rounded-full"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              {data.footer.text}
              {data.footer.text && data.timestamp && <span>•</span>}
              {data.timestamp && new Date(data.timestamp).toLocaleDateString()}
            </div>
          )}

          {/* Empty state */}
          {!data.title &&
            !data.description &&
            !data.author.name &&
            !data.image && (
              <p className="text-sm text-[#a0a3a6] italic">
                {t("dashboard.embedEmpty", "Fill in the fields to see a preview")}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
