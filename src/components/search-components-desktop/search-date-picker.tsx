import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import dayjs from 'dayjs'
import calendarBlue from '@/assets/img/calendar-blue.svg'
import calendar from '@/assets/img/calendar.svg'
import { useIsMobile } from '@/lib/hooks/usIsMobile'
import { CustomCalendar } from '../customCalendar'
import { useTranslationsContext } from '@/context/translations-context'

interface IProps {
  formik: any
  openFields: any
  setIsReturnFlight?: any
  onClickField: any
  isReturnFlight?: boolean
}

export function SearchDatePicker(props: IProps) {
  const {
    formik,
    openFields,
    setIsReturnFlight,
    onClickField,
    isReturnFlight,
  } = props

  const [activeField, setActiveField] = useState('')
  const { translations: t } = useTranslationsContext()

  useEffect(() => {
    if (!isReturnFlight) {
      formik.setFieldValue('return_to', '')
    }
  }, [isReturnFlight])

  useEffect(() => {
    if (openFields['date_from']) {
      setActiveField('date_from')
    }
    if (openFields['return_to']) {
      setActiveField('return_to')
    }
  }, [openFields])

  const handleCalendarChangeFrom = useCallback(
    (value: any) => {
      if (isReturnFlight) {
        onClickField('return_to')
      } else {
        onClickField('passengers')
      }
      formik.setFieldValue('date_from', value)

      if (dayjs(value).isAfter(dayjs(formik.values.return_to))) {
        formik.setFieldValue('return_to', '')
      }
    },
    [isReturnFlight, formik, onClickField]
  )

  const handleCalendarChangeTo = useCallback((value: any) => {
    onClickField('passengers')
    formik.setFieldValue('return_to', value)
  }, [])

  const handleChangeFrom = useCallback((e: any) => {
    const { value } = e.target
    formik.setFieldValue('date_from', value)
  }, [])

  const handleChangeTo = useCallback((e: any) => {
    const { value } = e.target
    formik.setFieldValue('return_to', value)
  }, [])

  const handleChangeActiveField = (field: string) => {
    setActiveField(field)
    onClickField(field)
  }

  const handleClearField = () => {
    if (activeField === 'date_from') {
      formik.setFieldValue('date_from', '')
    } else {
      formik.setFieldValue('return_to', '')
      setIsReturnFlight?.(false)
    }
  }

  const handleChangeCalendar = (value: any) => {
    if (openFields['date_from']) {
      handleCalendarChangeFrom(value)
    }
    if (openFields['return_to']) {
      handleCalendarChangeTo(value)
      setIsReturnFlight?.(true)
    }
    setActiveField('')
  }

  return (
    <div className="relative flex w-full flex-row gap-2 max-[1024px]:mt-2 max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:p-2 max-[1024px]:px-5 md:w-auto md:max-w-[387px] lg:gap-3">
      <PickerField
        title={t.searchBar?.departure}
        openFields={openFields}
        value={formik.values.date_from}
        onClickField={() => handleChangeActiveField('date_from')}
        field="date_from"
        onChange={handleChangeFrom}
        onClear={handleClearField}
        isFirstField
      />
      <PickerField
        title={t.searchBar?.arrival}
        openFields={openFields}
        value={formik.values.return_to}
        onClickField={() => handleChangeActiveField('return_to')}
        field="return_to"
        onChange={handleChangeTo}
        onClear={handleClearField}
        isReturnFlight={isReturnFlight}
      />

      {openFields[activeField] && (
        <div className="dropdown-shadow absolute top-[40.5px] z-10 w-full rounded-3xl">
          <CustomCalendar
            onChange={handleChangeCalendar}
            date={formik.values[activeField]}
            className="searchDropDownShadow"
            desktop
            fromDate={
              activeField === 'return_to' ? formik.values.date_from : ''
            }
          />
        </div>
      )}
    </div>
  )
}

interface IPickerField {
  title: string
  value: string
  field: string
  openFields: any
  onClickField: () => void
  onChange: any
  onClear: () => void
  isReturnFlight?: boolean
  isFirstField?: boolean
}

const PickerField = (props: IPickerField) => {
  const {
    value,
    title,
    openFields,
    onClickField,
    field,
    onChange,
    onClear,
    isReturnFlight,
    isFirstField,
  } = props

  const onFieldClick = useCallback(() => onClickField(), [onClickField])
  const isMobile = useIsMobile()
  const { translations: t } = useTranslationsContext()

  const placeholder = isMobile
    ? `+ ${t.searchBar?.addReturn}`
    : t.searchBar?.selectDate

  return (
    <div
      className={`flex w-full items-center gap-2 border-r-[1px] border-gray-300 pt-1 ${field === 'date_from' ? 'pl-3' : ''} pr-3 max-[1024px]:border-0 max-[1024px]:p-0 md:max-w-36 `}
    >
      <div className="flex w-full flex-col items-start">
        <span
          className={`text-[8px] font-semibold uppercase  ${openFields[field] || isFirstField || isReturnFlight ? 'text-brand-blue' : 'text-gray-400'}`}
        >
          {title}
        </span>

        <Input
          className={`customInput ${isFirstField || isReturnFlight ? 'activeCustomInput' : ''} relative h-5 w-full min-w-full border-none pb-0 pl-0 pr-1 pt-0 text-xs font-bold text-blue-950 outline-none placeholder:text-slate-900 focus:border-0 focus:shadow-none focus:outline-none md:text-xxs`}
          type="text"
          value={value ? dayjs(value).format('DD.MM.YYYY') : ''}
          readOnly
          id={field}
          placeholder={
            title === 'retur' ? placeholder : t.searchBar?.selectDate
          }
          onClick={onFieldClick}
          onChange={onChange}
          onClear={onClear}
          allowClear
        />
      </div>
      <Button
        type="link"
        className="h-6 w-6 p-0 hover:bg-transparent"
        onClick={onFieldClick}
      >
        <Image
          className="min-w-4"
          src={
            openFields[field] || isFirstField || isReturnFlight
              ? calendarBlue
              : calendar
          }
          alt="image"
          width={28}
          height={28}
        />
      </Button>
    </div>
  )
}
