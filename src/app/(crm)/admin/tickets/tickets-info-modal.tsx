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
interface Passenger {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  info1: string
  info2: string
}

const passengers: Passenger[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '04.04.1973',
    phone: '+373 60 654 456',
    info1: 'Info1',
    info2: 'Info2',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '04.04.1973',
    phone: '+373 60 654 456',
    info1: 'Info1',
    info2: 'Info2',
  },
]
const PassengersContent = () => {
  return (
    <div className="flex flex-col p-6">
      {passengers.map((passenger, index) => (
        <div key={passenger.id} className="mb-4 text-white">
          <h2 className="rounded-lg bg-brand-blue p-4 text-lg font-bold">
            {index + 1}. {passenger.firstName} {passenger.lastName} (Adult)
          </h2>
          <div className="mt-2 rounded-lg bg-white p-4 text-black">
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Nume:</span>
              <span className="w-[120px]">{passenger.lastName}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Prenume:</span>
              <span className="w-[120px]">{passenger.firstName}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Data nașterii:</span>
              <span className="w-[120px]">{passenger.dateOfBirth}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Telefon:</span>
              <span className="w-[120px]">{passenger.phone}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Info1:</span>
              <span className="w-[120px]">{passenger.info1}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Info2:</span>
              <span className="w-[120px]">{passenger.info2}</span>
            </p>
            <Button type="primary" danger className="mt-4">
              Șterge pasagerul {passenger.firstName} {passenger.lastName}
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="primary"
        className="ml-auto rounded-full bg-brand-green hover:bg-green-600"
      >
        Adaugă Pasager +
      </Button>
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
    children: <PassengersContent />,
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
