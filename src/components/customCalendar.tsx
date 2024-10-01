import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Calendar } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface IProps {
  onChange: any
  fromDate?: dayjs.Dayjs
  date?: dayjs.Dayjs
  className?: string
}
export function CustomCalendar({
  onChange,
  fromDate,
  date,
  className,
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
      <div className="flex items-center justify-between p-4">
        <Button
          type="primary"
          className="rounded-full border-0 shadow-none"
          icon={<LeftOutlined />}
          disabled={dayjs().isSame(currentDate, 'month')}
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

  const disabledDates = (current: any) => {
    const today = dayjs().startOf('day')
    const from = fromDate ? fromDate.startOf('day') : null

    return current && (current < today || (from && current < from))
  }

  return (
    <Calendar
      headerRender={customHeader}
      value={currentDate}
      className={`customCalendar custom-shadow ${className}`}
      onPanelChange={(newDate: any) => setCurrentDate(newDate)}
      onChange={handleChange}
      fullscreen={false}
      disabledDate={disabledDates}
    />
  )
}
