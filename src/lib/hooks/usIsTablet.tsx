import { useState, useEffect } from 'react'

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState<boolean>(false)

  const handleResize = () => {
    setIsTablet(window.innerWidth <= 1024)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isTablet
}
