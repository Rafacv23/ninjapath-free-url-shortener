import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { SITE_URL } from "./src/utils/constants"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: "server",
  adapter: vercel(),
  integrations: [react(), sitemap(), tailwind()],
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    fallback: {
      es: "en",
    },
  },
})
