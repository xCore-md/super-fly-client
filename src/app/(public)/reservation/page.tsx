'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button, notification, Checkbox } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FlyContent } from '@/components/flights/fly-content'
import { useFlightContext } from '@/context/flight-context'
import { useReservationContext } from '@/context/reservation-context'
import axs from '@/lib/axios'
import { ReservationMainForm } from '@components/reservation/reservation-main-form'
import { ReservationSummary } from '@components/reservation/reservation-summary'

const validationSchema = Yup.object().shape({
  passengers: Yup.array().of(
    Yup.object().shape({
      first_name: Yup.string()
        .min(3, 'Prenume trebuie sa are minimum 3 litere')
        .required('Prenumele este necesar'),
      last_name: Yup.string()
        .min(3, 'Numer trebuie sa are minimum 3 litere')
        .required('Numele de familie este'),
      gender: Yup.string().oneOf(['M', 'F']).required('Genul este necesar'),
      passport_country: Yup.string().required(
        'Țara pașaportului este necesară'
      ),
      phone: Yup.string().required('Numărul de telefon este necesar'),
      email: Yup.string()
        .email('Email-ul este invalid')
        .required('Email-ul este necesar'),
    })
  ),
})

export default function Reservation() {
  const { reservation, setReservation } = useReservationContext()
  const { flight } = useFlightContext()
  const { adults, children, infants } = flight
  const router = useRouter()
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [isTermsChecked, setIsTermsChecked] = useState(false)

  const formik = useFormik({
    initialValues: {
      passengers: Array(adults + children + infants).fill({
        first_name: '',
        last_name: '',
        gender: '',
        passport_country: '',
        phone: '',
        email: '',
        baggage: [
          { type: '10kg', count: 0 },
          { type: '20kg', count: 0 },
        ],
      }),
    },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema,
    validate: (values) => {
      try {
        validationSchema.validateSync(values, { abortEarly: false })
      } catch (e: any) {
        return e.inner.reduce((errors: any, err: any) => {
          errors[err.path] = err.message
          return errors
        }, {})
      }
      return {}
    },
    onSubmit: () => {
      setLoading(true)
      const storage = localStorage.getItem('flight')
      if (storage) {
        const storageFlight = storage ? JSON.parse(storage) : null

        const {
          flyFrom,
          flyTo,
          cityFrom,
          cityTo,
          local_arrival,
          local_departure,
        } = reservation

        const { passengers, ...restData } = formik.values

        const obj = {
          type: storageFlight.return_to ? 'tur_retur' : 'tur',
          airline: reservation?.airlines[0],
          fly_from: flyFrom,
          fly_to: flyTo,
          fly_from_city: cityFrom,
          fly_to_city: cityTo,
          date_from: dayjs(local_departure).format('DD.MM.YYYY'),
          date_to: dayjs(local_arrival).format('DD.MM.YYYY'),
          extra: JSON.stringify(reservation),
          passengers: passengers.map((passenger) => {
            const { baggage, ...rest } = passenger
            return {
              baggage: baggage.filter((bag: any) => bag.count !== 0),
              ...rest,
            }
          }),
          ...restData,
        }

        axs
          .post('/sale/create', obj)
          .then((res) => {
            setLoading(false)
            setReservation({
              ...reservation,
              ...obj,
              confirmedReservation: res.data,
            })
            localStorage.setItem(
              'reservation',
              JSON.stringify({
                ...reservation,
                ...obj,
                confirmedReservation: res.data,
              })
            )

            router.push('/confirm-reservation')
          })
          .catch((err) => {
            setLoading(false)
            api.error({
              message: 'Error',
              description:
                'A apărut o eroare la rezervare, va rugam sa verificati datele introduse',
              placement: 'bottomRight',
              duration: 3,
              closable: true,
            })
            console.log({ err })
          })
      }
    },
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

  const passengersCount = adults + children + infants

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mt-4 flex flex-col px-5 pb-10 pt-12 lg:flex-row lg:px-10 "
    >
      {contextHolder}
      <section className="flex flex-col lg:w-2/3">
        <h2 className="mb-4 text-xs font-medium">Informații zbor:</h2>

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
          isTermsChecked={isTermsChecked}
        />

        <div className="ml-3 mt-4 flex items-center justify-between">
          <div className="flex items-start gap-2">
            <label
              htmlFor="terms"
              className="cursor-pointer select-none text-xs font-normal md:text-sm"
            >
              <Checkbox
                onClick={() => setIsTermsChecked(!isTermsChecked)}
                className="mr-2"
                id="terms"
                checked={isTermsChecked}
              />

              <span className="mr-1">Sunt de acord cu</span>
              <Link className="mr-1 text-brand-blue" href="/policy">
                Politica de confidentialitate
              </Link>
              <span className="mr-1">și cu</span>
              <Link className="text-brand-blue" href="/terms">
                Termenii si conditiile
              </Link>
            </label>
          </div>
          <Button
            htmlType="submit"
            disabled={!formik.isValid || !isTermsChecked}
            loading={loading}
            className="custom-shadow green-button hidden h-11 items-center justify-center rounded-full border-none bg-brand-green px-16 text-base font-light text-white  transition-all hover:opacity-90 lg:flex"
          >
            Rezervă acum
          </Button>
        </div>
      </section>
      <aside className="flex lg:ml-20 lg:w-1/3">
        <ReservationSummary
          reservation={reservation}
          formik={formik}
          isTermsChecked={isTermsChecked}
        />
      </aside>
    </form>
  )
}
