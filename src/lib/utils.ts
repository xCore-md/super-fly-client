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

export function getFlightTime(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const diff = end.getTime() - start.getTime()

  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)

  return `${hours} h ${minutes} min`
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
