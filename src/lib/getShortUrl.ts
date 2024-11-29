import { supabase } from "@/lib/supabase"

export async function getShortUrl(large_url: string) {
  let { data: url, error } = await supabase
    .from("urls")
    .select("short_url")
    .eq("large_url", large_url)

  if (error) {
    console.log(error)
  }
  console.log(url)
  return url
}
