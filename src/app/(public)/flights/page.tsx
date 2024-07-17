'use client'

import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import LeadModal from '@/components/lead-modal'
import { useFlightsContext } from '@/context/flights-context'
import axs from '@/lib/axios'
import { convertToSearchQuery } from '@/lib/utils'
import { FlightsCarousel } from '@components/flights/flights-carousel'
import { FlightsTabs } from '@components/flights/flights-tabs'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export default function Flights() {
  const [loading, setLoading] = useState(true)
  const { flights, setFlights } = useFlightsContext()
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => setFirstLoad(false), 7320)
    }
  }, [])

  useEffect(() => {
    const storage = localStorage.getItem('flight')

    if (storage) {
      const flight = JSON.parse(storage)

      const selectedFlight = {
        ...flight,
        date_from: dayjs(new Date(flight?.date_from)).format('DD/MM/YYYY'),
        return_to: flight?.return_to
          ? dayjs(new Date(flight?.return_to)).format('DD/MM/YYYY')
          : '',
        fly_from: flight?.fly_from.code,
        fly_to: flight?.fly_to.code,
      }

      axs
        .get(`/search?locale=ro&${convertToSearchQuery(selectedFlight)}`)
        .then((res) => {
          setFlights(res.data.data)
          setLoading(false)
        })
        .catch((err) => console.log({ err }))
    }

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
          {flights?.length > 0 ? (
            <FlightsTabs />
          ) : (
            <div className="mb-6 mt-10 flex w-full justify-center">
              {loading && <Spin />}
            </div>
          )}
        </>
      )}

      <LeadModal delay={firstLoad ? 10320 : 2000} />
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
