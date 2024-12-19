import React, { useState } from "react"
import { sendUrl } from "@/lib/sendUrl"
import ConvertedUrl from "@/components/react/ConvertedUrl"
import { isValidUrl } from "@/utils/isValidUrl"
import { handleChange, handleChangeAlias } from "@/actions/handleFunctions"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import checkAlias from "@/services/checkAlias"

export default function SendUrlForm({ email }: { email?: string }) {
  const [url, setUrl] = useState("")
  const [alias, setAlias] = useState("")
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!isValidUrl(url)) {
      toast({
        title: "Error",
        description: "Invalid URL provided.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      if (alias) {
        if (alias.length < 2 || alias.length > 20) {
          toast({
            title: "Error",
            description: "Alias must be between 2 and 20 characters.",
            variant: "destructive",
          })
          return
        }

        const aliasExists = await checkAlias(alias)

        console.log(aliasExists)

        if (aliasExists) {
          toast({
            title: "Error",
            description: "Alias already in use. Try another one.",
            variant: "destructive",
          })
          return
        }
      }

      const response = await sendUrl(url, alias || undefined, email)
      setConvertedUrl(response)
      toast({
        title: "Success",
        description: "URL shortened successfully.",
      })
    } catch (error) {
      console.error("Error sending the URL:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
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
                onChange={(event) => handleChange(event, setUrl)}
                required
                disabled={loading}
              />
              {url && (
                <Button
                  variant={"destructive"}
                  onClick={() => setUrl("")}
                  className="w-auto"
                  disabled={loading}
                  type="button"
                >
                  <X className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              )}
            </div>
            <Label htmlFor="alias">Customise your link</Label>
            <div className="grid gap-2 grid-cols-[1fr_auto] items-center">
              <Input
                type="text"
                placeholder="Enter alias"
                id="alias"
                name="alias"
                value={alias}
                onChange={(event) => handleChangeAlias(event, setAlias)}
                disabled={loading || !url}
              />
              {alias && (
                <Button
                  variant={"destructive"}
                  onClick={() => setAlias("")}
                  className="w-auto"
                  disabled={loading}
                  type="button"
                >
                  <X className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              )}
            </div>
            <HoverBorderGradient
              containerClassName="rounded-md w-full"
              as={"button"}
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 place-content-center"
              type="submit"
              disabled={loading}
              primaryColor="#63e"
            >
              {loading ? "Generating your link..." : "Shorten URL"}
            </HoverBorderGradient>
          </form>
        </CardContent>
      </Card>

      {convertedUrl && (
        <div className="mt-4">
          <ConvertedUrl convertedUrl={convertedUrl} />
        </div>
      )}
    </div>
  )
}
