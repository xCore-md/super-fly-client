'use client'

import { Modal, Tabs } from 'antd'
import axs from '@/lib/axios'
import { BaggageComponent } from './components/baggage'
import { PassengersContent } from './components/passengers'
import { PricesContent } from './components/prices'
import { Ticket } from './components/ticket'

export const TicketsInfoModal = ({
  showModal,
  data,
  onTabChange,
  closeModal,
}: {
  showModal: boolean
  closeModal: () => void
  data: any
  onTabChange: () => void
}) => {
  return (
    <Modal
      key={data.id}
      title="Lead Modal"
      open={showModal}
      onOk={() => closeModal()}
      onCancel={() => closeModal()}
      width={1200}
      footer={null}
    >
      <Tabs
        defaultActiveKey="1"
        items={components(data)}
        className="ticket-tabs"
        onChange={() => onTabChange()}
      />
    </Modal>
  )
}

const components = (data: any) => {
  return items.map((item: any) => {
    const Component = item.children
    return {
      key: item.key,
      label: item.label,
      children: (
        <Component
          data={data}
          updateAction={updatePassenger}
          updateSale={updateSale}
        />
      ),
    }
  })
}

const updatePassenger = (obj: any) => {
  axs
    .put(
      `/crm/sales/${obj.saleId}/passengers/${obj.passengerId}/update`,
      obj.passenger
    )
    .catch((err) => {
      console.log({ err })
    })
}

const updateSale = (obj: any) => {
  axs
    .put(`/crm/sales/${obj.id}/update`, obj)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))

  return Promise.resolve()
}

const items = [
  {
    key: '1',
    label: 'Pasageri',
    children: PassengersContent,
  },
  {
    key: '2',
    label: 'Bagaje',
    children: BaggageComponent,
  },
  {
    key: '3',
    label: 'Prețuri',
    children: PricesContent,
  },
  {
    key: '4',
    label: 'Bilet',
    children: Ticket,
  },
]
