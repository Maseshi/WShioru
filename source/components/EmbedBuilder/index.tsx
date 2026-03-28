import type { EmbedData } from "./types";
import EmbedEditor from "./EmbedEditor";
import EmbedPreview from "./EmbedPreview";

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
  const update = (partial: Partial<EmbedData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <EmbedEditor data={data} update={update} onSave={onSave} saving={saving} />
      <EmbedPreview data={data} />
    </div>
  );
}
