import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Calendar } from 'antd'
import dayjs from 'dayjs'

interface IProps {
  onChange: any
  fromDate?: dayjs.Dayjs
  date?: dayjs.Dayjs
  className?: string
  desktop?: boolean
}
export function CustomCalendar({
  onChange,
  fromDate,
  date,
  className,
  desktop,
}: IProps) {
  const [currentDate, setCurrentDate] = useState(dayjs())

  useEffect(() => {
    if (fromDate && fromDate.isAfter(dayjs(), 'month')) {
      setCurrentDate(fromDate)
    } else {
      setCurrentDate(date || dayjs())
    }
  }, [date, fromDate])

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

  const customHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <Button
          type="primary"
          style={{ width: desktop ? 26 : 32, height: desktop ? 26 : 32 }}
          className="customCalendarNavBtn rounded-full border-0 shadow-none"
          icon={<LeftOutlined style={{ width: 12, height: 20, padding: 0 }} />}
          disabled={dayjs().isSame(currentDate, 'month')}
          onClick={onPrevMonth}
        />
        <span style={{ fontSize: desktop ? 10 : 12, fontWeight: 'bold' }}>
          {monthName}
        </span>
        <Button
          type="primary"
          style={{ width: desktop ? 26 : 32, height: desktop ? 26 : 32 }}
          className="customCalendarNavBtn rounded-full border-0 shadow-none"
          icon={<RightOutlined style={{ width: 12, height: 20, padding: 0 }} />}
          onClick={onNextMonth}
        />
      </div>
    )
  }

  const disabledDates = (current: any) => {
    const today = dayjs().startOf('day')
    const from = fromDate ? fromDate.startOf('day') : null

    return current && (current < today || (from && current < from))
  }

  return (
    <Calendar
      headerRender={customHeader}
      value={currentDate}
      className={`customCalendar custom-shadow ${className} ${currentDate && 'calendar-selected'} ${fromDate && 'disabled-today'}`}
      onPanelChange={(newDate: any) => setCurrentDate(newDate)}
      onChange={handleChange}
      fullscreen={false}
      disabledDate={disabledDates}
    />
  )
}
