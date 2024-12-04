/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@clerk/astro/env" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string
  readonly PUBLIC_SUPABASE_ANON_KEY: string
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string
  readonly CLERK_SECRET_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
