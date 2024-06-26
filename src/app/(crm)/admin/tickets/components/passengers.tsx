import { Button } from 'antd'

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
export const PassengersContent = () => {
  return (
    <div className="flex min-h-[800px] flex-col">
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
