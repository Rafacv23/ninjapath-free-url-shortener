export type convertedUrl = {
  convertedUrl: string
}

export interface Url {
  originalUrl: string
  convertedUrl: string
  date: string
  clicks: number
}

export interface UrlsState {
  urls: Url[]
  addUrl: (url: Url) => void
  removeUrl: (originalUrl: string) => void
  clearUrls: () => void
  updateUrls: (url: Url[]) => void
}
