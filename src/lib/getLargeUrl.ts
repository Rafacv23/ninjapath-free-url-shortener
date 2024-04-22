import { supabase } from "./supabase"

export async function getLargeUrl(short_url: string) {
  let { data: url, error } = await supabase
    .from("urls")
    .select("large_url")
    .eq("short_url", short_url)
    .range(0, 1)

  if (error) {
    console.log(error)
  }
  console.log(url)
  return url
}
