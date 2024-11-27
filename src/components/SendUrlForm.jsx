import React, { useState } from "react"
import { sendUrl } from "@/lib/sendUrl"
import ConvertedUrl from "@/components/ConvertedUrl"
import { isValidUrl } from "@/utils/isValidUrl"
import { findExistingShortUrl } from "@/lib/findExistingShortUrl"
import { handleChange, handleChangeAlias } from "@/utils/handleFunctions"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

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
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
            <Label htmlFor="url">Shorten a long URL</Label>
            <div className="grid gap-2 grid-cols-[1fr_auto] items-center">
              <Input
                id="url"
                placeholder="*Enter a long link here"
                type="url"
                name="url"
                value={url}
                onChange={() => handleChange(event, setUrl)}
                required
                disabled={loading}
              />
              <Button
                variant={"destructive"}
                onClick={() => setUrl("")}
                className={`w-auto ${url ? "" : "hidden"}`}
                disabled={loading}
                type="button"
              >
                <X />
              </Button>
            </div>
            <Label htmlFor="alias">Customise your link</Label>
            <div className="grid gap-2 grid-cols-[1fr_auto] items-center">
              <Input
                type="text"
                min={2}
                max={20}
                placeholder="Enter alias"
                id="alias"
                name="alias"
                value={alias}
                disabled={loading || !url}
                onChange={() => handleChangeAlias(event, setAlias)}
              />
              <Button
                variant={"destructive"}
                onClick={() => setAlias("")}
                className={`w-auto ${alias ? "" : "hidden"}`}
                disabled={loading}
                type="button"
              >
                <X />
              </Button>
            </div>

            <HoverBorderGradient
              containerClassName="rounded-md w-full"
              as={"button"}
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 place-content-center"
              type="submit"
              disabled={loading}
              primaryColor="#63e"
            >
              {loading ? (
                <span aria-busy="true">Generating your link...</span>
              ) : (
                "Shorten URL"
              )}
            </HoverBorderGradient>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4">
        {urlError && (
          <Card>
            <CardTitle className="text-red-500 p-4">Error</CardTitle>
            <CardContent>{urlError}</CardContent>
          </Card>
        )}
        {convertedUrl && <ConvertedUrl convertedUrl={convertedUrl} />}
      </div>
    </div>
  )
}
