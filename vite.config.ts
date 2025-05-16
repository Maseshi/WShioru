import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sitemap from "vite-plugin-sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://shiorus.web.app/",
      dynamicRoutes: ["/privacy-policy", "/cookie-policy", "/terms-of-use"],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "source") }],
  },
});
