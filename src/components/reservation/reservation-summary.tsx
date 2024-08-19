'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useMemo } from 'react'
import { Divider } from 'antd'
import { useFlightContext } from '@/context/flight-context'
import { cn } from '@/lib/utils'
import { Button } from '@components/ui/button'
import { ReservationTimer } from './reservation-timer'
export const CHECK_IN_PRICE = 8.99
export const ReservationSummary = ({
  reservation,
  formik,
}: {
  reservation: any
  formik?: any
}) => {
  const { flight } = useFlightContext()
  const router = useRouter()
  const { adults, children, infants } = flight
  const { cityFrom, cityTo, route } = reservation

  const isRoundTrip = route?.some((r: any) => r.return)
  const flightType = isRoundTrip ? 'Dus - Întors' : 'Dus'

  const baggagePrice = useMemo(
    () =>
      formik?.values?.passengers
        ?.map((passenger: any) => {
          const baggagePrice = passenger?.baggage?.map(
            (bag: any, bagIndex: number) => {
              return Number(bag?.count) > 0
                ? Math.round(bag.count * reservation.bags_price?.[bagIndex + 1])
                : 0
            }
          )

          return baggagePrice?.reduce(
            (acc: number, curr: number) => acc + curr,
            0
          )
        })
        .reduce((acc: number, curr: number) => acc + curr, 0) || 0,
    [formik?.values?.passengers, reservation.bags_price]
  )

  const checkInPrice = useMemo(
    () =>
      formik?.values?.passengers
        ?.map((passenger: any) => {
          return passenger?.isOnlineCheckIn ? CHECK_IN_PRICE : 0
        })
        .reduce((acc: number, curr: number) => acc + curr, 0) || 0,
    [formik?.values?.passengers]
  )

  return (
    <section className="flex flex-1 flex-col">
      <div className="lg:sticky lg:top-32">
        <div className="hidden flex-col gap-7 lg:flex">
          <SectionLightBlue>
            <div>
              <h6 className="text-sm font-semibold text-[#121C5E]">
                {cityFrom} - {cityTo}
              </h6>
              <p className="mt-1 text-xs text-gray-500">
                {flightType} - {adults > 0 && `${adults} Adulți`}
                {children > 0 && `, ${children} Copii`}
                {infants > 0 && `, ${infants} Infanți`}
              </p>
            </div>
            <Button
              className="rounded-full border-brand-blue bg-transparent text-sm text-brand-blue"
              variant="outline"
              onClick={() => router.push('/flights')}
            >
              Editează
            </Button>
          </SectionLightBlue>

          {/* <div>
            <SectionLightBlue className="text-sm font-bold text-[#121C5E]">
              <h6>Nume și Prenume</h6>
            </SectionLightBlue>
            <div className="mx-4 mt-2 flex gap-5">
              <Input
                className="h-9 px-3 text-xs"
                type="text"
                placeholder="Prenume"
              />
              <Input
                className="h-9 px-3 text-xs"
                type="text"
                placeholder="Nume"
              />
            </div>
          </div> */}

          <SectionLightBlue className="text-sm font-bold text-[#121C5E]">
            <h6>Bagaje</h6>
          </SectionLightBlue>
          <div className="flex flex-col">
            {formik?.values?.passengers?.map(
              (passenger: any, index: number) => {
                return passenger?.baggage?.some((e: any) => e?.count > 0) ? (
                  <div key={index}>
                    <div className="grid grid-cols-4 gap-4">
                      <p className="col-span-1 text-sm uppercase">
                        {passenger.first_name} {passenger.last_name}
                      </p>
                      <div className="col-span-2 grid grid-cols-3 gap-4">
                        {passenger?.baggage?.map(
                          (bag: any, bagIndex: number) => {
                            return Number(bag?.count) > 0 ? (
                              <div key={bagIndex}>
                                <p className="mb-1 text-sm font-semibold text-[#171717]">
                                  {bag.type}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {bag.count} x{' '}
                                  {Math.round(
                                    bag.count *
                                      reservation.bags_price?.[bagIndex + 1]
                                  )}{' '}
                                  €
                                </p>
                              </div>
                            ) : (
                              ''
                            )
                          }
                        )}
                      </div>
                    </div>
                    {formik.values.passengers.length > 0 &&
                    index !== formik.values.passengers.length - 1 ? (
                      <Divider />
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )
              }
            )}
          </div>

          <div>
            <SectionLightBlue className="flex justify-between text-sm font-bold text-[#121C5E]">
              <h6>Servicii</h6>
              {checkInPrice ? <h6>€{checkInPrice}</h6> : ''}
            </SectionLightBlue>

            <div className="flex flex-col py-4">
              {formik?.values?.passengers?.map(
                (passenger: any, index: number) => {
                  if (!passenger?.isOnlineCheckIn || !passenger?.first_name) {
                    return ''
                  }
                  return (
                    <div key={index}>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <p className="col-span-1 text-sm uppercase">
                          {passenger.first_name} {passenger.last_name}
                        </p>
                        <div className="col-span-3 gap-4">
                          <p className="text-xs text-gray-500">
                            Online Check In
                          </p>
                        </div>
                      </div>
                      {formik.values.passengers.length > 0 &&
                      index !== formik.values.passengers.length - 1 ? (
                        <Divider />
                      ) : (
                        ''
                      )}
                    </div>
                  )
                }
              )}
            </div>

            {/*{flightData.map((flight) => (*/}
            {/*  <FlightInfo key={flight.route} {...flight} />*/}
            {/*))}*/}
          </div>
        </div>

        <div className="mt-4 rounded-md bg-brand-blue px-4 py-3 text-base text-white lg:mt-11">
          <span className="font-light">Total:</span>
          <span className="ml-2 font-semibold">
            {reservation.price + baggagePrice + checkInPrice} €
          </span>
        </div>

        <ReservationTimer />

        <Link
          href="/confirm-reservation"
          className="mt-8 flex h-11 items-center justify-center rounded-full bg-brand-green px-8 font-light text-white shadow-md shadow-slate-400 lg:hidden"
        >
          Rezervă acum
        </Link>
      </div>
    </section>
  )
}

// interface IFlightInfoProps {
//   route: string
//   passenger: string
//   fareType: string
// }

// const FlightInfo = ({ route, passenger, fareType }: IFlightInfoProps) => {
//   return (
//     <div className="ml-4 border-l border-gray-200 pl-3">
//       <p className="mt-0 pt-2 text-xxs text-[#9D9D9D]">{route}</p>
//       <p className="mt-1 text-xxs font-bold text-[#171717]">{passenger}</p>
//       <p className="mt-1 text-xxs text-[#9D9D9D]">{fareType}</p>
//     </div>
//   )
// }

interface ISectionLightBlueProps {
  children: ReactNode
  className?: string
}

const SectionLightBlue = ({ children, className }: ISectionLightBlueProps) => {
  return (
    <div
      className={cn(
        'flex justify-between rounded-lg bg-[#F0F2FF] p-3 text-base',
        className
      )}
    >
      {children}
    </div>
  )
}
