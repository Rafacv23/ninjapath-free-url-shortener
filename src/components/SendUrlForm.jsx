import React, { useState } from "react"
import { sendUrl } from "../lib/sendUrl"
import ConvertedUrl from "./ConvertedUrl"
import { isValidUrl } from "../utils/isValidUrl"
import { findExistingShortUrl } from "../lib/findExistingShortUrl"
import { handleChange, handleChangeAlias } from "../utils/handleFunctions"
import { X } from "lucide-react"

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

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <span className="flex gap-1 items-center">
          <input
            type="url"
            placeholder="*Enter a long link here"
            name="url"
            id="url"
            value={url}
            onChange={() => handleChange(event, setUrl)}
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
          <button
            onClick={() => setUrl("")}
            className="bg-red-500 text-violet-50 shadow hover:bg-red-800 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <X />
          </button>
        </span>
        <small>Shorten a long URL</small>
        <span className="flex gap-2 items-center">
          <input
            type="text"
            min={2}
            max={20}
            placeholder="Enter alias"
            name="alias"
            id="alias"
            value={alias}
            onChange={() => handleChangeAlias(event, setAlias)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
          <button
            onClick={() => setAlias("")}
            className="bg-red-500 text-violet-50 shadow hover:bg-red-800 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <X />
          </button>
        </span>
        <small>Customise your link</small>
        <button
          type="submit"
          disabled={loading}
          className="bg-violet-500 text-violet-50 shadow hover:bg-violet-800 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          {loading ? (
            <span aria-busy="true">Generating your link...</span>
          ) : (
            "Shorten URL"
          )}
        </button>
      </form>
      <div>
        {urlError && <p style={{ color: "red" }}>{urlError}</p>}
        {convertedUrl && <ConvertedUrl convertedUrl={convertedUrl} />}
      </div>
    </div>
  )
}
