'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import backpackSvg from '@/assets/img/backpack.svg'
import flyOneSvg from '@/assets/img/fly-one.png'
import seatSvg from '@/assets/img/seat.svg'
import viberSvg from '@/assets/img/viber.png'
import whatsappSvg from '@/assets/img/whatsapp.png'
import { cn, getTimeFromDate, numberToTimeFormat } from '@/lib/utils'

interface IFlightsListingProps {
  length: number
  margin?: string
  withoutAction?: boolean
  withoutFlightNumber?: boolean
  withoutHeader?: boolean
  withoutFooter?: boolean
  pricePlacement?: 'top' | 'bottom'
  flights: any
}

export const FlightsListing = (props: IFlightsListingProps) => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const { flights, ...rest } = props
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

  return flights.map((flight: any, index: number) => (
    <div
      key={index}
      ref={(el) => setRef(el, index)}
      className={`custom-shadow group my-3 grid w-full  grid-cols-2 items-center rounded-2xl bg-white p-4  lg:grid-cols-5 lg:gap-5 ${props.margin}`}
    >
      <FlyContent {...rest} flight={flight} />
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
  } = props

  return (
    <>
      {props.withoutHeader ? (
        ''
      ) : (
        <div
          className={`flex flex-row items-start justify-between pb-3 lg:flex-col lg:items-center lg:justify-center lg:pb-0 ${props.withoutAction && 'col-span-2 lg:col-span-1'} col-span-1 border-b lg:border-0`}
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

      <section
        className={cn(
          'col-span-2 row-start-2 flex flex-col justify-center pt-3 lg:col-span-3 lg:row-start-auto lg:pt-0',
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
            <div className="text-xs text-gray-700">{flight.cityCodeFrom}</div>
          </div>
          <div className="col-span-2 mt-2">
            <div className="mb-1 flex items-center justify-center gap-2">
              <span className="hidden text-xs text-gray-400 lg:inline">
                Durata de zbor:
              </span>
              <p className="text-xs text-gray-700">
                {numberToTimeFormat(flight.duration.total)}
              </p>
            </div>

            <div className="fly-line block h-[1px] w-full bg-blue-700">
              <FlyLineStopover className="left-1/2">
                <p>Escala București 8h 00m</p>
                <p>Preluarea si înregistrarea bagajului</p>
              </FlyLineStopover>

              <FlyLineStopover className="left-1/3">
                <p>Escala Chisinau 3h 00m</p>
                <p>Preluarea si înregistrarea bagajului</p>
              </FlyLineStopover>
            </div>

            <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-xs text-brand-blue">
              {flight.route.length
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
            <div className="text-xs text-gray-700">{flight.cityCodeTo}</div>
          </div>
        </main>

        {withoutFooter ? (
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
              {withoutFlightNumber ? (
                ''
              ) : (
                <p className="ml-5 hidden text-left lg:inline">
                  Nr. zbor: <span className="font-bold">6F4577</span>
                </p>
              )}
            </div>
          </footer>
        )}
      </section>

      {!withoutAction && (
        <>
          <div className="col-span-1 flex flex-col items-end justify-center gap-3 border-b pb-1 lg:items-center lg:justify-normal lg:border-0 lg:pb-0">
            {pricePlacement === 'bottom' && (
              <p className="text-base font-medium lg:font-bold">€89.90</p>
            )}

            <Link
              href="/reservation"
              className="hidden h-11 w-40 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400 lg:flex"
            >
              Rezerva
            </Link>
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

interface IFlightInfoProps {
  className: string
  children: React.ReactNode
}

export const FlyLineStopover = ({ className, children }: IFlightInfoProps) => {
  return (
    <div className={cn(`fly-line-stopover`, className)}>
      <div className="fly-line-stopover-tooltip">
        <div className="fly-line-stopover-tooltip-content">{children}</div>
      </div>
    </div>
  )
}
