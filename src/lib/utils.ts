import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { twMerge } from 'tailwind-merge'

// Extend dayjs with the UTC plugin
dayjs.extend(utc)

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

export function getFormattedDate(dateStr: string) {
  const date = new Date(dateStr)
  const hours = String(date.getUTCHours()).padStart(2, '0') // UTC hours
  const minutes = String(date.getUTCMinutes()).padStart(2, '0') // UTC minutes

  return `${hours}:${minutes}`
}

export function numberToTimeFormat(seconds: number) {
  const totalMinutes = Math.floor(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours} h ${minutes} min`
}

export function getFlightTime(
  startDate: string,
  endDate: string,
  lang: string
) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const hLetter = lang === 'ro' ? 'h' : 'ч'
  const minLetter = lang === 'ro' ? 'min' : 'мин'
  const diff = end.getTime() - start.getTime()

  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)

  return `${hours ? hours + ` ${hLetter}` : ''} ${minutes ? minutes + ` ${minLetter}` : ''} `
}

export function getPassengerAge(dateOfBirth: string) {
  const dob = new Date(dateOfBirth)
  const today = new Date()
  const age = today.getFullYear() - dob.getFullYear()

  if (age >= 14) {
    return 'Adult'
  } else if (age < 14 && age > 2) {
    return 'Child'
  } else {
    return 'Infant'
  }
}

export function handleCalendarKeyDown(e: any) {
  const value = e.target.value
  const length = value.length

  if ((length === 2 || length === 5) && e.key !== 'Backspace') {
    e.target.value = `${value}.`
  }
}

export const setToGreenwichMidnight = (date: string | Date): string => {
  return dayjs(date).utc(true).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
}

export const handleDownloadImage = async ({
  imageUrl,
  fileName,
}: {
  imageUrl: any
  fileName: any
}) => {
  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob)

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a')
    a.href = url
    a.download = fileName || 'downloaded-image' // Set default file name if not provided
    document.body.appendChild(a)
    a.click()

    // Clean up by revoking the blob URL and removing the anchor
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Failed to download image', error)
  }
}
