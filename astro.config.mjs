import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL || "https://example.github.io/cash-and-code";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  output: "static",
  integrations: [react(), sitemap()],
  trailingSlash: "always",
});
