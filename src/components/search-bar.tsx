'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button, Drawer, notification } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import PhoneInput from 'react-phone-input-2'
import searchBlack from '@/assets/img/search-black.svg'
import search from '@/assets/img/search.svg'
import { useFlightContext } from '@/context/flight-context'
import { useFlightsContext } from '@/context/flights-context'
import axs from '@/lib/axios'
import { SearchFields, searchFields } from '@/lib/constants'
import { useIsTablet } from '@/lib/hooks/usIsTablet'
import { convertToSearchQuery } from '@/lib/utils'
import { ExpireSessionModal } from '@components/expire-session-modal'
import { SearchComponents } from './search/search-components'
import { SearchDatePicker } from './search-components-desktop/search-date-picker'
import { SearchInput } from './search-components-desktop/search-input'
import { SearchPassengers } from './search-components-desktop/search-passengers'
import 'react-phone-input-2/lib/style.css'
import { useTranslationsContext } from '@/context/translations-context'

interface ISearchBarProps {
  setLoading?: any
  setIsNoFlights?: any
  setIsReturnFlight?: any
  isReturnFlight?: boolean
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
  setIsNoFlights,
  setIsReturnFlight,
  isReturnFlight,
}: ISearchBarProps) => {
  const isTablet = useIsTablet()
  const [api, contextHolder] = notification.useNotification()
  const [options, setOptions] = useState([] as any)
  const [openFields, setOpenFields] = useState<ISearchField>(initialFieldsState)
  const { setFlights, setInitialFlights } = useFlightsContext()
  const [drawerState, setDrawerState] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [isPhoneInputVisible, setIsPhoneInputVisible] = useState(false)
  const { lang, translations: t } = useTranslationsContext()

  const openDrawer = useCallback(
    (field: string) => {
      const flyToField = document.getElementById(field)
      flyToField?.blur()
      setDrawerState(field)
      setOptions(mockOptions[lang])
      document.body.style.overflow = 'hidden'
      setOptions(mockOptions[lang])
    },
    [lang]
  )

  const closeDrawer = () => {
    setDrawerState('')
    const inputElement = document.getElementById('phoneInputId')
    if (inputElement) {
      inputElement?.focus()
    }
    document.body.style.overflow = 'auto'
    const storage = localStorage.getItem('lead')
    if (storage) {
      const phone = JSON.parse(storage).phone || false
      setIsPhoneInputVisible(!!phone)
    }
  }

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
    if (isTablet) return null

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

  const setOpenField = (field: string, value: boolean) => {
    setOpenFields((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const scrollToSearchResults = () => {
    const resultsList = document.getElementById('searchResults')

    const resultsOffset =
      // @ts-ignore
      resultsList?.getBoundingClientRect().top - window.scrollY
    setTimeout(() => {
      window.scrollTo({
        top: resultsOffset - 60,
        behavior: 'smooth',
      })
    }, 500)
  }

  useEffect(() => {
    if (!isReturnFlight) {
      formik.setFieldValue('return_to', '')
      setOpenFields(initialFieldsState)
    }
  }, [isReturnFlight])

  const isHomePage = pathname === '/'
  const passengersTypes = ['adults', 'children', 'infants']

  useEffect(() => {
    const storage = localStorage.getItem('lead')
    if (storage) {
      const phone = JSON.parse(storage).phone || false
      setIsPhoneInputVisible(!!phone)
    }
  }, [])

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
      const isExpired =
        dayjs().diff(dayjs(storageFlight.expirationAt), 'minutes') > 30

      if (isExpired) {
        localStorage.removeItem('flight')
        formik.resetForm()
      }
    } else {
      getCurrentCityByIp()
    }

    setOptions(mockOptions[lang])

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllFields()
      }
    })

    scrollToSearchResults()
  }, [])

  useEffect(() => {
    setOptions(mockOptions[lang])
  }, [lang])

  const [searchLoading, setSearchLoading] = useState(false)

  const onSearch = (value: string) => {
    if (value === '') {
      setOptions(mockOptions[lang])
      setSearchLoading(false)
      return
    }

    setSearchLoading(true)
    setOptions([])
    if (value && value.length > 2) {
      axs
        .get(`/locations?locale=${lang}&query=${value}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setOptions(
            res.data?.locations?.map((loc: any) => ({
              key: loc.int_id,
              country: loc.city.country.name,
              city: loc.name,
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
      date_from: dayjs(formik.values?.date_from).format('DD/MM/YYYY'),
      return_to: formik.values?.return_to
        ? dayjs(formik.values?.return_to).format('DD/MM/YYYY')
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
        message: info.error[lang],
        description: info.allFieldsRequired[lang],
        placement: 'topRight',
        duration: 3,
        closable: true,
      })
      return
    }

    setFlight(formik.values)
    localStorage.setItem(
      'flight',
      JSON.stringify({ ...formik.values, expirationAt: dayjs() })
    )

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
        .get(`${url}?locale=${lang}&${convertToSearchQuery(selectedFlight)}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userData?.token}`,
          },
        })
        .then((res) => {
          setFlights([])
          setInitialFlights([])
          setTimeout(() => {
            const data = [...res.data.data]
            setFlights(data)
            setInitialFlights(data)
            setLoading?.(false)
            closeDrawer()
            if (res.data.data.length === 0) {
              setIsNoFlights?.(true)
            } else {
              setIsNoFlights?.(false)
            }
          }, 300)
        })
        .catch((err) => console.log({ err }))
    }

    const storageLead = localStorage.getItem('lead')

    const phone = phoneValue || (storageLead && JSON.parse(storageLead).phone)

    if (!storageLead && phone) {
      axs
        .post('/create-lead', { phone })
        .then(() => {
          localStorage.setItem('lead', JSON.stringify({ phone }))
        })
        .catch((err) => {
          console.log({ err })
        })
    }

    if (storageLead) {
      const {
        fly_from,
        fly_to,
        date_from,
        return_to,
        adults,
        children,
        infants,
      } = formik.values
      const data = {
        phone,
        flight_from: fly_from?.code,
        flight_to: fly_to?.code,
        date_from: dayjs(date_from).format('DD.MM.YYYY'),
        return_to: return_to ? dayjs(return_to).format('DD.MM.YYYY') : '',
        adults,
        children,
        infants,
        expirationAt: dayjs(),
      }

      axs
        .post('/create-lead', { ...data })
        .then(() => {
          localStorage.setItem('lead', JSON.stringify(data))
        })
        .catch((err) => {
          console.log({ err })
        })
    }

    closeAllFields()
    scrollToSearchResults()
  }

  const switchCities = useCallback(() => {
    formik.setFieldValue('fly_from', formik.values.fly_to)
    formik.setFieldValue('fly_to', formik.values.fly_from)
  }, [formik])

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

  const onClickField = (field: string) => {
    if (window.innerWidth <= 1024) {
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

  const { fly_to, adults, date_from } = formik.values

  const isPhoneFieldVisible =
    isHomePage &&
    isTablet &&
    !!fly_to.city &&
    !!date_from &&
    !!adults &&
    drawerState === '' &&
    !isPhoneInputVisible

  const handleChangePhoneNumber = useCallback((value: string) => {
    // Allow only numbers and a single "+" at the start
    // if (/^(?:\+)?\d*$/.test(value)) {
    setPhoneValue(value)
    formik.setFieldValue('phone', value)
    // }
  }, [])

  const resetForm = useRef(() => formik.resetForm())

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-full md:w-auto ">
        {contextHolder}
        <Drawer
          key={drawerState}
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
            openDrawer={openDrawer}
            submitSearch={submitSearch}
            onClickField={onClickField}
            setIsReturnFlight={setIsReturnFlight}
            isReturnFlight={isReturnFlight}
          />
        </Drawer>
        <div
          className={`relative flex w-full max-w-[861px] items-center ${openFields.fly_from ? 'rounded-bottom-left-none' : ''} ${openFields.passengers ? 'rounded-bottom-right-none' : ''} lg:h-[45px] lg:w-auto lg:rounded-full lg:bg-white lg:pr-1 lg:shadow-lg`}
        >
          <div className="flex w-full flex-col items-center justify-between lg:flex-row">
            <div className="flex flex-row max-[1024px]:w-full max-[1024px]:flex-col">
              <SearchInput
                switchCities={switchCities}
                formik={formik}
                options={options}
                field="fly_from"
                onSearch={onSearch}
                onClickField={onClickField}
                openFields={openFields}
                placeholder={t.searchBar?.departurePlaceholder}
                setOpenFields={setOpenFields}
                setOpenField={setOpenField}
                initialFieldsState={initialFieldsState}
              />

              <SearchInput
                switchCities={switchCities}
                formik={formik}
                options={options}
                field="fly_to"
                onSearch={onSearch}
                onClickField={onClickField}
                openFields={openFields}
                setOpenField={setOpenField}
                placeholder={t.searchBar?.arrivalPlaceholder}
              />
            </div>

            <SearchDatePicker
              formik={formik}
              onClickField={onClickField}
              openFields={openFields}
              setIsReturnFlight={setIsReturnFlight}
              isReturnFlight={isReturnFlight}
            />

            <SearchPassengers
              formik={formik}
              onClickField={onClickField}
              openFields={openFields}
              applyPassengers={applyPassengers}
            />

            {isPhoneFieldVisible && (
              <div className="mt-2 w-full">
                <PhoneInput
                  onChange={handleChangePhoneNumber}
                  value={phoneValue}
                  preferredCountries={[
                    'md',
                    'es',
                    'pt',
                    'ru',
                    'it',
                    'ie',
                    'de',
                    'il',
                  ]}
                  preserveOrder={['preferredCountries']}
                  inputStyle={{
                    height: '46px',
                    width: '100%',
                    borderRadius: '9999px',
                    fontWeight: '400',
                    outline: 'none',
                    border: 'none',
                  }}
                  containerClass="home-search-phone"
                  inputClass={
                    phoneValue.length < 4 ? 'animate-phoneInputPulsing' : ''
                  }
                  inputProps={{
                    id: 'phoneInputId',
                    autoFocus: true,
                    type: 'text',
                  }}
                  placeholder={info.fillPhoneNumber[lang]}
                  country={'md'}
                  countryCodeEditable={false}
                />
              </div>
            )}

            <button
              onClick={() => submitSearch()}
              className={`search-button-shadow ml-4 hidden h-[40px] w-[40px] min-w-[40px] items-center justify-center rounded-full bg-brand-green hover:opacity-90  max-[1024px]:mt-4 max-[1024px]:h-12 max-[1024px]:w-full lg:flex`}
            >
              <span className="mr-3 font-medium text-white lg:hidden">
                {t.searchBar?.search}
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
              className="search-button-shadow mt-3 flex h-[32px] w-full items-center justify-center rounded-full border-0 hover:opacity-90 lg:mt-0 lg:hidden lg:w-auto"
            >
              <span className="text-xs  font-normal lg:hidden">
                {t.searchBar?.search}
              </span>
              <Image src={searchBtnIcon} alt="image" width={12} height={12} />
            </Button>
          </div>
        </div>
      </form>

      <ExpireSessionModal
        resetForm={resetForm.current}
        closeDrawer={closeDrawer}
      />
    </>
  )
}

const mockOptions: any = {
  ro: [
    {
      key: 1,
      country: 'Israel',
      city: 'Tel Aviv',
      code: 'TLV',
      cityId: 'tel-aviv_il',
    },
    {
      key: 2,
      country: 'Irlanda',
      city: 'Dublin',
      code: 'DUB',
      cityId: 'dublin_ie',
    },
    {
      key: 3,
      country: 'Franța',
      city: 'Paris',
      code: 'CDG',
      cityId: 'paris_fr',
    },
    {
      key: 4,
      country: 'Regatul Unit',
      city: 'Londra',
      code: 'LTN',
      cityId: 'london_gb',
    },
    {
      key: 5,
      country: 'Germania',
      city: 'Frankfurt pe Main',
      code: 'FRA',
      cityId: 'frankfurt_de',
    },
    {
      key: 6,
      country: 'Spania',
      city: 'Barcelona',
      code: 'BCN',
      cityId: 'barcelona_es',
    },
    {
      key: 7,
      country: 'Portugalia',
      city: 'Lisabona',
      code: 'LIS',
      cityId: 'lisbon_pt',
    },
    {
      key: 8,
      country: 'Russia',
      city: 'Moscova',
      code: 'DME',
      cityId: 'moscow_cf_ru',
    },
    {
      key: 9,
      country: 'Italia',
      city: 'Milano',
      code: 'BGY',
      cityId: 'milan_it',
    },
  ],
  ru: [
    {
      key: 1,
      country: 'Израиль',
      city: 'Тель-Авив',
      code: 'TLV',
      cityId: 'tel-aviv_il',
    },
    {
      key: 2,
      country: 'Ирландия',
      city: 'Дублин',
      code: 'DUB',
      cityId: 'dublin_ie',
    },
    {
      key: 3,
      country: 'Франция',
      city: 'Париж',
      code: 'CDG',
      cityId: 'paris_fr',
    },
    {
      key: 4,
      country: 'Соединенное Королевство',
      city: 'Лондон',
      code: 'LTN',
      cityId: 'london_gb',
    },
    {
      key: 5,
      country: 'Германия',
      city: 'Франкфурт-на-Майне',
      code: 'FRA',
      cityId: 'frankfurt_de',
    },
    {
      key: 6,
      country: 'Испания',
      city: 'Барселона',
      code: 'BCN',
      cityId: 'barcelona_es',
    },
    {
      key: 7,
      country: 'Португалия',
      city: 'Лиссабон',
      code: 'LIS',
      cityId: 'lisbon_pt',
    },
    {
      key: 8,
      country: 'Россия',
      city: 'Москва',
      code: 'DME',
      cityId: 'moscow_cf_ru',
    },
    {
      key: 9,
      country: 'Италия',
      city: 'Милан',
      code: 'BGY',
      cityId: 'milan_it',
    },
  ],
}

const info: any = {
  allFieldsRequired: {
    ro: 'Toate campurile sunt obligatorii',
    ru: 'Все поля обязательны к заполнению',
  },
  error: {
    ro: 'Eroare',
    ru: 'Ошибка',
  },
  fillPhoneNumber: {
    ro: 'Introduceți numărul de telefon',
    ru: 'Введите номер телефона',
  },
}

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
