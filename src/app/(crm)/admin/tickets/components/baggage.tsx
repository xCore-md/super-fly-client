import { useCallback, useEffect, useState } from 'react'
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, Input, notification } from 'antd'
import { IPassenger } from '@/app/(crm)/admin/tickets/components/passengers'
import { baggages } from '@/data/data'
import axs from '@/lib/axios'

export const BaggageComponent = ({
  data,
}: {
  data: any
  updateAction: any
}) => {
  const [api, context] = notification.useNotification()
  const [passengers, setPassengers] = useState([])

  useEffect(() => {
    setPassengers(data.passengers)
  }, [data])

  const handleUpdateBaggage = (passenger: any, baggage: any) => {
    axs.put(
      `/crm/sales/${data.id}/passengers/${passenger.id}/baggage/${baggage.id}/update`,
      baggage
    )
    api.success({
      message: 'Success',
      description: 'Baggage updated successfully',
      placement: 'bottomRight',
      duration: 3,
      closable: true,
    })
  }

  const handleAddBaggage = (passenger: any, baggage: any) => {
    axs
      .post(
        `/crm/sales/${data.id}/passengers/${passenger.id}/baggage/add`,
        baggage
      )
      .then((res) => {
        setPassengers((prev: any) => {
          const newPassengers = prev.map((p: any) => {
            if (p.id === passenger.id) {
              return {
                ...p,
                baggage: [...p.baggage, res.data],
              }
            }
            return p
          })
          return newPassengers
        })
      })
    api.success({
      message: 'Success',
      description: 'Baggage added successfully',
      placement: 'bottomRight',
      duration: 3,
      closable: true,
    })
  }

  const handleDeleteBaggage = (passenger: any, baggage: any) => {
    axs.delete(
      `/crm/sales/${data.id}/passengers/${passenger.id}/baggage/${baggage.id}/delete`
    )
    api.success({
      message: 'Success',
      description: 'Baggage deleted successfully',
      placement: 'bottomRight',
      duration: 3,
      closable: true,
    })
  }

  return (
    <div className="min-h-[800px]">
      {context}
      {passengers?.map((passenger: IPassenger, index: number) => (
        <PassengerRow
          passenger={passenger}
          key={index}
          updateAction={handleUpdateBaggage}
          addAction={handleAddBaggage}
          deleteAction={handleDeleteBaggage}
          updatePassengers={setPassengers}
        />
      ))}
    </div>
  )
}

const PassengerRow = (props: any) => {
  const { passenger } = props
  return (
    <div className="mb-4 flex justify-between rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="w-1/3 text-lg font-bold">
        {passenger.first_name} {passenger.last_name}
      </h2>
      <div className="w-2/3">
        <h4 className="mb-4 text-sm font-normal uppercase">Add baggage</h4>
        <div>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {baggages.map((baggage: any, i: number) => (
              <BaggageToAddField {...props} key={i} baggage={baggage} />
            ))}
          </div>
        </div>
        {passenger.baggage.length > 0 && (
          <div>
            <Divider />
            <h4 className="mb-4 text-sm font-normal uppercase">
              Update baggage
            </h4>
            <div className="flex max-w-96 flex-col gap-4">
              {passenger.baggage.map((baggage: any, i: number) => (
                <BaggageForUpdateField {...props} key={i} baggage={baggage} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const BaggageForUpdateField = (props: any) => {
  const { baggage, deleteAction, passenger, updateAction, updatePassengers } =
    props
  const [bag, setBag] = useState(baggage)

  const handleUpdate = useCallback(
    (bag: any) => {
      updateAction(passenger, bag)
      updatePassengers((prev: any) => {
        const newPassengers = prev.map((p: any) => {
          if (p.id === passenger.id) {
            return {
              ...p,
              baggage: p.baggage.map((b: any) => {
                if (b.id === bag.id) {
                  return bag
                }
                return b
              }),
            }
          }
          return p
        })
        return newPassengers
      })
    },
    [updateAction, passenger, updatePassengers]
  )

  const handleDelete = useCallback(() => {
    deleteAction(passenger, bag)
    updatePassengers((prev: any) => {
      const newPassengers = prev.map((p: any) => {
        if (p.id === passenger.id) {
          return {
            ...p,
            baggage: p.baggage.filter((b: any) => b.id !== bag.id),
          }
        }
        return p
      })
      return newPassengers
    })
  }, [deleteAction, passenger, bag, updatePassengers])

  const increase = useCallback(() => {
    setBag({ ...bag, count: bag.count + 1 })
    handleUpdate({ ...bag, count: bag.count + 1 })
  }, [bag, handleUpdate])

  const decrease = useCallback(() => {
    if (bag.count === 0) return
    setBag({ ...bag, count: bag.count - 1 })
    handleUpdate({ ...bag, count: bag.count - 1 })
  }, [bag, handleUpdate])

  return (
    <div className="flex gap-2">
      <Button onClick={handleDelete} danger icon={<DeleteOutlined />} />
      <Button onClick={decrease}>-</Button>
      <Input
        key={baggage.type}
        type="number"
        className="pointer-events-none w-auto"
        addonBefore={baggage.type}
        value={bag.count}
      />
      <Button onClick={increase}>+</Button>
    </div>
  )
}

const BaggageToAddField = (props: any) => {
  const { baggage, passenger, addAction } = props

  const [bag, setBag] = useState(baggage)

  const handleChange = useCallback(
    (e: any) => {
      if (e.target.value < 0) return
      setBag({ ...bag, count: e.target.value })
    },
    [bag]
  )

  const handleAddBaggage = useCallback(() => {
    addAction(passenger, bag)
  }, [addAction, bag, passenger])

  return (
    <div className="flex gap-2">
      <Input
        key={baggage.type}
        type="number"
        className="w-auto"
        addonBefore={baggage.type}
        value={bag.count}
        onChange={handleChange}
      />
      <Button
        disabled={Number(bag.count) === 0}
        onClick={handleAddBaggage}
        icon={<CheckOutlined />}
      ></Button>
    </div>
  )
}
