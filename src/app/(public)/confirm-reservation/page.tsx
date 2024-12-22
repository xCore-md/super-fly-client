'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Divider, Spin, Tooltip } from 'antd'
import dayjs from 'dayjs'
// import mastercardWhite from '@/assets/img/master.svg'
// import mastercard from '@/assets/img/mastercard.svg'
import paynetWhite from '@/assets/img/paynet-w.svg'
import paynet from '@/assets/img/paynet.svg'
// import visaWhite from '@/assets/img/visa-w.svg'
// import visa from '@/assets/img/visa.svg'
import { useFlightContext } from '@/context/flight-context'
import { useReservationContext } from '@/context/reservation-context'
import { useTranslationsContext } from '@/context/translations-context'
import axs from '@/lib/axios'
import { CHECK_IN_PRICE } from '@/lib/constants'
import { getFlightTime, cn, getFormattedDate } from '@/lib/utils'
import OurOfficeModal from './our-office-modal'
import { Button } from '../../../components/ui/button'

export default function ConfirmReservationPage() {
  const { flight } = useFlightContext()
  const { reservation: res } = useReservationContext()
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const { lang, translations: t } = useTranslationsContext()

  const router = useRouter()

  const startDirection = res?.route?.filter((route: any) => route.return === 0)

  const startDirectionTime = getFlightTime(
    startDirection?.[0].local_departure,
    startDirection?.[startDirection?.length - 1].local_arrival,
    lang
  )
  const endDirection = res?.route?.filter((route: any) => route.return === 1)

  const endDirectionTime = getFlightTime(
    endDirection?.[0]?.local_departure,
    endDirection?.[endDirection.length - 1]?.local_arrival,
    lang
  )

  const { confirmedReservation: ct } = res

  const isRoundTrip = res.route?.some((r: any) => r.return)
  const flightType = isRoundTrip ? 'Dus - Întors' : 'Dus'

  const { adults, children, infants } = flight

  const baggageCountPrice = (bagCount: number, type: string) => {
    const price = res.bags_price['1']
    const bagPrice = type === '10kg' ? price : price * 2

    const bagsPrice = bagCount * bagPrice
    return Math.round(bagsPrice)
  }

  const baggagePrice = useMemo(
    () =>
      res.passengers
        ?.map((passenger: any) => {
          const baggagePrice = passenger?.baggage?.map((bag: any) => {
            return baggageCountPrice(bag.count, bag.type)
          })

          return baggagePrice?.reduce(
            (acc: number, curr: number) => acc + curr,
            0
          )
        })
        .reduce((acc: number, curr: number) => acc + curr, 0) || 0,
    [res.passengers, res.bags_price]
  )

  useEffect(() => {
    axs
      .get('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
      .then((res) => {
        setCountries(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const servicePrice = useMemo(
    () => (ct?.check_in ? CHECK_IN_PRICE : 0),
    [ct?.check_in]
  )

  const getCountryName = () => {
    const country = countries.find(
      (country: any) => country.cca2 === ct?.passengers?.[0]?.passport_country
    ) as any
    return country?.name?.common
  }

  if (!Object.keys(res).length) return router.push('/flights')

  if (loading)
    return (
      <div className="relative z-[99999] flex h-svh w-full flex-col items-center justify-center overflow-hidden">
        <div className="fixed left-0 top-0 h-full w-full bg-brand-blue"></div>
        <div className="z-[999999] flex h-[40%] flex-col items-center">
          <p className="text-center text-white">
            {t.yourDataIs} <br /> {t.inProcess}
          </p>
          <Spin
            className="pt-10"
            indicator={
              <LoadingOutlined style={{ fontSize: 84, color: '#fff' }} spin />
            }
          />
        </div>
      </div>
    )

  return (
    <section className="flex justify-center px-5 pb-20 pt-5 lg:pt-14">
      <div className="flex w-full flex-col gap-2 lg:max-w-[1152px] lg:flex-row lg:gap-20">
        <div className="lg:w-2/3">
          <div className="mr-14 flex w-full flex-col justify-between gap-1 rounded-2xl bg-brand-blue px-5 py-2 text-white lg:h-[63px] lg:flex-row lg:items-center lg:gap-0">
            <div>
              <span className="mr-2 text-xs lg:font-medium">
                {t.reservationConfirmation}:
              </span>
              <span className="text-xs font-medium lg:text-sm lg:font-light">
                MPGP75
              </span>
            </div>
            <div className="hidden text-xs lg:block">
              <span className="mr-2 lg:font-medium">
                {t.reservationStatus}:
              </span>
              <span className="font-medium lg:font-light">
                {t.waitingPayment}
              </span>
            </div>
            <div className="text-xs">
              <span className="mr-2 lg:font-medium">Email:</span>
              <span className="font-medium lg:font-light">
                {ct?.passengers?.[0]?.email}
              </span>
            </div>
          </div>

          <div className="mr-14 mt-3 flex w-full flex-col justify-between gap-1 rounded-2xl bg-brand-green px-5 py-2 text-white lg:hidden lg:h-[63px] lg:flex-row lg:items-center lg:gap-0 lg:rounded-lg">
            <div className="text-xs">
              <span className="mr-2">{t.reservationStatus}:</span>
              <span className="font-medium">{t.waitingPayment}</span>
            </div>
          </div>

          <div className="custom-shadow mt-6 w-full gap-5 rounded-2xl bg-white px-5 py-7 lg:px-10">
            <div className="mb-[18px] flex flex-wrap justify-between lg:mb-[30px]">
              <div className="mb-4 flex flex-col max-[768px]:w-1/2">
                <span className="mb-1 text-xs text-gray-400">
                  {t.firstNameLastName}
                </span>
                <span className="text-xs font-medium text-gray-700">
                  {ct?.passengers?.[0]?.first_name}{' '}
                  {ct?.passengers?.[0]?.last_name}
                </span>
              </div>

              <div className="mb-4 flex flex-col max-[768px]:w-1/2 max-[768px]:items-start max-[768px]:pl-14">
                <span className="mb-1 text-xs text-gray-400">
                  {t.nationality}
                </span>
                <span className="text-xs font-medium text-gray-700">
                  {getCountryName()}
                </span>
              </div>
              {ct?.passengers?.[0]?.passport_number && (
                <div className="mb-4 flex flex-col max-[768px]:w-1/2">
                  <span className="mb-1  text-xs text-gray-400">
                    {t.passportNumber}
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {ct?.passengers?.[0]?.passport_number}
                  </span>
                </div>
              )}
              {ct?.passengers?.[0]?.passport_expires_at && (
                <div className="mb-4 flex flex-col max-[768px]:w-1/2 max-[768px]:items-start max-[768px]:pl-14">
                  <span className="mb-1 text-xs text-gray-400">
                    {t.expiring}
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {dayjs(ct?.passengers?.[0]?.passport_expires_at).format(
                      'DD/MM/YYYY'
                    )}
                  </span>
                </div>
              )}
            </div>

            {/*desktop*/}
            <div className="col-span-3  flex flex-col justify-center">
              <div className="grid grid-cols-5 lg:grid-cols-3">
                <div className="mr-2 hidden text-right lg:block">
                  <div className="relative">
                    <span className="absolute -top-4 right-8 hidden text-xs text-[#4A4A4A] lg:block">
                      {t.flightNumber}:{' '}
                      <span className="font-bold">
                        {startDirection[0].flight_no}
                      </span>
                    </span>
                    <span className="text-[22px] font-bold">
                      {startDirection[0].cityFrom}
                    </span>
                  </div>
                  <div className="text-xs text-gray-700">
                    {startDirection[0].flyFrom}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-xs text-gray-700">
                      {dayjs(startDirection[0].local_departure).format(
                        'DD MMM'
                      )}
                    </span>
                    <span className="text-[20px] font-normal">
                      {getFormattedDate(startDirection[0].local_departure)}
                    </span>
                  </div>
                </div>
                <div className="col-span-1 mr-3 flex justify-end lg:hidden">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xxs text-[#979797] lg:text-xs">
                      {dayjs(startDirection[0].local_departure).format(
                        'dd, DD MMM'
                      )}
                    </span>
                    <span className="text-base font-normal">
                      {getFormattedDate(startDirection[0].local_departure)}
                    </span>
                    <span className="text-[#4A4A4A text-xs">
                      {startDirection[0].cityFrom}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 flex flex-col items-center justify-center lg:col-span-1 lg:mt-2">
                  <div className="mb-1 flex items-center justify-center gap-2">
                    <p className="text-[10px] text-gray-700">
                      {startDirectionTime}
                    </p>
                  </div>

                  <div className="fly-line relative block h-[1px] w-full bg-brand-blue">
                    {isRoundTrip && (
                      <span className="absolute bottom-1 left-7 flex w-8">
                        <ArrowRightOutlined />
                      </span>
                    )}
                    <div className="flex w-full justify-center">
                      {startDirection.length > 1 && (
                        <div className="flex w-1/2 items-center justify-center gap-10">
                          {startDirection
                            .slice(1)
                            .map((route: any, index: number) => (
                              <Tooltip
                                key={index}
                                title={
                                  <span className=" flex flex-col gap-2 p-2 text-xs">
                                    <span className="flex gap-4">
                                      <span className="text-[10px]">
                                        {t.flightTransfer}:
                                      </span>{' '}
                                      <span className="ml-2 font-semibold">
                                        {route.cityFrom} - {route.cityTo}
                                      </span>
                                    </span>
                                    <span className="flex gap-4">
                                      <span className="">
                                        {' '}
                                        {t.flightNumber}:
                                      </span>
                                      <span className="font-bold">
                                        {route.flight_no}
                                      </span>
                                    </span>
                                    <span>{t.baggageRegister}</span>
                                  </span>
                                }
                              >
                                <div className="fly-line-stopover"></div>
                              </Tooltip>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-[10px] text-brand-blue">
                    {startDirection.length > 1
                      ? `${t.transfer}: ${startDirection.slice(1).length}`
                      : t.direct}
                  </div>

                  {/*<div className="mt-2 flex justify-between">*/}
                  {/*  <span className="text-xs text-gray-600">MDA</span>*/}
                  {/*  <span className="text-xs text-gray-600">BGY</span>*/}
                  {/*</div>*/}
                </div>
                <div className="ml-2 hidden text-left lg:block">
                  <div className="text-[22px] font-bold">
                    {startDirection[startDirection.length - 1].cityTo}
                  </div>
                  <div className="text-xs text-gray-700">
                    {startDirection[startDirection.length - 1].flyTo}
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-[20px] font-normal">
                      {getFormattedDate(
                        startDirection[startDirection.length - 1].local_arrival
                      )}
                    </span>
                    <span className="text-xs text-gray-700">
                      {dayjs(
                        startDirection[startDirection.length - 1].local_arrival
                      ).format('DD MMM')}
                    </span>
                  </div>
                </div>
                <div className="col-span-1 ml-3 flex justify-start lg:hidden">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xxs text-[#979797] lg:text-xs">
                      {dayjs(
                        startDirection[startDirection.length - 1].local_arrival
                      ).format('dd, DD MMM')}
                    </span>
                    <span className="text-base font-normal">
                      {getFormattedDate(
                        startDirection[startDirection.length - 1]
                          .local_departure
                      )}
                    </span>
                    <span className="text-xs text-[#4A4A4A]">
                      {startDirection[startDirection.length - 1].cityTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {endDirection.length > 0 && (
            <div className="custom-shadow mt-6 w-full gap-5 rounded-2xl bg-white px-5 py-7 lg:px-10">
              {/*desktop*/}
              <div className="col-span-3  flex flex-col justify-center">
                <div className="grid grid-cols-5 lg:grid-cols-3">
                  <div className="mr-2 hidden text-right lg:block">
                    <div className="relative">
                      <span className="absolute -top-4 right-8 hidden text-xs text-[#4A4A4A] lg:block">
                        {t.flightNumber}:{' '}
                        <span className="font-bold">
                          {endDirection[0].flight_no}
                        </span>
                      </span>
                      <span className="text-[22px] font-bold">
                        {endDirection[0].cityFrom}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700">
                      {endDirection[0].flyFrom}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-gray-700">
                        {dayjs(endDirection[0].local_departure).format(
                          'DD MMM'
                        )}
                      </span>
                      <span className="text-[20px] font-normal">
                        {getFormattedDate(endDirection[0].local_departure)}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 mr-3 flex justify-end lg:hidden">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xxs text-[#979797] lg:text-xs">
                        {dayjs(endDirection[0].local_departure).format(
                          'dd, DD MMM'
                        )}
                      </span>
                      <span className="text-base font-normal">
                        {getFormattedDate(endDirection[0].local_departure)}
                      </span>
                      <span className="text-[#4A4A4A text-xs">
                        {endDirection[0].cityFrom}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-col items-center justify-center lg:col-span-1 lg:mt-2">
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <p className="text-[10px] text-gray-700">
                        {endDirectionTime}
                      </p>
                    </div>

                    <div className="fly-line relative block h-[1px] w-full bg-brand-blue">
                      {isRoundTrip && (
                        <span className="absolute bottom-1 left-7 flex w-8">
                          <ArrowLeftOutlined />
                        </span>
                      )}
                      <div className="flex w-full justify-center">
                        {endDirection.length > 1 && (
                          <div className="flex w-1/2 items-center justify-center gap-10">
                            {endDirection
                              .slice(1)
                              .map((route: any, index: number) => (
                                <Tooltip
                                  key={index}
                                  title={
                                    <span className=" flex flex-col gap-2 p-2 text-xs">
                                      <span className="flex gap-4">
                                        <span className="text-[10px]">
                                          {t.transfer}:
                                        </span>{' '}
                                        <span className="ml-2 font-semibold">
                                          {route.cityFrom} - {route.cityTo}
                                        </span>
                                      </span>
                                      <span className="flex gap-4">
                                        <span className="">
                                          {' '}
                                          {t.flightNumber}:
                                        </span>
                                        <span className="font-bold">
                                          {route.flight_no}
                                        </span>
                                      </span>
                                      <span>{t.baggageRegister}</span>
                                    </span>
                                  }
                                >
                                  <div className="fly-line-stopover"></div>
                                </Tooltip>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-[10px] text-brand-blue">
                      {endDirection.length > 1
                        ? `${t.transfer}: ${endDirection.slice(1).length}`
                        : t.direct}
                    </div>

                    {/*<div className="mt-2 flex justify-between">*/}
                    {/*  <span className="text-xs text-gray-600">MDA</span>*/}
                    {/*  <span className="text-xs text-gray-600">BGY</span>*/}
                    {/*</div>*/}
                  </div>
                  <div className="ml-2 hidden text-left lg:block">
                    <div className="text-[22px] font-bold">
                      {endDirection[endDirection.length - 1].cityTo}
                    </div>
                    <div className="text-xs text-gray-700">
                      {endDirection[endDirection.length - 1].flyTo}
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-[20px] font-normal">
                        {getFormattedDate(
                          endDirection[endDirection.length - 1].local_arrival
                        )}
                      </span>
                      <span className="text-xs text-gray-700">
                        {dayjs(
                          endDirection[endDirection.length - 1].local_arrival
                        ).format('DD MMM')}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 ml-3 flex justify-start lg:hidden">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xxs text-[#979797] lg:text-xs">
                        {dayjs(
                          endDirection[endDirection.length - 1].local_arrival
                        ).format('dd, DD MMM')}
                      </span>
                      <span className="text-base font-normal">
                        {getFormattedDate(
                          endDirection[endDirection.length - 1].local_departure
                        )}
                      </span>
                      <span className="text-xs text-[#4A4A4A]">
                        {endDirection[endDirection.length - 1].cityTo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REST CONTENT */}

          <div className="custom-shadow mt-5 rounded-lg bg-white p-4 text-xs text-[#7E7E7E] lg:mt-2 lg:bg-[#F0F2FF]">
            <div className="flex">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.00025 10.5C6.81318 10.5001 7.61096 10.2799 8.30881 9.86294C9.00666 9.44597 9.57852 8.84773 9.96364 8.13181C10.3488 7.41588 10.5327 6.609 10.496 5.79689C10.4594 4.98478 10.2034 4.19778 9.75525 3.5195L6.17775 7.4945C6.01064 7.68021 5.78008 7.79664 5.53143 7.82089C5.28279 7.84513 5.03408 7.77543 4.83425 7.6255L3.20025 6.4C3.09416 6.32044 3.02403 6.20199 3.00527 6.07071C2.98652 5.93944 3.02068 5.80609 3.10025 5.7C3.17981 5.59391 3.29826 5.52378 3.42954 5.50503C3.56081 5.48627 3.69416 5.52043 3.80025 5.6L5.43425 6.8255L9.10725 2.745C8.57515 2.23705 7.92664 1.8673 7.2185 1.66811C6.51036 1.46892 5.76419 1.44637 5.04531 1.60244C4.32644 1.7585 3.65678 2.08842 3.09498 2.56331C2.53318 3.03819 2.09637 3.64357 1.82279 4.32642C1.5492 5.00927 1.4472 5.74879 1.5257 6.48021C1.6042 7.21163 1.86081 7.91265 2.27307 8.5219C2.68532 9.13114 3.24065 9.63003 3.89043 9.97489C4.54021 10.3197 5.26463 10.5 6.00025 10.5Z"
                  fill="#23CFA6"
                />
              </svg>
              <span className="ml-2 font-semibold ">
                {successResultsMessage.msgFirst[lang]}
              </span>
            </div>
            <p className="my-4 ">{successResultsMessage.msgSecond[lang]}</p>
            <p className="">{successResultsMessage.msgThird[lang]}</p>
          </div>

          <div className="mt-4 flex h-[38px] items-center rounded-full bg-brand-blue px-4 text-sm text-white lg:mt-11 lg:hidden">
            <div>
              <span className="font-light">Total:</span>
              <span className="ml-2 font-semibold">
                {res.price + baggagePrice + servicePrice} €
              </span>
            </div>
          </div>

          <div className="custom-shadow mt-8 animate-greenWaveShadow rounded-xl bg-white p-3 lg:px-7 lg:py-9 ">
            <h4 className="mb-[18px] text-base lg:mb-6">
              {t.selectPaymentMethod}
            </h4>
            <div className="flex w-full gap-2 lg:gap-5">
              {/* <Button
                variant="ghost"
                className="reservation-button-shadow flex h-9 w-full items-center justify-center gap-4 rounded-full bg-brand-gray px-2 lg:bg-brand-light-blue"
              >
                <span className="hidden text-xs text-brand-blue lg:inline">
                  {t.bankCard}
                </span>
                <span className="flex gap-1">
                  <Image
                    src={mastercard}
                    width={31}
                    height={24}
                    alt="icon"
                    className="hidden lg:block"
                  />
                  <Image
                    src={mastercardWhite}
                    width={31}
                    height={24}
                    alt="icon"
                    className="block lg:hidden"
                  />
                  <Image
                    src={visa}
                    width={50}
                    height={28}
                    alt="icon"
                    className="hidden lg:block"
                  />
                  <Image
                    src={visaWhite}
                    width={50}
                    height={28}
                    alt="icon"
                    className="block lg:hidden"
                  />
                </span>
              </Button> */}
              <Link
                href={`https://api-superfly.xcore.md/api/pay/ro/paynet/${ct.id}`}
                className="reservation-button-shadow flex h-9 w-fit items-center justify-center gap-4 rounded-full bg-brand-gray px-4 lg:bg-brand-light-blue"
              >
                <span className="hidden text-xs text-brand-blue lg:inline">
                  {t.onlinePayment}
                </span>
                <span>
                  <Image
                    src={paynet}
                    width={43}
                    height={22}
                    alt="icon"
                    className="hidden lg:block"
                  />
                  <Image
                    src={paynetWhite}
                    width={43}
                    height={22}
                    alt="icon"
                    className="block lg:hidden"
                  />
                </span>
              </Link>

              <OurOfficeModal />
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="hidden flex-col gap-[18px] lg:flex">
            <SectionLightBlue>
              <div>
                <h6 className="text-xs font-semibold text-[#121C5E]">
                  {res.cityFrom} - {res.cityTo}
                </h6>
                <p className="mt-1 text-xs text-gray-500">
                  {flightType} - {adults > 0 && `${adults} Adulți`}
                  {children > 0 && `, ${children} Copii`}
                  {infants > 0 && `, ${infants} Infanți`}
                </p>
              </div>
              <Button
                className="h-[26px] rounded-full border-brand-blue bg-transparent text-xs text-brand-blue"
                variant="outline"
                onClick={() => router.push('/flights')}
              >
                {t.edit}
              </Button>
            </SectionLightBlue>

            <SectionLightBlue className="text-xs font-bold text-[#121C5E]">
              <h6>{t.baggage}</h6>
            </SectionLightBlue>
            <div className="flex flex-col">
              {ct.passengers?.map((passenger: any, index: number) => {
                return passenger?.baggage?.some((e: any) => e?.count > 0) ? (
                  <div key={index}>
                    <div className="grid grid-cols-5 gap-2">
                      <p className="col-span-2 text-xs uppercase">
                        {passenger.first_name} {passenger.last_name}
                      </p>
                      <div className="col-span-3 grid grid-cols-3 gap-4">
                        {passenger?.baggage?.map(
                          (bag: any, bagIndex: number) => {
                            return Number(bag?.count) > 0 ? (
                              <div key={bagIndex}>
                                <p className="mb-1 text-xs font-semibold text-[#171717]">
                                  {bag.type}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {bag.count} x{' '}
                                  {baggageCountPrice(bag.count, bag.type)} €
                                </p>
                              </div>
                            ) : (
                              ''
                            )
                          }
                        )}
                      </div>
                    </div>
                    {ct.passengers.length > 0 &&
                    index !== ct.passengers.length - 1 ? (
                      <Divider />
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )
              })}
            </div>

            <div>
              <SectionLightBlue className="flex justify-between text-sm font-bold text-[#121C5E]">
                <h6>{t.passengerForm?.services}</h6>
              </SectionLightBlue>

              <div className="flex flex-col py-4">
                {ct?.check_in ? (
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">{t.onlineCheckIn}</p>
                    <p className="text-xs font-semibold">{CHECK_IN_PRICE} €</p>
                  </div>
                ) : (
                  <p className="m-0 p-0">----</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 hidden h-[38px] items-center rounded-full bg-brand-blue px-4 text-sm text-white lg:mt-11 lg:flex">
            <div>
              <span className="font-light">{t.total}:</span>
              <span className="ml-2 font-semibold">
                {res.price + baggagePrice + servicePrice} €
              </span>
            </div>
          </div>
        </div>
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
        'flex items-center justify-between rounded-lg bg-[#F0F2FF] p-3',
        className
      )}
    >
      {children}
    </div>
  )
}

const successResultsMessage: any = {
  msgFirst: {
    ro: 'Rezervarea efectuată cu succes',
    ru: 'Бронирование успешно выполнено',
  },
  msgSecond: {
    ro: 'Atenție prețul pentru această rezervare se poate modifica în orice moment, agenția nu poate garanta păstrarea prețului. Pentru a evita majorări de tarif, vă rugăm sa faceți plata cît mai repede posibil.',
    ru: 'Обратите внимание, что цена за эту бронь может измениться в любое время, агентство не может гарантировать сохранение цены. Чтобы избежать увеличения тарифа, пожалуйста, произведите оплату как можно скорее.',
  },
  msgThird: {
    ro: 'Vă rugăm să verificați cu atenție datele de contact, informațiile despre pasageri, detaliile de zbor și serviciile selectate.',
    ru: 'Пожалуйста, внимательно проверьте контактные данные, информацию о пассажирах, детали полета и выбранные услуги.',
  },
}
