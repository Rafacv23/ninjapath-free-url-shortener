// store/useUrlStore.ts

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { UrlsState, Url } from "@/utils/definitions"

// Definimos el tipo explícito para 'state' en la función que pasamos a 'set'
const persistState = persist<UrlsState>(
  (set) => ({
    urls: [],
    addUrl: (url: Url) =>
      set((state: UrlsState) => ({ urls: [...state.urls, url] })),
    removeUrl: (originalUrl: string) =>
      set((state: UrlsState) => ({
        urls: state.urls.filter((u) => u.originalUrl !== originalUrl),
      })),
    clearUrls: () => set({ urls: [] }),
    updateUrls: (newUrls: Url[]) => set({ urls: newUrls }),
  }),
  {
    name: "urls",
    storage: createJSONStorage(() => localStorage),
  }
)

const useUrlStore = create<any>(persistState)

export default useUrlStore
