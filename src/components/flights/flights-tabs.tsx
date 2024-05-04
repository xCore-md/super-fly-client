import Image from 'next/image'
import React from 'react'
import backpackSvg from '@/assets/img/backpack.svg'
import flyOneSvg from '@/assets/img/fly-one.png'
import flyOne from '@/assets/img/fly-one.png'
import seatSvg from '@/assets/img/seat.svg'
import viberSvg from '@/assets/img/viber.png'
import whatsappSvg from '@/assets/img/whatsapp.png'
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
          <FlightsListing />
        </TabsContent>
        <TabsContent value={'rapid'}>Cel mai rapid</TabsContent>
      </Tabs>
    </div>
  )
}

const FlightsListing = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <section className="mt-11 grid w-full grid-cols-5 gap-5 rounded-2xl bg-white p-4 shadow-md">
      <div className="flex flex-col items-center justify-center">
        <Image src={flyOneSvg} alt="fly agency" width={112} />
        {/*<div className="mt-3 flex flex-col text-left text-[10px]">*/}
        {/*  <p>Escala Bucuresti 3h 00m</p>*/}
        {/*  <p>Escala Paris 7h 30m</p>*/}
        {/*</div>*/}
      </div>

      <section className="col-span-3 flex flex-col justify-center">
        <main className="grid grid-cols-4">
          <div className="mr-2 text-right">
            <div className="mb-2 text-xl font-normal">11:35</div>
            <div className="text-[10px] text-gray-700">RMO</div>
          </div>
          <div className="col-span-2 mt-2">
            <div className="mb-1 flex items-center justify-center gap-2">
              <span className="text-[10px] text-gray-400">Durata de zbor:</span>
              <p className="text-[10px] text-gray-700">2 h 50 min</p>
            </div>

            <span className="fly-line block h-[1px] w-full bg-blue-700" />

            <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-[10px] text-brand-blue text-gray-400">
              Direct
            </div>

            {/*<div className="mt-2 flex justify-between">*/}
            {/*  <span className="text-[10px] text-gray-600">MDA</span>*/}
            {/*  <span className="text-[10px] text-gray-600">BGY</span>*/}
            {/*</div>*/}
          </div>
          <div className="ml-2 text-left">
            <div className="mb-2 text-xl font-normal">14:25</div>
            <div className="text-[10px] text-gray-700">BGY</div>
          </div>
        </main>

        <footer className="mt-5 flex justify-center text-[10px]">
          <div className="mr-5 flex items-center">
            <Image
              className="rounded-sm bg-brand-gray p-1"
              width={20}
              height={20}
              src={backpackSvg}
              alt={'backpack'}
            />
            <p className="ml-1">Bagajul de mînă inclus</p>
          </div>

          <div className="flex items-center">
            <Image
              className="rounded-sm bg-brand-gray p-1"
              width={20}
              height={20}
              src={seatSvg}
              alt={'seat'}
            />
            <p className="ml-1">Locuri disponibile: 3</p>
          </div>
        </footer>
      </section>

      <div className="flex flex-col items-center gap-3">
        <p className="text-base font-bold">€89.90</p>
        <Button className="flex h-11 w-28 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400">
          Rezerva
        </Button>
        <div className="flex justify-between gap-5 text-[10px]">
          <div className="flex">
            <Image
              className="object-contain"
              width={16}
              height={16}
              src={whatsappSvg}
              alt={'whatsapp'}
            />
            <p className="pl-1">Whatsapp</p>
          </div>

          <div className="flex">
            <Image
              className="object-contain"
              width={16}
              height={16}
              src={viberSvg}
              alt={'viber'}
            />
            <p className="pl-1">Viber</p>
          </div>
        </div>
      </div>
    </section>
  ))
}
