import { supabase } from "@/lib/supabase"
import { getShortUrl } from "@/lib/getShortUrl.ts"
import { generateShortUrl } from "@/actions/generateShortUrl.ts"
import { findExistingLargeUrl } from "@/lib/findExistingLargeUrl.ts"
import { SITE_URL } from "@/utils/constants.ts"
import useUrlStore from "@/lib/useUrlStore.ts"

export async function sendUrl(
  url: string,
  alias?: string
): Promise<string | Response> {
  try {
    const urlExists = await findExistingLargeUrl(url)
    const date = new Date().toISOString()
    const { addUrl } = useUrlStore.getState()
    if (urlExists) {
      console.log("La URL ya existe en la base de datos")
      const urls = await getShortUrl(url)
      const short_url = urls?.[0]?.short_url
      const convertedUrl = `${SITE_URL}/${short_url}`
      addUrl({ originalUrl: url, convertedUrl, date })
      return convertedUrl
    } else {
      const short_url = alias || generateShortUrl()
      await supabase
        .from("urls")
        .insert([{ large_url: url, short_url }])
        .select()
      const convertedUrl = `${SITE_URL}/${short_url}`
      addUrl({ originalUrl: url, convertedUrl, date })
      return convertedUrl
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return new Response("Error al procesar la solicitud", { status: 500 })
  }
}
