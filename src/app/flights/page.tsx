import React from 'react'
import { FlightsCarousel } from '@components/flights/flights-carousel'
import { FlightsListing } from '@components/flights/flights-listing'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export default function Flights() {
  return (
    <div className="mt-4 pb-10">
      <Header />
      <FlightsCarousel />
      <FlightsListing />
    </div>
  )
}

const Header = () => {
  return (
    <>
      <div className="absolute left-0 top-0 z-0 h-64 w-full rounded-b-[50px] bg-[#3F4ED6]"></div>
      <SearchBarWithTabs />
    </>
  )
}
