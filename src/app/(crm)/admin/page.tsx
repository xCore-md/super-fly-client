'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Tabs, TabsProps, DatePicker } from 'antd'
import chart from '@/assets/img/crm/chart.svg'
import dollar from '@/assets/img/crm/dollar.svg'
import folderSwitch from '@/assets/img/crm/folder-switch.svg'
import userFilter from '@/assets/img/crm/user-filter.svg'
import plane from '@/assets/img/plane.png'
import StatisticCard from '@/components/crm/statistic-card'

const StatisticCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cardsData.map((card) => (
        <StatisticCard key={card.title} {...card} />
      ))}
    </div>
  )
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Sumar',
    children: <StatisticCards />,
  },
  {
    key: '2',
    label: 'Luna precedentă',
    children: <StatisticCards />,
  },
  {
    key: '3',
    label: 'Luna curentă',
    children: <StatisticCards />,
  },
]

export default function Admin() {
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    setCalendarOpen(true)
  }, [])

  return (
    <section>
      <div className="absolute left-0 top-0 z-0 h-1/2 w-full bg-brand-blue">
        <Image className="h-full w-full object-cover" src={plane} alt="logo" />
      </div>
      <div className="flex w-full pt-10">
        <div className="z-10 w-full">
          <h4 className="mb-8 text-4xl font-light text-white">Statistica</h4>
          <div className="flex w-full gap-8">
            <div className="w-full">
              <Tabs
                className="w-full text-white"
                defaultActiveKey="1"
                items={items}
              />
            </div>
            <div>
              <div className="min-w-[290px]">
                <div className="flex w-full flex-col gap-8">
                  <DatePicker
                    className="statistic-picker w-full"
                    open={calendarOpen}
                  />
                  <div className=" custom-shadow mt-[350px] min-h-[329px] rounded-lg border p-6">
                    <span className="text-base font-light">Tichete</span>
                    <hr className="my-4 border-t-[1px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const cardsData = [
  {
    title: 'Lead-uri Noi',
    value: 6,
    img: userFilter,
    month: 'Aprilie',
  },
  {
    title: 'Vînzări Noi',
    value: 6,
    img: chart,
    month: 'Aprilie',
  },
  {
    title: 'Profit',
    value: 6,
    img: dollar,
    month: 'Aprilie',
  },
  {
    title: 'Conversie',
    value: '2.3%',
    img: folderSwitch,
    month: 'Aprilie',
  },
  {
    title: 'Lead-uri Noi',
    value: 6,
    img: userFilter,
    month: 'Aprilie',
  },
  {
    title: 'Vînzări Noi',
    value: 6,
    img: chart,
    month: 'Aprilie',
  },
  {
    title: 'Profit',
    value: 6,
    img: dollar,
    month: 'Aprilie',
  },
  {
    title: 'Conversie',
    value: '2.3%',
    img: folderSwitch,
    month: 'Aprilie',
  },
]
