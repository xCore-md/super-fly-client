'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { Button, Drawer, notification } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import search from '@/assets/img/search.svg'
import searchBlack from '@/assets/img/search-black.svg'
import { useFlightContext } from '@/context/flight-context'
import { useFlightsContext } from '@/context/flights-context'
import axs from '@/lib/axios'
import { SearchFields, searchFields } from '@/lib/constants'
import { convertToSearchQuery } from '@/lib/utils'
import { useIsMobile } from '@/lib/hooks/usIsMobile'
import { SearchComponents } from './search/search-components'
import { SearchInput } from './search-components-desktop/search-input'
import { SearchDatePicker } from './search-components-desktop/search-date-picker'
import { SearchPassengers } from './search-components-desktop/search-passengers'

interface ISearchBarProps {
  setLoading?: any
  isReturnFlight?: boolean
  setIsNoFlights?: any
  setIsReturnFlight?: any
}

interface ISearchField {
  [key: string]: boolean
}

const initialFieldsState = {
  fly_from: false,
  fly_to: false,
  date_from: false,
  return_to: false,
  passengers: false,
}

export const SearchBar = ({
  setLoading,
  isReturnFlight,
  setIsNoFlights,
  setIsReturnFlight,
}: ISearchBarProps) => {
  const isMobile = useIsMobile()
  const [api, contextHolder] = notification.useNotification()
  const [options, setOptions] = useState([] as any)
  const [openFields, setOpenFields] = useState<ISearchField>(initialFieldsState)
  const { setFlights, setInitialFlights } = useFlightsContext()

  const router = useRouter()
  const pathname = usePathname()
  const { setFlight, searchBarRef } = useFlightContext()

  const formik = useFormik({
    initialValues: searchFields,
    onSubmit: () => {},
  })

  const closeAllFields = () => {
    setOpenFields(initialFieldsState)
  }

  const setOpenSpecificField = (field: string) => {
    if (isMobile) return null

    const newFields = { ...openFields }
    Object.keys(newFields).forEach((key) => {
      if (key !== field) {
        newFields[key] = false
      } else {
        newFields[key] = !newFields[key]
      }
    })
    setOpenFields(newFields)
  }

  useEffect(() => {
    if (isReturnFlight) {
      formik.setFieldValue('return_to', '')
      closeAllFields()
    }
  }, [isReturnFlight])

  const isHomePage = pathname === '/'
  const passengersTypes = ['adults', 'children', 'infants']

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

      passengersTypes.forEach((type) => {
        formik.setFieldValue(type, storageFlight[type])
      })
    }

    if (pathname !== '/flights') {
      localStorage.removeItem('flight')
      formik.resetForm()
    }

    setOptions(mockOptions)
    getCurrentCityByIp()

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllFields()
      }
    })
  }, [])

  const [searchLoading, setSearchLoading] = useState(false)

  const onSearch = (value: string) => {
    setSearchLoading(true)
    if (value && value.length > 2) {
      axs
        .get(`/locations?locale=ro-RO&query=${value}`, {
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
              cityId: loc.city.id,
            }))
          )
          setSearchLoading(false)
        })
        .catch((err) => console.log({ err }))
    }
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

  const getCurrentCityByIp = () => {
    axs
      .get('/current-city')
      .then((res) => {
        const { locations } = res.data
        const { city, code, airport_int_id } = locations[0]
        formik.setFieldValue('fly_from', {
          key: airport_int_id,
          country: city.country.name,
          city: city.name,
          code: code,
          cityId: city.id,
        })
      })
      .catch((err) => console.log({ err }))
  }

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
        .get(`${url}?locale=ro-RO&${convertToSearchQuery(selectedFlight)}`, {
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
    closeAllFields()
  }

  // const today = dayjs().startOf('day')

  // const disabledDate = (current: dayjs.Dayjs) => {
  //   return current && current < today
  // }

  // const disableNextDate = (current: dayjs.Dayjs) => {
  //   return (
  //     (current && current < today) ||
  //     (current &&
  //       current.isBefore(
  //         dayjs(formik.values.date_from).add(1, 'day').startOf('day')
  //       ))
  //   )
  // }

  const switchCities = useCallback(() => {
    formik.setFieldValue('fly_from', formik.values.fly_to)
    formik.setFieldValue('fly_to', formik.values.fly_from)
  }, [formik])

  // const isLastDayOfMonth = (date: any) => {
  //   return dayjs(date).isSame(dayjs(date).endOf('month'), 'day')
  // }

  const updateFormValues = (newValues: SearchFields) => {
    formik.setValues((prevState) => ({
      ...prevState,
      ...newValues,
    }))
  }

  const updateFormDates = (newDate: string) => {
    if (dayjs(newDate).isValid()) {
      // @ts-ignore
      formik.setValues((prevState) => ({
        ...prevState,
        date_from: dayjs(newDate),
      }))
    }
  }

  useImperativeHandle(searchBarRef, () => ({
    submitSearch,
    updateFormDates,
    updateFormValues,
  }))

  const [drawerState, setDrawerState] = useState('')

  const openDrawer = useCallback((field: string) => setDrawerState(field), [])
  const closeDrawer = useCallback(() => setDrawerState(''), [])

  const onClickField = (field: string) => {
    if (window.innerWidth <= 768) {
      openDrawer(field)
    } else {
      setOpenSpecificField(field)
    }
  }

  const applyPassengers = (passengers: any) => {
    formik.setValues((prevState) => ({
      ...prevState,
      ...passengers,
    }))
  }

  const searchParams = useSearchParams()
  const companyParams = searchParams.get('company')

  const searchBtnIcon =
    companyParams && companyParams === 'airMoldova' ? searchBlack : search

  return (
    <form onSubmit={formik.handleSubmit} className="w-full md:w-auto ">
      {contextHolder}
      <Drawer
        open={!!drawerState}
        onClose={closeDrawer}
        placement="bottom"
        height="100%"
        zIndex={999999}
        className="search-drawer"
      >
        <SearchComponents
          field={drawerState}
          onSearch={onSearch}
          options={options}
          loading={searchLoading}
          formik={formik}
          closeDrawer={closeDrawer}
          submitSearch={submitSearch}
          onClickField={onClickField}
        />
      </Drawer>
      <div
        className={`relative flex w-full max-w-[861px] items-center ${openFields.fly_from ? 'rounded-bottom-left-none' : ''} ${openFields.passengers ? 'rounded-bottom-right-none' : ''} md:h-[45px] md:rounded-full md:shadow-lg lg:w-auto lg:bg-white lg:pr-1`}
      >
        <div className="flex w-full flex-col items-center justify-between lg:flex-row">
          <div className="flex flex-row max-[1024px]:w-full max-[1024px]:flex-col max-[1024px]:gap-0">
            <SearchInput
              switchCities={switchCities}
              formik={formik}
              options={options}
              field="fly_from"
              onSearch={onSearch}
              onClickField={onClickField}
              openFields={openFields}
              placeholder="ZBOR DIN"
            />

            <SearchInput
              switchCities={switchCities}
              formik={formik}
              options={options}
              field="fly_to"
              onSearch={onSearch}
              onClickField={onClickField}
              openFields={openFields}
              placeholder="ATERIZARE ÎN"
            />
          </div>

          <SearchDatePicker
            formik={formik}
            onClickField={onClickField}
            openFields={openFields}
            setIsReturnFlight={setIsReturnFlight}
          />

          <SearchPassengers
            formik={formik}
            onClickField={onClickField}
            openFields={openFields}
            applyPassengers={applyPassengers}
          />

          <button
            onClick={() => submitSearch()}
            className={`search-button-shadow ml-4 hidden h-[40px] w-[40px] min-w-[40px] items-center justify-center rounded-full bg-brand-green hover:opacity-90  max-[1024px]:mt-4 max-[1024px]:h-12 max-[1024px]:w-full md:flex`}
          >
            <span className="mr-3  font-medium text-white min-[1024px]:hidden">
              Caută
            </span>
            <Image src={search} alt="image" width={10} height={10} />
          </button>
          <Button
            onClick={() => submitSearch()}
            style={{
              backgroundColor: companyParams
                ? colorsByCompany[companyParams].bg
                : '#11D2A4',
              color: companyParams
                ? colorsByCompany[companyParams].color
                : '#fff',
            }}
            className="search-button-shadow mt-3 flex h-[32px] w-full items-center justify-center rounded-full border-0 hover:opacity-90 md:mt-0 md:hidden md:w-auto"
          >
            <span className="text-xs  font-normal lg:hidden">Caută</span>
            <Image src={searchBtnIcon} alt="image" width={12} height={12} />
          </Button>
        </div>
      </div>
    </form>
  )
}

