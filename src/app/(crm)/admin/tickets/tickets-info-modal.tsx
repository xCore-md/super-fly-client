'use client'

import { Modal, Tabs } from 'antd'
import { BaggageComponent } from './components/baggage'
import { PassengersContent } from './components/passengers'
import { PricesContent } from './components/prices'
import { Ticket } from './components/ticket'

export const TicketsInfoModal = ({
  showModal,
  setShowModal,
  data,
}: {
  showModal: boolean
  // eslint-disable-next-line no-unused-vars
  setShowModal: (value: boolean) => void
  data: any
}) => {
  return (
    <Modal
      title="Lead Modal"
      open={showModal}
      onOk={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
      width={1200}
      footer={null}
    >
      <Tabs
        defaultActiveKey="1"
        items={components(data)}
        className="ticket-tabs"
      />
    </Modal>
  )
}

const components = (data: any) => {
  return [
    {
      key: '1',
      label: 'Prețuri',
      children: <PricesContent data={data} />,
    },
    {
      key: '2',
      label: 'Bilet',
      children: <Ticket />,
    },
    {
      key: '3',
      label: 'Pasageri',
      children: <PassengersContent />,
    },
    {
      key: '4',
      label: 'Bagaje',
      children: <BaggageComponent />,
    },
    {
      key: '5',
      label: 'Rezervări',
      children: 'Content of Rezervări Tab',
    },
  ]
}
