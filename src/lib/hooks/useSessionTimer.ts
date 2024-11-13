// useSessionTimer.ts
import { usePathname } from 'next/navigation' // For App Router
import { useState, useEffect, useCallback, useRef } from 'react'

interface UseSessionTimerProps {
  duration?: number // in minutes
  onExpire?: () => void
  onThirtyMinExpire?: () => void
  resetTrigger?: number | boolean
  excludedPaths?: string[]
}

export const useSessionTimer = ({
  duration = 30,
  onExpire,
  onThirtyMinExpire,
  resetTrigger = 0,
  excludedPaths = ['admin'],
}: UseSessionTimerProps) => {
  const timeLeft = useRef(duration * 60)
  const [isExpired, setIsExpired] = useState(false)

  // For App Router
  const pathname = usePathname()

  const isExcludedPath = useCallback(() => {
    return excludedPaths.some((path) => {
      return pathname.includes(path)
    })
  }, [pathname, excludedPaths])

  const resetTimer = useCallback(() => {
    timeLeft.current = duration * 60
    setIsExpired(false)
  }, [duration])

  // Reset when resetTrigger changes
  useEffect(() => {
    if (!isExcludedPath()) {
      resetTimer()
    }
  }, [resetTrigger, resetTimer, isExcludedPath])

  useEffect(() => {
    // Don't start timer if on excluded path
    if (isExcludedPath()) {
      return
    }

    const interval = setInterval(() => {
      timeLeft.current -= 1
      const thirtyMin = duration * 60 - 30 * 60
      if (timeLeft.current === thirtyMin) {
        onThirtyMinExpire?.()
      }

      if (timeLeft.current <= 0) {
        onExpire?.()
        clearInterval(interval)
        setIsExpired(true)
      }
    }, 1000)

    if (isExpired) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [duration, onExpire, isExcludedPath])

  return {
    timeLeft,
    isExpired,
    resetTimer,
    isTimerActive: !isExcludedPath(),
  }
}
