import React from "react"
import { copyUrlToClipboard } from "../utils/copyUrlToClipboard"
import type { convertedUrl } from "../utils/definitions"

const ConvertedUrl = ({ convertedUrl }: convertedUrl) => {
  // Usar React.FC con la interfaz definida para los props
  return (
    <div>
      <h4>{convertedUrl}</h4>
      <button onClick={() => copyUrlToClipboard(convertedUrl)}>Copy</button>
    </div>
  )
}

export default ConvertedUrl
