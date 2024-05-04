'use client'

import { useState } from 'react'

import Image from 'next/image'
import { Collapsible } from '@radix-ui/react-collapsible'
import { CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Button } from './ui/button'
import plus from '@/assets/img/plus.svg'
import minus from '@/assets/img/minus.svg'
import flyOne from '@/assets/img/fly-one.png'

const CollapsibleBlock = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-start gap-2">
      <div className="w-4/5">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="rounded-full bg-white"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={`flex justify-between items-center rounded-full h-[63px] px-4 ${isOpen ? 'bg-blue-700' : 'bg-white border border-gray-200'}`}
            >
              <span
                className={`text-lg font-light ${isOpen ? 'text-white' : 'text-black'}`}
              >
                Chișinău - Milano
              </span>
              <Button
                className={`rounded-full  h-[38px] w-[38px] p-0 ${isOpen ? 'bg-white' : 'bg-blue-700 shadow-md shadow-slate-400'}`}
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
            className={`rounded-b-[20px] bg-white px-5 pt-14 pb-4 -mt-10 ${isOpen ? 'shadow-lg shadow-slate-200' : ''}`}
          >
            <div className="grid grid-cols-4">
              <div className="text-left">
                <div className="text-xl font-normal mb-5">15 Apr, 2023</div>
                <div className="text-sm text-gray-700">Chișinău</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-sm text-gray-700">
                    Airline : FlyOne Airlines
                  </span>
                  <Image src={flyOne} alt="fly-company" width={52} />
                </div>
                <div>
                  <span className="fly-line h-[1px] w-full bg-blue-700 block" />
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-gray-600">MDA</span>
                    <span className="text-[10px] text-gray-600">BGY</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-normal mb-5">20 Apr, 2023</div>
                <div className="text-sm text-gray-700">Milano</div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="w-1/5">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="rounded-full bg-white"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={`flex justify-center items-center rounded-full h-[63px] px-4 ${isOpen ? 'bg-blue-700 text-white' : 'bg-white border border-gray-200'}`}
            >
              <span className="text-xl">MDL 2299</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`rounded-b-[20px] bg-white px-6 pt-16 pb-1 -mt-10 ${isOpen ? 'shadow-lg shadow-slate-200' : ''}`}
          >
            <Button className="rounded-full w-full h-[46px] bg-blue-700 px-4 mb-6 text-lg font-light shadow-md shadow-slate-400">
              <span>Alege</span>
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export default CollapsibleBlock
