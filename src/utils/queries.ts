import { supabase } from "@/utils/db/supabase"
import type { FetchedUrl } from "@/types/definitions"

export async function getShortUrl(large_url: string) {
  let { data: url, error } = await supabase
    .from("urls")
    .select("short_url")
    .eq("large_url", large_url)

  if (error) {
    console.log(error)
  }
  return url
}

export async function getUserUrls(email: string): Promise<FetchedUrl[]> {
  let { data: urls, error } = await supabase
    .from("urls")
    .select("large_url, short_url, clicks, created_at")
    .eq("created_by", email)
    .order("created_at", { ascending: false })
    .limit(10)
    .select()

  if (error) {
    console.log(error)
  }

  if (!urls) {
    return []
  }
  return urls
}
