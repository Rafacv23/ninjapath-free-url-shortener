import React, { useState } from "react"
import { sendUrl } from "../lib/sendUrl"
import ConvertedUrl from "./ConvertedUrl"
import { isValidUrl } from "../utils/isValidUrl"
import { findExistingShortUrl } from "../lib/findExistingShortUrl"
import { handleChange, handleChangeAlias } from "../utils/handleFunctions"
import { X } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { HoverBorderGradient } from "./ui/hover-border-gradient"

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
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Label htmlFor="url">Shorten a long URL</Label>
        <div className="flex gap-2 w-full justify-between">
          <Input
            id="url"
            placeholder="*Enter a long link here"
            type="url"
            name="url"
            value={url}
            onChange={() => handleChange(event, setUrl)}
            required
          />
          <button
            onClick={() => setUrl("")}
            className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
          >
            <X />
          </button>
        </div>
        <Label htmlFor="alias">Customise your link</Label>
        <div className="flex gap-2 w-full justify-between">
          <Input
            type="text"
            min={2}
            max={20}
            placeholder="Enter alias"
            id="alias"
            name="alias"
            value={alias}
            onChange={() => handleChangeAlias(event, setAlias)}
          />
          <button
            onClick={() => setAlias("")}
            className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
          >
            <X />
          </button>
        </div>
        <HoverBorderGradient
          containerClassName="rounded-md"
          as={"button"}
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span aria-busy="true">Generating your link...</span>
          ) : (
            "Shorten URL"
          )}
        </HoverBorderGradient>
      </form>
      <div className="mt-4">
        {urlError && <p style={{ color: "red" }}>{urlError}</p>}
        {convertedUrl && <ConvertedUrl convertedUrl={convertedUrl} />}
      </div>
    </div>
  )
}
