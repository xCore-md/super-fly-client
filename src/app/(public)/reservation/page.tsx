'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import checkMarkSvg from '@/assets/img/check-mark.svg'
import { FlyContent } from '@/components/flights/fly-content'
import { useFlightContext } from '@/context/flight-context'
import { useReservationContext } from '@/context/reservation-context'
import axs from '@/lib/axios'
import { cn } from '@/lib/utils'
import { ReservationCard } from '@components/reservation/reservation-card'
import { ReservationMainForm } from '@components/reservation/reservation-main-form'
import { ReservationSummary } from '@components/reservation/reservation-summary'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'

export default function Reservation() {
  const { reservation } = useReservationContext()
  const { flight } = useFlightContext()
  const { adults, children, infants } = flight
  const router = useRouter()
  const [countries, setCountries] = useState([])

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  })

  useEffect(() => {
    axs
      .get('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
      .then((res) => {
        setCountries(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (
    Object.keys(reservation).length === 0 ||
    reservation?.date_from?.length === 0
  )
    return router.push('/flights')

  const passengersCount = adults + children + infants

  return (
    <div className="mt-4 flex flex-col px-5 pb-10 pt-12 lg:flex-row lg:px-10 ">
      <section className="flex flex-col lg:w-2/3">
        <h2 className="mb-4 text-lg font-medium">Informații zbor:</h2>

        <div
          className={
            'custom-shadow group my-3 grid w-full grid-cols-2 items-center rounded-2xl bg-white p-4 lg:grid-cols-5 lg:gap-5'
          }
        >
          <FlyContent flight={reservation} withoutAction />
        </div>

        <ReservationMainForm
          countries={countries}
          passengersCount={passengersCount}
          formik={formik}
          reservation={reservation}
        />

        <OnlineCheckinSection />

        <div className="ml-3 mt-4 flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm text-xxs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sunt de acord cu{' '}
            <Link className="text-[#596AD9]" href="/public">
              Politica de confidentialitate
            </Link>
            și cu{' '}
            <Link className="text-[#596AD9]" href={'/'}>
              Termenii si conditiile
            </Link>
          </label>
        </div>

        <Link
          href="/confirm-reservation"
          className="mt-8 hidden h-11 items-center justify-center rounded-full bg-brand-green px-8 font-light text-white shadow-md shadow-slate-400 lg:flex"
        >
          Rezervă acum
        </Link>
      </section>
      <aside className="flex lg:ml-20 lg:w-1/3">
        <ReservationSummary reservation={reservation} formik={formik} />
      </aside>
    </div>
  )
}

const OnlineCheckinSection = () => {
  return (
    <ReservationCard className="relative rounded-t-3xl pt-14">
      <div className="absolute left-0 right-0 top-0 flex justify-between rounded-3xl bg-brand-light-blue px-4 py-3">
        <h5 className="text-sm font-bold text-[#121C5E]">Check-in Online</h5>
        <span className="rounded-full bg-brand-yellow px-3 py-2 text-xxs">
          Popular
        </span>
      </div>

      <main className="mt-6 flex flex-col justify-between lg:flex-row">
        <div className="">
          <h6>Adaugă check-in-ul online!</h6>
          <ul className="text-xxs font-medium text-[#7E7E7E]">
            <li className="mt-3 flex items-center">
              <CheckMark className="mt-1" />
              Dacă nu achiziționezi acest serviciu, va fi necesar să efectuezi
              check-in-ul independent
            </li>
            <li className="mt-2 flex items-center">
              <CheckMark className="mt-1" />
              Economisești timp și bani: check-in-ul direct la aeroport poate
              genera cheltuieli suplimentare sau întârzieri
            </li>
            <li className="mt-2 flex items-center">
              <CheckMark className="mt-1" />
              Emitem cărțile de îmbarcare la timp
            </li>
          </ul>
        </div>
        <Button className="mt-8 flex h-auto items-center justify-center whitespace-normal rounded-full bg-brand-blue px-6 text-xs font-light text-white shadow-md shadow-slate-400 lg:max-w-32 ">
          Adaugă €8.99 per pasager
        </Button>
      </main>
    </ReservationCard>
  )
}

interface ICheckMarkProps {
  className?: string
}

const CheckMark = (props: ICheckMarkProps) => {
  return (
    <Image
      src={checkMarkSvg}
      alt={'check mark'}
      width={12}
      height={12}
      className={cn('mr-2 min-w-3 self-start', props.className)}
    />
  )
}
