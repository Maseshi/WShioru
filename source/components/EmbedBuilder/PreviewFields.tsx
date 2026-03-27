import type { EmbedData } from "./types";

export default function PreviewFields({
  fields,
  thumbnail,
}: {
  fields: EmbedData["fields"];
  thumbnail: string;
}) {
  const hasFields = fields.some((f) => f.name || f.value);
  if (!hasFields && !thumbnail) return null;

  return (
    <div className="flex gap-4">
      <div className="min-w-0 flex-1">
        {hasFields && (
          <div className="mb-2 grid grid-cols-3 gap-2">
            {fields.map(
              (field, i) =>
                (field.name || field.value) && (
                  <div
                    key={i}
                    className={field.inline ? "col-span-1" : "col-span-3"}
                  >
                    {field.name && (
                      <div className="text-xs font-semibold">{field.name}</div>
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
      {thumbnail && (
        <img
          src={thumbnail}
          alt=""
          className="size-20 rounded object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  );
}
