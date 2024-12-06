import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { SITE_URL } from "./src/utils/constants"
import tailwind from "@astrojs/tailwind"
import clerk from "@clerk/astro"
import astroI18next from "astro-i18next"

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: "server",
  adapter: vercel(),
  integrations: [react(), sitemap(), tailwind(), clerk(), astroI18next()],
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    fallback: {
      es: "en",
    },
  },
})
