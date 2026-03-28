import { useTranslation } from "react-i18next";
import type { EmbedData } from "./types";
import PreviewAuthor from "./PreviewAuthor";
import PreviewFields from "./PreviewFields";
import PreviewFooter from "./PreviewFooter";

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
        <PreviewAuthor author={data.author} />

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

        {data.description && (
          <p className="mb-2 text-sm text-[#dbdee1] whitespace-pre-wrap">
            {data.description}
          </p>
        )}

        <PreviewFields fields={data.fields} thumbnail={data.thumbnail} />

        {data.image && (
          <img
            src={data.image}
            alt=""
            className="mt-2 max-h-64 w-full rounded object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}

        <PreviewFooter footer={data.footer} timestamp={data.timestamp} />

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
