'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { FlyContent } from '@/components/flights/fly-content'
import { useFlightContext } from '@/context/flight-context'
import { useReservationContext } from '@/context/reservation-context'
import axs from '@/lib/axios'
import { ReservationMainForm } from '@components/reservation/reservation-main-form'
import { ReservationSummary } from '@components/reservation/reservation-summary'
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
