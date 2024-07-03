import { useState } from 'react'
import { Checkbox, notification } from 'antd'
import {
  IPassenger,
  refetchPassengers,
} from '@/app/(crm)/admin/tickets/components/passengers'
import axs from '@/lib/axios'

export const BaggageComponent = ({ data }) => {
  const [api, context] = notification.useNotification()

  const [passengers, setPassengers] = useState<IPassenger[]>(data.passengers)

  const renderBaggage = (passenger) => {
    return (
      <div>
        <p className="text-gray-700">
          Bagaj de cală, masa de 20KG:{' '}
          {passenger.bag_20kg ? (
            <span className="text-green-600">Da</span>
          ) : (
            <span className="text-orange-400">Nu</span>
          )}
        </p>
        <p className="text-gray-700">
          Bagaj de mână, masa de 8KG:{' '}
          {passenger.bag_10kg ? (
            <span className="text-green-600">Da</span>
          ) : (
            <span className="text-orange-400">Nu</span>
          )}
        </p>
      </div>
    )
  }

  const updateBaggage = (e, id, baggageType: 'bag_20kg' | 'bag_10kg') => {
    const passenger = passengers.find((p) => p.id === id)
    const newPassenger = {
      ...passenger,
      [baggageType]: !passenger[baggageType],
    }

    axs
      .put(`/crm/sales/${data.id}/passengers/${id}/update`, newPassenger)
      .then((res) => {
        api.success({
          message: 'Bagajul a fost actualizat cu succes',
          description: res.data.message,
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
        refetchPassengers({
          salesId: data.id,
          setPassengers,
          api,
        })
      })
      .catch((err) => {
        api.error({
          message: 'Bagajul nu a putut fi actualizat cu succes',
          description: err.response.data.message,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
        console.error(err)
      })
  }

  return (
    <div className="min-h-[800px]">
      {context}
      {passengers.map((passenger) => (
        <div
          key={passenger.id}
          className="mb-4 flex justify-between rounded-lg border bg-white p-4 shadow-sm"
        >
          <div>
            <h2 className="text-lg font-bold">
              {passenger.first_name} {passenger.last_name}
            </h2>
            {renderBaggage(passenger)}
          </div>
          {/*todo: change the red color*/}

          <div>
            <Checkbox
              checked={passenger.bag_20kg}
              onChange={(e) => updateBaggage(e, passenger.id, 'bag_20kg')}
            >
              Bagaj de cală, masa de 20KG
            </Checkbox>

            <Checkbox
              checked={passenger.bag_10kg}
              onChange={(e) => updateBaggage(e, passenger.id, 'bag_10kg')}
            >
              Bagaj de mână, masa de 8KG
            </Checkbox>
          </div>
        </div>
      ))}
    </div>
  )
}
