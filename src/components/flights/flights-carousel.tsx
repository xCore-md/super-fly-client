'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'
import crossSvg from '@/assets/img/cross.svg'
import axs from '@/lib/axios'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel'

const data = JSON.stringify({
  query: `query CalendarPricesFetcherQuery(
  $search: SearchPricesCalendarInput
  $filter: ItinerariesFilterInput
  $options: ItinerariesOptionsInput
) {
  itineraryPricesCalendar(search: $search, filter: $filter, options: $options) {
    __typename
    ... on ItineraryPricesCalendar {
      calendar {
        date
        ratedPrice {
          price {
            amount
          }
          rating
        }
      }
    }
    ... on AppError {
      error: message
    }
  }
}`,
  variables: {
    search: {
      source: { ids: ['City:bucharest_ro'] },
      destination: { ids: ['City:chisinau_md'] },
      dates: { start: '2024-07-15T00:00:00', end: '2024-08-31T23:59:59' },
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
        adultsHoldBags: [0],
        adultsHandBags: [0],
        childrenHoldBags: [],
        childrenHandBags: [],
      },
      cabinClass: { cabinClass: 'ECONOMY', applyMixedClasses: false },
    },
    filter: {
      allowChangeInboundDestination: true,
      allowChangeInboundSource: true,
      allowDifferentStationConnection: true,
      enableSelfTransfer: true,
      enableThrowAwayTicketing: true,
      enableTrueHiddenCity: true,
      transportTypes: ['FLIGHT'],
      contentProviders: ['KIWI'],
      flightsApiLimit: 1,
    },
    options: {
      sortBy: 'PRICE',
      mergePriceDiffRule: 'INCREASED',
      currency: 'eur',
      userEmail: 'antonio21213@gmail.com',
      apiUrl: null,
      locale: 'en',
      market: 'md',
      partner: 'skypicker',
      partnerMarket: 'md',
      affilID: 'crm',
      storeSearch: false,
      searchStrategy: 'REDUCED',
      abTestInput: {
        kiwiGuaranteeABTest: 'ENABLE',
        kiwiGuaranteeEsABTest: 'DISABLE',
      },
    },
  },
})

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.skypicker.com/umbrella/v2/graphql?featureName=CalendarPricesFetcherQuery',
  headers: {
    accept: '*/*',
    'accept-language':
      'ro-RO,ro;q=0.9,ru-MD;q=0.8,ru;q=0.7,en-US;q=0.6,en;q=0.5',
    'content-type': 'application/json',
    dnt: '1',
    priority: 'u=1, i',
    'sec-ch-ua':
      '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
  },
  data: data,
}
export const FlightsCarousel = () => {
  const [selected, setSelected] = useState(3)

  useEffect(() => {
    axs
      .request(config)
      .then(() => {
        console.log('loaded')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const data = [
    { price: 221.9, date: '2024-02-01T00:00:00Z' },
    { price: 222.9, date: '2024-02-02T00:00:00Z' },
    { price: undefined, date: '2024-02-03T00:00:00Z' },
    { price: 224.9, date: '2024-02-04T00:00:00Z' },
    { price: 225.9, date: '2024-02-05T00:00:00Z' },
    { price: 226.9, date: '2024-02-06T00:00:00Z' },
    { price: undefined, date: '2024-02-07T00:00:00Z' },
    { price: 228.9, date: '2024-02-08T00:00:00Z' },
    { price: 229.9, date: '2024-02-09T00:00:00Z' },
    { price: 230.9, date: '2024-02-10T00:00:00Z' },
    { price: 211.9, date: '2024-01-22T00:00:00Z' },
    { price: undefined, date: '2024-01-23T00:00:00Z' },
    { price: 213.9, date: '2024-01-24T00:00:00Z' },
    { price: 214.9, date: '2024-01-25T00:00:00Z' },
    { price: undefined, date: '2024-01-26T00:00:00Z' },
    { price: 216.9, date: '2024-01-27T00:00:00Z' },
    { price: 217.9, date: '2024-01-28T00:00:00Z' },
    { price: 218.9, date: '2024-01-29T00:00:00Z' },
    { price: 219.9, date: '2024-01-30T00:00:00Z' },
    { price: 220.9, date: '2024-01-31T00:00:00Z' },
  ]

  const isDisabled = (price: number | undefined) => price === undefined
  const isSeleted = (index: number) => selected === index

  return (
    <div className="relative mx-auto mt-28  w-full max-w-[780px] px-9 lg:mt-20 lg:px-0">
      <div className="custom-shadow absolute bottom-0 left-0 right-0 top-4 rounded-full bg-white " />

      <Carousel
        opts={{
          align: 'start',
        }}
        className="mx-auto max-w-[640px]"
      >
        <CarouselContent>
          {data.map((flight, index) => (
            <CarouselItem
              key={index}
              onClick={() => !isDisabled(flight.price) && setSelected(index)}
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
                    'cursor-not-allowed': isDisabled(flight.price),
                  }
                )}
              >
                <span
                  className={cn('text-[10px]', {
                    'text-[#8B8B8B]': isDisabled(flight.price),
                  })}
                  suppressHydrationWarning
                >
                  {formatDate(flight.date)}
                </span>

                <p className="mt-auto flex justify-center text-sm font-semibold text-[#3F4ED6]">
                  {!isDisabled(flight.price) ? (
                    currencyFormatter.format(Number(flight.price))
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
