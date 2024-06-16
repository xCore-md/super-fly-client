'use client'

import React, { useEffect } from 'react'
import { useFlightContext } from '@/context/flight-context'
import { FlightsCarousel } from '@components/flights/flights-carousel'
import { FlightsTabs } from '@components/flights/flights-tabs'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export default function Flights() {
  const [loading, setLoading] = React.useState(true)
  const { flight } = useFlightContext()
  console.log({ flight })

  useEffect(() => {
    setTimeout(() => setLoading(false), 7320)
  }, [])

  return (
    <div className="mt-14 pb-10 lg:mt-4">
      {loading ? (
        <div className="fixed left-0 top-0 z-[99999] flex h-full w-full items-center justify-center bg-white">
          <video
            playsInline
            muted
            autoPlay
            loop
            preload="auto"
            className=" h-full w-full"
          >
            <source src="/airplane.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        <>
          <Header />
          <div className="animate-fade-down fill-mode-forwards">
            <FlightsCarousel />
          </div>
          <FlightsTabs />
        </>
      )}
    </div>
  )
}

const Header = () => {
  return (
    <div className="p-0 lg:p-4">
      <div className="absolute left-0 top-0 z-0 h-full w-full rounded-b-[50px] bg-[#3F4ED6] lg:h-80"></div>
      <div className="animate-fade-up fill-mode-forwards">
        <SearchBarWithTabs />
      </div>
    </div>
  )
}
