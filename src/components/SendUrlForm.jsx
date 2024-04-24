import React, { useState } from "react"
import { sendUrl } from "../lib/sendUrl"
import ConvertedUrl from "./ConvertedUrl"
import { isValidUrl } from "../utils/isValidUrl"
import { findExistingShortUrl } from "../lib/findExistingShortUrl"

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
          setUrlError("This alias is already in use.")
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

  const handleChange = (event) => {
    setUrl(event.target.value)
  }

  const handleChangeAlias = (event) => {
    const value = event.target.value.replace(/\s/g, "")
    setAlias(value)
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
        <input
          type="text"
          min={2}
          max={20}
          placeholder="Enter alias"
          name="alias"
          id="alias"
          value={alias}
          onChange={handleChangeAlias}
        />
        <small>Customise your link</small>
        <button type="submit" disabled={loading}>
          {loading ? (
            <span aria-busy="true">Generating your link...</span>
          ) : (
            "Shorten URL"
          )}
        </button>
      </form>
      {urlError && <p style={{ color: "red" }}>{urlError}</p>}
      {convertedUrl && <ConvertedUrl convertedUrl={convertedUrl} />}
    </>
  )
}
