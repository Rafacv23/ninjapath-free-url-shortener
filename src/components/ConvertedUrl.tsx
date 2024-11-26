import React from "react"
import { copyUrlToClipboard } from "../utils/copyUrlToClipboard"
import type { convertedUrl } from "../utils/definitions"
import "../styles/ShareBtns.css"
import { IconBoxArrowUpRight } from "../utils/icons"
import ShareRRSS from "./share/ShareRRSS"
import ShareQR from "./share/ShareQR"
import { Copy } from "lucide-react"
import { Card, CardDescription, CardTitle } from "./ui/card"

const ConvertedUrl = ({ convertedUrl }: convertedUrl) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <CardTitle className="text-xl font-semibold my-4">
          {convertedUrl}
        </CardTitle>
        <div className="flex flex-row gap-4 items-center">
          <button
            className="bg-violet-500 text-violet-50 shadow hover:bg-violet-800 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={() => copyUrlToClipboard(convertedUrl)}
          >
            <Copy />
          </button>
          <ShareRRSS convertedUrl={convertedUrl} />
          <a href={convertedUrl} target="_blank" rel="noreferrer">
            <IconBoxArrowUpRight />
          </a>
          <ShareQR convertedUrl={convertedUrl} />
        </div>
      </div>
    </Card>
  )
}

export default ConvertedUrl
