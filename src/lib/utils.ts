import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLastSegment(url: any) {
  // Split the URL by slashes
  const segments = url?.split('/')
  // Return the last segment
  return segments?.pop() // Handle trailing slash
}
