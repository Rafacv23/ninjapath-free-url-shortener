import React, { useState } from "react"
import { sendUrl } from "../../lib/sendUrl"
import ConvertedUrl from "./ConvertedUrl"

export default function SendUrlForm() {
  const [url, setUrl] = useState("")
  const [convertedUrl, setConvertedUrl] = useState(null)
  const [urlError, setUrlError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidUrl(url)) {
      // Validar la URL antes de enviarla
      setUrlError("Por favor introduce una URL válida.")
      return
    }
    try {
      setLoading(true)
      const response = await sendUrl(url)
      setConvertedUrl(response)
      setUrlError("") // Limpiar el mensaje de error si la URL es válida
    } catch (error) {
      console.error("Error al enviar la URL:", error)
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
    } finally {
      setLoading(false)
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
          type="text"
          placeholder="Pon aquí tu link"
          name="url"
          id="url"
          value={url}
          onChange={handleChange}
          required
        />
        <small>Acortar URLs</small>
        <button type="submit" disabled={loading}>
          {loading ? (
            <span aria-busy="true">Generando tu enlace...</span>
          ) : convertedUrl ? (
            "Acortar otra URL"
          ) : (
            "Acortar URL"
          )}
        </button>
      </form>
      {urlError && <p style={{ color: "red" }}>{urlError}</p>}
      {convertedUrl && <ConvertedUrl convertedUrl={convertedUrl} />}
    </>
  )
}
