'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/assets/img/logo-blue.png'
import minus from '@/assets/img/minus.svg'
import plus from '@/assets/img/plus.svg'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from './ui/button'
import { useFlightContext } from '@/context/flight-context'
import { useCallback } from 'react'

const CollapsibleBlock = ({
  offer,
  isOpen,
  setIsOpen,
  currentCountry,
}: {
  offer: any
  // eslint-disable-next-line no-unused-vars
  isOpen: (title: string) => boolean
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (title: string) => void
  currentCountry: any
}) => {
  const router = useRouter()
  const { setFlight } = useFlightContext()
  console.log({ offer })

  const searchObj = {
    fly_from: {
      ...currentCountry,
    },
    fly_to: {
      code: offer.code,
      key: 1,
      city: '',
      country: '',
      cityId: '0',
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
          open={isOpen(offer.title)}
          onOpenChange={() => setIsOpen(offer.title)}
          className="rounded-full bg-white"
        >
          <CollapsibleTrigger asChild className="w-full">
            <div
              className={`relative z-10 flex h-[63px] items-center justify-between rounded-full px-4 ${isOpen(offer.title) ? 'bg-blue-700' : 'border border-gray-200 bg-white'}`}
            >
              <span
                className={`text-lg font-light ${isOpen(offer.title) ? 'text-white' : 'text-black'}`}
              >
                Chișinău - {offer.title}
              </span>
              <Button
                className={`h-[38px]  w-[38px] rounded-full p-0 ${isOpen(offer.title) ? 'bg-white' : 'bg-blue-700 shadow-md shadow-slate-400'}`}
              >
                <Image
                  src={isOpen(offer.title) ? minus : plus}
                  alt="plus-icon"
                  width={18}
                  height={38}
                />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`-mt-10 rounded-b-[20px] bg-white px-5 pb-4 pt-14 ${isOpen(offer.title) ? 'shadow-lg shadow-slate-200' : ''}`}
          >
            {/*desktop todo: check if the variation on mobile and desktop is right*/}
            <div className="grid-cols-5 items-center gap-8 md:p-6 lg:grid">
              <div className="flex justify-between">
                <div className="text-left">
                  <div className="mb-2 text-base font-normal md:mb-5 md:text-xl">
                    15 Apr, 2023
                  </div>
                  <div className="text-xs text-gray-700 md:text-sm">
                    Chișinău
                  </div>
                </div>
                <div className=" text-right md:hidden">
                  <div className="mb-2 text-base font-normal md:mb-5 md:text-xl">
                    20 Apr, 2023
                  </div>
                  <div className="text-xs text-gray-700 md:text-sm">
                    {offer.title}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="mb-3 flex items-center justify-center ">
                  <Image src={logo} alt="fly-company" width={85} />
                </div>
                <div>
                  <span className="fly-line block h-[1px] w-full bg-blue-700" />
                  <div className="mt-2 flex justify-between">
                    <span className="text-xs text-gray-600">MDA</span>
                    <span className="text-xs text-gray-600">BGY</span>
                  </div>
                </div>
              </div>
              <div className="hidden text-right md:block">
                <div className="mb-2 text-base font-normal md:mb-5 md:text-xl">
                  20 Apr, 2023
                </div>
                <div className="text-xs text-gray-700 md:text-sm">
                  {offer.title}
                </div>
              </div>
              {offer.date_from && (
                <div className="mt-4 flex flex-row justify-center px-8 md:mt-2 md:flex-col md:px-0">
                  <div className="mb-2 hidden w-full text-center md:block">
                    <span className="text-lg">{Math.round(offer.price)} €</span>
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="flex h-10 items-center justify-between gap-4 rounded-full bg-blue-700 px-8 text-base font-light shadow-md shadow-slate-400 md:w-full md:justify-center  md:px-0"
                  >
                    <span>Alege</span>
                    <div className="text-center md:hidden">
                      <span className="text-lg">
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
      <div className="hidden lg:w-1/5">
        <Collapsible
          open={isOpen(offer.title)}
          onOpenChange={() => setIsOpen(offer.title)}
          className="rounded-full bg-white"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={`flex h-[63px] items-center justify-center rounded-full px-4 ${isOpen(offer.title) ? 'bg-blue-700 text-white' : 'border border-gray-200 bg-white'}`}
            >
              <span className="text-xl">{offer.price} €</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`-mt-10 rounded-b-[20px] bg-white px-6 pb-1 pt-16 ${isOpen(offer.title) ? 'shadow-lg shadow-slate-200' : ''}`}
          >
            <Button
              onClick={handleSearch}
              className="mb-6 h-[46px] w-full rounded-full bg-blue-700 px-4 text-lg font-light shadow-md shadow-slate-400"
            >
              <span>Alege</span>
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export default CollapsibleBlock
