import React, { useEffect, useState } from 'react'
import {
  Button,
  Drawer,
  Input,
  notification,
  DatePicker,
  Select,
  Popconfirm,
} from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import PhoneInput from 'react-phone-input-2'
import PassengerAddForm from '@/app/(crm)/admin/tickets/components/passengersAddForm'
import axs from '@/lib/axios'
import { getPassengerAge, handleCalendarKeyDown } from '@/lib/utils'
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
  baggage: any
  date_of_birth: any
  passport_issued_at: any
  passport_expires_at: any
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
  const [passengers, setPassengers] = useState<IPassenger[]>([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axs
      .get('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
      .then((res) => {
        setCountries(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
      {passengers?.map((passenger, index) => (
        <PassengerFields
          key={passenger.id}
          passenger={passenger}
          index={index}
          updatePassenger={updateAction}
          handleDeletePassenger={handleDeletePassenger}
          api={api}
          countries={countries}
          passengersCount={passengers.length}
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
  countries: any
  passengersCount: number
}

const PassengerFields = ({
  passenger,
  index,
  handleDeletePassenger,
  updatePassenger,
  api,
  countries,
  passengersCount,
}: IPassengerFields) => {
  const [editable, setEditable] = useState(false)
  const [passengerData, setPassengerData] = useState({} as IPassenger)
  const { Option } = Select

  const formik = useFormik({
    initialValues: passengerObj as any,
    onSubmit: () => {
      handleUpdatePassenger()
    },
  })

  useEffect(() => {
    setPassengerData(passenger)
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      date_of_birth,
      passport_expires_at,
      passport_issued_at,
      passport_number,
      passport_country,
    } = passenger
    formik.setValues({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      gender: gender,
      date_of_birth: dayjs(date_of_birth),
      passport_expires_at: dayjs(passport_expires_at),
      passport_issued_at: dayjs(passport_issued_at),
      passport_number: passport_number,
      passport_country: passport_country,
    })

    return () => {
      setPassengerData({} as IPassenger)
      formik.setValues(passengerObj)
    }
  }, [])

  const handleUpdatePassenger = () => {
    updatePassenger({
      saleId: passengerData.sale_id,
      passengerId: passengerData.id,
      passenger: { ...passengerData, ...formik.values },
    })
    setPassengerData({ ...passengerData, ...formik.values })
    setEditable(false)
    api.success({
      message: 'Success',
      description: 'Pasagerul a fost actualizat cu succes',
      placement: 'bottomRight',
      duration: 3,
      closable: true,
    })
  }

  const countriesOptions = countries.map((country: any) => ({
    label: (
      <span className="flex items-center gap-2">
        <img className="h-3 w-4" src={country.flags.png} alt="icon" />{' '}
        {country.name.common} ({country.cca2})
      </span>
    ),
    value: country.cca2,
  }))

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
          <p className=" w-80 font-medium">Nume:</p>
          <Input
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            disabled={!editable}
            className="disabled:text-black"
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Prenume:</p>
          <Input
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            disabled={!editable}
            className="disabled:text-black"
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Data nașterii:</p>
          <DatePicker
            className="w-full disabled:text-black"
            format="DD.MM.YYYY"
            disabled={!editable}
            allowClear={true}
            onKeyDown={handleCalendarKeyDown}
            value={formik.values.date_of_birth}
            onChange={(d) => formik.setFieldValue('date_of_birth', d)}
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Telefon:</p>
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
            onChange={(p) => formik.setFieldValue('phone', p)}
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Gen:</p>
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
          <p className=" w-80 font-medium">Email:</p>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={!editable}
            className="disabled:text-black"
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Data eliberării pașaportului:</p>
          <DatePicker
            className="w-full"
            value={formik.values.passport_issued_at}
            format="DD.MM.YYYY"
            disabled={!editable}
            allowClear={true}
            onKeyDown={handleCalendarKeyDown}
            onChange={(d) => formik.setFieldValue('passport_issued_at', d)}
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Data expirării pașaportului:</p>
          <DatePicker
            className="w-full disabled:text-black"
            value={formik.values.passport_expires_at}
            format="DD.MM.YYYY"
            allowClear={true}
            disabled={!editable}
            onKeyDown={handleCalendarKeyDown}
            onChange={(d) => formik.setFieldValue('passport_expires_at', d)}
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Numărul pașaportului:</p>
          <Input
            name="passport_number"
            value={formik.values.passport_number}
            onChange={formik.handleChange}
            disabled={!editable}
            className="disabled:text-black"
          />
        </div>
        <div className="flex items-center">
          <p className=" w-80 font-medium">Numărul pașaportului:</p>
          <Select
            className="w-full disabled:text-black"
            options={countriesOptions}
            disabled={!editable}
            onChange={(value) =>
              formik.setFieldValue('passport_country', value)
            }
            value={formik.values.passport_country}
            showSearch
          />
        </div>
        <div className="flex gap-4">
          {passengersCount > 1 && (
            <Popconfirm
              title="Ești sigur că vrei să ștergi pasagerul?"
              onConfirm={() => handleDeletePassenger(passengerData.id)}
              okText="Da"
              cancelText="Nu"
            >
              <Button type="primary" danger className="mt-4 w-40">
                Șterge pasagerul
              </Button>
            </Popconfirm>
          )}
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

const passengerObj = {
  first_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  phone: '',
  email: '',
  passport_country: '',
  passport_expires_at: '',
  passport_issued_at: '',
  passport_number: '',
}
