import { supabase } from "@/lib/supabase"
import { getShortUrl } from "@/lib/getShortUrl.ts"
import { generateShortUrl } from "@/actions/generateShortUrl.ts"
import { SITE_URL } from "@/utils/constants.ts"
import useUrlStore from "@/lib/useUrlStore.ts"
import checkLargeUrl from "@/services/checkLargeUrl"

export async function sendUrl(
  url: string,
  alias?: string
): Promise<string | Response> {
  const date = new Date().toISOString()
  const { addUrl } = useUrlStore.getState()
  try {
    const urlExists = await checkLargeUrl(url)
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error(`Error fetching user data: ${error.message}`)
    }

    if (urlExists) {
      const urls = await getShortUrl(url)
      const short_url = urls?.[0]?.short_url
      const convertedUrl = `${SITE_URL}/${short_url}`
      addUrl({
        originalUrl: url,
        convertedUrl,
        date,
        created_by: user?.email || null,
      })
      return convertedUrl
    } else {
      const short_url = alias || generateShortUrl()
      await supabase
        .from("urls")
        .insert([{ large_url: url, short_url }])
        .select()
      const convertedUrl = `${SITE_URL}/${short_url}`
      addUrl({
        originalUrl: url,
        convertedUrl,
        date,
        created_by: user?.email || null,
      })
      return convertedUrl
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return new Response("Error al procesar la solicitud", { status: 500 })
  }
}
