export default async function checkAlias(alias: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/url/short/${alias}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Parse the JSON response
    const responseData = await response.json()

    // Check if alias exists based on response structure
    if (response.ok && responseData.data) {
      return true // Alias exists
    }

    // Alias doesn't exist or an error occurred
    if (responseData.error) {
      console.log(`Error: ${responseData.error.message}`)
      if (
        responseData.error.code === "PGRST116" &&
        responseData.error.message ===
          "JSON object requested, multiple (or no) rows returned"
      ) {
        return false // Alias does not exist
      }
    }

    // Handle unexpected cases
    throw new Error(
      responseData.error?.message || `Unexpected response: ${response.status}`
    )
  } catch (error) {
    console.error("Error checking shortUrl:", error)
    throw error
  }
}
