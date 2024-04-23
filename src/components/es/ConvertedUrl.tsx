import React from "react"
import { copyUrlToClipboard } from "../../utils/copyUrlToClipboard"
import type { convertedUrl } from "../../utils/definitions"

export default function ConvertedUrl({ convertedUrl }: convertedUrl) {
  return (
    <div>
      <h4>{convertedUrl}</h4>
      <button onClick={() => copyUrlToClipboard(convertedUrl)}>Copiar</button>
    </div>
  )
}
