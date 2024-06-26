'use client'

import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import plane from '@/assets/img/plane.png'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'
import LeadModal from './lead-modal'

export const Banner = () => {
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    gsap.fromTo('.banner-title', { y: -20, opacity: 0 }, { y: 0, opacity: 1 })
    gsap.fromTo(
      '.banner-sub',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5 }
    )
    gsap.fromTo(
      '.search-bar',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, delay: 1, duration: 1.5 }
    )
    gsap.fromTo(
      '.banner-image',
      { scale: 0.2 },
      { scale: 1, opacity: 1, duration: 4 }
    )
  })

  return (
    <section className="mb-32 max-[1440px]:px-5 max-[1024px]:px-0 lg:mb-56">
      <div className="absolute left-0 top-0 z-0 h-full w-full rounded-b-[40px] bg-brand-blue lg:h-[650px]">
        <div className="relative h-full w-full">
          <Image
            fill
            className="banner-image h-full rounded-b-[50px] object-contain opacity-0"
            src={plane}
            alt="'plane"
            priority
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-2 flex flex-col items-center lg:mb-14">
          <h1 className="banner-title mb-8 text-2xl  font-medium text-white opacity-0  lg:text-[44px]">
            Începe Călătoria Ta
          </h1>
          <p className="banner-sub hidden w-[386px] text-center text-sm font-light text-white opacity-0 lg:block">
            Lorem ipsum dolor sit amet consectetur. Interdum non ultrices tortor
            faucibus dis eget. Urna porttitor eget tincidunt sagittis est ac
            aliquet.
          </p>
        </div>

        <div className="search-bar opacity-0">
          <SearchBarWithTabs />
        </div>
      </div>
      <LeadModal closable />
    </section>
  )
}
