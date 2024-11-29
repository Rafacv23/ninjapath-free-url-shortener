import { supabase } from "@/lib/supabase"

export async function getLargeUrl(short_url?: string) {
  let { data: urls, error } = await supabase
    .from("urls")
    .select("large_url")
    .eq("short_url", short_url)
    .range(0, 1)

  if (error) {
    console.log(error)
    return null // Manejar el error adecuadamente según tus necesidades
  }

  const firstUrl = urls && urls.length > 0 ? urls[0] : null // Obtener el primer elemento del array 'urls'

  if (firstUrl) {
    const { large_url } = firstUrl // Desestructurar el primer elemento para obtener directamente 'large_url'
    console.log(large_url)
    return large_url
  } else {
    return null // Manejar el caso cuando no se encuentra la URL correspondiente al short_url
  }
}
