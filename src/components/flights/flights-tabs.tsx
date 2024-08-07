'use client'

import React, { useCallback, useState } from 'react'
import { Button, Empty } from 'antd'
import { useFlightsContext } from '@/context/flights-context'
import { cn } from '@/lib/utils'
import { FlightsListing } from '@components/flights/flights-listing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { FlightsSkeleton } from './flights-skeleton'

interface IFlightsTabsProps {
  className?: string
  loading?: boolean
  isNoFlights?: boolean
  handleAdminPanelReservation?: () => void
}
export const FlightsTabs = ({
  className = '',
  loading,
  isNoFlights = false,
  handleAdminPanelReservation,
}: IFlightsTabsProps) => {
  const { flights, initialFlights, setFlights, setInitialFlights } =
    useFlightsContext()

  const [isSorting, setIsSorting] = useState(true)
  const [flightsToShow, setFlightsToShow] = useState(10)

  const toggleSorting = useCallback(() => {
    if (isSorting) {
      const data = [...initialFlights].sort(
        (a: any, b: any) => a.price - b.price
      )
      setFlights(data)
      setIsSorting(false)
    } else {
      const data = [...flights].sort(
        (a: any, b: any) => a.duration.total - b.duration.total
      )
      setInitialFlights(flights)
      setFlights(data)
      setIsSorting(true)
    }
  }, [isSorting, flights, initialFlights, setFlights, setInitialFlights])

  return (
    <div className={cn('relative flex w-full justify-center', className)}>
      <div className="mt-6 w-full max-w-[861px] lg:mt-14">
        <Tabs className="text-center" defaultValue="rapid">
          <TabsList className="custom-shadow animate-fade rounded-full bg-white fill-mode-forwards">
            <TabsTrigger value="rapid" onClick={toggleSorting}>
              Cel mai rapid
            </TabsTrigger>
            <TabsTrigger
              className=" text-blue-400"
              value="ieftin"
              onClick={toggleSorting}
            >
              Cel mai ieftin
            </TabsTrigger>
          </TabsList>
          <TabsContent className="relative" value="ieftin">
            <FlightListComponent
              flights={flights}
              flightsToShow={flightsToShow}
              setFlightsToShow={setFlightsToShow}
              loading={loading}
              isNoFlights={isNoFlights}
              handleAdminPanelReservation={handleAdminPanelReservation}
            />
          </TabsContent>
          <TabsContent value="rapid">
            <FlightListComponent
              flights={flights}
              flightsToShow={flightsToShow}
              setFlightsToShow={setFlightsToShow}
              loading={loading}
              isNoFlights={isNoFlights}
              handleAdminPanelReservation={handleAdminPanelReservation}
            />
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="absolute right-12 top-1/2 max-[1330px]:hidden">
        <Link
          className="custom-shadow flex h-[64px] w-fit items-center justify-center rounded-full border border-gray-200 px-2"
          href="tel:+(373) 60 456 654"
        >
          <span className="flex flex-col text-black">
            <span className="text-right text-xxs text-gray-600">
              Contacteaza-ne
            </span>
            <span className="text-xs font-semibold text-brand-blue">
              +(373) 60 456 654
            </span>
          </span>
          <div className="relative">
            <Image
              className="ml-2"
              src={supportImgUrl}
              alt="support"
              width={48}
              height={48}
            />
            <span className=" absolute bottom-0 left-1 animate-bounce rounded-full bg-green-400 p-2"></span>
          </div>
        </Link>
      </div> */}
    </div>
  )
}

function FlightListComponent({
  flights,
  flightsToShow,
  setFlightsToShow,
  loading,
  isNoFlights,
  handleAdminPanelReservation,
}: any) {
  return (
    <>
      <FlightsListing
        length={5}
        flightsToShow={flightsToShow}
        handleAdminPanelReservation={handleAdminPanelReservation}
      />
      {flights?.length > 0 ? (
        <>
          {flightsToShow === 10 && (
            <Button
              className="mt-8 w-full rounded-full border-brand-blue bg-transparent text-sm text-brand-blue hover:bg-brand-blue hover:text-white lg:w-auto"
              type="default"
              onClick={() =>
                flights.length > 10 && setFlightsToShow(flightsToShow + 10)
              }
            >
              Vezi mai mult zboruri
            </Button>
          )}
        </>
      ) : (
        <div>
          {loading && <FlightsSkeleton count={5} />}{' '}
          {!loading && isNoFlights && <Empty />}
        </div>
      )}
    </>
  )
}
