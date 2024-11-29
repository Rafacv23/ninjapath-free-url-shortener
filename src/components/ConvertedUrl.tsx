import { copyUrlToClipboard } from "@/actions/copyUrlToClipboard"
import type { convertedUrl } from "@/utils/definitions"
import { Copy, MoveUpRight, Share } from "lucide-react"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import ShareOptions from "@/components/ShareOptions"

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
      text: "Share",
      element: <ShareOptions convertedUrl={convertedUrl} />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <a
            href={convertedUrl}
            className="flex items-center gap-2 hover:text-primary hover:transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            {convertedUrl} <MoveUpRight />
          </a>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <ul>
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
        </ul>
      </CardFooter>
    </Card>
  )
}

export default ConvertedUrl
