'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import LeadModal from '@/components/lead-modal'
import { useFlightTypeContext } from '@/context/flight-type-context'
import { useFlightsContext } from '@/context/flights-context'
import { useTranslationsContext } from '@/context/translations-context'
import axs from '@/lib/axios'
import { convertToSearchQuery } from '@/lib/utils'
import { FlightsCarousel } from '@components/flights/flights-carousel'
import { FlightsTabs } from '@components/flights/flights-tabs'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export default function Flights() {
  const [loading, setLoading] = useState(true)
  const { setFlights, setInitialFlights } = useFlightsContext()
  const [country, setCountry] = useState([])
  const { flightType } = useFlightTypeContext()
  const [isSorting, setIsSorting] = useState(true)
  const router = useRouter()
  const { lang } = useTranslationsContext()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const storageFlight = localStorage.getItem('flight')

    if (storageFlight) {
      const flight = JSON.parse(storageFlight)

      const selectedFlight = {
        ...flight,
        date_from: dayjs(flight?.date_from).format('DD/MM/YYYY'),
        return_to: flight?.return_to
          ? dayjs(flight?.return_to).format('DD/MM/YYYY')
          : '',
        fly_from: flight?.fly_from.code,
        fly_to: flight?.fly_to.code,
      }

      axs
        .get(
          `/search?locale=${lang}-${lang.toLocaleUpperCase()}&${convertToSearchQuery(selectedFlight)}`
        )
        .then((res) => {
          const data = [...res.data.data].sort(
            (a: any, b: any) => a.duration.total - b.duration.total
          )
          setFlights(data)
          setInitialFlights(data)
          setLoading(false)
        })
        .catch((err) => console.log({ err }))

      axs
        .get(
          `https://restcountries.com/v3.1/alpha/${flight?.fly_to?.cityId?.slice(-2)}?fields=name,cca2,flags`
        )
        .then((res) => {
          setCountry(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      router.push('/')
    }
  }, [])

  return (
    <div className="lg:mt-0">
      <>
        <Header setLoading={setLoading} />
        {flightType === 0 ? (
          <div className="relative z-0 animate-fade-down px-4 fill-mode-forwards">
            <FlightsCarousel />
          </div>
        ) : (
          <div className="mt-5"></div>
        )}
        <FlightsTabs
          loading={loading}
          isSorting={isSorting}
          setIsSorting={setIsSorting}
        />
      </>

      <LeadModal delay={1000} country={country} />
    </div>
  )
}
interface HeaderProps {
  setLoading: any
}

const Header = ({ setLoading }: HeaderProps) => {
  return (
    <div className="relative p-4 pt-16 lg:px-10 lg:pt-12">
      <div className="absolute left-0 top-0 z-0 h-[380px] w-full rounded-b-[30px] bg-brand-blue lg:h-52"></div>
      <div className="relative z-20 animate-fade-up fill-mode-forwards">
        <SearchBarWithTabs setLoading={setLoading} />
      </div>
    </div>
  )
}
