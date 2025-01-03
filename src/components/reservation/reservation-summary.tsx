'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useMemo } from 'react'
import { Divider, Button } from 'antd'
import { useFlightContext } from '@/context/flight-context'
import { useTranslationsContext } from '@/context/translations-context'
import { CHECK_IN_PRICE } from '@/lib/constants'
import { cn, truncNumber } from '@/lib/utils'
import { ReservationTimer } from './reservation-timer'

export const ReservationSummary = ({
  reservation,
  formik,
  loading,
  scrollOnClick,
}: {
  reservation: any
  formik?: any
  loading?: boolean
  scrollOnClick?: () => void
}) => {
  const { flight } = useFlightContext()
  const router = useRouter()
  const { adults, children, infants } = flight
  const { cityFrom, cityTo, route } = reservation
  const { translations: t } = useTranslationsContext()

  const isRoundTrip = route?.some((r: any) => r.return)
  const flightType = isRoundTrip ? 'Dus - Întors' : 'Dus'

  const baggageCountPrice = (bagCount: number, type: string) => {
    const price = Number(reservation.bags_price['1'])

    const bagPrice = type === '10kg' ? price : price * 2

    return bagCount * bagPrice
  }

  const baggagePrice = useMemo(
    () =>
      formik?.values?.passengers
        ?.map((p: any) => {
          const baggagePrice = p?.baggage?.map((bag: any) => {
            return baggageCountPrice(bag.count, bag.type)
          })

          return baggagePrice?.reduce(
            (acc: number, curr: number) => acc + curr,
            0
          )
        })
        .reduce((acc: number, curr: number) => acc + curr, 0) || 0,
    [formik?.values?.passengers, reservation.bags_price]
  )

  const servicePrice = useMemo(
    () =>
      formik.values.check_in
        ? formik.values.passengers?.length * CHECK_IN_PRICE
        : 0,
    [formik.values.check_in, formik.values.passengers?.length]
  )

  return (
    <section className="flex flex-1 flex-col">
      <div className="lg:sticky lg:top-32">
        <div className="hidden flex-col gap-5 lg:flex">
          <SectionLightBlue>
            <div>
              <h6 className="text-xxs font-semibold leading-snug text-[#121C5E]">
                {cityFrom} - {cityTo}
              </h6>
              <span className="text-[8px] font-medium leading-snug text-[#9D9D9D]">
                {flightType} - {adults > 0 && `${adults} Adulți`}
                {children > 0 && `, ${children} Copii`}
                {infants > 0 && `, ${infants} Infanți`}
              </span>
            </div>
            <Button
              className="flex h-[26px] w-fit items-center justify-center rounded-full border-brand-blue bg-transparent px-2 py-0 text-xs font-medium text-brand-blue"
              variant="outlined"
              onClick={() => router.push('/flights')}
            >
              <span>{t.edit}</span>
            </Button>
          </SectionLightBlue>

          <SectionLightBlue className="text-xs font-bold text-[#121C5E]">
            <h6>{t.passengerForm?.baggages}</h6>
          </SectionLightBlue>
          {formik.values?.passengers?.[0]?.first_name && (
            <div className="flex flex-col">
              {formik?.values?.passengers?.map(
                (passenger: any, index: number) => {
                  return passenger?.baggage?.some((e: any) => e?.count > 0) ? (
                    <div key={index}>
                      <div className="grid grid-cols-4 gap-4">
                        <p className="col-span-1 text-xs uppercase">
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
                                    {truncNumber(
                                      baggageCountPrice(bag.count, bag.type)
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
          )}

          <div>
            <SectionLightBlue className="flex justify-between text-xs font-bold text-[#121C5E]">
              <h6>{t.passengerForm?.services}</h6>
              {formik.values.check_in ? <h6>€{CHECK_IN_PRICE}</h6> : ''}
            </SectionLightBlue>

            <div className="flex flex-col py-4">
              {formik?.values?.passengers?.map(
                (passenger: any, index: number) => {
                  if (!passenger?.first_name) {
                    return ''
                  }
                  return (
                    <div key={index}>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <p className="col-span-1 text-xs uppercase">
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
          </div>
        </div>

        <div className="mt-4 rounded-full bg-brand-blue px-4 py-3 text-xs text-white lg:mt-11">
          <span className="font-light">{t.total}:</span>
          <span className="ml-2 font-semibold">
            {truncNumber(reservation.price + baggagePrice + servicePrice)} €
          </span>
        </div>

        <ReservationTimer />

        <Button
          loading={loading}
          htmlType="submit"
          onClick={scrollOnClick}
          className="custom-light-shadow mt-8 flex h-11 w-full items-center justify-center rounded-full bg-brand-green px-8 font-light text-white lg:hidden"
        >
          {t.reservNow}
        </Button>
      </div>
    </section>
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
        'flex items-center justify-between rounded-lg bg-[#F0F2FF] p-3 text-base',
        className
      )}
    >
      {children}
    </div>
  )
}
