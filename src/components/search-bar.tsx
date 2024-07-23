'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DatePicker, Popover, Select, notification } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import arrive from '@/assets/img/arrive.svg'
import calendarBlue from '@/assets/img/calendar-blue.svg'
import calendar from '@/assets/img/calendar.svg'
import departure from '@/assets/img/departure.svg'
import humanBlue from '@/assets/img/human-blue.svg'
import human from '@/assets/img/human.svg'
import infantsBlue from '@/assets/img/infants-blue.svg'
import infants from '@/assets/img/infants.svg'
import kidsBlue from '@/assets/img/kids-blue.svg'
import kids from '@/assets/img/kids.svg'
import refresh from '@/assets/img/refresh.svg'
import search from '@/assets/img/search.svg'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useFlightContext } from '@/context/flight-context'
import { useFlightsContext } from '@/context/flights-context'
import axs from '@/lib/axios'
import { searchFields } from '@/lib/constants'
import { convertToSearchQuery, handleCalendarKeyDown } from '@/lib/utils'

interface ISearchBarProps {
  arrival: boolean
  setLoading?: any
  setIsNoFlights?: any
}

export const SearchBar = ({
  arrival,
  setLoading,
  setIsNoFlights,
}: ISearchBarProps) => {
  const [api, contextHolder] = notification.useNotification()
  const [options, setOptions] = useState([] as any)
  const [openDeparture, setOpenDeparture] = useState(false)
  const [openArrival, setOpenArrival] = useState(false)
  const { setFlights, setInitialFlights } = useFlightsContext()
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  })

  const router = useRouter()
  const pathname = usePathname()
  const { setFlight } = useFlightContext()

  const formik = useFormik({
    initialValues: searchFields,
    onSubmit: () => {
      console.log('submit')
    },
  })

  const [passengersPopOverStatus, setPassengersPopOverStatus] = useState(false)

  const handleDepartureClick = () => {
    setOpenDeparture(!openDeparture)
  }

  const handleDepartureChange = (status: any) => {
    setOpenDeparture(status)
  }

  const handleArrivalClick = () => {
    setOpenArrival(!openArrival)
  }

  const handleArrivalChange = (status: any) => {
    setOpenArrival(status)
  }

  useEffect(() => setOptions(mockOptions), [])

  useEffect(() => {
    if (pathname !== '/flights') {
      localStorage.removeItem('flight')
      formik.resetForm()
    }
  }, [])

  const isHomePage = pathname === '/'

  useEffect(() => {
    const storage = localStorage.getItem('flight')
    if (storage) {
      const storageFlight = JSON.parse(storage)

      formik.setValues({
        ...storageFlight,
        date_from: dayjs(new Date(storageFlight?.date_from)),
        return_to: storageFlight?.return_to
          ? dayjs(new Date(storageFlight?.return_to))
          : '',
      })

      setPassengers({
        adults: storageFlight.adults,
        children: storageFlight.children,
        infants: storageFlight.infants,
      })
    }
  }, [])

  const onSearch = (value: string) => {
    if (value) {
      axs
        .get(`/locations?locale=ro&query=${value}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setOptions(
            res.data?.locations?.map((loc: any) => ({
              key: loc.int_id,
              country: loc.city.country.name,
              city: loc.city.name,
              code: loc.code,
            }))
          )
        })
        .catch((err) => console.log({ err }))
    }
  }

  // const selectLabel = (data: any) => {
  //   const obj = options.find(
  //     (opt: any) => opt.city.toLowerCase() === data.city.toLowerCase()
  //   )

  //   const label = (
  //     <div className="flex w-full items-center justify-between">
  //       <span>{obj?.city}</span>
  //       <span>{`(${obj?.code})`}</span>
  //     </div>
  //   )
  //   return <span>{label}</span>
  // }

  const updatePassengersCount = (key: string, value: number) => {
    setPassengers({
      ...passengers,
      [key]: value,
    })
    formik.setFieldValue(key, value)
  }

  const selectedFlight = useMemo(
    () => ({
      ...formik.values,
      fly_from: formik.values?.fly_from.code,
      fly_to: formik.values?.fly_to.code,
      date_from: dayjs(new Date(formik.values?.date_from)).format('DD/MM/YYYY'),
      return_to: formik.values?.return_to
        ? dayjs(new Date(formik.values?.return_to)).format('DD/MM/YYYY')
        : '',
    }),
    [formik.values]
  )

  const submitSearch = () => {
    if (
      !formik.values.fly_from ||
      !formik.values.fly_to ||
      !formik.values.date_from
    ) {
      api.error({
        message: 'Message',
        description: 'Toate campurile sunt obligatorii',
        placement: 'bottomRight',
        duration: 3,
        closable: true,
      })
      return
    }
    setFlight(formik.values)
    localStorage.setItem('flight', JSON.stringify(formik.values))

    if (isHomePage) {
      router.push('/flights')
    } else {
      setFlights([])
      setInitialFlights([])
      setLoading?.(true)

      const storage = localStorage.getItem('userData')
      const userData = storage ? JSON.parse(storage) : null
      const url = pathname.includes('admin') ? '/crm/search' : '/search'

      axs
        .get(`${url}?locale=ro&${convertToSearchQuery(selectedFlight)}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userData?.token}`,
          },
        })
        .then((res) => {
          const data = [...res.data.data].sort(
            (a: any, b: any) => a.duration.total - b.duration.total
          )
          setFlights(data)
          setInitialFlights(data)
          setLoading?.(false)
          if (res.data.data.length === 0) {
            setIsNoFlights?.(true)
          } else {
            setIsNoFlights?.(false)
          }
        })
        .catch((err) => console.log({ err }))
    }
  }

  const today = dayjs().startOf('day')

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < today
  }

  const disableNextDate = (current: dayjs.Dayjs) => {
    return (
      (current && current < today) ||
      (current &&
        current.isBefore(
          dayjs(formik.values.date_from).add(1, 'day').startOf('day')
        ))
    )
  }

  const switchCities = useCallback(() => {
    formik.setFieldValue('fly_from', formik.values.fly_to)
    formik.setFieldValue('fly_to', formik.values.fly_from)
  }, [formik])

  return (
    <form onSubmit={formik.handleSubmit} className="w-full md:w-auto">
      {contextHolder}
      <div className="flex w-full max-w-[1152px] items-center rounded-full lg:h-[68px] lg:w-auto lg:bg-white lg:pl-6 lg:pr-2">
        <div className="flex w-full flex-col items-center justify-between  lg:flex-row lg:gap-4">
          <div className="flex flex-row gap-4 max-[1024px]:w-full max-[1024px]:flex-col max-[1024px]:gap-0">
            <div className="relative flex w-full items-center gap-4 rounded-t-[27px] border-r-[1px] border-gray-300 bg-white pr-3 max-[1024px]:border-b-[1px] max-[1024px]:py-2 max-[1024px]:pl-4 max-[1024px]:pr-0 lg:w-auto lg:rounded-none lg:bg-transparent">
              <Image src={departure} alt="image" width={22} height={17} />
              <div className="grid max-w-sm items-center pt-2">
                {/* <Label
                  className=" text-xs uppercase text-gray-400"
                  htmlFor="departure"
                >
                  ZBOR DIN
                </Label> */}

                <Select
                  showSearch
                  placeholder="ZBOR DIN"
                  popupClassName="autocompleteSelectPopUp"
                  className="autocompleteSelect h-8 min-w-36 border-0 bg-transparent p-0 text-sm font-semibold text-black"
                  value={formik.values.fly_from.city || null}
                  filterOption={() => true}
                  optionRender={({ data }) => (
                    <span
                      className="flex justify-between gap-4"
                      onClick={() => formik.setFieldValue('fly_from', data)}
                    >
                      <span>
                        <span className="text-sm text-brand-blue">
                          {data?.city}
                        </span>
                        ,
                        <span className="pl-1 text-xs text-gray-500">
                          {data?.country}
                        </span>
                      </span>
                      <span>{data?.code}</span>
                    </span>
                  )}
                  onSearch={onSearch}
                  options={options}
                />
              </div>
              <Button
                variant="link"
                onClick={switchCities}
                className="bottom-0 right-4 h-[36px] w-[36px] p-0 hover:bg-transparent max-[1024px]:absolute max-[1024px]:translate-y-4"
              >
                <Image src={refresh} alt="image" className="h-full w-full" />
              </Button>
            </div>

            <div className="flex w-full items-center gap-4 rounded-b-[27px] border-r-[1px] border-gray-300 bg-white pr-3 max-[1024px]:border-0 max-[1024px]:py-2 max-[1024px]:pl-4 max-[1024px]:pr-0 lg:w-auto lg:rounded-none lg:bg-transparent">
              <Image src={arrive} alt="image" width={22} height={17} />
              <div className="grid max-w-sm items-center pt-2">
                {/* <Label
                  className=" text-xs uppercase text-gray-400"
                  htmlFor="departure"
                >
                  ATERIZARE ÎN
                </Label> */}
                <Select
                  showSearch
                  placeholder="ATERIZARE ÎN"
                  popupClassName="autocompleteSelectPopUp"
                  className="autocompleteSelect h-8 min-w-36 border-0 bg-transparent p-0 text-sm font-semibold text-black"
                  value={formik.values.fly_to.city || null}
                  filterOption={() => true}
                  optionRender={({ data }) => (
                    <span
                      className="flex justify-between gap-4"
                      onClick={() => formik.setFieldValue('fly_to', data)}
                    >
                      <span>
                        <span className="text-sm text-brand-blue">
                          {data?.city}
                        </span>
                        ,
                        <span className="pl-1 text-xs text-gray-500">
                          {data?.country}
                        </span>
                      </span>
                      <span>{data?.code}</span>
                    </span>
                  )}
                  onSearch={onSearch}
                  options={options}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-row gap-2 max-[1024px]:mt-2 max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:p-2 max-[1024px]:px-6 md:w-auto lg:gap-4">
            <div className="flex w-full items-center gap-4 border-r-[1px] border-gray-300 pr-3 max-[1024px]:border-0 max-[1024px]:p-0  md:w-auto">
              <div className="grid max-w-sm items-center pt-2">
                <Label
                  className={` text-xs uppercase text-gray-400 ${openDeparture ? 'text-brand-blue' : ''}`}
                >
                  PLECARE
                </Label>

                <DatePicker
                  suffixIcon={null}
                  format={'DD.MM.YYYY'}
                  open={openDeparture}
                  allowClear={true}
                  value={formik.values.date_from}
                  placeholder="Alege data"
                  disabledDate={disabledDate}
                  popupClassName="datePickerPopUp"
                  onKeyDown={handleCalendarKeyDown}
                  onChange={(date) => formik.setFieldValue('date_from', date)}
                  onOpenChange={handleDepartureChange}
                  className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-within:border-0 focus-within:shadow-none"
                />
              </div>
              <Button
                variant="link"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={handleDepartureClick}
              >
                <Image
                  className="w-7"
                  src={openDeparture ? calendarBlue : calendar}
                  alt="image"
                  width={28}
                  height={28}
                />
              </Button>
            </div>

            <div
              className={`flex w-full items-center gap-4 border-r-[1px] border-gray-300 pr-3 max-[1024px]:rounded-full max-[1024px]:border-0 max-[1024px]:p-0 md:w-auto ${arrival ? '' : 'pointer-events-none opacity-50'}`}
            >
              <div className="grid max-w-sm items-center pt-2">
                <Label
                  className={` text-xs uppercase text-gray-400 ${openArrival ? 'text-brand-blue' : ''}`}
                >
                  RETUR
                </Label>
                <DatePicker
                  suffixIcon={null}
                  format={'DD.MM.YYYY'}
                  open={openArrival}
                  allowClear={true}
                  disabledDate={disableNextDate}
                  popupClassName="datePickerPopUp"
                  value={formik.values.return_to}
                  onKeyDown={handleCalendarKeyDown}
                  onChange={(date) => formik.setFieldValue('return_to', date)}
                  placeholder="Alege data"
                  onOpenChange={handleArrivalChange}
                  className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-within:border-0 focus-within:shadow-none"
                />
              </div>
              <Button
                variant="link"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={handleArrivalClick}
              >
                <Image
                  className="w-7"
                  src={openArrival ? calendarBlue : calendar}
                  alt="image"
                  width={28}
                  height={28}
                />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 max-[1024px]:mt-2 max-[1024px]:w-full max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:py-2 max-[1024px]:pl-6">
            <Image
              className="max-[1024px]:h-8 max-[1024px]:w-3"
              src={passengersPopOverStatus ? humanBlue : human}
              alt="image"
              width={14}
              height={14}
            />
            <div className="ml-1 flex w-full max-w-sm flex-col items-start justify-start pr-4 pt-2">
              <Label
                className={`text-xs uppercase text-gray-400 ${passengersPopOverStatus ? 'text-brand-blue' : ''}`}
                htmlFor="departure"
              >
                PASAGERI
              </Label>

              <Popover
                className="w-full"
                content={
                  <PopoverContent
                    passengers={passengers}
                    updatePassengersCount={updatePassengersCount}
                  />
                }
                placement="bottom"
                trigger={['click']}
                onOpenChange={(status) => setPassengersPopOverStatus(status)}
              >
                <Button className="flex h-8 w-full justify-start border-0 bg-transparent p-0  text-sm font-semibold text-slate-500 outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  <span className="flex">
                    <span
                      className={
                        Object.values(passengers).reduce((a, b) => a + b) > 0
                          ? 'flex w-4'
                          : ''
                      }
                    >
                      {Number(
                        Object.values(passengers).reduce((a, b) => a + b)
                      ) || ''}
                    </span>{' '}
                    Passengers
                  </span>
                </Button>
              </Popover>
            </div>
          </div>

          <Button
            onClick={submitSearch}
            className="search-button-shadow flex h-[56px] w-[56px] items-center justify-center rounded-full bg-emerald-400 hover:opacity-90 max-[1024px]:mt-4 max-[1024px]:h-12 max-[1024px]:w-full"
          >
            <span className="mr-3  font-medium text-white min-[1024px]:hidden">
              Caută
            </span>
            <Image src={search} alt="image" width={20} height={20} />
          </Button>
        </div>
      </div>
    </form>
  )
}

type TPassengers = 'adults' | 'children' | 'infants'

interface IPopoverContent {
  passengers: {
    adults: number
    children: number
    infants: number
  }

  updatePassengersCount: any
}
const PopoverContent = ({
  passengers,
  updatePassengersCount,
}: IPopoverContent) => {
  const handleUpdatePassengersCount = (key: TPassengers, value: number) => {
    const currentCount = Object.values(passengers).reduce((a, b) => a + b)

    if (value < 0 || (currentCount <= 1 && value === 0)) return

    updatePassengersCount(key, value)
  }

  return (
    <div className="w-full min-w-72 p-2">
      <div className="flex flex-col gap-y-6">
        {PopoverData.map(({ title, img, img2, description, key }) => (
          <div className=" flex items-center justify-between" key={key}>
            <div className="flex items-center gap-2">
              <Image
                src={
                  passengers[key as keyof typeof passengers] > 0 ? img2 : img
                }
                alt="image"
                className="h-8 w-6"
              />
              <div className="flex flex-col">
                <h4 className="text-base font-semibold text-black">{title}</h4>
                <span className="text-xs text-gray-500">{description}</span>
              </div>
            </div>
            <div className="flex select-none items-center gap-2">
              <Button
                className="h-8 w-8 rounded-full bg-gray-200 text-black hover:bg-brand-blue hover:text-white"
                onClick={() =>
                  handleUpdatePassengersCount(
                    key as TPassengers,
                    passengers[key as TPassengers] - 1
                  )
                }
              >
                -
              </Button>
              <span className="w-4 text-center text-base text-black">
                {passengers[key as TPassengers]}
              </span>
              <Button
                className="h-8 w-8 rounded-full bg-gray-200 text-black hover:bg-brand-blue hover:text-white"
                onClick={() =>
                  handleUpdatePassengersCount(
                    key as TPassengers,
                    passengers[key as TPassengers] + 1
                  )
                }
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PopoverData = [
  {
    title: 'Adulți',
    description: 'Mai mult de 12 ani',
    img: human,
    img2: humanBlue,
    key: 'adults',
  },
  {
    title: 'Copii',
    description: '2-12 ani',
    img: kids,
    img2: kidsBlue,
    key: 'children',
  },
  {
    title: 'Infanți',
    description: 'Pînă la 2 ani, fără loc',
    img: infants,
    img2: infantsBlue,
    key: 'infants',
  },
]

const mockOptions = [
  {
    key: 1,
    country: 'Republica Moldova',
    city: 'Chisinau',
    code: 'RMO',
  },
  {
    key: 2,
    country: 'Italia',
    city: 'Roma',
    code: 'FCO',
  },
  {
    key: 3,
    country: 'Spania',
    city: 'Barcelona',
    code: 'BCN',
  },
  {
    key: 4,
    country: 'United Kingdom',
    city: 'Londra',
    code: 'LTN',
  },
  {
    key: 5,
    country: 'Germany',
    city: 'Munchen',
    code: 'MUC',
  },
  {
    key: 6,
    country: 'France',
    city: 'Paris',
    code: 'CDG',
  },
]
