export interface EmbedData {
  author: { name: string; url: string; iconURL: string };
  color: string;
  title: string;
  url: string;
  description: string;
  thumbnail: string;
  fields: { name: string; value: string; inline: boolean }[];
  image: string;
  timestamp: string;
  footer: { text: string; iconURL: string };
}

export const defaultEmbed: EmbedData = {
  author: { name: "", url: "", iconURL: "" },
  color: "#5865F2",
  title: "",
  url: "",
  description: "",
  thumbnail: "",
  fields: [
    { name: "", value: "", inline: false },
    { name: "", value: "", inline: false },
  ],
  image: "",
  timestamp: "",
  footer: { text: "", iconURL: "" },
};
