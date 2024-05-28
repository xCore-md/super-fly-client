'use client'

import { Button, Input, Modal, Tabs } from 'antd'

const PricesContent = () => {
  return (
    <div className="max-w-[680px] space-y-4">
      <div className="flex flex-col rounded-lg border p-4">
        <h2 className="text-lg font-bold">JOHN DOE</h2>
        <div className="mt-2 flex space-x-4">
          <div>
            <label>Prețul la companie</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <div className="">
            <label>Prețul cu care sa vândut</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <Button type="primary" className="ml-4 mt-4 self-end bg-brand-green">
            Salvează
          </Button>
        </div>
      </div>
      <div className="flex flex-col rounded-lg border p-4">
        <h2 className="text-lg font-bold">JOHN DOE</h2>
        <div className="mt-2 flex space-x-4">
          <div>
            <label>Prețul la companie</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <div>
            <label>Prețul cu care sa vândut</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <Button type="primary" className="mt-4 self-end bg-brand-green">
            Salvează
          </Button>
        </div>
      </div>
    </div>
  )
}

const items = [
  {
    key: '1',
    label: 'Prețuri',
    children: <PricesContent />,
  },
  {
    key: '2',
    label: 'Bilet',
    children: 'Content of Bilet Tab',
  },
  {
    key: '3',
    label: 'Pasageri',
    children: 'Content of Pasageri Tab',
  },
  {
    key: '4',
    label: 'Bagaje',
    children: 'Content of Bagaje Tab',
  },
  {
    key: '5',
    label: 'Rezervări',
    children: 'Content of Rezervări Tab',
  },
]
export const TicketsInfoModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  // eslint-disable-next-line no-unused-vars
  setShowModal: (value: boolean) => void
}) => {
  return (
    <Modal
      title="Basic Modal"
      open={showModal}
      onOk={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
      width={1200}
      footer={null}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  )
}
