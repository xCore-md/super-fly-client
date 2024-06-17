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

export function convertToSearchQuery(params: Record<string, string | number>) {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&')
}

export function getTimeFromDate(dateStr: string) {
  const date = new Date(dateStr)

  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return formattedTime
}

export function numberToTimeFormat(seconds: number) {
  const totalMinutes = Math.floor(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours} h ${minutes} min`
}
