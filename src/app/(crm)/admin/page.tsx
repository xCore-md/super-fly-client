'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Tabs, TabsProps, DatePicker } from 'antd'
import chart from '@/assets/img/crm/chart.svg'
import crossDrag from '@/assets/img/crm/cross-drag.svg'
import dollar from '@/assets/img/crm/dollar.svg'
import drag from '@/assets/img/crm/drag.svg'
import folderSwitch from '@/assets/img/crm/folder-switch.svg'
import messages from '@/assets/img/crm/messages.svg'
import userFilter from '@/assets/img/crm/user-filter.svg'
import users from '@/assets/img/crm/users.svg'
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

const KanbanSection = () => {
  const sections = [
    { title: 'Now', circleColor: 'bg-green-500' },
    { title: 'Proces', circleColor: 'bg-yellow-500' },
    { title: 'Așteptare', circleColor: 'bg-red-500' },
    { title: 'To Pay', circleColor: 'bg-blue-500' },
  ]
  return (
    <div className="mt-8 grid grid-cols-4 gap-4">
      {sections.map(({ title, circleColor }, index) => (
        <div
          key={index}
          className="custom-shadow relative cursor-pointer overflow-hidden rounded-lg border bg-white px-2 py-3"
        >
          <span
            className={`absolute -left-3 -top-3 h-10 w-10 rounded-full ${circleColor}`}
          ></span>
          <div className="flex">
            <span className="w-full text-center text-lg font-light text-gray-600">
              {title}
            </span>
            <Image src={drag} width={20} height={20} alt="icon" />
          </div>
          <hr className="mb-3 mt-2  border-t-[1px]" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="rounded-lg border bg-gray-100 p-2" key={index}>
                <span className="flex w-full items-center justify-between">
                  <span className="text-xs font-light">RMO - MXP</span>
                  <span className="rounded-lg bg-red-500 px-2 py-1 text-xs font-light text-white">
                    2d
                  </span>
                </span>
                <span className="my-2 flex text-sm font-semibold text-black">
                  +373 64 456 654
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Image src={users} width={16} height={16} alt="icon" />
                    <span className="text-xs text-black">1</span>
                  </span>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <span key={index} className="flex items-center gap-1">
                      <Image src={messages} width={16} height={16} alt="icon" />
                      <span className="text-xs text-black">2</span>
                    </span>
                  ))}
                  <span className="flex items-center gap-1">
                    <Image src={crossDrag} width={16} height={16} alt="icon" />
                    <span className="text-xs text-black">3</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Admin() {
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    setCalendarOpen(true)
  }, [])

  return (
    <section>
      <div className="fixed left-0 top-0 z-0 h-1/2 w-full bg-brand-blue">
        <Image className="h-full w-full object-cover" src={plane} alt="logo" />
      </div>
      <div className="flex w-full pt-10">
        <div className="z-10 w-full">
          <h4 className="mb-8 text-4xl font-light text-white">Statistica</h4>
          <div className="flex w-full gap-8">
            <div className="w-full">
              <Tabs
                className="home-tabs w-full text-white"
                defaultActiveKey="1"
                items={items}
              />
              <KanbanSection />
            </div>
            <div>
              <div className="min-w-[290px]">
                <div className="flex w-full flex-col gap-8">
                  <DatePicker
                    className="statistic-picker z-10 w-full"
                    open={calendarOpen}
                  />
                  <div className=" custom-shadow mt-[350px] min-h-[329px] rounded-lg border bg-white p-6">
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
