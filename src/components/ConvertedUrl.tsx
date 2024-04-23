import React from "react"
import { copyUrlToClipboard } from "../utils/copyUrlToClipboard"
import type { convertedUrl } from "../utils/definitions"

const ConvertedUrl = ({ convertedUrl }: convertedUrl) => {
  return (
    <div>
      <h4>{convertedUrl}</h4>
      <button onClick={() => copyUrlToClipboard(convertedUrl)}>Copy</button>
    </div>
  )
}

export default ConvertedUrl
