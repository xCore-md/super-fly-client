'use client'
import Image from 'next/image'
import React from 'react'
import { Avatar, Badge, Table } from 'antd'
import flyOne from '@/assets/img/fly-one.png'

export default function TicketsPage() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <Table
        pagination={false}
        dataSource={flightData}
        columns={columns}
        rowKey="flightDate"
      />
    </div>
  )
}

interface FlightData {
  company: string
  companyLogo: string
  departure: string
  destination: string
  flightDate: string
  flightType: string
  passenger: string
  passengerCount: number
  phone: string
  agentPhoto: string
}

const flightData: FlightData[] = [
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    company: 'FlyOne',
    companyLogo: '',
    departure: 'Moldova 12.04.2024 14:05:25',
    destination: 'Italia 12.04.2024 14:05:25',
    flightDate: '12.04.2024 14:05:25',
    flightType: 'Tur - Retur',
    passenger: 'John Doe',
    passengerCount: 2,
    phone: '+373 60 456 654',
    agentPhoto:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  // Add more data as necessary
]

const columns = [
  {
    title: 'Compania',
    dataIndex: 'company',
    key: 'company',
    render: () => (
      <div className="flex items-center">
        <Image src={flyOne} alt="fltone" className="mr-2" />
      </div>
    ),
  },
  {
    title: 'Date Zbor',
    dataIndex: 'departure',
    key: 'departure',
    render: (text: string, record: FlightData) => (
      <div>
        <div>{record.departure}</div>
        <div>{record.destination}</div>
      </div>
    ),
  },
  {
    title: 'Tip Zbor',
    dataIndex: 'flightType',
    key: 'flightType',
  },
  {
    title: 'Date Pasager',
    dataIndex: 'passenger',
    key: 'passenger',
    render: (text: string, record: FlightData) => (
      <div className="flex items-center">
        {text}
        <Badge
          count={`+${record.passengerCount}`}
          className="ml-2"
          style={{ backgroundColor: '#1E1267' }}
        />
      </div>
    ),
  },
  {
    title: 'Telefon',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Agent',
    dataIndex: 'agentPhoto',
    key: 'agentPhoto',
    render: (text: string) => <Avatar src={text} alt="Agent" />,
  },
]
