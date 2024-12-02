import { copyUrlToClipboard } from "@/actions/copyUrlToClipboard"
import type { convertedUrl } from "@/utils/definitions"
import { Copy, MoveUpRight, Share } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import ShareOptions from "@/components/react/ShareOptions"

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
            <svg
              className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5253 5.49475L10.5206 7.49475L15.0782 7.50541L5.47473 17.0896L6.88752 18.5052L16.5173 8.89479L16.5065 13.5088L18.5065 13.5134L18.5253 5.51345L10.5253 5.49475Z"
                fill="currentColor"
              />
            </svg>
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
