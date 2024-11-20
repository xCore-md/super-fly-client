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
import { useIsMobile } from '@/lib/hooks/usIsMobile'
import { getFlightTime, cn, getFormattedDate } from '@/lib/utils'
import dayjs from 'dayjs'

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

  const isMobile = useIsMobile()

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

  const Escalation = ({ data }: { data: any }) => {
    const list = [...data]

    return list
      .filter((_, i) => i !== 0)
      .map((r, index) => (
        <div key={index} className="mb-1 flex items-end gap-2">
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="h-2 w-px bg-[#E7E7E7]"></span>
            <span className="h-[6px] w-3 rounded-full bg-[#FFE959]"></span>
          </div>
          <span className="whitespace-nowrap text-[8px] leading-[10px] text-[#4A4A4A] lg:text-xxs">
            <span className="mr-1"> Escala {r.cityFrom}</span>
            <span>
              {getFlightTime(
                list[index === 0 ? 0 : index - 1].local_arrival,
                r.local_departure
              )}
            </span>
            <span className="text-[8px] font-semibold text-[#4A4A4A] lg:text-xxs">
              Nr. zbor: {r.flight_no}
            </span>
          </span>
        </div>
      ))
  }

  return (
    <>
      {props.withoutHeader ? (
        ''
      ) : (
        <div
          className={` flex h-auto flex-col justify-around gap-6 pb-0 pl-3  ${props.withoutAction && 'col-span-2 lg:col-span-1'} col-span-1`}
        >
          <div className="flex flex-col items-start">
            <div className="flex gap-2">
              {startDirection.map((r: any, index: number) => (
                <img
                  key={r.airline + index}
                  alt="airline"
                  src={`https://api-superfly.xcore.md/logo/${r.airline}`}
                  style={{
                    minWidth: 45,
                    maxWidth: isMobile
                      ? 45
                      : startDirection.length > 1
                        ? 45
                        : 112,
                  }}
                />
              ))}
            </div>
            {startDirection.length > 1 && (
              <div className="mt-2">
                <Escalation data={startDirection} />
              </div>
            )}
          </div>
          {endDirection?.length > 0 && (
            <div className="mt-4 hidden flex-col items-start lg:block">
              <div className="flex gap-2">
                {endDirection.map((r: any, index: number) => (
                  <img
                    key={r.airline + index}
                    alt="airline"
                    src={`https://api-superfly.xcore.md/logo/${r.airline}`}
                    style={{
                      minWidth: 45,
                      maxWidth: isMobile
                        ? 45
                        : endDirection.length > 1
                          ? 45
                          : 112,
                    }}
                  />
                ))}
              </div>
              {endDirection?.length > 1 && (
                <div className="mt-2">
                  <Escalation data={endDirection} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {flight && (
        <section
          className={cn(
            `${isReservationPage ? '' : 'flightCardContentLine'} col-span-2 row-start-2 mt-2 flex flex-col justify-center py-3 lg:col-span-3 lg:row-start-auto lg:py-1`,
            {
              'lg:col-span-4': withoutAction,
            }
          )}
        >
          <div className="flex flex-row items-center">
            <div className="flex w-full flex-col items-center">
              <main className="grid w-full grid-cols-5 lg:grid-cols-4">
                <div className="mr-4 pt-2 text-center lg:mr-2 lg:pt-0 lg:text-right">
                  <div className="text-base font-normal lg:mb-2 lg:text-[22px]">
                    {getFormattedDate(startDirection[0].local_departure)}
                  </div>
                  <div className="text-xxs text-gray-700">
                    {dayjs(startDirection[0].local_departure).format('DD MMM')}
                  </div>
                  <div className="text-xxs text-gray-700">
                    {startDirection[0].cityFrom}
                  </div>
                </div>

                <div className="relative col-span-3 mt-2 lg:col-span-2">
                  {endDirection.length > 0 && (
                    <span className="absolute left-7 top-0 flex w-8">
                      <ArrowRightOutlined />
                    </span>
                  )}
                  <div className="mb-1 flex items-center justify-center gap-2">
                    <span className="hidden text-xxs text-gray-400 lg:inline">
                      Durata de zbor:
                    </span>
                    <p className="text-xxs text-gray-700">
                      {startDirectionTime}
                    </p>
                  </div>

                  <div className="fly-line block h-[1px] w-full bg-brand-blue">
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
                <div className="ml-4 pt-2 text-center lg:ml-2 lg:pt-0 lg:text-left">
                  <div className="text-base font-normal lg:mb-1 lg:pb-1 lg:text-[22px]">
                    {getFormattedDate(
                      startDirection[startDirection.length - 1].local_arrival
                    )}
                  </div>
                  <div className="text-xxs text-gray-700">
                    {dayjs(
                      startDirection[startDirection.length - 1].local_arrival
                    ).format('DD MMM')}
                  </div>
                  <div className="text-xxs text-gray-700">
                    {startDirection[startDirection.length - 1].cityTo}
                  </div>
                </div>
              </main>

              {withoutFooter || isAdminPanel ? (
                ''
              ) : (
                <footer
                  className={`mt-5 flex w-full items-start justify-between gap-0 px-4 text-xs text-xxs text-[#4A4A4A] lg:justify-center lg:gap-4 lg:px-0`}
                >
                  <div>
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
                    <p className="pt-2 text-left">
                      Nr. zbor:{' '}
                      <span className="font-bold">
                        {flight.route[0].flight_no}
                      </span>
                    </p>
                  </div>
                  {flight.availability.seats && (
                    <div className="flex items-center justify-between">
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
            </div>
          </div>

          {endDirection?.length > 0 && (
            <div
              className={cn('flex w-full flex-col justify-center pt-0', {
                'lg:col-span-4': withoutAction,
              })}
            >
              <Divider
                style={{
                  minWidth: '97%',
                  width: '97%',
                  marginBottom: 10,
                  borderTop: '1px solid #E7E7E7',
                }}
              />

              {endDirection?.length > 0 && (
                <div className="flex flex-col items-start lg:hidden">
                  <div className="flex gap-2">
                    {endDirection.map((r: any, index: number) => (
                      <img
                        key={r.airline + index}
                        alt="airline"
                        src={`https://api-superfly.xcore.md/logo/${r.airline}`}
                        style={{
                          minWidth: 45,
                          maxWidth: isMobile
                            ? 45
                            : endDirection.length > 1
                              ? 45
                              : 112,
                        }}
                      />
                    ))}
                  </div>
                  {endDirection?.length > 1 && (
                    <div className="mt-2">
                      <Escalation data={endDirection} />
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-row items-center pt-5">
                <div className="flex w-full flex-col items-center">
                  <main className="grid w-full grid-cols-5 lg:grid-cols-4">
                    <div className="mr-4 pt-2 text-center lg:mr-2 lg:pt-0 lg:text-right">
                      <div className="text-base font-normal lg:mb-2 lg:text-[22px]">
                        {getFormattedDate(endDirection?.[0].local_departure)}
                      </div>
                      <div className="text-xxs text-gray-700">
                        {dayjs(endDirection?.[0].local_departure).format(
                          'DD MMM'
                        )}
                      </div>
                      <div className="text-xxs text-gray-700">
                        {endDirection?.[0].cityFrom}
                      </div>
                    </div>
                    <div className="relative col-span-3 mt-2 lg:col-span-2">
                      {endDirection?.length > 0 && (
                        <span className="absolute left-7 top-0 flex w-8">
                          <ArrowLeftOutlined />
                        </span>
                      )}
                      <div className="mb-1 flex items-center justify-center gap-2">
                        <span className="hidden text-xxs text-gray-400 lg:inline">
                          Durata de zbor:
                        </span>
                        <p className="text-xxs text-gray-700">
                          {endDirectionTime}
                        </p>
                      </div>

                      <div className="fly-line block h-[1px] w-full bg-brand-blue">
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
                                      <span className=" flex flex-col gap-2 p-2 text-xxs">
                                        <span className="flex gap-4">
                                          <span>Escale:</span>{' '}
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
                        {endDirection.length > 1
                          ? `Escale: ${endDirection.slice(1).length}`
                          : `Direct`}
                      </div>

                      {/*<div className="mt-2 flex justify-between">*/}
                      {/*  <span className="text-xs text-gray-600">MDA</span>*/}
                      {/*  <span className="text-xs text-gray-600">BGY</span>*/}
                      {/*</div>*/}
                    </div>
                    <div className="ml-4 pt-2 text-center lg:ml-2 lg:pt-0 lg:text-left">
                      <div className="text-base font-normal lg:mb-2 lg:text-[22px]">
                        {getFormattedDate(
                          endDirection[endDirection.length - 1].local_arrival
                        )}
                      </div>
                      <div className="text-xxs text-gray-700">
                        {dayjs(
                          endDirection[endDirection.length - 1].local_arrival
                        ).format('DD MMM')}
                      </div>
                      <div className="text-xxs text-gray-700">
                        {endDirection[endDirection.length - 1].cityTo}
                      </div>
                    </div>
                  </main>
                  {withoutFooter || isAdminPanel ? (
                    ''
                  ) : (
                    <footer className="mt-5 flex justify-evenly text-xs text-xxs lg:justify-center">
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
                          <p className="ml-1">Bagajul de mînă inclus</p>
                        </div>
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
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {!withoutAction && (
        <>
          <div className="col-span-1 flex h-full flex-col items-end justify-start gap-3 pb-1 lg:items-center lg:justify-center lg:pb-0">
            <p className=" text-base font-semibold lg:pt-0">€ {flight.price}</p>
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
                <Link href="https://wa.me/37360851555" className="flex">
                  <Image
                    className="object-contain animate-normal animate-duration-[1100ms] animate-fill-forwards animate-infinite animate-ease-in-out group-hover:animate-jump-in"
                    width={16}
                    height={16}
                    src={whatsappSvg}
                    alt={'whatsapp'}
                  />
                  <p className="pl-1">Whatsapp</p>
                </Link>

                <Link href="viber://chat/?number=+37360851555" className="flex">
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
