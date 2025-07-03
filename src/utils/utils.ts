import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Comprueba si una URL es valida o esta bien construida
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}
