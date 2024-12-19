import { SITE_URL } from "@/utils/constants"

// Check if the alias is already in use
export default async function checkAlias(alias: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/url/short/${alias}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(response.status)

    if (response.status === 200) {
      return true // Alias exists
    } else if (response.status === 404) {
      return false // Alias does not exist
    }

    // Handle unexpected statuses
    const errorData = await response.json()
    throw new Error(
      errorData.error || `Unexpected response: ${response.status}`
    )
  } catch (error) {
    console.error("Error checking alias:", error)
    throw new Error("Failed to check alias. Please try again later.")
  }
}
