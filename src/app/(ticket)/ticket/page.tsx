'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import dayjs from 'dayjs'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import bag from '@/assets/img/bags/bag.svg'
import planeArrival from '@/assets/img/plane-arrival.png'
import planeDeparture from '@/assets/img/plane-departure.png'
import axs from '@/lib/axios'
import { getFlightTime, getPassengerAge } from '@/lib/utils'

export default function TicketPage() {
  const [passengerData, setPassengerData] = useState<any>(null)

  useEffect(() => {
    axs
      .get(
        `/ticket/${window.location.search.substring('?passenger_id='.length)}/token/aloha`
      )
      .then((res) => {
        setPassengerData(res.data)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [])

  const sale = passengerData?.sale && JSON.parse(passengerData.sale.extra)

  const startDirection = sale?.route.filter((r: any) => r.return === 0)
  const endDirection = sale?.route.filter((r: any) => r.return === 1)
  const directions = endDirection?.length
    ? [startDirection, endDirection]
    : [startDirection]

  return (
    <section className="container mx-auto">
      <h2 className="my-10 w-full text-center text-2xl font-medium">
        Ticket de zbor
      </h2>
      {directions.map((routes, index) => (
        <Ticket
          key={index}
          ticketIndex={index}
          passenger={passengerData}
          routes={routes}
        />
      ))}
      <div className="mb-6 overflow-hidden rounded-lg">
        <div className="flex justify-between bg-brand-blue pl-20 text-sm font-medium text-white">
          <span className="py-3">DATA ACHITĂRII</span>
          <span className="py-3">MODUL DE ACHITARE</span>
          <span className="bg-brand-green px-14 py-3">TOTAL EURO</span>
        </div>
        <div className="flex justify-between bg-[#EFEFEF] p-5 pl-20 pr-[70px] text-xl font-medium text-slate-600">
          <span>
            {dayjs(passengerData?.sale.created_at).format('DD.MM.YYYY')}
          </span>
          <span className="-translate-x-14">
            {passengerData?.sale.payment_method}
          </span>
          <span>{passengerData?.price_sold || 0} €</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-brand-light-blue">
        <div className=" overflow-hidden rounded-lg bg-brand-light-blue p-5 text-base font-semibold text-red-500">
          <p>Reguli de călătorie</p>
        </div>
        <div className="flex flex-col gap-2 p-8 text-xs font-normal leading-5 text-gray-500">
          <p>
            *Trebuie să vă prezentați la aeroport cu cel puțin trei ore înainte
            de ora îmbarcării, pentru a vă asigura că aveți suficient timp
            pentru efectuarea formalităților de check-in și securitate.
          </p>
          <p>
            *Este important să verificați cu atenție informațiile referitoare la
            zborul Dvs. de pe acest document și să informați agenția Superfly
            prin apel telefonic imediat dacă observați vreo eroare.
          </p>
          <p>
            *Respectați dimensiunile și greutatea bagajului permise de compania
            aeriană și asigurați-vă că vă îndepliniți toate obligațiile
            referitoare la formalitățile de check-in pentru bagaje.
          </p>
          <p>
            *Compania aeriană își rezervă dreptul de a refuza îmbarcarea
            pasagerilor care se comportă agresiv sau care reprezintă o
            amenințare la adresa securității zborului.
          </p>
          <p>
            *Superfly (Superfly Invest S.R.L) și compania aeriană nu își asumă
            responsabilitatea pentru întârzieri la zbor cauzate de pasageri și
            recomandăm tuturor pasagerilor să se prezinte la aeroport cu
            suficient timp înainte de ora de plecare.
          </p>
          <p>
            *Pasagerii sunt responsabili să se informeze de la intreprinderi de
            stat cu privire la documentele necesare pentru a călători în țara de
            destinație, inclusiv pașaportul sau cartea de identitate, viza sau
            alte documente necesare.
          </p>
          <p>
            *Superfly (Superfly Invest S.R.L) nu își asumă responsabilitatea
            pentru pasagerii care nu au documentele necesare pentru a călători
            în țara de destinație.
          </p>
          <p>
            *Superfly (Superfly Invest S.R.L) nu își asumă responsabilitatea
            pentru daunele sau pierderile suferite de pasageri cauzate de
            pierderea sau furtul documentelor, biletelor sau bagajelor și
            încurajează pasagerii să își protejeze cu grijă bunurile personale
            în timpul călătoriei.
          </p>
          <p>
            *Dacă ați primit bagajul deteriorat trebuie să depuneți imediat o
            reclamație – Property Irregularity Report (P.I.R.) la serviciul
            specializat din cadrul aeroportului ce conține datele Dvs. de
            identificare, ale zborului și ale bagajului înregistrat, precum și
            datele necesare identificării acestuia (tipul geamantanului,
            culoare, dimensiuni, etc.)
          </p>
          <p>
            *Acest document nu este permis de îmbarcare, permisul de îmbarcare
            se eliberează doar la aeroport dupa înregistrarea la zbor.
          </p>
          <p>
            *La prezentarea acestui document emis de Superfly (Superfly Invest
            S.R.L) și confirmarea plății, pasagerii pot benefecia de check-in
            gratuit pentru zbor.
          </p>
          <p>
            *Pentru a benefecia de check-in gratuit pentru zbor pasagerul este
            obligat să apeleze numărul +37360851555 sau +37369639555 cu 24 ore
            înainte de zbor, dar nu mai târziu de 6 ore înaintea zborului, în
            caz contrar pasagerul va achita suplimentar la aeroport serviciul
            check-in.
          </p>
        </div>
      </div>
    </section>
  )
}

interface ITicketProps {
  passenger?: any
  routes?: any
  ticketIndex?: number
}

const Ticket = ({ passenger, routes, ticketIndex }: ITicketProps) => {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white">
      <div className={`flex justify-between  bg-brand-blue px-5 py-6`}>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Nume/Prenume Pasager</p>
          <p className="text-xl font-medium">
            {passenger?.first_name} {passenger?.last_name}
          </p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Data, Luna, Anul Nașterii</p>
          <p className="text-xl font-medium">
            {dayjs(passenger?.date_of_birth).format('DD.MM.YYYY')}
          </p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">
            {getPassengerAge(passenger?.date_of_birth)}
          </p>
          <p className="text-xl font-medium">1</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Cetățenia</p>
          <p className="text-xl font-medium">{passenger?.passport_country}</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Număr Pașaport</p>
          <p className="text-xl font-medium">{passenger?.passport_number}</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Număr de rezervare</p>
          <p className="text-xl font-medium">
            SF{passenger?.id}
            {passenger?.reservation_code}
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex h-full w-full items-center  justify-between">
          <div className="w-1/2">
            <div className="flex w-full">
              <div className="relative h-auto w-3">
                <span
                  className={`absolute left-1.5 top-0 z-0 h-full w-px bg-brand-blue`}
                ></span>
                <div className=" flex h-full w-full flex-col items-center justify-between">
                  <span
                    className={`z-40 h-6 w-3 rounded-lg bg-brand-blue`}
                  ></span>
                  {routes?.length > 1 &&
                    routes?.map((r: any, index: number) => (
                      <Tooltip
                        key={index}
                        title={
                          <span className=" flex flex-col gap-2 p-2 text-xs">
                            <span className="flex gap-4">
                              <span className="">Escale:</span>{' '}
                              <span className="ml-2 font-semibold">
                                {r.cityFrom} - {r.cityTo}
                              </span>
                            </span>
                            <span className="flex gap-4">
                              <span className=""> Nr. zbor:</span>
                              <span className="font-bold">{r.flight_no}</span>
                            </span>
                            <span>Preluarea si înregistrarea bagajului</span>
                          </span>
                        }
                        className={`z-40 h-6 w-3 rounded-lg  ${index === routes?.length - 1 ? ' bg-brand-yellow' : 'bg-gray-400'}`}
                      ></Tooltip>
                    ))}
                  <span
                    className={`z-40 h-6 w-3 rounded-lg bg-brand-blue`}
                  ></span>
                </div>
              </div>
              <div className="ml-4 flex w-full  flex-col gap-12">
                <div className="relative flex gap-12">
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      De la
                    </p>
                    <p className="mb-0 text-base font-medium text-black">
                      {routes?.[0].flyFrom}
                    </p>
                    <span className="absolute -bottom-4 text-xs text-gray-500">
                      {routes?.[0].cityFrom}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Data
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[0]?.local_departure).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Ora
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[0]?.local_departure).format('HH:mm')}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Nr.zbor:
                    </p>
                    <p className="text-base font-semibold text-black">
                      {routes?.[0].flight_no}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div
                    className={`flex h-full w-24 min-w-24 flex-col justify-center ${routes?.length > 1 ? 'gap-14' : ''}`}
                  >
                    {routes?.map((r: any, index: number) => (
                      <div key={index} className="flight_time">
                        <p className="text-xs font-normal text-slate-600">
                          Timp de zbor
                        </p>
                        <p className="text-base font-semibold text-black">
                          {getFlightTime(r.local_departure, r.local_arrival)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="absolute -top-6 mr-8 flex max-w-44 gap-4">
                      {routes?.map((r: any, index: number) => (
                        <img
                          key={index}
                          src={`https://images.kiwi.com/airlines/128x128/${r.airline}.png`}
                          className={`w-[${100 / routes.length}%] max-w-16`}
                          alt="company"
                        />
                      ))}
                    </span>
                    {ticketIndex === 0 ? (
                      <Image
                        src={planeDeparture}
                        width={700}
                        height={700}
                        className="w-[90%]"
                        alt="airplane"
                      />
                    ) : (
                      <Image
                        src={planeArrival}
                        width={700}
                        height={700}
                        className="w-[90%]"
                        alt="airplane"
                      />
                    )}
                  </div>
                </div>
                <div className="relative flex gap-12">
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Spre
                    </p>
                    <p className="mb-0 text-base font-medium text-black">
                      {routes?.[routes.length - 1].flyTo}
                    </p>
                    <span className="absolute -bottom-4 text-xs text-gray-500">
                      {routes?.[routes.length - 1].cityTo}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Data
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[routes.length - 1].local_arrival).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Ora
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[routes.length - 1].local_arrival).format(
                        'HH:mm'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-3/4 items-center border border-brand-blue px-8 py-10">
            <div className="flex h-full items-center gap-4">
              <div className="flex flex-col items-center justify-center ">
                <Image
                  src={eightKgSvg}
                  width={100}
                  height={100}
                  alt="bag"
                  className="mb-2 w-11"
                />

                <span className="mb-1 text-xs font-semibold text-black">
                  Obiect personal
                </span>

                <span className="text-xs font-light text-slate-800">
                  Inclus Gratuit
                </span>
              </div>
              {passenger?.baggage?.length > 0 && (
                <div className="flex h-full items-center gap-8">
                  <span className="px-2 text-3xl">+</span>
                  <div className="flex h-full flex-col items-center justify-center">
                    {passenger?.baggage?.length < 3 && (
                      <Image
                        src={bag}
                        width={100}
                        height={100}
                        alt="bag"
                        className="mb-2 w-11"
                      />
                    )}
                    {passenger?.baggage?.map((b: any, index: number) => (
                      <div
                        key={index}
                        className="flex h-full flex-col items-center justify-center"
                      >
                        <span className="text-sm font-normal text-slate-800">
                          {b.type} X {b.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
