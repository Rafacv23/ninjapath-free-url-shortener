export const copyUrlToClipboard = (url: string) => {
  navigator.clipboard.writeText(url)
  console.log("url copiada")
}
