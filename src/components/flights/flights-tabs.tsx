import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import supportImgUrl from '@/assets/img/support.png'
import { FlightsListing } from '@components/flights/flights-listing'
import { Button } from '@components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'

export const FlightsTabs = () => {
  return (
    <div className="relative flex w-full justify-center">
      <div className="mt-14 max-w-[861px]">
        <Tabs className=" text-center" defaultValue="ieftin">
          <TabsList className="custom-shadow rounded-full bg-white">
            <TabsTrigger value="ieftin">Cel mai ieftin</TabsTrigger>
            <TabsTrigger className=" text-blue-400" value="rapid">
              Cel mai rapid
            </TabsTrigger>
          </TabsList>
          <TabsContent className="relative" value="ieftin">
            <FlightsListing length={5} />

            <Button
              className="mt-8 rounded-full border-brand-blue bg-transparent text-[12px] text-brand-blue hover:bg-brand-blue hover:text-white"
              variant="outline"
            >
              Vezi mai mult zboruri
            </Button>
          </TabsContent>
          <TabsContent value="rapid">Cel mai rapid</TabsContent>
        </Tabs>
      </div>
      <div className="absolute right-24 top-1/2">
        <Link
          className="custom-shadow flex h-[64px] w-[178px] animate-pulse items-center justify-center rounded-full border border-gray-200"
          href="tel:+(373) 60 456 654"
        >
          <span className="flex flex-col text-black">
            <span className="text-right text-[10px] text-gray-600">
              Contacteaza-ne
            </span>
            <span className="text-[10px] font-semibold text-brand-blue">
              +(373) 60 456 654
            </span>
          </span>
          <Image
            className="ml-2"
            src={supportImgUrl}
            alt="support"
            width={48}
            height={48}
          />
        </Link>
      </div>
    </div>
  )
}
