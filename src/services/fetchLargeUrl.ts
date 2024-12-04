import { supabase } from "@/lib/supabase"

// check if the shortUrl is already in the database (with alias or without)
export default async function fetchLargeUrl(
  url: string | undefined
): Promise<string> {
  try {
    const response = await fetch(
      `http://localhost:4321/api/url/short/${url}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.error || `Error fetching URL: ${response.status}`
      )
    }

    const data = await response.json()

    const updatedClicks = (data.data.clicks || 0) + 1

    const { error: updateError } = await supabase
      .from("urls")
      .update({ clicks: updatedClicks })
      .eq("short_url", url)

    if (updateError) {
      console.error("Error updating clicks:", updateError.message)
      throw new Error("Failed to update clicks")
    }

    return data.data.large_url
  } catch (error) {
    console.error("Error checking shortUrl:", error)
    throw error
  }
}
