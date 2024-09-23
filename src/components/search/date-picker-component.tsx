import { Button, Calendar, Input } from 'antd'
import Image from 'next/image'
import calendar from '@/assets/img/calendar.svg'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'

export function DatePickerComponent(props: any) {
  const { formik, closeDrawer } = props

  const [fromValue, setFromValue] = useState(
    dayjs(formik.values.date_from).format('DD.MM.YYYY') || ''
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
        <Image src={calendar} alt="image" width={22} height={17} />

        <div className="flex flex-col pt-1">
          <span className="text-xs font-semibold uppercase">PLECARE</span>
          <Input
            className="border-none pl-0 outline-none focus:shadow-none"
            type="text"
            readOnly
            value={fromValue}
            placeholder={dayjs().format('DD.MM.YYYY')}
          />
        </div>
      </div>

      <Calendar
        className="drawerCalendar custom-shadow z-10 -mt-8"
        fullscreen={false}
        onChange={handleChangeFrom}
        disabledDate={(current: any) => current <= dayjs().subtract(1, 'day')}
      />

      <div className="mt-8">
        <div className="custom-shadow relative z-50 flex items-center justify-start gap-4 rounded-full bg-white px-4 py-2">
          <Image src={calendar} alt="image" width={22} height={17} />

          <div className="flex flex-col pt-1">
            <span className="text-xs font-semibold uppercase">RETUR</span>
            <Input
              className="border-none pl-0 outline-none focus:shadow-none"
              type="text"
              readOnly
              onClick={() => setShowReturn(!showReturn)}
              value={toValue}
              placeholder={dayjs().format('DD.MM.YYYY')}
            />
          </div>
        </div>

        {showReturn && (
          <Calendar
            className="drawerCalendar custom-shadow z-10 -mt-8"
            fullscreen={false}
            onChange={handleChangeTo}
            disabledDate={(current: any) =>
              current <= dayjs().subtract(1, 'day')
            }
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
