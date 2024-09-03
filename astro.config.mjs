import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import paraglide from "@inlang/paraglide-astro";

export default defineConfig({
  output: "server",
  integrations: [tailwind(), paraglide({ project: "./schedplanner.inlang", outdir: "./src/paraglide" })],

  adapter: node({
    mode: "standalone",
  }),

  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
  },
});
