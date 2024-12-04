export type convertedUrl = {
  convertedUrl: string
}

export interface Url {
  id: string
  large_url: string
  short_url: string
  created_at: string
  clicks: number
  created_by?: string
}

export interface UrlsState {
  urls: Url[]
  addUrl: (url: Url) => void
  removeUrl: (originalUrl: string) => void
  clearUrls: () => void
  updateUrls: (url: Url[]) => void
}
