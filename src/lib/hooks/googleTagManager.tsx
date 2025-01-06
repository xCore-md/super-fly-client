import { useEffect } from 'react'
import dayjs from 'dayjs'

const GoogleTagManager = () => {
  useEffect(() => {
    const GTAG_URL = 'https://www.googletagmanager.com/gtag/js'
    const TAG_ID = 'AW-11153182127'

    // Check if the script is already added to avoid duplicates
    if (!document.querySelector(`script[src="${GTAG_URL}?id=${TAG_ID}"]`)) {
      const script = document.createElement('script')
      script.async = true
      script.src = `${GTAG_URL}?id=${TAG_ID}`
      document.head.appendChild(script)

      // Initialize gtag after the script is loaded
      script.onload = () => {
        if (!window.dataLayer) {
          window.dataLayer = []
        }
        const gtag = (...args: any) => window.dataLayer?.push(args)

        gtag('js', dayjs().toISOString())
        gtag('config', TAG_ID)

        if (process.env.NODE_ENV === 'development') {
          console.log('Google Tag Manager initialized:', TAG_ID)
        }
      }

      // Cleanup: Remove the script when the component unmounts
      return () => {
        if (script.parentNode) {
          document.head.removeChild(script)
        }
      }
    }
  }, [])

  return null // This component doesn't render any visible elements
}

export default GoogleTagManager
