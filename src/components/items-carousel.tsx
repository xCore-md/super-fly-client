'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import 'swiper/css'

interface IItems {
  title: string
  subtitle: string
  price: number
  img: any
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

  return (
    <section className="mb-14 animate-fade-up fill-mode-forwards lg:mb-24">
      <h2
        className={`text-lg font-medium lg:text-2xl ${subtitle ? 'mb-2' : 'mb-6'}`}
      >
        {title}
      </h2>
      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {items.map(({ title, subtitle, img, price }, index) => (
          <SwiperSlide
            key={index}
            className="relative ml-4 flex cursor-pointer select-none justify-center px-0 py-4 transition-all duration-200 ease-out"
          >
            <Card className="group w-full overflow-hidden rounded-t-[16px] transition-[.5s] hover:shadow-lg">
              <CardHeader className=" overflow-hidden rounded-t-xl p-0">
                <Image
                  className="h-[200px] object-cover duration-300 ease-in-out group-hover:scale-110 lg:h-[300px]"
                  src={img}
                  alt="card"
                />
              </CardHeader>
              <CardContent>
                <div className="h-[70px]">
                  <p className="mt-3 text-base font-medium">{title}</p>
                  <p className="text-xs font-medium text-[#888888]">
                    {subtitle}
                  </p>
                  <p className="mt-2 text-sm">
                    De la <span className="font-medium">€{price}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`hidden items-center lg:flex ${footerSubtitle ? 'justify-between' : 'justify-end'} mt-8`}
      >
        {footerSubtitle && (
          <p className="text-sm font-light">{footerSubtitle}</p>
        )}
        {buttonUrl && buttonTitle && (
          <Link
            href={buttonUrl}
            className="flex h-11 items-center justify-center rounded-full bg-blue-700 px-8 font-light text-white shadow-md shadow-slate-400"
          >
            <span>{buttonTitle.trim()}</span>
          </Link>
        )}
      </div>
    </section>
  )
}
