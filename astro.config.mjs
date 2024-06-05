import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import react from "@astrojs/react"

import sitemap from "@astrojs/sitemap"
import { SITE_URL } from "./src/utils/constants"

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: "server",
  adapter: vercel(),
  integrations: [react(), sitemap()],
})
