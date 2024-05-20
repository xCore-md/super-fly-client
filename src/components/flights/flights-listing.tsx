import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import backpackSvg from '@/assets/img/backpack.svg'
import flyOneSvg from '@/assets/img/fly-one.png'
import seatSvg from '@/assets/img/seat.svg'
import viberSvg from '@/assets/img/viber.png'
import whatsappSvg from '@/assets/img/whatsapp.png'
import { cn } from '@/lib/utils'

interface IFlightsListingProps {
  length: number
  margin?: string
  withoutAction?: boolean
  withoutActionFlightNumber?: boolean
  withoutHeader?: boolean
  withoutFooter?: boolean
  pricePlacement?: 'top' | 'bottom'
}

export const FlightsListing = (props: IFlightsListingProps) => {
  return Array.from({ length: props.length }).map((_, index) => (
    <section
      key={index}
      className={`custom-shadow my-6 grid w-full grid-cols-2 items-center rounded-2xl bg-white p-4 lg:grid-cols-5 lg:gap-5 ${props.margin}`}
    >
      <FlyContent {...props} />
    </section>
  ))
}

export const FlyContent = (
  props: Omit<IFlightsListingProps, 'length' | 'margin'>
) => {
  return (
    <>
      {props.withoutHeader ? (
        ''
      ) : (
        <div
          className={`flex flex-row items-start justify-between pb-3 lg:flex-col lg:items-center lg:justify-center lg:pb-0 ${props.withoutAction && 'col-span-2'} col-span-1 border-b lg:border-0`}
        >
          <Image
            src={flyOneSvg}
            alt="fly agency"
            className="w-12 lg:w-[112px]"
          />
          {props.pricePlacement === 'top' && (
            <p className="text-base font-medium lg:font-bold">€89.90</p>
          )}
          {/*<div className="mt-3 flex flex-col text-left text-xs">*/}
          {/*  <p>Escala Bucuresti 3h 00m</p>*/}
          {/*  <p>Escala Paris 7h 30m</p>*/}
          {/*</div>*/}
        </div>
      )}

      <section className="col-span-2 row-start-2 flex flex-col justify-center pt-3 lg:col-span-3 lg:row-start-auto lg:pt-0">
        <main className="grid grid-cols-4">
          <div className="mr-2 text-right">
            <div className="mb-2 text-xl font-normal">11:35</div>
            <div className="text-xs text-gray-700">RMO</div>
          </div>
          <div className="col-span-2 mt-2">
            <div className="mb-1 flex items-center justify-center gap-2">
              <span className="hidden text-xs text-gray-400 lg:inline">
                Durata de zbor:
              </span>
              <p className="text-xs text-gray-700">2 h 50 min</p>
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
              Direct
            </div>

            {/*<div className="mt-2 flex justify-between">*/}
            {/*  <span className="text-xs text-gray-600">MDA</span>*/}
            {/*  <span className="text-xs text-gray-600">BGY</span>*/}
            {/*</div>*/}
          </div>
          <div className="ml-2 text-left">
            <div className="mb-2 text-xl font-normal">14:25</div>
            <div className="text-xs text-gray-700">BGY</div>
          </div>
        </main>

        {props.withoutFooter ? (
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

              {props.withoutActionFlightNumber ? (
                ''
              ) : (
                <p className="mt-3 w-full text-left">
                  Nr. zbor: <span className="font-bold">6F4577</span>
                </p>
              )}
            </div>

            <div className="flex min-w-32 items-center">
              <Image
                className="w-[18px] rounded-sm bg-brand-gray p-0.5 lg:w-[20px]"
                width={20}
                height={20}
                src={seatSvg}
                alt={'seat'}
              />
              <p className="ml-1">Locuri disponibile: 3</p>
            </div>
          </footer>
        )}
      </section>

      {!props.withoutAction && (
        <>
          <div className="col-span-1 flex flex-col items-end justify-center gap-3 border-b pb-1 lg:items-center lg:justify-normal lg:border-0 lg:pb-0">
            {props.pricePlacement === 'bottom' && (
              <p className="text-base font-medium lg:font-bold">€89.90</p>
            )}

            <Link
              href="/reservation"
              className="hidden h-11 w-28 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400 lg:flex"
            >
              Rezerva
            </Link>
            <div className="hidden justify-between gap-5 text-xs lg:flex">
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

          <footer className="col-span-2 row-span-3 mt-4 flex gap-3 lg:hidden">
            <Link
              href="tel:+(373) 60 456 654"
              className="flex h-9 w-28 flex-1 items-center justify-center rounded-full bg-[#11D2A4] px-8 text-sm font-light text-white shadow-md shadow-slate-400 lg:flex lg:text-base"
            >
              Sună acum
            </Link>
            <Link
              href="/reservation"
              className="flex h-9 w-28 flex-1 items-center justify-center rounded-full bg-brand-blue px-8 text-sm font-light text-white shadow-md shadow-slate-400 lg:flex lg:text-base"
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
