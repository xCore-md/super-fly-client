'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button, Result } from 'antd'
import { useFlightContext } from '@/context/flight-context'
import { useFlightsContext } from '@/context/flights-context'
import { searchFields } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { FlightsListing } from '@components/flights/flights-listing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { FlightsSkeleton } from './flights-skeleton'
import { useTranslationsContext } from '@/context/translations-context'

interface IFlightsTabsProps {
  className?: string
  loading?: boolean
  isNoFlights?: boolean
  handleAdminPanelReservation?: () => void
  isSorting: boolean
  // eslint-disable-next-line
  setIsSorting: (isSorting: boolean) => void
}
export const FlightsTabs = ({
  className = '',
  loading,
  isNoFlights = false,
  handleAdminPanelReservation,
  isSorting,
  setIsSorting,
}: IFlightsTabsProps) => {
  const { flights } = useFlightsContext()
  const { translations: t } = useTranslationsContext()

  const [flightsToShow, setFlightsToShow] = useState(10)

  return (
    <div
      className={cn('relative flex w-full justify-center', className)}
      id="searchResults"
    >
      <div className="mt-6 w-full max-w-[861px] px-5 lg:mt-14 lg:px-0">
        <Tabs className="text-center" defaultValue="rapid">
          <TabsList className="custom-shadow mb-3 animate-fade rounded-full bg-white fill-mode-forwards">
            <TabsTrigger value="rapid" onClick={() => setIsSorting(true)}>
              {t.theFastest}
            </TabsTrigger>
            <TabsTrigger
              className=" text-blue-400"
              value="ieftin"
              onClick={() => setIsSorting(false)}
            >
              {t.mostCheapest}
            </TabsTrigger>
          </TabsList>
          <TabsContent className="relative" value="ieftin">
            <FlightListComponent
              flights={flights}
              flightsToShow={flightsToShow}
              setFlightsToShow={setFlightsToShow}
              loading={loading}
              isSorting={isSorting}
              isNoFlights={isNoFlights}
              isFlightsListEmpty={flights.length === 0}
              handleAdminPanelReservation={handleAdminPanelReservation}
            />
          </TabsContent>
          <TabsContent value="rapid">
            <FlightListComponent
              flights={flights}
              flightsToShow={flightsToShow}
              setFlightsToShow={setFlightsToShow}
              loading={loading}
              isSorting={isSorting}
              isNoFlights={isNoFlights}
              isFlightsListEmpty={flights.length === 0}
              handleAdminPanelReservation={handleAdminPanelReservation}
            />
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="absolute right-12 top-1/2 max-[1330px]:hidden">
        <Link
          className="custom-shadow flex h-[64px] w-fit items-center justify-center rounded-full border border-gray-200 px-2"
          href="tel:+(373) 60 851 555"
        >
          <span className="flex flex-col text-black">
            <span className="text-right text-xxs text-gray-600">
              Contacteaza-ne
            </span>
            <span className="text-xs font-semibold text-brand-blue">
              +(373) 60 851 555
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
  isSorting,
  isFlightsListEmpty,
  handleAdminPanelReservation,
}: any) {
  const { translations: t } = useTranslationsContext()
  return (
    <>
      <FlightsListing
        length={5}
        isSorting={isSorting}
        flightsToShow={flightsToShow}
        handleAdminPanelReservation={handleAdminPanelReservation}
      />
      {flights?.length > 0 ? (
        <>
          {flightsToShow === 10 && (
            <Button
              className="mb-[84px] mt-8 h-[38px] w-full rounded-full border-[2px] border-brand-blue bg-transparent p-0 text-sm text-brand-blue hover:bg-brand-blue hover:text-white lg:mb-14 lg:h-11 lg:w-[234px] lg:text-base lg:font-semibold"
              type="default"
              onClick={() =>
                flights.length > 10 && setFlightsToShow(flightsToShow + 90)
              }
            >
              {t.showMoreFlights}
            </Button>
          )}
        </>
      ) : (
        <div>
          {loading && <FlightsSkeleton count={5} />}{' '}
          {!loading && isFlightsListEmpty && <NoResults />}
        </div>
      )}
    </>
  )
}

const NoResults = () => {
  const router = useRouter()
  const { setFlight } = useFlightContext()
  const { translations: t } = useTranslationsContext()

  const redirectOnHomePage = () => {
    setFlight(searchFields)
    localStorage.removeItem('flight')
    setTimeout(() => router.push('/'), 200)
  }

  return (
    <Result
      status="404"
      title=""
      subTitle={t.noFlightsMessage}
      extra={
        <Button
          onClick={redirectOnHomePage}
          type="primary"
          className="bg-brand-blue"
        >
          {t.backToSearch}
        </Button>
      }
    />
  )
}
