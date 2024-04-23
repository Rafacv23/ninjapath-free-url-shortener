import { supabase } from "./supabase"
import { generateShortUrl } from "../utils/generateShortUrl.ts"
import { getShortUrl } from "./getShortUrl.ts"
import { findExistingLargeUrl } from "./findExistingLargeUrl.ts"
import { SITE_URL } from "../utils/constants.ts"

export async function sendUrl(url: string): Promise<string | Response> {
  try {
    const urlExists = await findExistingLargeUrl(url)
    if (urlExists) {
      // Si la URL ya existe en la base de datos, devuelve la URL corta
      console.log("La url ya existe en la base de datos")
      const urls = await getShortUrl(url)
      const short_url = urls?.map((url) => url.short_url)
      return `${SITE_URL}/${short_url}`
    } else {
      // Si la URL no existe en la base de datos, insertarla y luego devolver la URL corta
      const short_url = generateShortUrl()
      await supabase
        .from("urls")
        .insert([{ large_url: url, short_url: short_url }])
        .select()
      console.log("La url ha sido creada correctamente")
      return `${SITE_URL}/${short_url}`
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    // En caso de error, devuelve una respuesta adecuada
    return new Response("Error al procesar la solicitud", { status: 500 })
  }
}
