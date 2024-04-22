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

    return short_url

    // Añadir verificación, si ya existe una large_url devolverle al usuario directamente la short_url, sin insertar nada nuevo en la base de datos
    // cuando se inserta en la base de datos, tenemos que devolver la short_url
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
