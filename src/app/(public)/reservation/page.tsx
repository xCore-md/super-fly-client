'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button, notification } from 'antd'
import dayjs from 'dayjs'
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
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

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
  ) {
    return router.push('/flights')
  }

  const handleSubmit = () => {
    setLoading(true)
    const storage = localStorage.getItem('flight')

    if (!storage) {
      const storageFlight = storage ? JSON.parse(storage) : null

      const {
        flyFrom,
        flyTo,
        cityFrom,
        cityTo,
        local_arrival,
        local_departure,
      } = reservation

      const obj = {
        type: storageFlight.return_to ? 'tur-retur' : 'tur',
        airline: reservation?.airlines[0],
        fly_from: flyFrom,
        fly_to: flyTo,
        fly_from_city: cityFrom,
        fly_to_city: cityTo,
        date_from: dayjs(local_departure).format('DD.MM.YYYY'),
        date_to: dayjs(local_arrival).format('DD.MM.YYYY'),
        extra: JSON.stringify(reservation),
        ...formik.values,
      }

      axs
        .post('/sale/create', obj)
        .then(() => {
          setLoading(false)
          router.push('/confirm-reservation')
        })
        .catch((err) => {
          setLoading(false)
          api.error({
            message: 'Error',
            description: err.response.data.message,
            placement: 'bottomRight',
            duration: 3,
            closable: true,
          })
          console.log({ err })
        })
    }
  }

  const passengersCount = adults + children + infants

  return (
    <div className="mt-4 flex flex-col px-5 pb-10 pt-12 lg:flex-row lg:px-10 ">
      {contextHolder}
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

        <div className="ml-3 mt-4 flex items-center justify-between space-x-2">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="cursor-pointer select-none text-xs font-normal md:text-sm"
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
          <Button
            onClick={() => handleSubmit()}
            loading={loading}
            className="custom-shadow green-button hidden h-11 items-center justify-center rounded-full border-none bg-brand-green px-16 text-base font-light text-white  transition-all hover:opacity-90 lg:flex"
          >
            Rezervă acum
          </Button>
        </div>
      </section>
      <aside className="flex lg:ml-20 lg:w-1/3">
        <ReservationSummary reservation={reservation} formik={formik} />
      </aside>
    </div>
  )
}
