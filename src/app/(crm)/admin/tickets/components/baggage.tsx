import { Button } from 'antd'

interface Baggage {
  id: number
  name: string
  handBaggage: string
  checkedBaggage: string
}

const baggageList: Baggage[] = [
  {
    id: 1,
    name: 'John Doe',
    handBaggage: 'Bagaj de mână, masa de 8KG',
    checkedBaggage: 'Bagaj de cală, masa de 20KG',
  },
  {
    id: 2,
    name: 'John Doe 2',
    handBaggage: 'Bagaj de mână, masa de 8KG',
    checkedBaggage: 'Bagaj de cală, masa de 20KG',
  },
]

export const BaggageComponent = () => {
  return (
    <div className="min-h-[800px]">
      {baggageList.map((baggage) => (
        <div
          key={baggage.id}
          className="mb-4 flex justify-between rounded-lg border bg-white p-4 shadow-sm"
        >
          <div>
            <h2 className="text-lg font-bold">{baggage.name}</h2>
            <p className="text-gray-700">{baggage.handBaggage}</p>
            <p className="text-gray-700">{baggage.checkedBaggage}</p>
          </div>
          {/*todo: change the red color*/}
          <Button
            type="primary"
            danger
            className="mt-4 rounded-full bg-[#F42D2D]"
          >
            Șterge bagajul
          </Button>
        </div>
      ))}
    </div>
  )
}
