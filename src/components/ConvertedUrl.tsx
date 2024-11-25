import React from "react"
import { copyUrlToClipboard } from "../utils/copyUrlToClipboard"
import type { convertedUrl } from "../utils/definitions"
import "../styles/ShareBtns.css"
import { IconBoxArrowUpRight } from "../utils/icons"
import ShareRRSS from "./share/ShareRRSS"
import ShareQR from "./share/ShareQR"
import { Copy } from "lucide-react"

const ConvertedUrl = ({ convertedUrl }: convertedUrl) => {
  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <h4 className="text-xl font-semibold my-4">{convertedUrl}</h4>
        <button
          className="bg-violet-500 text-violet-50 shadow hover:bg-violet-800 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          onClick={() => copyUrlToClipboard(convertedUrl)}
        >
          <Copy />
        </button>
      </div>
      <div>
        <a href={convertedUrl} target="_blank" rel="noreferrer">
          <IconBoxArrowUpRight />
        </a>
        <ShareQR convertedUrl={convertedUrl} />
        <ShareRRSS convertedUrl={convertedUrl} />
      </div>
    </div>
  )
}

export default ConvertedUrl
