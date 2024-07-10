import React, { useEffect, useState } from 'react'
import { Button, Drawer, Input, notification, DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import PhoneInput from 'react-phone-input-2'
import PassengerAddForm from '@/app/(crm)/admin/tickets/components/passengersAddForm'
import axs from '@/lib/axios'
import { getPassengerAge } from '@/lib/utils'
import 'react-phone-input-2/lib/style.css'

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

export const PassengersContent = ({
  data,
  updateAction,
}: {
  data: any
  updateAction: any
}) => {
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
        <PassengerFields
          key={passenger.id}
          passenger={passenger}
          index={index}
          updatePassenger={updateAction}
          handleDeletePassenger={handleDeletePassenger}
          api={api}
        />
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

interface IPassengerFields {
  passenger: IPassenger
  index: number
  // eslint-disable-next-line no-unused-vars
  handleDeletePassenger: (id: number) => void
  updatePassenger: any
  api: any
}

const PassengerFields = ({
  passenger,
  index,
  handleDeletePassenger,
  updatePassenger,
  api,
}: IPassengerFields) => {
  const [editable, setEditable] = useState(false)
  const [passengerData, setPassengerData] = useState({} as IPassenger)
  const { Option } = Select

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      gender: '',
      date_of_birth: dayjs().format('DD.MM.YYYY'),
      phone: '',
      email: '',
    },
    onSubmit: () => {
      handleUpdatePassenger()
    },
  })

  useEffect(() => {
    setPassengerData(passenger)
    formik.setValues({
      first_name: passenger.first_name,
      last_name: passenger.last_name,
      email: passenger.email,
      phone: passenger.phone,
      gender: passenger.gender,
      date_of_birth: passenger.date_of_birth,
    })

    return () => {
      setPassengerData({} as IPassenger)
      formik.setValues({
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: dayjs().format('DD.MM.YYYY'),
        phone: '',
        email: '',
      })
    }
  }, [])

  const handleUpdatePassenger = () => {
    updatePassenger({
      saleId: passengerData.sale_id,
      passengerId: passengerData.id,
      passenger: { ...passengerData, ...formik.values },
    })
    setEditable(false)
    api.success({
      message: 'Success',
      description: 'Pasagerul a fost actualizat cu succes',
      placement: 'bottomRight',
      duration: 3,
      closable: true,
    })
  }

  return (
    <div key={passengerData.id} className="mb-4 text-white">
      <h2 className="rounded-lg bg-brand-blue p-4 text-lg font-bold">
        {index + 1}. {passengerData.first_name} {passengerData.last_name} (
        {getPassengerAge(passengerData.date_of_birth)})
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        className="mt-2 flex w-1/2 flex-col gap-2 rounded-lg bg-white p-4 text-black"
      >
        <div className="flex items-center">
          <p className=" w-40 font-medium">Nume:</p>
          <Input
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            disabled={!editable}
            className="disabled:text-black"
          />
        </div>
        <div className="flex items-center">
          <p className=" w-40 font-medium">Prenume:</p>
          <Input
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            disabled={!editable}
            className="disabled:text-black"
          />
        </div>
        <div className="flex items-center">
          <p className=" w-40 font-medium">Data nașterii:</p>
          <DatePicker
            className="w-full disabled:text-black"
            format="DD.MM.YYYY"
            disabled={!editable}
            value={dayjs(formik.values.date_of_birth)}
            onChange={(d) => {
              formik.setFieldValue(
                'date_of_birth',
                d ? d.format('DD.MM.YYYY') : ''
              )
              return d
            }}
          />
        </div>
        <div className="flex items-center">
          <p className=" w-40 font-medium">Telefon:</p>
          <PhoneInput
            inputStyle={{
              width: '100%',
              border: '1px solid #E7E7E7',
            }}
            country={'md'}
            value={formik.values.phone}
            disabled={!editable}
            inputProps={{
              autoFocus: true,
            }}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center">
          <p className=" w-40 font-medium">Gen:</p>
          <Select
            className="w-full disabled:text-black"
            value={formik.values.gender}
            disabled={!editable}
            onChange={(value) => formik.setFieldValue('gender', value)}
          >
            <Option value="M">Masculin</Option>
            <Option value="F">Feminin</Option>
          </Select>
        </div>
        <div className="flex items-center">
          <p className=" w-40 font-medium">Email:</p>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={!editable}
            className="disabled:text-black"
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="primary"
            danger
            className="mt-4 w-40"
            onClick={() => handleDeletePassenger(passengerData.id)}
          >
            Șterge pasagerul
          </Button>
          {editable ? (
            <div className="flex gap-4">
              <Button
                type="default"
                className="mt-4 w-40"
                onClick={() => setEditable(false)}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="mt-4 w-40"
                onClick={() => handleUpdatePassenger()}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              type="primary"
              className="mt-4 w-40"
              onClick={() => setEditable(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
