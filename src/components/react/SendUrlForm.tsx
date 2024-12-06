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
import { t } from "i18next"

export default function SendUrlForm({ email }: { email?: string | undefined }) {
  const [url, setUrl] = useState("")
  const [alias, setAlias] = useState("")
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    !isValidUrl(url)
      ? toast({
          title: t("index.toast-error"),
          description: t("index.toast-error-description"),
          variant: "destructive",
        })
      : null

    try {
      setLoading(true)

      if (!alias) {
        const response = await sendUrl(url, undefined, email)
        setConvertedUrl(response)
        toast({
          title: t("index.toast-success"),
          description: t("index.toast-success-description"),
        })
      } else {
        if (alias && (alias.length < 2 || alias.length > 20)) {
          toast({
            title: t("index.toast-error"),
            description: t("index.toast-error-description-two"),
            variant: "destructive",
          })
        } else {
          // check if the alias is already in use
          const aliasExists = await checkAlias(alias)
          if (aliasExists) {
            const response = await sendUrl(url, alias, email)
            setConvertedUrl(response)
            toast({
              title: t("index.toast-success"),
              description: t("index.toast-success-description"),
            })
          } else {
            toast({
              title: t("index.toast-error"),
              description: t("index.toast-error-description-three"),
              variant: "destructive",
            })
          }
        }
      }
    } catch (error) {
      console.error("Error sending the URL:", error)
      toast({
        title: t("index.toast-error"),
        description: t("index.toast-error-description-four"),
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
            <Label htmlFor="url">{t("index.label-one")}</Label>
            <div className="grid gap-2 grid-cols-[1fr_auto] items-center">
              <Input
                id="url"
                placeholder={t("index.placeholder-one")}
                type="url"
                name="url"
                value={url}
                onChange={(event) => handleChange(event, setUrl)}
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
                <X className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
            <Label htmlFor="alias">{t("index.label-two")}</Label>
            <div className="grid gap-2 grid-cols-[1fr_auto] items-center">
              <Input
                type="text"
                min={2}
                max={20}
                placeholder={t("index.placeholder-two")}
                id="alias"
                name="alias"
                value={alias}
                disabled={loading || !url}
                onChange={(event) => handleChangeAlias(event, setAlias)}
              />
              <Button
                variant={"destructive"}
                onClick={() => setAlias("")}
                className={`w-auto ${alias ? "" : "hidden"}`}
                disabled={loading}
                type="button"
              >
                <X className="h-[1.2rem] w-[1.2rem]" />
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
                <span aria-busy="true">{t("index.loading-btn")}</span>
              ) : (
                t("index.btn")
              )}
            </HoverBorderGradient>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4">
        {convertedUrl && <ConvertedUrl convertedUrl={convertedUrl} />}
      </div>
    </div>
  )
}
