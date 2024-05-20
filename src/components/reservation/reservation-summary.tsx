import Link from 'next/link'
import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Progress } from '@components/ui/progress'

export const ReservationSummary = () => {
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

  return (
    <section className="flex flex-1 flex-col">
      <div className="hidden flex-col gap-7 lg:flex">
        <SectionLightBlue>
          <div>
            <h6 className="text-xs font-bold text-[#121C5E]">
              Chisinau - Milano
            </h6>
            <p className="mt-1 text-xxs text-[#9D9D9D]">
              Dus - Întors - 1 Adult
            </p>
          </div>
          <Button
            className="rounded-full border-brand-blue bg-transparent text-sm text-brand-blue"
            variant="outline"
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

      <p className="mt-9 text-center text-lg font-bold lg:text-left">
        Prețul expiră în:
        <span className="ml-1 text-red-600">12m : 30s</span>
      </p>

      <Progress
        value={23}
        progressClassName="bg-red-600 "
        className="mt-4 h-0.5 w-[100%] bg-[#E7E7E7]"
        showRectangle
      />

      <p className="mt-3 text-xxs text-[#9D9D9D]">
        <span className="font-bold">Economisești timp și bani:</span> Exemplu
        text, in care va fi indicat anuntul despre disponibilitatea pretului, si
        propunerea de a rezerva acum, pentru a nu pierde oferta la pret.
      </p>

      <Link
        href="/confirm-reservation"
        className="mt-8 flex h-11 items-center justify-center rounded-full bg-brand-green px-8 font-light text-white shadow-md shadow-slate-400 lg:hidden"
      >
        Rezervă acum
      </Link>
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
