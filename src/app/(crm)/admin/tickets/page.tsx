'use client'

import React, { useEffect, useState } from 'react'
import { Badge, Divider, Table } from 'antd'
import dayjs from 'dayjs'
import { TicketsInfoModal } from '@/app/(crm)/admin/tickets/tickets-info-modal'
import axs from '@/lib/axios'
import { source, status, ticket_status } from './components/ticket'

export default function TicketsPage() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState([])
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    const storage = localStorage.getItem('userData')
    const token = storage ? JSON.parse(storage).token : ''

    axs
      .get('/crm/sales', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        setData(res.data.data)
      })
  }

  const closeModal = () => {
    getData()
    setShowModal(false)
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <Table
        pagination={false}
        dataSource={data}
        rowKey={(record) => record.id}
        columns={columns}
        onRow={(row) => ({
          className: 'cursor-pointer',
          onClick: () => {
            setShowModal(true)
            setModalData(row)
          },
        })}
      />
      <TicketsInfoModal
        closeModal={closeModal}
        showModal={showModal}
        data={modalData}
        onTabChange={getData}
      />
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
        <img
          alt="airline"
          src={`https://images.kiwi.com/airlines/128x128/${JSON.parse(record.extra).airlines[0]}.png`}
          className="w-12  lg:w-24"
        />
      </div>
    ),
  },
  {
    title: 'Date Zbor',
    dataIndex: 'date_from',
    key: 'date_from',
    sorter: (a: any, b: any) =>
      dayjs(a.date_from).unix() - dayjs(b.date_from).unix(),
    render: (text: string, record: any) => (
      <div>
        <div>
          <p className="text-sm font-light uppercase">{record.fly_from_city}</p>
          <p className="text-sm font-medium">
            {dayjs(record.date_from).format('DD.MM.YYYY HH:mm')}
          </p>
        </div>
        <Divider className="my-2" />
        <div>
          <p className="text-sm font-light uppercase">{record.fly_to_city}</p>
          <p className="text-sm font-medium">
            {dayjs(record.date_to).format('DD.MM.YYYY HH:mm')}
          </p>
        </div>
      </div>
    ),
    width: '12%',
  },
  {
    title: 'Tip Zbor',
    dataIndex: 'type',
    key: 'type',
    render: (text: string) => (
      <span className="text-sm font-medium uppercase">{text}</span>
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
            {passengers[0]?.first_name || 'John'}{' '}
            {passengers[0]?.last_name || 'Doe'}
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
    width: '20%',
  },

  {
    title: 'Ticket status',
    dataIndex: 'ticket_status',
    key: 'ticket_status',
    filterSearch: true,
    filters: Object.keys(ticket_status).map((key) => ({
      text: ticket_status[key],
      value: key,
    })),
    onFilter: (value: any, record: any) =>
      record.ticket_status.includes(value as string),
    render: (text: string) => (
      <span className="text-sm font-medium uppercase">
        {ticket_status[text]}
      </span>
    ),
    width: '12%',
  },
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
    filterSearch: true,
    filters: Object.keys(source).map((key) => ({
      text: source[key],
      value: key,
    })),
    onFilter: (value: any, record: any) =>
      record.source.includes(value as string),
    render: (text: string) => (
      <span className="text-sm font-medium uppercase">{source[text]}</span>
    ),
    width: '12%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filterSearch: true,
    filters: Object.keys(status).map((key) => ({
      text: status[key],
      value: key,
    })),
    onFilter: (value: any, record: any) =>
      record.status.includes(value as string),
    render: (text: string) => (
      <span className="text-sm font-medium uppercase">{status[text]}</span>
    ),
  },
  {
    title: 'Telefon',
    dataIndex: 'phone',
    key: 'phone',
    render: (text: string, record: any) => (
      <span className="text-base">{record.passengers[0]?.phone}</span>
    ),
    width: '15%',
  },
]
