import { supabase } from "@/lib/supabase"

//check if the largeUrl is already in the database
export default async function checkLargeUrl(
  largeUrl: string
): Promise<boolean> {
  try {
    const url = await supabase
      .from("urls")
      .select("large_url")
      .eq("large_url", largeUrl)
      .single()

    // if url doesnt exists return false
    if (!url) {
      return false
    }

    // if url exists return true
    return true
  } catch (error) {
    console.error("Error checking largeUrl:", error)
    throw error
  }
}
