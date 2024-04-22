import { supabase } from "./supabase"
import { generateShortUrl } from "../utils/generateShortUrl.ts"
import { findExistingLargeUrl } from "./findExistingLargeUrl.ts"

export async function sendUrl(request: Request) {
  try {
    const data = await request.formData()
    const url = data.get("url")
    const short_url = generateShortUrl()
    console.log(url)

    const urlExists = await findExistingLargeUrl(url)

    if (urlExists) {
      // Si la URL ya existe en la base de datos, redirigir al usuario a /create/[url]
      return Response.redirect(`/create/${url}`)
    } else {
      // Si la URL no existe en la base de datos, insertarla y luego redirigir al usuario a /create/[url]
      await supabase
        .from("urls")
        .insert([{ large_url: url, short_url: short_url }])
        .select()
      return Response.redirect(`/create/${url}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    // En caso de error, podrías devolver una respuesta adecuada, por ejemplo:
    return new Response("Error al procesar la solicitud", { status: 500 })
  }
}
