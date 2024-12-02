'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import axs from '@/lib/axios'
import CollapsibleBlock from './collapsible-block'
import { Card, CardContent, CardHeader } from './ui/card'
import { bestDestinations as list } from '../data/data'
import 'swiper/css'
import { useTranslationsContext } from '@/context/translations-context'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Offers = () => {
  const container = useRef(null)
  const { lang, translations: t } = useTranslationsContext()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          sm: '(max-width: 767px)',
          md: '(min-width: 768px)',
        },
        (ctx) => {
          const { sm }: any = ctx.conditions
          gsap.fromTo(
            '.animate-right-to-left',
            { x: sm ? -20 : -150, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              delay: 0.4,
              scrollTrigger: {
                trigger: '.animate-right-to-left',
              },
            }
          )

          gsap.fromTo(
            '.animate-left-to-right',
            { x: sm ? 100 : 300, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              delay: 0.4,
              scrollTrigger: {
                trigger: '.animate-left-to-right',
              },
            }
          )
        }
      )
    },
    { scope: container }
  )
  const [currentOpenedAccordion, setCurrentOpenedAccordion] = useState<any>(
    list[0].cityId
  )
  const [bestOffers, setBestOffers] = useState<any>([])

  const getBestDestinations = async () => {
    await axs
      .get('/best-destinations')
      .then((res) => {
        setBestOffers(res.data)
      })
      .catch((err) => {
        console.log(err.response?.data)
      })
  }

  useEffect(() => {
    getBestDestinations()
  }, [])

  const bestDestinationsList = list.map((item: any) => ({
    ...item,
    price:
      bestOffers.find((b: any) => b.city_code === item.cityId)?.price ||
      item.price,
    date_from:
      bestOffers.find((b: any) => b.city_code === item.cityId)?.date_from ||
      item.date_from,
  }))

  const [currentCountry, setCurrentCountry] = useState({})

  const getCurrentCityByIp = () => {
    axs
      .get('/current-city')
      .then((res) => {
        const { locations } = res.data
        const { city, code, airport_int_id } = locations[0]
        setCurrentCountry({
          key: airport_int_id,
          country: city.country.name,
          city: city.name,
          code: code,
          cityId: city.id,
        })
      })
      .catch((err) => console.log({ err }))
  }

  useEffect(() => {
    getCurrentCityByIp()
  }, [])

  const isOpen = (cityId: string) => cityId === currentOpenedAccordion

  const [activeSliderIndex, setActiveSliderIndex] = useState(0)

  const swiper1: any = useRef(null)
  const swiper2: any = useRef(null)

  if (!bestOffers.length) return null

  return (
    <section className="animation-trigger mt-24 lg:mt-44" ref={container}>
      <h2 className="mb-6 text-lg font-medium md:text-2xl">
        {t.home?.popularDestinations?.title}
      </h2>

      <div className="animate-right-to-left flex gap-6">
        <div className="hidden w-2/6 lg:block">
          <Swiper
            onSwiper={(swiper) => (swiper1.current = swiper)}
            slidesPerView={1}
            className="w-full"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            initialSlide={activeSliderIndex}
            onSlideChange={(e) => {
              setActiveSliderIndex(e.realIndex)
              swiper2.current?.slideTo?.(e.realIndex)
            }}
          >
            {list.map((offer, index) => (
              <SwiperSlide key={index} className="min-w-full px-1">
                <Card className="mb-4 rounded-xl">
                  <CardHeader className="pb-2">
                    <h3 className="text-[22px] font-medium">
                      {/* @ts-ignore */}
                      {t.kishinev} - {offer.title[lang]}
                    </h3>
                  </CardHeader>
                  <CardContent className="min-h-[120px]">
                    <p className="text-base font-light text-[#4A4A4A]">
                      {/* @ts-ignore */}
                      {offer.description[lang]}
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={(swiper) => (swiper2.current = swiper)}
            slidesPerView={1}
            className="w-full"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            initialSlide={activeSliderIndex}
            onSlideChange={(e) => setActiveSliderIndex(e.activeIndex)}
          >
            {list.map((offer, index) => (
              <SwiperSlide key={index} className="h-[240px] min-w-full px-1">
                <div className=" w-full ">
                  <Image
                    className="h-[240px] rounded-2xl object-cover"
                    src={offer.img}
                    alt="image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="animate-left-to-right w-full lg:w-4/6">
          {bestDestinationsList.map((offer, index) => (
            <div key={index} className="cursor-pointer md:mb-4">
              <CollapsibleBlock
                isOpen={isOpen}
                setIsOpen={(cityId: string) =>
                  setCurrentOpenedAccordion(cityId)
                }
                offer={offer}
                currentCountry={currentCountry}
              />
              {index !== 5 && (
                <div className="flex h-3 justify-center">
                  <hr className="my-3 h-0 w-[90%] border-t-0 border-t-gray-200 lg:border-t-[1px]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Offers
