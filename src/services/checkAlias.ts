// check if the shortUrl is already in the database (with alias or without)

export default async function checkAlias(alias: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/url/short/${alias}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    //if response fails the alias doesnt exists
    if (response.status === 404 || response.status === 406) {
      return false
    }

    // if response is ok, alias exists
    if (response.ok) {
      return true
    }

    // Other http errors
    const errorData = await response.json()
    throw new Error(errorData.error || `Error fetching URL: ${response.status}`)
  } catch (error) {
    console.error("Error checking shortUrl:", error)
    throw error
  }
}
