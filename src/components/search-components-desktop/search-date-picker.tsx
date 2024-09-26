import { Button, Input } from 'antd'
import Image from 'next/image'
import calendar from '@/assets/img/calendar.svg'
import calendarBlue from '@/assets/img/calendar-blue.svg'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { CustomCalendar } from '../customCalendar'
import { useIsMobile } from '@/lib/hooks/usIsMobile'

interface IProps {
  formik: any
  openFields: any
  setActiveTab?: any
  onClickField: any
}

export function SearchDatePicker(props: IProps) {
  const { formik, openFields, setActiveTab, onClickField } = props

  const [activeField, setActiveField] = useState('')

  const [fromValue, setFromValue] = useState(
    formik.values.date_from
      ? dayjs(formik.values.date_from).format('DD.MM.YYYY')
      : ''
  )
  const [toValue, setToValue] = useState(
    formik.values.return_to
      ? dayjs(formik.values.return_to).format('DD.MM.YYYY')
      : ''
  )

  useEffect(() => {
    if (formik.values.date_from) {
      setFromValue(dayjs(formik.values.date_from).format('DD.MM.YYYY'))
    }
    if (formik.values.return_to) {
      setToValue(dayjs(formik.values.return_to).format('DD.MM.YYYY'))
    }
  }, [formik.values.date_from, formik.values.return_to])

  useEffect(() => {
    if (openFields['date_from']) {
      setActiveField('date_from')
    }
    if (openFields['return_to']) {
      setActiveField('return_to')
    }
  }, [openFields])

  const handleCalendarChangeFrom = useCallback((value: any) => {
    setFromValue(dayjs(value).format('DD.MM.YYYY'))
    formik.setFieldValue('date_from', value)
  }, [])

  const handleCalendarChangeTo = useCallback((value: any) => {
    setToValue(dayjs(value).format('DD.MM.YYYY'))
    formik.setFieldValue('return_to', value)
  }, [])

  const handleChangeFrom = useCallback((e: any) => {
    const { value } = e.target
    setFromValue(value)
  }, [])

  const handleChangeTo = useCallback((e: any) => {
    const { value } = e.target
    setToValue(value)
  }, [])

  const handleChangeActiveField = (field: string) => {
    setActiveField(field)
    onClickField(field)
  }

  const handleClearField = () => {
    if (activeField === 'date_from') {
      setFromValue('')
      formik.setFieldValue('date_from', '')
    } else {
      setToValue('')
      formik.setFieldValue('return_to', '')
      setActiveTab?.('dus')
    }
  }

  const handleChangeCalendar = (value: any) => {
    if (activeField === 'date_from') {
      handleCalendarChangeFrom(value)
    } else {
      handleCalendarChangeTo(value)
      setActiveTab?.('intors')
    }
    onClickField(activeField)
    setActiveField('')
  }

  return (
    <div className=" relative flex w-full flex-row gap-4 max-[1024px]:mt-2 max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:p-2 max-[1024px]:px-6 md:w-auto md:max-w-[387px] lg:gap-4">
      <PickerField
        title="plecare"
        openFields={openFields}
        value={fromValue}
        onClickField={() => handleChangeActiveField('date_from')}
        field="date_from"
        onChange={handleChangeFrom}
        onClear={handleClearField}
      />
      <PickerField
        title="retur"
        openFields={openFields}
        value={toValue}
        onClickField={() => handleChangeActiveField('return_to')}
        field="return_to"
        onChange={handleChangeTo}
        onClear={handleClearField}
      />

      {openFields[activeField] && (
        <div className="absolute -z-10 mt-12 w-full">
          <CustomCalendar
            onChange={handleChangeCalendar}
            date={formik.values[activeField]}
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
}

const PickerField = (props: IPickerField) => {
  const { value, title, openFields, onClickField, field, onChange, onClear } =
    props

  const onFieldClick = useCallback(() => onClickField(), [onClickField])
  const isMobile = useIsMobile()

  return (
    <div
      className={`flex w-full items-center gap-2 border-r-[1px] border-gray-300 ${field === 'date_from' ? 'pl-4' : ''} pr-3 max-[1024px]:border-0 max-[1024px]:p-0  md:w-auto`}
    >
      <div className="grid max-w-sm items-center pt-2">
        <span
          className={`text-xs font-semibold uppercase  ${openFields[field] ? 'text-brand-blue' : 'text-gray-400'}`}
        >
          {title}
        </span>

        <Input
          className="customInput w-full border-none pl-0 font-semibold text-blue-950 outline-none focus:border-0 focus:shadow-none focus:outline-none"
          type="text"
          value={value}
          readOnly={isMobile}
          placeholder="Alege data"
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
          className="min-w-6"
          src={openFields[field] ? calendarBlue : calendar}
          alt="image"
          width={28}
          height={28}
        />
      </Button>
    </div>
  )
}
