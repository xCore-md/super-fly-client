import Image from 'next/image'
import React from 'react'
import crossSvg from '@/assets/img/cross.svg'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel'

export const FlightsCarousel = () => {
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
    <div className="mx-auto mt-20 w-full max-w-[768px] rounded-full bg-white p-4 shadow-md">
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
              className="relative md:basis-1/5 lg:basis-1/7"
            >
              <section className="relative flex h-10 flex-col items-stretch px-4 text-center">
                <header className="text-[8px]">
                  {formatDate(flight.date)}
                </header>

                <main className="mt-auto flex justify-center text-xs font-semibold text-[#3F4ED6]">
                  {flight.price ? (
                    currencyFormatter.format(Number(flight.price))
                  ) : (
                    <Image src={crossSvg} alt={'no flight available'} />
                  )}
                </main>
              </section>

              <div
                className={cn(
                  'absolute -bottom-4 -top-4 left-0 right-0 z-20 hidden h-36 bg-brand-blue',
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
