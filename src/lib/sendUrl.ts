import { supabase } from "./supabase"
import { generateShortUrl } from "./generateShortUrl.ts"

export async function sendUrl(request: Request) {
  try {
    const data = await request.formData()
    const url = data.get("url")
    const short_url = generateShortUrl()
    console.log(url)

    await supabase
      .from("urls")
      .insert([{ large_url: url, short_url: short_url }])
      .select()

    // Hacer algo con los datos
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
