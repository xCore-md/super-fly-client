import React from 'react'
import { FlightsListing } from '@components/flights/flights-listing'
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
