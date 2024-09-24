import { Button, Calendar, Col, Input, Row } from 'antd'
import Image from 'next/image'
import calendarBlue from '@/assets/img/calendar-blue.svg'
import calendar from '@/assets/img/calendar.svg'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import {
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons'

export function DatePickerComponent(props: any) {
  const { formik, closeDrawer } = props

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

  const handleChangeFrom = useCallback((value: any) => {
    setFromValue(dayjs(value).format('DD.MM.YYYY'))
    formik.setFieldValue('date_from', value)
  }, [])

  const handleChangeTo = useCallback((value: any) => {
    setToValue(dayjs(value).format('DD.MM.YYYY'))
    formik.setFieldValue('return_to', value)
    closeDrawer()
  }, [])

  return (
    <div className="pb-8">
      <div className="custom-shadow relative z-50 flex items-center justify-start gap-4 rounded-full bg-white px-4 py-2">
        <Image
          src={calendarBlue}
          className=""
          alt="image"
          width={22}
          height={17}
        />

        <div className="flex flex-col pt-1">
          <span className="text-xs font-semibold uppercase text-brand-blue">
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

      <CustomHeaderCalendar
        onChange={handleChangeFrom}
        fromDate={formik.values.date_from}
      />

      <div className="mt-8">
        <div
          onClick={() => setShowReturn(!showReturn)}
          className="custom-shadow relative z-50 flex items-center justify-between gap-4 rounded-full bg-white px-4 py-2"
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
          <CustomHeaderCalendar
            onChange={handleChangeTo}
            fromDate={formik.values.date_from}
          />
        )}

        <Button
          size="large"
          className="mt-4 w-full rounded-full bg-brand-blue font-light"
          type="primary"
          onClick={closeDrawer}
        >
          Într-o direcție
        </Button>
      </div>
    </div>
  )
}

const CustomHeaderCalendar = ({ onChange, fromDate }: any) => {
  const [currentDate, setCurrentDate] = useState(fromDate ? fromDate : dayjs())

  const onPrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'))
  }

  const onNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'))
  }

  const monthName = currentDate.format('MMMM YYYY')

  const handleChange = (value: any) => {
    onChange(value)
    setCurrentDate(value)
  }

  const customHeader = ({ value }: any) => {
    return (
      <div className="flex items-center justify-between p-4">
        <Button
          type="primary"
          className="rounded-full border-0 shadow-none"
          icon={<LeftOutlined />}
          disabled={dayjs().isSame(value, 'month')}
          onClick={onPrevMonth}
        />
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {monthName}
        </span>
        <Button
          type="primary"
          className="rounded-full border-0 shadow-none"
          icon={<RightOutlined />}
          onClick={onNextMonth}
        />
      </div>
    )
  }

  return (
    <Calendar
      headerRender={customHeader}
      value={currentDate}
      className="drawerCalendar custom-shadow z-10 -mt-8"
      onPanelChange={setCurrentDate}
      onChange={handleChange}
      fullscreen={false}
      disabledDate={(current: any) =>
        current <= dayjs().subtract(1, 'day') ||
        (fromDate && current < dayjs(fromDate))
      }
    />
  )
}
