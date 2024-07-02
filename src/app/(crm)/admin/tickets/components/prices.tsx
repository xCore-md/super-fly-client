import { useCallback, useEffect, useState } from 'react'
import { Button, Input } from 'antd'

export const PricesContent = ({ data, updateAction }) => {
  const [passengersState, setPassengersState] = useState(data.passengers)

  const { passengers } = data

  useEffect(() => {
    setPassengersState(passengers)
  }, [passengers])

  const handleChange = useCallback(
    (e: any, index: any) => {
      const { name, value } = e.target
      const newPassengers = [...passengersState]
      newPassengers[index][name] = value
      setPassengersState(newPassengers)
    },
    [passengersState]
  )
  return (
    <div className="min-h-[800px] max-w-[680px] space-y-4">
      {passengersState.map((p: any, index: number) => (
        <div className="flex flex-col rounded-lg border p-4" key={index}>
          <h2 className="text-lg font-bold">
            {p.first_name} {p.last_name}
          </h2>
          <div className="mt-2 flex space-x-4">
            <div>
              <label>Prețul la companie</label>
              <Input
                name="price_cost"
                defaultValue={p.price_cost}
                onChange={(e) => handleChange(e, index)}
                className="mt-1"
              />
            </div>
            <div className="">
              <label>Prețul cu care sa vândut</label>
              <Input
                name="price_sold"
                defaultValue={p.price_sold}
                onChange={(e) => handleChange(e, index)}
                className="mt-1"
              />
            </div>
            <Button
              onClick={() =>
                updateAction({
                  saleId: data.id,
                  passengerId: p.id,
                  passenger: p,
                })
              }
              type="primary"
              className="ml-4 mt-4 self-end bg-brand-green"
            >
              Salvează
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
