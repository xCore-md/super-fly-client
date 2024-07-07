'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Tooltip } from 'antd'
import gsap from 'gsap'
import backpackSvg from '@/assets/img/backpack.svg'
import flyOneSvg from '@/assets/img/fly-one.png'
import seatSvg from '@/assets/img/seat.svg'
import viberSvg from '@/assets/img/viber.png'
import whatsappSvg from '@/assets/img/whatsapp.png'
import { useFlightsContext } from '@/context/flights-context'
import { useIsAdminPanel } from '@/lib/hooks/useIsAdminPanel'
import { cn, getFlightTime, getTimeFromDate } from '@/lib/utils'
import { Button } from '@components/ui/button'

interface IFlightsListingProps {
  length: number
  margin?: string
  withoutAction?: boolean
  withoutFlightNumber?: boolean
  withoutHeader?: boolean
  withoutFooter?: boolean
  pricePlacement?: 'top' | 'bottom'
  handleAdminPanelReservation?: () => void
}

export const FlightsListing = (props: IFlightsListingProps) => {
  const pathname = usePathname()
  const { flights, setSelectedFlight } = useFlightsContext()
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const isAdminPanel = useIsAdminPanel()

  const data = pathname === '/reservation' ? flights?.slice(0, 3) : flights
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    const elements = elementsRef.current.filter(
      (el) => el !== null
    ) as HTMLDivElement[]

    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: 'easeOut' }
      )
    }
  })

  const setRef = (el: HTMLDivElement | null, index: number) => {
    elementsRef.current[index] = el
  }

  const handleAdminPanelSetSelectedFlight = (flight: object) => {
    setSelectedFlight(flight)
    if (props.handleAdminPanelReservation) {
      props.handleAdminPanelReservation()
    }
  }

  if (!data?.length) return

  return data?.map((flight: any, index: number) => (
    <div
      key={index}
      ref={(el) => setRef(el, index)}
      className={`custom-shadow group my-3 grid w-full grid-cols-2 items-center rounded-2xl bg-white p-4 lg:grid-cols-5 lg:gap-5 ${props.margin}`}
    >
      <FlyContent
        {...props}
        flight={flight}
        isAdminPanel={isAdminPanel}
        handleAdminPanelSetSelectedFlight={handleAdminPanelSetSelectedFlight}
      />
    </div>
  ))
}

