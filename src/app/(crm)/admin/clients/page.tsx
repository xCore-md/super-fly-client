'use client'

import { useEffect, useState } from 'react'
import { Table } from 'antd'
import dayjs from 'dayjs'
import axs from '@/lib/axios'

export default function ClientsPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    axs
      .get('/crm/passengers')
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [])

  return (
    <div className="mt-2 flex gap-6">
      <Table className="w-full" columns={columns(data)} dataSource={data} />
    </div>
  )
}

const columns = (data: any) => {
  return [
    {
      title: 'Nume',
      dataIndex: 'first_name',
      key: 'first_name',
      filters: data.map((item: any) => ({
        text: item.first_name,
        value: item.first_name,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.first_name.includes(value as string),
    },
    {
      title: 'Prenume',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Număr de telefon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Afost creat',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => <span>{dayjs(text).format('DD.MM.YYYY')}</span>,
      sorter: (a: any, b: any) =>
        dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
      width: '15%',
    },
  ]
}
