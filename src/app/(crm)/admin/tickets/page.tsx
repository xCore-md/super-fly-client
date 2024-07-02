'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Badge, Table } from 'antd'
import dayjs from 'dayjs'
import { TicketsInfoModal } from '@/app/(crm)/admin/tickets/tickets-info-modal'
import { comapnies } from '@/data/data'
import axs from '@/lib/axios'

export default function TicketsPage() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const storage = localStorage.getItem('userData')
    const token = storage ? JSON.parse(storage).token : ''

    axs
      .get('/crm/sales', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        setData(res.data.data)
      })
  }, [])

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <Table
        pagination={false}
        dataSource={data}
        rowKey={(record) => record.created_at}
        columns={columns}
        onRow={() => ({
          className: 'cursor-pointer',
          onClick: () => {
            setShowModal(true)
          },
        })}
      />
      <TicketsInfoModal setShowModal={setShowModal} showModal={showModal} />
    </div>
  )
}

const columns = [
  {
    title: 'Compania',
    dataIndex: 'company',
    key: 'company',
    render: (text: string, record: any) => (
      <div className="flex items-center">
        {companyLogo(record.airline) ? (
          <Image
            src={companyLogo(record.airline)}
            alt="image"
            className="mr-2 w-24"
          />
        ) : (
          <span className="mr-2 w-24">{record.airline}</span>
        )}
      </div>
    ),
  },
  {
    title: 'Date Zbor',
    dataIndex: 'departure',
    key: 'departure',
    render: (text: string, record: any) => (
      <div className="text-base font-light">
        <div>
          {record.fly_from_city} -
          <span className="pl-1 font-medium">
            {dayjs(record.date_from).format('DD.MM.YYYY HH:mm')}
          </span>
        </div>
        <div>
          {record.fly_to_city} -
          <span className="pl-1 font-medium">
            {dayjs(record.date_to).format('DD.MM.YYYY HH:mm')}
          </span>
        </div>
      </div>
    ),
  },
  {
    title: 'Tip Zbor',
    dataIndex: 'type',
    key: 'type',
    render: (text: string) => (
      <span className=" text-base capitalize">{text}</span>
    ),
  },
  {
    title: 'Date Pasager',
    dataIndex: 'passenger',
    key: 'passenger',
    render: (text: string, record: any) => {
      const { passengers } = record

      return (
        <div className="flex items-center">
          <span className="text-base">
            {passengers[0].first_name || 'John'}{' '}
            {passengers[0].last_name || 'Doe'}
          </span>
          {passengers.length > 1 && (
            <Badge
              count={`+${passengers.length - 1}`}
              className="ml-2"
              style={{ backgroundColor: '#1E1267' }}
            />
          )}
        </div>
      )
    },
  },
  {
    title: 'Telefon',
    dataIndex: 'phone',
    key: 'phone',
    render: (text: string, record: any) => (
      <span className="text-base">{record.passengers[0].phone}</span>
    ),
  },
]

const companyLogo = (company: string) => {
  return comapnies.find((item) => item.title === company)?.image || ''
}
