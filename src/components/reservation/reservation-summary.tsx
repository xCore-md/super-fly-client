'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { useFlightContext } from '@/context/flight-context'
import { cn } from '@/lib/utils'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { ReservationTimer } from './reservation-timer'

export const ReservationSummary = ({ reservation }: { reservation: any }) => {
  const { flight } = useFlightContext()
  const router = useRouter()
  const { adults, children, infants } = flight
  const { cityFrom, cityTo, route } = reservation

  const flightData = [
    {
      route: 'Chisinau - Milan',
      passenger: 'Adult 1',
      fareType: '1 x Change Flex',
    },
    {
      route: 'Chisinau - London',
      passenger: 'Adult 2',
      fareType: '2 x Economy Saver',
    },
    {
      route: 'Chisinau - Berlin',
      passenger: 'Child 1',
      fareType: '1 x Economy Basic',
    },
  ]

  const isRoundTrip = route?.some((r: any) => r.return)
  const flightType = isRoundTrip ? 'Dus - Întors' : 'Dus'

  return (
    <section className="flex flex-1 flex-col">
      <div className="lg:sticky lg:top-32">
        <div className="hidden flex-col gap-7 lg:flex">
          <SectionLightBlue>
            <div>
              <h6 className="text-xs font-bold text-[#121C5E]">
                {cityFrom} - {cityTo}
              </h6>
              <p className="mt-1 text-xxs text-[#9D9D9D]">
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

          <div>
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
          </div>

          <SectionLightBlue className="text-sm font-bold text-[#121C5E]">
            <h6>Bagaje</h6>
          </SectionLightBlue>

          <div>
            <SectionLightBlue className="flex justify-between text-sm font-bold text-[#121C5E]">
              <h6>Servicii</h6>
              <h6>€30</h6>
            </SectionLightBlue>

            {flightData.map((flight) => (
              <FlightInfo key={flight.route} {...flight} />
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-full bg-brand-blue px-4 py-3 text-xs text-white lg:mt-11">
          Total: <span className="font-bold">€466</span>
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

interface IFlightInfoProps {
  route: string
  passenger: string
  fareType: string
}

const FlightInfo = ({ route, passenger, fareType }: IFlightInfoProps) => {
  return (
    <div className="ml-4 border-l border-gray-200 pl-3">
      <p className="mt-0 pt-2 text-xxs text-[#9D9D9D]">{route}</p>
      <p className="mt-1 text-xxs font-bold text-[#171717]">{passenger}</p>
      <p className="mt-1 text-xxs text-[#9D9D9D]">{fareType}</p>
    </div>
  )
}

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
