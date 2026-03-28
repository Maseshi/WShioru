import type { EmbedData } from "./types";

export default function PreviewAuthor({ author }: { author: EmbedData["author"] }) {
  if (!author.name) return null;
  return (
    <div className="mb-2 flex items-center gap-2 text-xs">
      {author.iconURL && (
        <img
          src={author.iconURL}
          alt=""
          className="size-6 rounded-full"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
      {author.url ? (
        <a
          href={author.url}
          className="font-medium text-white hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {author.name}
        </a>
      ) : (
        <span className="font-medium">{author.name}</span>
      )}
    </div>
  );
}
