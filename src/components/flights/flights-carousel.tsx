'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'
import dayjs from 'dayjs'
import crossSvg from '@/assets/img/cross.svg'
import { useFlightContext } from '@/context/flight-context'
import { cn, setToGreenwichMidnight } from '@/lib/utils'
import {
  CalendarPrice,
  fetchFlightCalendarPrices,
} from '@components/flights/fetchFlightCalendarPrices'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel'
import { Skeleton } from '@components/ui/skeleton'

export const FlightsCarousel = () => {
  const { flight, searchBarRef } = useFlightContext()
  const [prices, setPrices] = useState<CalendarPrice[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [storageFlight, setStorageFlight] = useState<any>(null)

  useEffect(() => {
    const storage = localStorage?.getItem('flight')
    if (storage) {
      setStorageFlight(JSON.parse(storage))
    }
  }, [])

  const isDisabled = (price: number | undefined) => price === undefined

  const isSeleted = (index: number) =>
    index ===
      prices?.findIndex((p) =>
        dayjs(p.date).isSame(
          dayjs(flight.date_from || dayjs(storageFlight?.date_from).format())
        )
      ) || 0

  const handleCarouselSelect = (selectedFlight: CalendarPrice) => {
    if (isDisabled(selectedFlight.ratedPrice.price.amount)) return

    searchBarRef.current?.updateFormDates(
      setToGreenwichMidnight(selectedFlight.date)
    )
    setTimeout(() => searchBarRef.current?.submitSearch(), 0)
  }

  const handleFetchPrices = async () => {
    setLoading(true)

    const dateFrom = flight.date_from
      ? flight.date_from
      : storageFlight?.date_from
        ? dayjs(storageFlight?.date_from).format()
        : dayjs().format()

    const returnTo = flight.return_to
      ? flight.return_to
      : storageFlight?.return_to
        ? dayjs(storageFlight?.return_to).format()
        : null
    const flyFromCityId = flight.fly_from?.cityId
      ? flight.fly_from.cityId
      : storageFlight?.fly_from?.cityId
        ? storageFlight.fly_from.cityId
        : null

    const flyToCityId = flight.fly_to?.cityId
      ? flight.fly_to.cityId
      : storageFlight?.fly_to?.cityId
        ? storageFlight.fly_to.cityId
        : null

    const dates = getFlightDates(dateFrom, returnTo)
    const result = await fetchFlightCalendarPrices(
      { ids: [`City:${flyFromCityId}`] },
      { ids: [`City:${flyToCityId}`] },
      { start: dates.startDate, end: dates?.endDate },
      {
        adults: 1,
        children: 0,
        infants: 0,
        adultsHoldBags: [0],
        adultsHandBags: [0],
        childrenHoldBags: [],
        childrenHandBags: [],
      }
    )
    setLoading(false)
    setPrices(result)
  }

  useEffect(() => {
    handleFetchPrices()
  }, [flight, storageFlight])

  return (
    <div className="relative mx-auto mt-28  w-full max-w-[780px] px-9 lg:mt-20 lg:px-0">
      {loading || !prices || !prices.length ? (
        <div className="h-[88px]">
          <Skeleton className="absolute bottom-0 left-0 right-0 top-4 h-[88px] w-full rounded-full " />
        </div>
      ) : (
        <>
          <div className="custom-shadow absolute bottom-0 left-0 right-0 top-4 rounded-full bg-white " />

          <Carousel
            opts={{
              align: 'start',
            }}
            className="mx-auto max-w-[640px]"
          >
            <CarouselContent>
              {prices?.map((flight, index) => (
                <CarouselItem
                  key={index}
                  onClick={() => handleCarouselSelect(flight)}
                  className={cn(
                    `relative ml-4 flex basis-1/4 cursor-pointer justify-center px-0 py-4 transition-all duration-200 ease-out lg:basis-1/7`
                  )}
                >
                  <section
                    className={cn(
                      'relative z-10 flex h-10 flex-col items-center justify-center px-4  text-center transition-all duration-200 ease-out',
                      {
                        '-translate-y-2 text-white [&_p]:text-white ':
                          isSeleted(index),
                        'cursor-not-allowed': isDisabled(
                          flight.ratedPrice.price.amount
                        ),
                      }
                    )}
                  >
                    <span
                      className={cn('text-[10px]', {
                        'text-[#8B8B8B]': isDisabled(
                          flight.ratedPrice.price.amount
                        ),
                      })}
                      suppressHydrationWarning
                    >
                      {formatDate(flight.date)}
                    </span>

                    <p className="mt-auto flex justify-center text-sm font-semibold text-[#3F4ED6]">
                      {!isDisabled(flight.ratedPrice.price.amount) ? (
                        currencyFormatter.format(
                          Number(flight.ratedPrice.price.amount)
                        )
                      ) : (
                        <Image src={crossSvg} alt={'no flight available'} />
                      )}
                    </p>
                  </section>

                  <div
                    className={cn(
                      `absolute -bottom-0.5 -top-2 left-0 right-0 z-0 rounded-t-xl bg-transparent transition-all duration-200 ease-out`,
                      {
                        '-translate-y-0.5 bg-brand-blue': isSeleted(index),
                      }
                    )}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-7 mt-2 h-6 w-6 lg:-left-12 lg:h-8 lg:w-8" />
            <CarouselNext className="-right-7 mt-2 h-6 w-6 lg:-right-12 lg:h-8 lg:w-8" />
          </Carousel>
        </>
      )}
    </div>
  )
}
// utils, todo: extract
const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'EUR',
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

type FlightDates = {
  startDate: string
  endDate?: string
}

const getFlightDates = (
  date_from: string,
  return_to?: string | null
): FlightDates => {
  const formatDate = (date: dayjs.Dayjs): string => {
    return date.format('YYYY-MM-DDTHH:mm:ss')
  }

  // Validate input dates
  const fromDate = dayjs(date_from)
  const today = dayjs().startOf('day')

  if (!fromDate.isValid()) {
    console.error('Invalid departure date')
    return { startDate: formatDate(today) }
  }

  const isDateFromToday = fromDate.isSame(today, 'day')

  let result: FlightDates

  if (isDateFromToday) {
    result = {
      startDate: formatDate(today),
    }
  } else {
    result = {
      startDate: formatDate(fromDate.subtract(3, 'day').startOf('day')),
    }
  }

  // Handle return date if provided and valid
  if (return_to) {
    const toDate = dayjs(return_to)
    if (toDate.isValid() && toDate.isAfter(fromDate)) {
      result.endDate = formatDate(toDate.add(15, 'day').endOf('day'))
    }
  }

  return result
}
