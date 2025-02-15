import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Calendar } from 'antd'
import roRO from 'antd/es/calendar/locale/ro_RO'
import ruRU from 'antd/es/calendar/locale/ru_RU'
import dayjs from 'dayjs'
import { useTranslationsContext } from '@/context/translations-context'
import { cn } from '@/lib/utils'
import 'dayjs/locale/ru'
import 'dayjs/locale/ro'

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
  const { lang } = useTranslationsContext()

  useEffect(() => {
    setCurrentDate(date || dayjs())
  }, [date])

  useEffect(() => {
    if (fromDate && !date) {
      setCurrentDate(fromDate)
    }
  }, [])

  const changeKeyOfCalendarContent = (changeMonth: any) => {
    const contentDiv = document.querySelector('.ant-picker-content')
    if (contentDiv) {
      contentDiv.classList.remove('fade-in')
      contentDiv.classList.add('fade-out')

      setTimeout(() => {
        contentDiv.classList.remove('fade-out')
        contentDiv.classList.add('fade-in')
        changeMonth()
      }, 300)
    }
  }

  const onPrevMonth = () => {
    changeKeyOfCalendarContent(() =>
      setCurrentDate(currentDate.subtract(1, 'month').set('date', 1))
    )
  }

  const onNextMonth = () => {
    changeKeyOfCalendarContent(() =>
      setCurrentDate(currentDate.add(1, 'month').set('date', 1))
    )
  }

  const monthName = currentDate.locale(lang).format('MMMM YYYY')

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

    return (
      current &&
      (from
        ? current.isBefore(from, 'day') // Disable dates before `fromDate` but allow today
        : current.isBefore(today, 'day')) // Disable dates before today
    )
  }

  return (
    <Calendar
      headerRender={customHeader}
      value={currentDate.locale(lang)}
      className={cn(
        `customCalendar custom-shadow animate-calendarDropdown`,
        className,
        !currentDate.isSame(date, 'month') && 'not-current-month',
        date && !fromDate && 'selected-from-date',
        fromDate && date && 'selected-to-date',
        fromDate && 'disabled-from-date'
      )}
      locale={lang === 'ro' ? roRO : ruRU}
      onChange={handleChange}
      onPanelChange={(e) => console.log(e)}
      fullscreen={false}
      disabledDate={disabledDates}
    />
  )
}
