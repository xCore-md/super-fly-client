'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import dayjs from 'dayjs'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useFlightContext } from '@/context/flight-context'

import 'swiper/css'

interface IItems {
  title: string
  subtitle: string
  price: number
  img: any
  cityId: string
  code: string
  city: string
  country: string
}

interface IProps {
  title: string
  subtitle?: string
  footerSubtitle?: React.ReactNode
  buttonTitle?: string
  buttonUrl: string
  items: IItems[]
}
export const ItemsCarousel = (props: IProps) => {
  const { title, subtitle, footerSubtitle, buttonTitle, buttonUrl, items } =
    props

  const { searchBarRef } = useFlightContext()

  const handleGoToFlights = (item: {
    code: string
    cityId: string
    country: string
    city: string
  }) => {
    searchBarRef.current?.updateFormValues({
      fly_to: {
        key: 0,
        city: item.city,
        code: item.code,
        country: item.country,
        cityId: item.cityId,
      },
      date_from: dayjs(new Date()).add(7, 'days'),
      adults: 1,
      children: 0,
      infants: 0,
    })
    setTimeout(() => searchBarRef.current?.submitSearch(), 0)
  }

  return (
    <section className=" animate-fade-up fill-mode-forwards ">
      <div className="custom-container">
        <h2
          className={`text-lg font-medium lg:text-2xl ${subtitle ? 'mb-2' : 'mb-2 lg:mb-6'}`}
        >
          {title}
        </h2>
      </div>
      <Swiper
        slidesPerView="auto"
        modules={[Autoplay]}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 8,
          },
        }}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        className="w-full"
      >
        {items.map(
          (
            { title, subtitle, img, price, code, cityId, country, city },
            index
          ) => (
            <SwiperSlide
              key={index}
              className="relative ml-3 flex max-w-[112px] cursor-pointer select-none justify-center px-0 pb-4 pt-4 transition-all duration-200 ease-out md:ml-4 md:max-w-full"
              onClick={() => handleGoToFlights({ code, cityId, country, city })}
            >
              <Card className="group w-full overflow-hidden rounded-xl transition-[.5s] hover:shadow-lg">
                <CardHeader className=" overflow-hidden p-0">
                  <Image
                    className="h-32 object-cover duration-300 ease-in-out group-hover:scale-110 md:h-[300px]"
                    src={img}
                    alt="card"
                  />
                </CardHeader>
                <CardContent className="p-3">
                  <div className="md:h-[70px]">
                    <p className="text-xs font-medium md:mt-3">{title}</p>
                    <p className="text-[8px] font-medium text-[#888888] md:text-xs">
                      {subtitle}
                    </p>
                    <p className="mt-2 text-xxs md:text-sm">
                      De la <span className="font-medium">€{price}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <div
        className={`custom-container hidden items-center lg:flex ${footerSubtitle ? 'justify-between' : 'justify-end'} mt-4`}
      >
        {footerSubtitle && (
          <p className="text-sm font-light">{footerSubtitle}</p>
        )}
        {buttonUrl && buttonTitle && (
          <Link
            href={buttonUrl}
            className="custom-light-shadow flex h-11 items-center justify-center rounded-full bg-blue-700 px-8 font-light text-white "
          >
            <span>{buttonTitle.trim()}</span>
          </Link>
        )}
      </div>
    </section>
  )
}
