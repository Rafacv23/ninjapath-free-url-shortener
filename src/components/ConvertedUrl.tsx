import { copyUrlToClipboard } from "@/utils/copyUrlToClipboard"
import type { convertedUrl } from "@/utils/definitions"
import "@/styles/ShareBtns.css"
import ShareRRSS from "@/components/share/ShareRRSS"
import ShareQR from "@/components/share/ShareQR"
import { Copy, MoveUpRight, Share } from "lucide-react"
import { Card, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const ConvertedUrl = ({ convertedUrl }: convertedUrl) => {
  const buttons = [
    {
      icon: Copy,
      text: "Copy",
      element: (
        <Button onClick={() => copyUrlToClipboard(convertedUrl)}>
          <Copy />
        </Button>
      ),
    },
    {
      icon: Share,
      text: "Share via RRSS",
      element: <ShareRRSS convertedUrl={convertedUrl} />,
    },
    {
      icon: Share,
      text: "Share via QR",
      element: <ShareQR convertedUrl={convertedUrl} />,
    },
  ]

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <a href={convertedUrl} target="_blank" rel="noreferrer">
          <CardTitle>
            {convertedUrl} <MoveUpRight />
          </CardTitle>
        </a>
        <div className="flex flex-row gap-4 items-center">
          {buttons.map((button) => (
            <TooltipProvider key={button.text}>
              <Tooltip>
                <TooltipTrigger>{button.element}</TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{button.text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ConvertedUrl
