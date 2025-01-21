'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import am from '@/assets/img/banner-assets/am.png'
import fo from '@/assets/img/banner-assets/fo.png'
import hs from '@/assets/img/banner-assets/hsk.png'
import wz from '@/assets/img/banner-assets/wz.png'
import plane from '@/assets/img/plane.png'
import { useTranslationsContext } from '@/context/translations-context'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'
import LeadModal from './lead-modal'

export const Banner = ({ title }: { title: string }) => {
  gsap.registerPlugin(useGSAP)
  const { lang } = useTranslationsContext()

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
      className={`relative px-5 pb-[340px] pt-[74px] lg:pb-[240px] lg:pt-44 ${companyParams ? 'px-5 py-3' : ''}`}
    >
      <div className="absolute left-0 top-0 z-0 h-[760px] w-full rounded-b-[40px] bg-brand-blue lg:h-[650px]">
        {!companyParams && (
          <div className="relative h-full w-full -translate-y-60 lg:translate-y-0">
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

      <div className="relative z-20 h-auto">
        {companyParams && (
          <div>
            <div className="relative mb-4 h-40 lg:hidden">
              <Image
                fill
                className="banner-image object-contain"
                src={companies[companyParams]?.imageSrc || plane}
                alt="image"
                priority
              />
            </div>
            <h1 className="my-4 w-full text-center text-lg font-medium tracking-wide text-white">
              {companies[companyParams]?.text[lang]}
            </h1>
          </div>
        )}
        {!companyParams && (
          <div className="mb-2 flex flex-col items-center lg:mb-14">
            <h1 className="banner-title mb-20 text-[22px] font-medium text-white opacity-0 lg:mb-24 lg:text-[44px]">
              {title}
            </h1>
          </div>
        )}

        <div className="search-bar opacity-0">
          <SearchBarWithTabs />
        </div>
      </div>
      <LeadModal delay={1000} closable />
    </section>
  )
}

const companies: any = {
  flyOne: {
    imageSrc: fo,
    text: {
      ro: 'Bilete de avion cu FlyOne',
      ru: 'Авиабилеты с FlyOne',
    },
  },
  hiSky: {
    imageSrc: hs,
    text: {
      ro: 'Bilete de avion cu HiSky',
      ru: 'Авиабилеты с HiSky',
    },
  },
  wizzAir: {
    imageSrc: wz,
    text: {
      ro: 'Bilete de avion cu Wizz Air',
      ru: 'Авиабилеты с Wizz Air',
    },
  },
  airMoldova: {
    imageSrc: am,
    text: {
      ro: 'Bilete de avion cu Air Moldova',
      ru: 'Авиабилеты с Air Moldova',
    },
  },
}
