import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Tooltip, Divider, Button } from 'antd'
import backpackSvg from '@/assets/img/backpack.svg'
import seatSvg from '@/assets/img/seat.svg'
import viberSvg from '@/assets/img/viber.png'
import whatsappSvg from '@/assets/img/whatsapp.png'
import { useReservationContext } from '@/context/reservation-context'
import { getFlightTime, cn, getTimeFromDate } from '@/lib/utils'

export const FlyContent = (props: any) => {
  const pathname = usePathname()

  const {
    withoutAction,
    withoutFooter,
    withoutFlightNumber,
    flight,
    handleAdminPanelSetSelectedFlight,
    isAdminPanel,
  } = props
  const { setReservation } = useReservationContext()
  const router = useRouter()
  const startDirection = flight?.route?.filter(
    (route: any) => route.return === 0
  )

  const startDirectionTime = getFlightTime(
    startDirection?.[0].local_departure,
    startDirection?.[startDirection?.length - 1].local_arrival
  )

  const endDirection = flight?.route?.filter((route: any) => route.return === 1)

  const endDirectionTime = getFlightTime(
    endDirection?.[0]?.local_departure,
    endDirection?.[endDirection.length - 1]?.local_arrival
  )

  const handleReservation = useCallback(() => {
    setReservation(flight)
    router.push('/reservation')
  }, [flight, setReservation])

  const isReservationPage = pathname === '/reservation'

  if (!flight?.route?.length) return null

  return (
    <>
      {props.withoutHeader ? (
        ''
      ) : (
        <div
          className={` flex flex-row items-start gap-6 lg:flex-col lg:items-center lg:justify-center lg:gap-0 lg:pb-0  ${props.withoutAction && 'col-span-2 lg:col-span-1'} col-span-1`}
        >
          <img
            alt="airline"
            src={`https://images.kiwi.com/airlines/128x128/${startDirection?.[0].airline}.png`}
            className={`w-12 ${endDirection?.length > 0 ? 'lg:w-16 lg:-translate-y-14' : 'lg:w-24'}`}
          />
          {endDirection?.length > 0 && (
            <img
              alt="airline"
              src={`https://images.kiwi.com/airlines/128x128/${endDirection?.[0].airline}.png`}
              className="w-12 lg:w-16 lg:translate-y-4"
            />
          )}
        </div>
      )}

      {flight && (
        <section
          className={cn(
            `${isReservationPage ? '' : 'flightCardContentLine'} col-span-2 row-start-2 mt-2 flex flex-col justify-center border-t-[1px] py-3 md:border-0 lg:col-span-3 lg:row-start-auto lg:py-1`,
            {
              'lg:col-span-4': withoutAction,
            }
          )}
        >
          <div className="flex w-full flex-row items-center">
            {endDirection.length > 0 && (
              <span className="flex w-8">
                <ArrowRightOutlined />
              </span>
            )}
            <main className="grid w-full grid-cols-5 md:grid-cols-4">
              <div className="mr-4 pt-2 text-center md:mr-2 md:pt-0 md:text-right">
                <div className="text-base font-normal md:mb-1 md:-translate-y-1 md:text-[22px]">
                  {getTimeFromDate(startDirection[0].local_departure)}
                </div>
                <div className="hidden text-xxs text-gray-700 lg:block">
                  {startDirection[0].flyFrom}
                </div>
                <div className="text-xxs text-gray-700 lg:hidden">
                  {startDirection[0].cityFrom}
                </div>
              </div>

              <div className="col-span-3 mt-2 md:col-span-2">
                <div className="mb-1 flex items-center justify-center gap-2">
                  <span className="hidden text-xxs text-gray-400 lg:inline">
                    Durata de zbor:
                  </span>
                  <p className="text-xxs text-gray-700">{startDirectionTime}</p>
                </div>

                <div className="fly-line block h-[1px] w-full bg-blue-700">
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
                                    <span className="">Escale:</span>{' '}
                                    <span className="ml-2 font-semibold">
                                      {route.cityFrom} - {route.cityTo}
                                    </span>
                                  </span>
                                  <span className="flex gap-4">
                                    <span className=""> Nr. zbor:</span>
                                    <span className="font-bold">
                                      {route.flight_no}
                                    </span>
                                  </span>
                                  <span>
                                    Preluarea si înregistrarea bagajului
                                  </span>
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

                <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-xxs text-brand-blue">
                  {startDirection.length > 1
                    ? `Escale: ${startDirection.slice(1).length}`
                    : `Direct`}
                </div>

                {/*<div className="mt-2 flex justify-between">*/}
                {/*  <span className="text-xs text-gray-600">MDA</span>*/}
                {/*  <span className="text-xs text-gray-600">BGY</span>*/}
                {/*</div>*/}
              </div>
              <div className="ml-4 pt-2 text-center md:ml-2 md:pt-0 md:text-left">
                <div className="text-base font-normal md:mb-1 md:-translate-y-1 md:text-[22px]">
                  {getTimeFromDate(
                    startDirection[startDirection.length - 1].local_arrival
                  )}
                </div>
                <div className="hidden text-xxs text-gray-700 lg:block">
                  {startDirection[startDirection.length - 1].flyTo}
                </div>
                <div className="text-xxs text-gray-700 lg:hidden">
                  {startDirection[startDirection.length - 1].cityTo}
                </div>
              </div>
            </main>
          </div>

          {withoutFooter || isAdminPanel ? (
            ''
          ) : (
            <footer className="mt-5 flex items-start justify-evenly text-xs text-xxs text-[#4A4A4A] lg:justify-center">
              <div
                className={`lg:min-w-auto mr-2 flex min-w-32 gap-2 ${flight.availability.seats ? 'flex-col items-start ' : 'items-center'}`}
              >
                <div className="flex items-center">
                  <Image
                    className="w-[18px] rounded-sm bg-brand-gray p-1 lg:w-[20x]"
                    width={20}
                    height={20}
                    src={backpackSvg}
                    alt={'backpack'}
                  />
                  <p className="ml-2">Bagajul de mînă inclus</p>
                </div>

                {withoutFlightNumber ? (
                  ''
                ) : flight.route.length === 1 ? (
                  <p className="text-left lg:hidden">
                    Nr. zbor:{' '}
                    <span className="font-bold">
                      {flight.route[0].flight_no}
                    </span>
                  </p>
                ) : (
                  ''
                )}
              </div>

              {flight.availability.seats && (
                <div className="flex min-w-36 items-center justify-between">
                  <div className="flex gap-2">
                    <Image
                      className="w-[18px] rounded-sm bg-brand-gray p-0.5 lg:w-[20px]"
                      width={20}
                      height={20}
                      src={seatSvg}
                      alt={'seat'}
                    />
                    <p
                      className={`flex items-center ${flight.availability.seats < 5 ? 'text-[#F82F2F]' : 'text-[#4A4A4A]'}`}
                    >
                      Locuri disponibile: {flight.availability.seats}
                    </p>
                  </div>
                </div>
              )}
            </footer>
          )}
          {endDirection?.length > 0 && (
            <section
              className={cn('flex w-full flex-col justify-center pt-0', {
                'lg:col-span-4': withoutAction,
              })}
            >
              <Divider />
              <div className="flex w-full flex-row items-center">
                {endDirection?.length > 0 && (
                  <span className="flex w-8">
                    <ArrowLeftOutlined />
                  </span>
                )}
                <main className="grid w-full grid-cols-4">
                  <div className="mr-2 text-right">
                    <div className="mb-2 text-[22px] font-normal">
                      {getTimeFromDate(endDirection?.[0].local_departure)}
                    </div>
                    <div className="text-xxs text-gray-700">
                      {endDirection?.[0].flyFrom}
                    </div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <span className="hidden text-xs text-gray-400 lg:inline">
                        Durata de zbor:
                      </span>
                      <p className="text-xxs text-gray-700">
                        {endDirectionTime}
                      </p>
                    </div>

                    <div className="fly-line block h-[1px] w-full bg-blue-700">
                      <div className="flex w-full justify-center">
                        {endDirection?.length > 1 && (
                          <div className="flex w-1/2 items-center justify-center gap-10">
                            {endDirection
                              .slice(1)
                              .map((route: any, index: number) => (
                                <Tooltip
                                  key={index}
                                  trigger="hover"
                                  title={
                                    <span className=" flex flex-col gap-2 p-2 text-xs">
                                      <span className="flex gap-4">
                                        <span className="">Escale:</span>{' '}
                                        <span className="ml-2 font-semibold">
                                          {route.cityFrom} - {route.cityTo}
                                        </span>
                                      </span>
                                      <span className="flex gap-4">
                                        <span className=""> Nr. zbor:</span>
                                        <span className="font-bold">
                                          {route.flight_no}
                                        </span>
                                      </span>
                                      <span>
                                        Preluarea si înregistrarea bagajului
                                      </span>
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

                    <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-xs text-brand-blue">
                      {endDirection.length > 1
                        ? `Escale: ${endDirection.slice(1).length}`
                        : `Direct`}
                    </div>

                    {/*<div className="mt-2 flex justify-between">*/}
                    {/*  <span className="text-xs text-gray-600">MDA</span>*/}
                    {/*  <span className="text-xs text-gray-600">BGY</span>*/}
                    {/*</div>*/}
                  </div>
                  <div className="ml-2 text-left">
                    <div className="mb-2 text-[22px] font-normal">
                      {getTimeFromDate(
                        endDirection[endDirection.length - 1].local_arrival
                      )}
                    </div>
                    <div className="text-xxs text-gray-700">
                      {endDirection[endDirection.length - 1].flyTo}
                    </div>
                  </div>
                </main>
              </div>

              {withoutFooter || isAdminPanel ? (
                ''
              ) : (
                <footer className="mt-5 flex justify-evenly text-xs text-xxs lg:justify-center">
                  <div className="mr-5 flex min-w-32 flex-row flex-wrap items-center">
                    <div className="flex items-center">
                      <Image
                        className="w-[18px] rounded-sm bg-brand-gray p-1 lg:w-[20x]"
                        width={20}
                        height={20}
                        src={backpackSvg}
                        alt={'backpack'}
                      />
                      <p className="ml-1">Bagajul de mînă inclus</p>
                    </div>
                  </div>

                  {flight.availability.seats && (
                    <div className="flex min-w-36 flex-nowrap items-center justify-evenly">
                      <Image
                        className="w-[18px] rounded-sm bg-brand-gray p-0.5 lg:w-[20px]"
                        width={20}
                        height={20}
                        src={seatSvg}
                        alt={'seat'}
                      />
                      <p className="ml-1">
                        Locuri disponibile: {flight.availability.seats}
                      </p>
                      {withoutFlightNumber
                        ? ''
                        : flight.route.length === 1 && (
                            <p className="text-left lg:hidden">
                              Nr. zbor:{' '}
                              <span className="font-bold">
                                {flight.route[0].flight_no}
                              </span>
                            </p>
                          )}
                    </div>
                  )}
                </footer>
              )}
            </section>
          )}
        </section>
      )}

      {!withoutAction && (
        <>
          <div className="col-span-1 flex flex-col items-end justify-center gap-3  pb-1 lg:items-center lg:justify-normal lg:pb-0">
            <p className="pt-3 text-base font-semibold lg:pt-0">
              € {flight.price}
            </p>
            {isAdminPanel ? (
              <Button
                onClick={() => handleAdminPanelSetSelectedFlight(flight)}
                className={`hidden h-[37px] w-[133px] items-center justify-center ${endDirection.length > 0 ? 'mb-8' : ''} custom-light-shadow rounded-full bg-brand-blue px-8 font-light text-white lg:flex`}
              >
                Rezerva
              </Button>
            ) : (
              <button
                onClick={handleReservation}
                className=" custom-light-shadow hidden h-[37px] w-[133px] items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white lg:flex"
              >
                Rezerva
              </button>
            )}
            {!isAdminPanel && (
              <div className="hidden justify-between gap-5 text-xxs lg:flex">
                <Link href="https://wa.me/37360456654" className="flex">
                  <Image
                    className="object-contain animate-normal animate-duration-[1100ms] animate-fill-forwards animate-infinite animate-ease-in-out group-hover:animate-jump-in"
                    width={16}
                    height={16}
                    src={whatsappSvg}
                    alt={'whatsapp'}
                  />
                  <p className="pl-1">Whatsapp</p>
                </Link>

                <Link href="viber://chat/?number=+37360456654" className="flex">
                  <Image
                    className="object-contain animate-normal animate-duration-[1100ms] animate-infinite animate-ease-in-out group-hover:animate-jump-in"
                    width={16}
                    height={16}
                    src={viberSvg}
                    alt={'viber'}
                  />
                  <p className="pl-1">Viber</p>
                </Link>
              </div>
            )}
          </div>

          <footer className="col-span-2 row-span-3 mt-4 flex gap-3 lg:hidden">
            <Link
              href="tel:+(373) 60 851 555"
              className="custom-light-shadow flex h-9 w-28 flex-1 items-center justify-center rounded-full bg-[#11D2A4] px-8 text-sm font-light text-white lg:flex lg:text-base"
            >
              Sună acum
            </Link>
            <button
              onClick={handleReservation}
              className="custom-light-shadow flex h-9 w-40 flex-1 items-center justify-center rounded-full bg-brand-blue px-8 text-sm font-light text-white lg:flex lg:text-base"
            >
              Rezerva
            </button>
          </footer>
        </>
      )}
    </>
  )
}
