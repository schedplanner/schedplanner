import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import paraglide from "@inlang/paraglide-astro";
import basicSsl from "@vitejs/plugin-basic-ssl";

import icon from "astro-icon";

export default defineConfig({
  output: "server",
  integrations: [tailwind(), paraglide({ project: "./schedplanner.inlang", outdir: "./src/paraglide" }), icon()],

  adapter: node({
    mode: "standalone",
  }),

  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
  },

  vite: {
    plugins: [basicSsl()],
    server: {
      https: process.env.DEV,
    },
  },
});
