import { supabase } from "@/lib/supabase"
import { getShortUrl } from "@/lib/getShortUrl.ts"
import { generateShortUrl } from "@/actions/generateShortUrl.ts"
import { SITE_URL } from "@/utils/constants.ts"
import checkLargeUrl from "@/services/checkLargeUrl"

export async function sendUrl(
  url: string,
  alias?: string,
  email?: string
): Promise<string> {
  try {
    const urlExists = await checkLargeUrl(url)

    if (urlExists) {
      const urls = await getShortUrl(url)
      const short_url = urls?.[0]?.short_url
      const convertedUrl = `${SITE_URL}/${short_url}`
      return convertedUrl
    } else {
      const short_url = alias || generateShortUrl()
      await supabase
        .from("urls")
        .insert([{ large_url: url, short_url, created_by: email }])
        .select()
      const convertedUrl = `${SITE_URL}/${short_url}`
      return convertedUrl
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw new Error("An error occurred while processing the request")
  }
}
