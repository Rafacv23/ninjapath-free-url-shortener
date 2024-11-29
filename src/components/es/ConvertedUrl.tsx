import React from "react"
import { copyUrlToClipboard } from "../../utils/copyUrlToClipboard"
import type { convertedUrl } from "../../utils/definitions"
import ShareRRSS from "./share/ShareRRSS"
import { IconBoxArrowUpRight } from "../../utils/icons"
import ShareQR from "./share/ShareQR"

export default function ConvertedUrl({ convertedUrl }: convertedUrl) {
  return (
    <div>
      <h4>{convertedUrl}</h4>
      <div className="btns">
        <a
          data-tooltip="Visitar URL"
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
          data-tooltip="Copiar al portapapeles"
          className="contrast"
          data-placement="bottom"
          onClick={() => copyUrlToClipboard(convertedUrl)}
        >
          Copiar
        </button>
      </div>
    </div>
  )
}