const mockOptions = [
  {
    key: 1,
    country: 'Republica Moldova',
    city: 'Chisinau',
    code: 'RMO',
    cityId: 'chisinau_md',
  },
  {
    key: 2,
    country: 'Italia',
    city: 'Roma',
    code: 'FCO',
    cityId: 'rome_it',
  },
  {
    key: 3,
    country: 'Spania',
    city: 'Barcelona',
    code: 'BCN',
    cityId: 'barcelona_es',
  },
  {
    key: 4,
    country: 'United Kingdom',
    city: 'Londra',
    code: 'LTN',
    cityId: 'london_gb',
  },
  {
    key: 5,
    country: 'Germany',
    city: 'Munchen',
    code: 'MUC',
    cityId: 'munich_de',
  },
  {
    key: 6,
    country: 'France',
    city: 'Paris',
    code: 'CDG',
    cityId: 'paris_fr',
  },
]

const colorsByCompany: any = {
  flyOne: {
    bg: '#10D2A4',
    color: '#fff',
  },
  hiSky: {
    bg: '#F89923',
    color: '#fff',
  },
  wizzAir: {
    bg: '#CF3E97',
    color: '#fff',
  },
  airMoldova: {
    bg: '#FFED00',
    color: '#2D2D2D',
  },
}
