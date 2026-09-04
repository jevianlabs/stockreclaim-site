import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The public marketing origin. Change to the real domain before launch — it
// feeds the sitemap and canonical URLs.
const SITE = process.env.SITE_URL || "https://getstockreclaim.com";

// https://astro.build
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  // Static output: no server, cheapest possible hosting (Cloudflare Pages,
  // Netlify, GitHub Pages, or Fly static). The embedded app stays separate.
  output: "static",
  build: { format: "directory" },
});
