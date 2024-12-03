import { copyUrlToClipboard } from "@/actions/copyUrlToClipboard"
import type { convertedUrl } from "@/utils/definitions"
import { Copy, Share } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import ShareOptions from "@/components/react/ShareOptions"
import { ArrowUp } from "@/utils/icons"

const ConvertedUrl = ({ convertedUrl }: convertedUrl) => {
  const buttons = [
    {
      icon: Copy,
      text: "Copy link",
      element: (
        <Button onClick={() => copyUrlToClipboard(convertedUrl)}>
          <Copy className="h-[1.2rem] w-[1.2rem]" />{" "}
          <span className="hidden sm:block">Copy link</span>
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
    <Card className="flex flex-row items-center justify-between p-4 max-w-4xl">
      <CardHeader className="xl:p-0">
        <CardTitle>
          <a
            href={convertedUrl}
            className="inline-flex items-baseline font-medium leading-tight text-slate-100 hover:text-primary focus-visible:text-primary group/link text-base sm:text-xl"
            target="_blank"
            rel="noreferrer"
          >
            {convertedUrl}
            <ArrowUp />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="flex flex-row items-center gap-2">
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
      </CardContent>
    </Card>
  )
}

export default ConvertedUrl
