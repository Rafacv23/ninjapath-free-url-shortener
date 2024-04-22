import { supabase } from "./supabase"

export async function getUrls() {
  let { data: urls, error } = await supabase.from("urls").select("id")

  if (error) {
    console.log(error)
  }
  return urls
}
