import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Calendar } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

interface IProps {
  onChange: any
  fromDate: dayjs.Dayjs
  date?: dayjs.Dayjs
}
export function CustomCalendar({ onChange, fromDate, date }: IProps) {
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
      value={date}
      className="customCalendar custom-shadow z-10 -mt-8"
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
