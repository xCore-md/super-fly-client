import React from 'react'
import { FlightsListing } from '@components/flights/flights-listing'
import { Button } from '@components/ui/button'

export default function Reservation() {
  return (
    <div className="mt-4 flex pb-10">
      <section className="flex w-2/3 flex-col">
        <h2 className="text-xs font-bold">Informații zbor:</h2>
        <FlightsListing length={4} />
        <Button className="bg-brand-green mt-8 flex h-11 items-center justify-center rounded-full px-8 font-light text-white shadow-md shadow-slate-400">
          Rezervă acum
        </Button>
      </section>
      <aside className="flex w-1/3">form</aside>
    </div>
  )
}
