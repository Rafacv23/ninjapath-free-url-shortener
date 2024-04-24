import { supabase } from "./supabase"
import { getShortUrl } from "./getShortUrl.ts"
import { generateShortUrl } from "../utils/generateShortUrl.ts"
import { findExistingLargeUrl } from "./findExistingLargeUrl.ts"
import { SITE_URL } from "../utils/constants.ts"

export async function sendUrl(
  url: string,
  alias?: string
): Promise<string | Response> {
  try {
    const urlExists = await findExistingLargeUrl(url)
    if (urlExists) {
      // Si la URL ya existe en la base de datos, devuelve la URL corta existente
      console.log("La URL ya existe en la base de datos")
      const urls = await getShortUrl(url)
      const short_url = urls?.map((url) => url.short_url)
      return `${SITE_URL}/${short_url}`
    } else {
      // Si se proporciona un alias, usarlo en lugar de generar uno nuevo
      if (alias) {
        await supabase
          .from("urls")
          .insert([{ large_url: url, short_url: alias }])
          .select()
        console.log(
          "La URL ha sido creada correctamente con el alias proporcionado"
        )
        return `${SITE_URL}/${alias}`
      } else {
        // Si no se proporciona un alias, generar uno nuevo
        const short_url = generateShortUrl()
        await supabase
          .from("urls")
          .insert([{ large_url: url, short_url: short_url }])
          .select()
        console.log("La URL ha sido creada correctamente")
        return `${SITE_URL}/${short_url}`
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    // En caso de error, devuelve una respuesta adecuada
    return new Response("Error al procesar la solicitud", { status: 500 })
  }
}
