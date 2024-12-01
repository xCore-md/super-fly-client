import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import '../styles/globals.css'
import React from 'react'
import { FlightContextProvider } from '@/context/flight-context'
import { FlightTypeContextProvider } from '@/context/flight-type-context'
import { FlightsContextProvider } from '@/context/flights-context'
import { LoadingContextProvider } from '@/context/loading-context'
import { ReservationContextProvider } from '@/context/reservation-context'
import { TranslationsContextProvider } from '@/context/translations-context'

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'superfly',
  description: '',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationsContextProvider>
          <LoadingContextProvider>
            <FlightTypeContextProvider>
              <ReservationContextProvider>
                <FlightsContextProvider>
                  <FlightContextProvider>{children}</FlightContextProvider>
                </FlightsContextProvider>
              </ReservationContextProvider>
            </FlightTypeContextProvider>
          </LoadingContextProvider>
        </TranslationsContextProvider>
      </body>
    </html>
  )
}
