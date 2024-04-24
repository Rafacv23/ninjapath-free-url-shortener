import React, { useState } from "react"
import { sendUrl } from "../../lib/sendUrl"
import { findExistingShortUrl } from "../../lib/findExistingShortUrl"
import ConvertedUrl from "./ConvertedUrl"
import { isValidUrl } from "../../utils/isValidUrl"
import { handleChange, handleChangeAlias } from "../../utils/handleFunctions"
export default function SendUrlForm() {
  const [url, setUrl] = useState("")
  const [alias, setAlias] = useState("")
  const [convertedUrl, setConvertedUrl] = useState(null)
  const [urlError, setUrlError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidUrl(url)) {
      // Validar la URL antes de enviarla
      setUrlError("Please enter a valid URL.")
      return
    }

    try {
      setLoading(true)
      let response
      if (alias) {
        const validAlias = await findExistingShortUrl(alias)
        if (validAlias) {
          setUrlError("Este alias ya se ha utilizado, prueba con otro.")
          setLoading(false)
          return
        } else {
          response = await sendUrl(url, alias)
        }
      } else {
        response = await sendUrl(url)
      }
      setConvertedUrl(response)
      setUrlError("") // Limpiar el mensaje de error si la URL es válida
    } catch (error) {
      console.error("Error al enviar la URL:", error)
      // Manejar el error, mostrar un mensaje de error al usuario, etc.
    } finally {
      setLoading(false)
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
          onChange={() => handleChange(event, setUrl)}
          required
        />
        <small>Acortar URLs</small>
        <input
          type="text"
          min={2}
          max={20}
          placeholder="Introduce tu propio alias"
          name="alias"
          id="alias"
          value={alias}
          onChange={() => handleChangeAlias(event, setAlias)}
        />
        <small>Personaliza tu enlace</small>
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
