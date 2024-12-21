'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import dayjs from 'dayjs'
import chevronDown from '@/assets/img/chevronDown.svg'
import chevronUp from '@/assets/img/chevronUp.svg'
import logo from '@/assets/img/logo.svg'
import minus from '@/assets/img/minus.svg'
import plus from '@/assets/img/plus.svg'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useFlightContext } from '@/context/flight-context'
import { Button } from './ui/button'
import { useTranslationsContext } from '@/context/translations-context'

const CollapsibleBlock = ({
  offer,
  isOpen,
  setIsOpen,
  currentCountry,
}: {
  offer: any
  // eslint-disable-next-line no-unused-vars
  isOpen: (cityId: string) => boolean
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (cityId: string) => void
  currentCountry: any
}) => {
  const router = useRouter()
  const { setFlight } = useFlightContext()
  const { lang, translations: t } = useTranslationsContext()

  const searchObj = {
    fly_from: {
      ...currentCountry,
    },
    fly_to: {
      code: offer.code,
      key: 1,
      city: offer.city,
      country: offer.country,
      cityId: offer.cityId,
    },
    adults: 1,
    children: 0,
    infants: 0,
    date_from: offer.date_from,
    return_to: '',
  }

  const handleSearch = useCallback(() => {
    setFlight(searchObj)
    localStorage.setItem('flight', JSON.stringify(searchObj))

    router.push('/flights')
  }, [offer, router, setFlight])

  return (
    <div className="flex items-start gap-2">
      <div className="w-full">
        <Collapsible
          open={isOpen(offer.cityId)}
          onOpenChange={() => setIsOpen(offer.cityId)}
          className="rounded-full bg-white"
        >
          <CollapsibleTrigger asChild className="w-full">
            <div
              className={`relative z-10 flex items-center justify-between rounded-full p-2 pl-5 pr-3 lg:h-[63px] lg:px-4 lg:pr-4 ${isOpen(offer.cityId) ? 'bg-brand-blue' : 'border border-gray-200 bg-white'}`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-sm font-light lg:text-lg ${isOpen(offer.cityId) ? 'text-white' : 'text-black'}`}
                >
                  {t.kishinev} - {offer.title[lang]}
                </span>
                {!isOpen(offer.cityId) && (
                  <span className=" text-xxs font-light text-red-500 lg:hidden">
                    {t.directFlight}
                  </span>
                )}
              </div>
              {!isOpen(offer.cityId) && (
                <div className="flex flex-col gap-0 lg:hidden">
                  <span className=" w-fit rounded-full bg-brand-green px-2 py-0.5 text-center text-xs text-white">
                    -20%
                  </span>
                  <div>
                    <span className="text-xs text-black">
                      {t.startingLabel}{' '}
                      <span className="font-semibold">
                        {Math.round(offer.price)} €
                      </span>
                    </span>
                  </div>
                </div>
              )}
              <Button
                className={`h-[38px] w-[38px] rounded-full p-0 ${isOpen(offer.cityId) ? 'bg-white' : 'custom-light-shadow bg-brand-blue'}`}
              >
                <Image
                  src={isOpen(offer.cityId) ? minus : plus}
                  className="hidden lg:block"
                  alt="plus-icon"
                  width={18}
                  height={38}
                />
                <Image
                  src={isOpen(offer.cityId) ? chevronUp : chevronDown}
                  className="block lg:hidden"
                  alt="plus-icon"
                  width={14}
                  height={34}
                />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`-mt-10 animate-opacityBlock rounded-b-[20px] bg-white px-5 pb-5 pt-10 ${isOpen(offer.cityId) ? 'custom-shadow-2 border-x-[1px] border-b-[1px]' : ''}`}
          >
            <div className="grid-cols-7 items-center gap-4 pt-[18px] lg:grid">
              <div className="col-span-2 flex justify-between">
                <div className="text-left">
                  <div className="mb-2 text-base font-normal lg:mb-4 lg:text-[22px]">
                    {dayjs().locale(lang).format('DD MMM YYYY')}
                  </div>
                  <div className="text-xs text-[#4A4A4A] lg:text-sm">
                    {t.kishinev}
                  </div>
                </div>
                <div className=" text-right lg:hidden">
                  <div className="mb-2 text-base font-normal lg:mb-4 lg:text-[22px]">
                    {dayjs(offer.date_from).locale(lang).format('DD MMM YYYY')}
                  </div>
                  <div className="text-xs text-[#4A4A4A] lg:text-sm">
                    {offer.title[lang]}
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="mb-3 flex h-4 items-center justify-center ">
                  <Image src={logo} alt="fly-company" width={85} />
                </div>
                <div>
                  <span className="fly-line block h-[1px] w-full bg-brand-blue" />
                  <div className="mt-2 flex justify-between">
                    <span className="text-xxs text-gray-600">KIV</span>
                    <span className="text-xxs text-gray-600">{offer.code}</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 hidden text-right lg:block">
                <div className="mb-2 text-base font-normal lg:mb-4 lg:text-[22px]">
                  {dayjs(offer.date_from).locale(lang).format('DD MMM YYYY')}
                </div>
                <div className="text-xs text-gray-700 lg:text-sm">
                  {offer.title[lang]}
                </div>
              </div>
              {offer.date_from && (
                <div className="mt-4 flex flex-row justify-center gap-2 lg:mt-5 lg:hidden lg:flex-col lg:px-0">
                  <Link
                    href="tel:+37360851555"
                    className=" custom-light-shadow flex h-8 w-full items-center justify-center gap-4 rounded-full bg-brand-green px-4 text-sm font-light text-white lg:hidden lg:w-full lg:justify-center  lg:px-0"
                  >
                    <span>{t.callNow}</span>
                  </Link>
                  <Button
                    onClick={handleSearch}
                    className="custom-shadow flex h-8 w-full items-center gap-2 rounded-full bg-brand-blue px-4 text-sm font-light lg:h-[46px] lg:w-full lg:justify-center lg:px-0  lg:text-lg"
                  >
                    <span>{t.home?.popularDestinations?.buttonLabel}</span>
                    <div className="text-center lg:hidden">
                      <span className="text-sm">
                        {Math.round(offer.price)} €
                      </span>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="hidden lg:block lg:w-1/4">
        <Collapsible
          open={isOpen(offer.cityId)}
          onOpenChange={() => setIsOpen(offer.cityId)}
          className="rounded-full"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={`flex h-[63px] items-center justify-center rounded-full px-4 ${isOpen(offer.cityId) ? 'bg-brand-blue text-white' : 'border border-gray-200  bg-white'}`}
            >
              <span className="text-[22px]">{offer.price} €</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`-mt-10 flex items-center justify-center pb-1 ${isOpen(offer.cityId) ? 'custom-shadow-2 rounded-b-[20px] border-x-[1px] border-b-[1px] pt-16' : ' rounded-full'}`}
          >
            <Button
              onClick={handleSearch}
              className="mb-6 h-[46px] w-[116px] rounded-full bg-brand-blue px-4 text-lg font-light shadow-md shadow-slate-400"
            >
              <span>{t.home?.popularDestinations?.buttonLabel}</span>
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export default CollapsibleBlock
