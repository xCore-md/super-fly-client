'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Collapsible } from '@radix-ui/react-collapsible'
import flyOne from '@/assets/img/fly-one.png'
import minus from '@/assets/img/minus.svg'
import plus from '@/assets/img/plus.svg'
import { FlyContent } from '@components/flights/flights-listing'
import { Button } from './ui/button'
import { CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

const CollapsibleBlock = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-start gap-2">
      <div className="w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="rounded-full bg-white"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={`flex h-[63px] items-center justify-between rounded-full px-4 ${isOpen ? 'bg-blue-700' : 'border border-gray-200 bg-white'}`}
            >
              <span
                className={`text-lg font-light ${isOpen ? 'text-white' : 'text-black'}`}
              >
                Chișinău - Milano
              </span>
              <Button
                className={`h-[38px]  w-[38px] rounded-full p-0 ${isOpen ? 'bg-white' : 'bg-blue-700 shadow-md shadow-slate-400'}`}
              >
                <Image
                  src={isOpen ? minus : plus}
                  alt="plus-icon"
                  width={18}
                  height={38}
                />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`-mt-10 rounded-b-[20px] bg-white px-5 pb-4 pt-14 ${isOpen ? 'shadow-lg shadow-slate-200' : ''}`}
          >
            {/*desktop todo: check if the variation on mobile and desktop is right*/}
            <div className="hidden grid-cols-4 lg:grid">
              <div className="text-left">
                <div className="mb-5 text-xl font-normal">15 Apr, 2023</div>
                <div className="text-sm text-gray-700">Chișinău</div>
              </div>
              <div className="col-span-2">
                <div className="mb-1 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-700">
                    Airline : FlyOne Airlines
                  </span>
                  <Image src={flyOne} alt="fly-company" width={52} />
                </div>
                <div>
                  <span className="fly-line block h-[1px] w-full bg-blue-700" />
                  <div className="mt-2 flex justify-between">
                    <span className="text-xs text-gray-600">MDA</span>
                    <span className="text-xs text-gray-600">BGY</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-5 text-xl font-normal">20 Apr, 2023</div>
                <div className="text-sm text-gray-700">Milano</div>
              </div>
            </div>

            {/*MOBILE */}
            <div className="lg:hidden">
              <FlyContent
                withoutAction={false}
                withoutActionFlightNumber={true}
                pricePlacement="top"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="hidden lg:w-1/5">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="rounded-full bg-white"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={`flex h-[63px] items-center justify-center rounded-full px-4 ${isOpen ? 'bg-blue-700 text-white' : 'border border-gray-200 bg-white'}`}
            >
              <span className="text-xl">MDL 2299</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`-mt-10 rounded-b-[20px] bg-white px-6 pb-1 pt-16 ${isOpen ? 'shadow-lg shadow-slate-200' : ''}`}
          >
            <Button className="mb-6 h-[46px] w-full rounded-full bg-blue-700 px-4 text-lg font-light shadow-md shadow-slate-400">
              <span>Alege</span>
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export default CollapsibleBlock
