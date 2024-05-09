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
      <SectionLightBlue>
        <div>
          <h6 className="text-xxs font-bold text-[#121C5E]">
            Chisinau - Milano
          </h6>
          <p className="mt-1 text-xxxs text-[#9D9D9D]">
            Dus - Întors - 1 Adult
          </p>
        </div>
        <Button
          className="rounded-full border-brand-blue bg-transparent text-[12px] text-brand-blue"
          variant="outline"
        >
          Editează
        </Button>
      </SectionLightBlue>

      <SectionLightBlue className="text-xs font-bold text-[#121C5E]">
        <h6>Nume și Prenume</h6>
      </SectionLightBlue>
      <div className="mx-4 mt-2 flex gap-5">
        <Input
          className="h-9 px-3 text-xxs"
          type="text"
          placeholder="Prenume"
        />
        <Input className="h-9 px-3 text-xxs" type="text" placeholder="Nume" />
      </div>

      <SectionLightBlue className="text-xs font-bold text-[#121C5E]">
        <h6>Bagaje</h6>
      </SectionLightBlue>

      <div>
        <SectionLightBlue className="flex justify-between text-xs font-bold text-[#121C5E]">
          <h6>Servicii</h6>
          <h6>€30</h6>
        </SectionLightBlue>

        {flightData.map((flight) => (
          <FlightInfo key={flight.route} {...flight} />
        ))}
      </div>

      <div className="mt-11 rounded-full bg-brand-blue px-4 py-3 text-xxs text-white">
        Total: <span className="font-bold">€466</span>
      </div>

      <p className="mt-9 text-lg font-bold">
        Prețul expiră în:
        <span className="ml-1 text-red-600">12m : 30s</span>
      </p>

      <Progress
        value={23}
        progressClassName="bg-red-600 "
        className="mt-4 h-0.5 w-[100%] bg-[#E7E7E7]"
        showRectangle
      />

      <p className="mt-3 text-xxxs text-[#9D9D9D]">
        <span className="font-bold">Economisești timp și bani:</span> Exemplu
        text, in care va fi indicat anuntul despre disponibilitatea pretului, si
        propunerea de a rezerva acum, pentru a nu pierde oferta la pret.
      </p>
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
      <p className="mt-0 pt-2 text-xxxs text-[#9D9D9D]">{route}</p>
      <p className="mt-1 text-xxxs font-bold text-[#171717]">{passenger}</p>
      <p className="mt-1 text-xxxs text-[#9D9D9D]">{fareType}</p>
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
        'mt-7 flex justify-between rounded-lg bg-[#F0F2FF] p-3 text-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
