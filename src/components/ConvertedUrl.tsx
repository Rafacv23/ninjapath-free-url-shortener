import React from "react"
import { copyUrlToClipboard } from "../utils/copyUrlToClipboard"
import type { convertedUrl } from "../utils/definitions"
import "../styles/ShareBtns.css"
import { IconBoxArrowUpRight } from "../utils/icons"
import ShareRRSS from "./share/ShareRRSS"
import ShareQR from "./share/ShareQR"

const ConvertedUrl = ({ convertedUrl }: convertedUrl) => {
  return (
    <div>
      <h4>{convertedUrl}</h4>
      <div className="btns">
        <a
          data-tooltip="Visit URL"
          data-placement="bottom"
          className="contrast"
          href={convertedUrl}
          target="_blank"
          rel="noreferrer"
        >
          <IconBoxArrowUpRight />
        </a>
        <ShareQR convertedUrl={convertedUrl} />
        <ShareRRSS convertedUrl={convertedUrl} />
        <button
          data-tooltip="Copy to clipboard"
          className="contrast"
          data-placement="bottom"
          onClick={() => copyUrlToClipboard(convertedUrl)}
        >
          Copy
        </button>
      </div>
    </div>
  )
}

export default ConvertedUrl
