'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import tenKgSvg from '@/assets/img/bags/10kg.svg'
import twentyKgSvg from '@/assets/img/bags/20kg.svg'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import flyOne from '@/assets/img/fly-one.png'
import planeArrival from '@/assets/img/plane-arrival.png'
import planeDeparture from '@/assets/img/plane-departure.png'
import axs from '@/lib/axios'
import { getFlightTime } from '@/lib/utils'

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

  return (
    <section className="container mx-auto">
      <h2 className="my-10 w-full text-center text-2xl font-medium">
        Ticket de zbor
      </h2>
      <Ticket data={passengerData} />
      <div className="mb-6 overflow-hidden rounded-lg">
        <div className="flex justify-between bg-brand-blue pl-20 text-sm font-medium text-white">
          <span className="py-3">DATA ACHITĂRII</span>
          <span className="py-3">MODUL DE ACHITARE</span>
          <span className="bg-brand-green px-14 py-3">TOTAL EURO</span>
        </div>
        <div className=" flex justify-between bg-[#EFEFEF] p-5 pl-8 pr-[70px] text-xl font-medium text-slate-600">
          <span>
            {dayjs(passengerData?.sale.created_at).format('DD.MM.YYYY - HH:mm')}
          </span>
          <span className="-translate-x-14">
            {passengerData?.sale.payment_method === 'online'
              ? 'Online - Card bancar'
              : 'Offline - Cash'}
          </span>
          <span>{passengerData?.price_sold || 0} €</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-brand-light-blue">
        <div className=" overflow-hidden rounded-lg bg-brand-light-blue p-5 text-base font-semibold text-red-500">
          <p>Reguli de călătorie</p>
        </div>
        <div className="p-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="mb-4 text-xs font-normal leading-5 text-gray-500"
            >
              lorem ipsum dolor sit amet consectetur. Varius ultricies cras
              sollicitudin urna vitae eget quam lectus viverra. Leo viverra
              risus vitae gravida at est amet. Vitae ipsum et parturient
              pharetra aliquam. Mollis habitasse aliquet ac tortor. Nunc quis
              donec convallis risus eu. Orci amet at non varius mi dignissim.
              Pharetra cras quisque ut tempor euismod aenean et duis. Viverra
              tincidunt magna dignissim tempus neque pellentesque ultrices.
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface ITicketProps {
  data?: any
  ticketIndex?: number
}

const Ticket = ({ data, ticketIndex }: ITicketProps) => {
  const ticket = data?.sale && JSON.parse(data.sale.extra)

  return (
    <div className="mb-6 overflow-hidden rounded-lg">
      <div className={`flex justify-between  bg-brand-blue px-5 py-6`}>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Nume/Prenume Pasager</p>
          <p className="text-xl font-medium">
            {data?.first_name} {data?.last_name}
          </p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Data, Luna, Anul Nașterii</p>
          <p className="text-xl font-medium">
            {dayjs(data?.date_of_birth).format('DD.MM.YYYY')}
          </p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Gen</p>
          <p className="text-xl font-medium">{data?.gender}</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Pasager</p>
          <p className="text-xl font-medium">1</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Cetățenia</p>
          <p className="text-xl font-medium">{data?.passport_country}</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Număr Pașaport</p>
          <p className="text-xl font-medium">{data?.passport_number}</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">Număr de rezervare</p>
          <p className="text-xl font-medium">{data?.reservation_code}</p>
        </div>
      </div>
      <div className="bg-[#EFEFEF] p-6">
        <div className="flex w-full justify-between">
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
                  {ticket?.route.map((r: any, index: number) => (
                    <span
                      key={index}
                      className={`z-40 h-6 w-3 rounded-lg  ${index === ticket.route.length - 1 ? ' bg-brand-yellow' : 'bg-gray-400'}`}
                    ></span>
                  ))}
                  <span
                    className={`z-40 h-6 w-3 rounded-lg bg-brand-blue`}
                  ></span>
                </div>
              </div>
              <div className="ml-4 flex w-full flex-col  gap-12">
                <div className="flex gap-12">
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      De la
                    </p>
                    <p className="text-base font-medium text-black">
                      {ticket?.countryFrom.code}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Data
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(ticket?.local_departure).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Ora
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(ticket?.local_departure).format('HH:mm')}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Nr.zbor:
                    </p>
                    <p className="text-base font-semibold text-black">
                      {ticket?.route[0].flight_no}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div
                    className={`flex h-full flex-col items-center justify-center ${ticket?.route.length > 1 ? 'gap-14' : ''}`}
                  >
                    {ticket?.route.map((r: any, index: number) => (
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
                    <span className="absolute top-0 flex max-w-96 gap-4">
                      {ticket?.route.map((r: any, index: number) => (
                        <span key={index}>
                          <Image
                            src={flyOne}
                            width={300}
                            height={300}
                            className="w-full"
                            alt="company"
                          />
                        </span>
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
                <div className="flex gap-12">
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Spre
                    </p>
                    <p className="text-base font-medium text-black">
                      {ticket?.countryTo.code}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Data
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(ticket?.local_arrival).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      Ora
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(ticket?.local_arrival).format('HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center pr-16">
            <div className="flex items-end gap-8">
              <div className="flex flex-col items-center justify-center ">
                <Image
                  src={baggage[8].image}
                  width={100}
                  height={100}
                  alt="bag"
                  className="w-12"
                />
                <span className="my-2 text-xs font-light text-slate-800">
                  {baggage[8].size}
                </span>
                <span className="mb-1 text-xs font-semibold text-black">
                  {baggage[8].title}
                </span>

                <span className="text-xs font-light text-slate-800">
                  {baggage[8].price}
                </span>
              </div>
              <div className="flex items-end gap-8">
                {data?.bag_10kg ||
                  (data?.bag_20kg && (
                    <span className="-translate-y-10 px-2 text-3xl">+</span>
                  ))}
                {data?.bag_10kg && (
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={baggage[10].image}
                      width={100}
                      height={100}
                      alt="bag"
                      className="w-12"
                    />
                    <span className="my-2 text-xs font-light text-slate-800">
                      {baggage[10].size}
                    </span>
                    <span className="mb-1 text-xs font-semibold text-black">
                      {baggage[10].title}
                    </span>

                    <span className="text-xs font-light text-slate-800">
                      {baggage[10].price}
                    </span>
                  </div>
                )}
                {data?.bag_20kg && (
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={baggage[20].image}
                      width={100}
                      height={100}
                      alt="bag"
                      className="w-12"
                    />
                    <span className="my-2 text-xs font-light text-slate-800">
                      {baggage[20].size}
                    </span>
                    <span className="mb-1 text-xs font-semibold text-black">
                      {baggage[20].title}
                    </span>

                    <span className="text-xs font-light text-slate-800">
                      {baggage[20].price}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type TBaggage = {
  [key: string]: {
    title: string
    size: string
    price: string
    image: any
  }
}

const baggage: TBaggage = {
  8: {
    title: 'Obiect personal',
    size: '40 x 20 x 30 cm',
    price: 'Inclus Gratuit',
    image: eightKgSvg,
  },
  10: {
    title: 'Bagaj de mână',
    size: '57 x 20 x 38 cm',
    price: '€20',
    image: tenKgSvg,
  },
  20: {
    title: 'Bagaj de cală',
    size: '78 x 28 x 52 cm',
    price: '€30',
    image: twentyKgSvg,
  },
}
