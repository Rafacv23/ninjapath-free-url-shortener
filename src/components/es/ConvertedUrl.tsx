import React from "react"
import { copyUrlToClipboard } from "../../utils/copyUrlToClipboard"

export default function ConvertedUrl({ convertedUrl }: string) {
  return (
    <div>
      <h4>{convertedUrl}</h4>
      <button onClick={() => copyUrlToClipboard(convertedUrl)}>Copiar</button>
    </div>
  )
}

// hay que añadir botón de copiar la url nueva
