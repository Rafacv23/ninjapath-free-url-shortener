// search in the db to an existing largeUrl
import { supabase } from "./supabase"

export async function findExistingShortUrl(short_url: string) {
  try {
    const { data: urls, error } = await supabase
      .from("urls")
      .select("short_url")
      .eq("short_url", short_url)

    if (error) {
      throw error
    }

    // Si hay algún resultado, significa que encontró una coincidencia
    if (urls.length > 0) {
      return true
    }
  } catch (error) {
    console.error("Error al buscar la URL grande en la base de datos:")
    return false // Devuelve false en caso de error
  }
}
