import React from 'react'
import { FlightsListing } from '@components/flights/flights-listing'
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
          </TabsContent>
          <TabsContent value="rapid">Cel mai rapid</TabsContent>
        </Tabs>
      </div>
      {/* <div className="t-1/2 absolute right-44">
        <Button variant="link" className="h-22 w-22 p-0">
          qweqw
        </Button>
      </div> */}
    </div>
  )
}
