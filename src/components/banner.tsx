'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import am from '@/assets/img/banner-assets/am.png'
import fo from '@/assets/img/banner-assets/fo.png'
import hs from '@/assets/img/banner-assets/hs.png'
import wz from '@/assets/img/banner-assets/wz.png'
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

  const searchParams = useSearchParams()
  const companyParams = searchParams.get('company')

  return (
    <section
      className={`relative px-5 pb-[340px] pt-[74px] md:pb-[240px] md:pt-44 ${companyParams ? 'px-5 py-3' : ''}`}
    >
      <div className="absolute left-0 top-0 z-0 h-[760px] w-full rounded-b-[40px] bg-brand-blue md:h-[650px] md:max-h-[650px]">
        {!companyParams && (
          <div className="relative h-full w-full -translate-y-60 md:translate-y-0">
            <Image
              fill
              className="banner-image h-full rounded-b-[50px] object-contain opacity-0"
              src={plane}
              alt="plane"
              priority
            />
          </div>
        )}
      </div>

      <div className="relative z-20">
        {companyParams && (
          <div className=" relative mb-4 h-40 md:hidden">
            <Image
              fill
              className="banner-image h-full object-contain"
              src={companies[companyParams]?.imageSrc || plane}
              alt="image"
              priority
            />
          </div>
        )}
        {!companyParams && (
          <div className="mb-2 flex flex-col items-center lg:mb-14">
            <h1 className="banner-title mb-20 text-[22px] font-medium text-white opacity-0 md:mb-24 md:text-[44px]">
              Începe Călătoria Ta
            </h1>
          </div>
        )}

        <div className="search-bar opacity-0">
          <SearchBarWithTabs />
        </div>
      </div>
      <LeadModal closable />
    </section>
  )
}

const companies: any = {
  flyOne: {
    imageSrc: fo,
  },
  hiSky: {
    imageSrc: hs,
  },
  wizzAir: {
    imageSrc: wz,
  },
  airMoldova: {
    imageSrc: am,
  },
}
