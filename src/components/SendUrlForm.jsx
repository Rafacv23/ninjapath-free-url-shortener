import React, { useState } from "react"
import { sendUrl } from "../lib/sendUrl"
import ConvertedUrl from "./ConvertedUrl"

export default function SendUrlForm() {
  const [url, setUrl] = useState("")
  const [convertedUrl, setConvertedUrl] = useState(null)
  const [urlError, setUrlError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidUrl(url)) {
      // Validar la URL antes de enviarla
      setUrlError("Please enter a valid URL.")
      return
    }
    try {
      const response = await sendUrl(url)
      setConvertedUrl(response)
      setUrlError("") // Limpiar el mensaje de error si la URL es válida
    } catch (error) {
      console.error("Error al enviar la URL:", error)
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
    }
  }

  const handleChange = (event) => {
    setUrl(event.target.value)
  }

  // Función de validación de URL simple
  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter a long link here"
          name="url"
          id="url"
          value={url}
          onChange={handleChange}
          required
        />
        <small>Shorten a long URL</small>
        <button type="submit">
          {convertedUrl ? "Shorten another URL" : "Shorten URL"}
        </button>
      </form>
      {urlError && <p style={{ color: "red" }}>{urlError}</p>}
      {convertedUrl && <ConvertedUrl convertedUrl={convertedUrl} />}
    </>
  )
}