export const FlyContent = (props: any) => {
  const {
    pricePlacement,
    withoutAction,
    withoutFooter,
    withoutFlightNumber,
    flight,
    handleAdminPanelSetSelectedFlight,
    isAdminPanel,
  } = props

  return (
    <>
      {props.withoutHeader ? (
        ''
      ) : (
        <div
          className={` flex flex-row items-start justify-between pb-3 lg:flex-col lg:items-center lg:justify-center lg:pb-0 ${props.withoutAction && 'col-span-2 lg:col-span-1'} col-span-1 border-b lg:border-0`}
        >
          <Image
            src={flyOneSvg}
            alt="fly agency"
            className="w-12 lg:w-[112px]"
          />
          {pricePlacement === 'top' && (
            <p className="text-base font-medium lg:font-bold">€89.90</p>
          )}
          {/*<div className="mt-3 flex flex-col text-left text-xs">*/}
          {/*  <p>Escala Bucuresti 3h 00m</p>*/}
          {/*  <p>Escala Paris 7h 30m</p>*/}
          {/*</div>*/}
        </div>
      )}

      {flight && (
        <section
          className={cn(
            'z-10 col-span-2 row-start-2 flex flex-col justify-center pt-3 lg:col-span-3 lg:row-start-auto lg:pt-0',
            {
              'lg:col-span-4': withoutAction,
            }
          )}
        >
          <main className="grid grid-cols-4">
            <div className="mr-2 text-right">
              <div className="mb-2 text-xl font-normal">
                {getTimeFromDate(flight.local_departure)}
              </div>
              <div className="text-xs text-gray-700">{flight.flyFrom}</div>
            </div>
            <div className="col-span-2 mt-2">
              <div className="mb-1 flex items-center justify-center gap-2">
                <span className="hidden text-xs text-gray-400 lg:inline">
                  Durata de zbor:
                </span>
                <p className="text-xs text-gray-700">
                  {getFlightTime(flight.local_departure, flight.local_arrival)}
                </p>
              </div>

              <div className="fly-line block h-[1px] w-full bg-blue-700">
                <div className="flex w-full justify-center">
                  {flight.route.length > 1 && (
                    <div className="flex w-1/2 items-center justify-between">
                      {flight.route.map((route: any, index: number) => (
                        <Tooltip
                          key={index}
                          title={
                            <span className=" flex flex-col gap-2 p-2 text-xs">
                              <span className="flex gap-4">
                                <span className="">Escale:</span>{' '}
                                <span className="ml-2 font-semibold">
                                  {route.cityFrom} - {route.cityTo}
                                </span>
                              </span>
                              <span className="flex gap-4">
                                <span className=""> Nr. zbor:</span>
                                <span className="font-bold">
                                  {route.flight_no}
                                </span>
                              </span>
                              <span>Preluarea si înregistrarea bagajului</span>
                            </span>
                          }
                        >
                          <div className="fly-line-stopover"></div>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-xs text-brand-blue">
                {flight.route.length > 1
                  ? `Escale: ${flight.route.length}`
                  : `Direct`}
              </div>

              {/*<div className="mt-2 flex justify-between">*/}
              {/*  <span className="text-xs text-gray-600">MDA</span>*/}
              {/*  <span className="text-xs text-gray-600">BGY</span>*/}
              {/*</div>*/}
            </div>
            <div className="ml-2 text-left">
              <div className="mb-2 text-xl font-normal">
                {getTimeFromDate(flight.local_arrival)}
              </div>
              <div className="text-xs text-gray-700">{flight.flyTo}</div>
            </div>
          </main>

          {withoutFooter || isAdminPanel ? (
            ''
          ) : (
            <footer className="mt-5 flex justify-evenly text-xs text-xxs lg:justify-center">
              <div className="mr-5 flex min-w-32 flex-row flex-wrap items-center">
                <Image
                  className="w-[18px] rounded-sm bg-brand-gray p-1 lg:w-[20x]"
                  width={20}
                  height={20}
                  src={backpackSvg}
                  alt={'backpack'}
                />
                <p className="ml-1">Bagajul de mînă inclus</p>

                {withoutFlightNumber ? (
                  ''
                ) : (
                  <p className="mt-3 w-full text-left lg:hidden">
                    Nr. zbor: <span className="font-bold">6F4577</span>
                  </p>
                )}
              </div>

              {flight.availability.seats && (
                <div className="flex min-w-32 items-center justify-evenly">
                  <Image
                    className="w-[18px] rounded-sm bg-brand-gray p-0.5 lg:w-[20px]"
                    width={20}
                    height={20}
                    src={seatSvg}
                    alt={'seat'}
                  />
                  <p className="ml-1">
                    Locuri disponibile: {flight.availability.seats}
                  </p>
                  {withoutFlightNumber
                    ? ''
                    : flight.route.length === 1 && (
                        <p className="mt-3 w-full text-left lg:hidden">
                          Nr. zbor:{' '}
                          <span className="font-bold">
                            {flight.route[0].flight_no}
                          </span>
                        </p>
                      )}
                </div>
              )}
            </footer>
          )}
        </section>
      )}

      {!withoutAction && (
        <>
          <div className="col-span-1 flex flex-col items-end justify-center gap-3 border-b pb-1 lg:items-center lg:justify-normal lg:border-0 lg:pb-0">
            {pricePlacement === 'bottom' && (
              <p className="text-base font-medium lg:font-bold">€89.90</p>
            )}

            <p className="text-base font-medium">€ {flight.price}</p>
            {isAdminPanel ? (
              <Button
                onClick={() => handleAdminPanelSetSelectedFlight(flight)}
                className="hidden h-11 w-40 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400 lg:flex"
              >
                Rezerva
              </Button>
            ) : (
              <Link
                href="/reservation"
                className="hidden h-11 w-40 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400 lg:flex"
              >
                Rezerva
              </Link>
            )}
            {!isAdminPanel && (
              <div className="hidden justify-between gap-5 text-xs lg:flex">
                <Link href="/" className="flex">
                  <Image
                    className="object-contain animate-normal animate-duration-[1100ms] animate-fill-forwards animate-infinite animate-ease-in-out group-hover:animate-jump-in"
                    width={16}
                    height={16}
                    src={whatsappSvg}
                    alt={'whatsapp'}
                  />
                  <p className="pl-1">Whatsapp</p>
                </Link>

                <Link href="/" className="flex">
                  <Image
                    className="object-contain animate-normal animate-duration-[1100ms] animate-infinite animate-ease-in-out group-hover:animate-jump-in"
                    width={16}
                    height={16}
                    src={viberSvg}
                    alt={'viber'}
                  />
                  <p className="pl-1">Viber</p>
                </Link>
              </div>
            )}
          </div>

          <footer className="col-span-2 row-span-3 mt-4 flex gap-3 lg:hidden">
            <Link
              href="tel:+(373) 60 456 654"
              className="flex h-9 w-28 flex-1 items-center justify-center rounded-full bg-[#11D2A4] px-8 text-sm font-light text-white shadow-md shadow-slate-400 lg:flex lg:text-base"
            >
              Sună acum
            </Link>
            <Link
              href="/reservation"
              className="flex h-9 w-40 flex-1 items-center justify-center rounded-full bg-brand-blue px-8 text-sm font-light text-white shadow-md shadow-slate-400 lg:flex lg:text-base"
            >
              Rezerva
            </Link>
          </footer>
        </>
      )}
    </>
  )
}
