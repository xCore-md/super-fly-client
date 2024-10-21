import { Button, Input } from 'antd'
import Image from 'next/image'
import calendarBlue from '@/assets/img/calendar-blue.svg'
import calendar from '@/assets/img/calendar.svg'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { CustomCalendar } from '../customCalendar'

export function DatePickerComponent(props: any) {
  const { formik, openDrawer, isReturnFlight, setIsReturnFlight, field } = props

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
  const [showReturn, setShowReturn] = useState(false)

  useEffect(() => {
    if (!isReturnFlight) {
      setToValue('')
    }
  }, [isReturnFlight])

  useEffect(() => {
    if (field === 'return_to') {
      setShowReturn(true)
    }
  }, [field])

  const handleChangeFrom = useCallback((value: any) => {
    setFromValue(dayjs(value).format('DD.MM.YYYY'))
    formik.setFieldValue('date_from', value)
    if (isReturnFlight) {
      openDrawer('return_to')
    } else {
      setShowReturn(true)
    }
  }, [])

  const handleChangeTo = useCallback((value: any) => {
    setToValue(dayjs(value).format('DD.MM.YYYY'))
    formik.setFieldValue('return_to', value)
    setIsReturnFlight(true)
    openDrawer('passengers')
  }, [])

  const handleConfirm = useCallback(() => {
    setToValue('')
    formik.setFieldValue('return_to', '')
    setIsReturnFlight(false)
    openDrawer('passengers')
  }, [openDrawer, setIsReturnFlight, formik])

  const openReturnCalendar = useCallback(() => {
    setShowReturn(!showReturn)
  }, [showReturn])

  return (
    <div className="pb-8">
      <div
        onClick={() => setShowReturn(!showReturn)}
        className={`custom-shadow relative z-50 flex items-center justify-between gap-4 ${!showReturn ? 'rounded-t-3xl' : 'rounded-full'} bg-white px-4 py-2`}
      >
        <div className="flex items-center justify-start gap-4">
          <Image
            src={calendarBlue}
            className=""
            alt="image"
            width={22}
            height={17}
          />

          <div className="flex flex-col pt-1">
            <span className="pt-1 text-xs font-semibold uppercase text-brand-blue">
              PLECARE
            </span>
            <Input
              className="border-none pl-0 font-semibold text-blue-950 outline-none focus:shadow-none"
              type="text"
              readOnly
              value={fromValue}
              placeholder={dayjs().format('DD.MM.YYYY')}
            />
          </div>
        </div>
        <Button
          className="btn-primary-custom blue-bg rounded-full"
          icon={
            !showReturn ? (
              <MinusOutlined style={{ color: '#fff' }} />
            ) : (
              <PlusOutlined style={{ color: '#fff' }} />
            )
          }
        />
      </div>

      {!showReturn && (
        <CustomCalendar
          onChange={handleChangeFrom}
          date={formik.values.date_from}
        />
      )}

      <div className="mt-8">
        <div
          onClick={openReturnCalendar}
          className={`custom-shadow relative z-50 flex items-center justify-between gap-4 ${showReturn ? 'rounded-t-3xl' : 'rounded-full'} bg-white px-4 py-2`}
        >
          <div className="flex items-center justify-start gap-4">
            <Image
              src={showReturn ? calendarBlue : calendar}
              alt="image"
              width={22}
              height={17}
            />

            <div className="flex flex-col pt-1">
              <span
                className={`text-xs font-semibold uppercase ${showReturn && 'text-brand-blue'}`}
              >
                RETUR
              </span>
              <Input
                className={`border-none pl-0 outline-none focus:shadow-none ${showReturn && 'font-semibold text-blue-950'}`}
                type="text"
                readOnly
                value={toValue}
                placeholder={dayjs().format('DD.MM.YYYY')}
              />
            </div>
          </div>
          <Button
            className="btn-primary-custom blue-bg rounded-full"
            icon={
              showReturn ? (
                <MinusOutlined style={{ color: '#fff' }} />
              ) : (
                <PlusOutlined style={{ color: '#fff' }} />
              )
            }
          />
        </div>

        {showReturn && (
          <CustomCalendar
            onChange={handleChangeTo}
            date={formik.values.return_to}
            fromDate={formik.values.date_from}
          />
        )}

        <Button
          size="large"
          className="mt-4 w-full rounded-full bg-brand-blue font-light"
          type="primary"
          onClick={handleConfirm}
        >
          Într-o direcție
        </Button>
      </div>
    </div>
  )
}
