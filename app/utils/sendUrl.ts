export async function sendUrl(formData: FormData) {
  "use server"

  const rawFormData = {
    url: formData.get("url"),
  }

  console.log(rawFormData)

  // mutate data
  // revalidate cache
}
