import Image from 'next/image'
import React from 'react'
import backpackSvg from '@/assets/img/backpack.svg'
import flyOneSvg from '@/assets/img/fly-one.png'
import seatSvg from '@/assets/img/seat.svg'
import viberSvg from '@/assets/img/viber.png'
import whatsappSvg from '@/assets/img/whatsapp.png'
import { FlightsListing } from '@components/flights/flights-listing'
import { Button } from '@components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'

export const FlightsTabs = () => {
  return (
    <div className="mt-14">
      <Tabs className="text-center" value={'ieftin'}>
        <TabsList className="rounded-full bg-white shadow-md">
          <TabsTrigger value="ieftin">Cel mai ieftin</TabsTrigger>
          <TabsTrigger value="rapid">Cel mai rapid</TabsTrigger>
        </TabsList>
        <TabsContent value={'ieftin'}>
          <FlightsListing length={10} />
        </TabsContent>
        <TabsContent value={'rapid'}>Cel mai rapid</TabsContent>
      </Tabs>
    </div>
  )
}
