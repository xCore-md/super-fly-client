'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CollapsibleBlock from './collapsible-block'
import { Card, CardContent, CardHeader } from './ui/card'
import { bestDestinations as list } from '../data/data'
import 'swiper/css'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Offers = () => {
  const container = useRef(null)

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
  const [currentOpenedAccortion, setCurrentOpenedAccortion] = useState(
    list[0].title
  )

  const isOpen = (title: string) => title === currentOpenedAccortion

  const [activeSliderIndex, setActiveSliderIndex] = useState(0)

  console.log({ activeSliderIndex })
  const swiper1: any = useRef(null)
  const swiper2: any = useRef(null)

  return (
    <section
      className="animation-trigger mt-24 overflow-x-hidden lg:mt-44"
      ref={container}
    >
      <h2 className="mb-6 text-2xl font-medium">
        Cele mai populare destinatii
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
              setActiveSliderIndex(e.activeIndex)
              swiper2.current?.slideTo?.(e.activeIndex)
            }}
          >
            {list.map((offer, index) => (
              <SwiperSlide key={index} className=" min-w-full">
                <Card className="mb-4 rounded-xl">
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-medium">
                      Chisinau - {offer.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="min-h-[120px]">
                    <p className="text-base font-light">{offer.description}</p>
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
              <SwiperSlide key={index} className="h-[280px] min-w-full">
                <div className=" w-full ">
                  <Image
                    className="h-[280px] rounded-2xl object-cover"
                    src={offer.img}
                    alt="image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="animate-left-to-right w-full lg:w-4/6">
          {list.map((offer, index) => (
            <div key={index}>
              <CollapsibleBlock
                isOpen={isOpen}
                setIsOpen={(title: string) => setCurrentOpenedAccortion(title)}
                offer={offer}
              />
              {index !== 5 && (
                <div className="flex justify-center">
                  <hr className="my-3 h-0 w-[90%] border-t-0 border-t-gray-200 lg:border-t" />
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
