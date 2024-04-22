import { supabase } from "@/app/utils/supabase"

export async function getData() {
  try {
    const { data: urls, error } = await supabase.from("urls").select("*")

    if (error) {
      throw new Error("Error al obtener datos: " + error.message)
    }

    return urls ?? null
  } catch (error) {
    console.error(error)
    return null
  }
}
