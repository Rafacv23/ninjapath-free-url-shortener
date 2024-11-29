import type { MutableRefObject } from "react"

export const downloadQR = ({
  convertedUrl,
  qrRef,
}: {
  convertedUrl: string
  qrRef: MutableRefObject<HTMLDivElement | null>
}) => {
  if (!qrRef.current) return

  const svg = qrRef.current.querySelector("svg")
  if (!svg) return

  const svgData = new XMLSerializer().serializeToString(svg)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  const img = document.createElement("img")

  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx?.drawImage(img, 0, 0)
    const pngFile = canvas.toDataURL("image/png")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngFile
    downloadLink.download = `${convertedUrl}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
}
