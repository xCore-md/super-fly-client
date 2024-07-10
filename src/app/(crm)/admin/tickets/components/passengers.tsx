import React, { useEffect, useState } from 'react'
import { Button, Drawer, notification } from 'antd'
import { format } from 'date-fns'
import PassengerAddForm from '@/app/(crm)/admin/tickets/components/passengersAddForm'
import axs from '@/lib/axios'

export interface IPassenger {
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
export const refetchPassengers = ({
  salesId,
  setPassengers,
  api,
}: {
  salesId: number
  setPassengers: any
  api: any
}) => {
  axs
    .get(`/crm/sales/${salesId}/show`)
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

export const PassengersContent = ({ data }: { data: any }) => {
  const [passengers, setPassengers] = useState<IPassenger[]>(data.passengers)
  useEffect(() => {
    setPassengers(data.passengers)

    return () => {
      setPassengers([])
    }
  }, [data])
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
        refetchPassengers({
          salesId: data.id,
          setPassengers,
          api,
        })
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
        refetchPassengers({
          salesId: data.id,
          setPassengers,
          api,
        })
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

  return (
    <div className="relative flex w-full flex-col pb-12">
      {passengers.map((passenger, index) => (
        <div key={passenger.id} className="mb-4 text-white">
          <h2 className="rounded-lg bg-brand-blue p-4 text-lg font-bold">
            {index + 1}. {passenger.first_name} {passenger.last_name} (Adult)
          </h2>
          <div className="mt-2 flex w-full flex-col gap-2 rounded-lg bg-white p-4 text-black">
            <div className="flex">
              <p className=" w-40 font-medium">Nume:</p>
              <p>{passenger.last_name}</p>
            </div>
            <div className="flex">
              <p className=" w-40 font-medium">Prenume:</p>
              <p>{passenger.first_name}</p>
            </div>
            <div className="flex">
              <p className=" w-40 font-medium">Data nașterii:</p>
              <p>{format(new Date(passenger.date_of_birth), 'dd.MM.yyyy')}</p>
            </div>
            <div className="flex">
              <p className=" w-40 font-medium">Telefon:</p>
              <p>{passenger.phone}</p>
            </div>
            <div className="flex">
              <p className=" w-40 font-medium">Gen:</p>
              <p>{passenger.gender}</p>
            </div>
            <div className="flex">
              <p className=" w-40 font-medium">Email:</p>
              <p>{passenger.email}</p>
            </div>
            <Button
              type="primary"
              danger
              className="mt-4 w-40"
              onClick={() => handleDeletePassenger(passenger.id)}
            >
              Șterge pasagerul
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="primary"
        className="absolute bottom-0 right-0 mb-4 ml-auto mr-4 rounded-full bg-brand-green hover:bg-green-600"
        onClick={() => setShowForm(true)}
      >
        Adaugă Pasager +
      </Button>

      {context}
      <Drawer
        onClose={closeModal}
        open={showForm}
        className="height-[90%]"
        width={600}
      >
        <PassengerAddForm onSubmit={onSubmit} closeModal={closeModal} />
      </Drawer>
    </div>
  )
}
