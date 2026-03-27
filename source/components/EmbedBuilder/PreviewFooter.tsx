import type { EmbedData } from "./types";

export default function PreviewFooter({
  footer,
  timestamp,
}: {
  footer: EmbedData["footer"];
  timestamp: string;
}) {
  if (!footer.text && !timestamp) return null;
  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-[#a0a3a6]">
      {footer.iconURL && (
        <img
          src={footer.iconURL}
          alt=""
          className="size-5 rounded-full"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
      {footer.text}
      {footer.text && timestamp && <span>•</span>}
      {timestamp && new Date(timestamp).toLocaleDateString()}
    </div>
  );
}
