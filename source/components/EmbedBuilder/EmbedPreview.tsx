import { useTranslation } from "react-i18next";
import type { EmbedData } from "./types";

interface EmbedPreviewProps {
  data: EmbedData;
}

export default function EmbedPreview({ data }: EmbedPreviewProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-base-content/50">
        {t("dashboard.embedPreview", "Preview")}
      </h3>
      <div
        className="rounded-lg border-l-4 bg-[#2b2d31] p-4 text-white"
        style={{ borderColor: data.color || "#5865F2" }}
      >
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
            {data.fields.some((f) => f.name || f.value) && (
              <div className="mb-2 grid grid-cols-3 gap-2">
                {data.fields.map(
                  (field, i) =>
                    (field.name || field.value) && (
                      <div
                        key={i}
                        className={
                          field.inline ? "col-span-1" : "col-span-3"
                        }
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
                    ),
                )}
              </div>
            )}
          </div>

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
              {t(
                "dashboard.embedEmpty",
                "Fill in the fields to see a preview",
              )}
            </p>
          )}
      </div>
    </div>
  );
}
