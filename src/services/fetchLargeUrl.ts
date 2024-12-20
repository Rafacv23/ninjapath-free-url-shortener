import { supabase } from "@/lib/supabase"
import { SITE_URL } from "@/utils/constants"

// check if the shortUrl is already in the database (with alias or without)
export default async function fetchLargeUrl(
  url: string | undefined
): Promise<string | null> {
  if (!url) {
    return null
  }

  try {
    const response = await fetch(`${SITE_URL}/api/url/short/${url}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.error || `Error fetching URL: ${response.status}`
      )
    }

    const data = await response.json()

    // Add +1 click to the url in the database
    const { error: updateError } = await supabase
      .from("urls")
      .update({
        clicks: supabase.rpc("increment", { column_name: "clicks", amount: 1 }),
      })
      .eq("short_url", url)

    if (updateError) {
      console.error("Error updating clicks:", updateError.message)
    }

    return data.data.large_url || null
  } catch (error) {
    console.error("Error checking shortUrl:", error)
    return null
  }
}
