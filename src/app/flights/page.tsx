import dynamic from 'next/dynamic'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@components/ui/card'
import Image from 'next/image'
import crossSvg from '@/assets/img/cross.svg'
import { cn } from '@/lib/utils'

export default function Flights() {
  return (
    <div className="pb-10 mt-4">
      <Header />
      <FlightsCarousel />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
      adipisci culpa deserunt dolores eos est eveniet facere fugit laborum nisi
      numquam officia officiis placeat repellat, unde, ut veniam, voluptates
      voluptatum.
    </div>
  )
}

const Header = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-0 rounded-b-[50px] bg-[#3F4ED6] h-64"></div>
      <SearchBarWithTabs />
    </>
  )
}
const FlightsCarousel = () => {
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

  return (
    <div className="bg-white rounded-full p-4 mt-20 w-full mx-auto max-w-[768px]">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="max-w-[640px] mx-auto"
      >
        <CarouselContent>
          {data.map((flight, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/5 lg:basis-1/7 relative"
            >
              <section className="text-center flex flex-col items-stretch px-4 h-10 relative">
                <header className="text-[8px]">
                  {formatDate(flight.date)}
                </header>

                <main className="text-[#3F4ED6] text-xs flex justify-center font-semibold mt-auto">
                  {flight.price ? (
                    currencyFormatter.format(Number(flight.price))
                  ) : (
                    <Image src={crossSvg} alt={'no flight available'} />
                  )}
                </main>
              </section>

              <div
                className={cn(
                  'absolute -top-4 -bottom-4 left-0 right-0 bg-brand-blue hidden z-20 h-36',
                  {
                    /*todo: add styles for selected flight */
                    block: false,
                  }
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
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
