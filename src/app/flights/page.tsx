import React from 'react'
import { FlightsCarousel } from '@components/flights/flights-carousel'
import { FlightsTabs } from '@components/flights/flights-tabs'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export default function Flights() {
  return (
    <div className="mt-4 pb-10">
      <Header />
      <FlightsCarousel />
      <FlightsTabs />
    </div>
  )
}

const Header = () => {
  return (
    <div className="p-4">
      <div className="absolute left-0 top-0 z-0 h-[calc(100vh-50px)] w-full rounded-b-[50px] bg-[#3F4ED6] lg:h-80"></div>
      <SearchBarWithTabs />
    </div>
  )
}
