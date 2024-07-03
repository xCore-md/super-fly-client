import React, { useState } from 'react'
import { Button, notification } from 'antd'
import { format } from 'date-fns'
import PassengerAddForm from '@/app/(crm)/admin/tickets/components/passengersAddForm'
import axs from '@/lib/axios'

interface IPassenger {
  id: number
  first_name: string
  last_name: string
  gender: 'M' | 'F'
  phone: string
  email: string
  passport: string | null
  price_sold: number | null
  price_cost: number | null
  bag_10kg: boolean
  bag_20kg: boolean
  date_of_birth: string
  passport_issued_at: string
  passport_expires_at: string
  passport_series: string
  passport_number: string
  passport_country: string
  reservation_code: string
  called_72_hours_tur: boolean
  called_72_hours_retur: boolean
  called_24_hours_tur: boolean
  called_24_hours_retur: boolean
  called_after_tur: boolean
  called_after_retur: boolean
  check_in_tur: boolean
  check_in_retur: boolean
  sale_id: number
  created_at: string
  updated_at: string
}

export const PassengersContent = ({ data }) => {
  const [passengers, setPassengers] = useState<IPassenger[]>(data.passengers)

  const [showForm, setShowForm] = useState(false)
  const [api, context] = notification.useNotification()

  const closeModal = () => setShowForm(false)
  const onSubmit = (values: any) => {
    const newPassenger = {
      sale_id: data.id,
      passenger: values.passengers[0],
    }

    axs
      .post(
        `/crm/sales/${newPassenger.sale_id}/passengers/create`,
        newPassenger.passenger
      )
      .then((res) => {
        api.success({
          message: 'Pasagerul a fost adăugat cu succes',
          description: res.data.message,
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
        refetchPassengers()
        setShowForm(false)
      })
      .catch((err) => {
        api.error({
          message: 'Nu s-a putut adăuga pasagerul',
          description: err.response.data.message,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
        console.error(err)
      })
  }

  const handleDeletePassenger = (id: number) => {
    axs
      .delete(`/crm/sales/${data.id}/passengers/${id}/delete`)
      .then((res) => {
        api.success({
          message: 'Pasagerul a fost șters cu succes',
          description: res.data.message,
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
        refetchPassengers()
      })
      .catch((err) => {
        api.error({
          message: 'Nu s-a putut șterge pasagerul',
          description: err.response.data.message,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
        console.error(err)
      })
  }

  const refetchPassengers = () => {
    axs
      .get(`/crm/sales/${data.id}/show`)
      .then((res) => {
        api.success({
          message: 'Lista de pasageri a fost actualizată cu succes',
          description: res.data.message,
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
        setPassengers(res.data.passengers)
      })
      .catch((err) => {
        api.error({
          message: 'Lista de pasageri nu a putut fi actualizată cu succes',
          description: err.response.data.message,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
        console.error(err)
      })
  }

  return (
    <div className="flex min-h-[800px] flex-col">
      {passengers.map((passenger, index) => (
        <div key={passenger.id} className="mb-4 text-white">
          <h2 className="rounded-lg bg-brand-blue p-4 text-lg font-bold">
            {index + 1}. {passenger.first_name} {passenger.last_name} (Adult)
          </h2>
          <div className="mt-2 rounded-lg bg-white p-4 text-black">
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Nume:</span>
              <span className="w-[120px]">{passenger.last_name}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Prenume:</span>
              <span className="w-[120px]">{passenger.first_name}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Data nașterii:</span>
              <span className="w-[120px]">
                {format(new Date(passenger.date_of_birth), 'dd.MM.yyyy')}
              </span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Telefon:</span>
              <span className="w-[120px]">{passenger.phone}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Gen:</span>
              <span className="w-[120px]">{passenger.gender}</span>
            </p>
            <p className="flex max-w-72 justify-between">
              <span className="font-medium">Email:</span>
              <span className="w-[120px]">{passenger.email}</span>
            </p>
            <Button
              type="primary"
              danger
              className="mt-4"
              onClick={() => handleDeletePassenger(passenger.id)}
            >
              Șterge pasagerul {passenger.first_name} {passenger.last_name}
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="primary"
        className="ml-auto rounded-full bg-brand-green hover:bg-green-600"
        onClick={() => setShowForm(true)}
      >
        Adaugă Pasager +
      </Button>

      {context}
      {showForm && (
        <PassengerAddForm onSubmit={onSubmit} closeModal={closeModal} />
      )}
    </div>
  )
}
