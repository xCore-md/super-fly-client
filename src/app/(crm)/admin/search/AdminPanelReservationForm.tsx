import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  notification,
  Typography,
} from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFlightContext } from '@/context/flight-context'
import { useFlightsContext } from '@/context/flights-context'
import axs from '@/lib/axios'

const { Option } = Select

interface Passenger {
  first_name: string
  last_name: string
  gender: 'M' | 'F' | ''
  phone: string
  email: string
  bag_10kg: number
  bag_20kg: number
  date_of_birth: string
  passport_issued_at: string
  passport_expires_at: string
  passport_series: string
  passport_number: string
  passport_country: string
  reservation_code: string
}

interface FormValues {
  type: 'tur' | 'tur_retur'
  airline: string
  fly_from: string
  fly_to: string
  fly_from_city: string
  fly_to_city: string
  date_from: string
  date_to: string
  date_from_retur?: string
  source: 'online' | 'offline'
  comment: string
  extra: string
  passengers: Passenger[]
}

interface FlightDetails {
  id: string
  flyFrom: string
  flyTo: string
  cityFrom: string
  cityCodeFrom: string
  cityTo: string
  cityCodeTo: string
  countryFrom: {
    code: string
    name: string
  }
  countryTo: {
    code: string
    name: string
  }
  local_departure: string
  utc_departure: string
  local_arrival: string
  utc_arrival: string
  distance: number
  duration: {
    departure: number
    return: number
    total: number
  }
  price: number
  bags_price: {
    [key: string]: number
  }
  availability: {
    seats: number
  }
  airlines: string[]
  route: Array<{
    id: string
    combination_id: string
    flyFrom: string
    flyTo: string
    cityFrom: string
    cityCodeFrom: string
    cityTo: string
    cityCodeTo: string
    local_departure: string
    local_arrival: string
    airline: string
    flight_no: number
  }>
  booking_token: string
  has_airport_change: boolean
}

interface MappedFlight {
  type: 'tur' | 'tur_retur'
  airline: string
  fly_from: string
  fly_to: string
  fly_from_city: string
  fly_to_city: string
  date_from: string
  date_to: string
  date_from_retur?: string
  source: 'online' | 'offline'
  comment: string
}

function mapFlightDetails(searchedFlight: FlightDetails): MappedFlight {
  return {
    type: searchedFlight.route.length > 1 ? 'tur_retur' : 'tur',
    airline: searchedFlight.airlines[0],
    fly_from: searchedFlight.flyFrom,
    fly_to: searchedFlight.flyTo,
    fly_from_city: searchedFlight.cityFrom,
    fly_to_city: searchedFlight.cityTo,
    date_from: searchedFlight.local_departure,
    date_to: searchedFlight.local_arrival,
    source: 'online',
    comment: '',
  }
}

const getInitialValues = (
  selectedFlightOffer: FlightDetails,
  passengers: number
): FormValues => ({
  ...mapFlightDetails(selectedFlightOffer),
  extra: JSON.stringify(selectedFlightOffer),
  passengers: Array.from({ length: passengers }, () => ({
    first_name: '',
    last_name: '',
    gender: '',
    phone: '',
    email: '',
    bag_10kg: 0,
    bag_20kg: 0,
    date_of_birth: '',
    passport_issued_at: '',
    passport_expires_at: '',
    passport_series: '',
    passport_number: '',
    passport_country: '',
    reservation_code: '',
  })),
})

const validationSchema = Yup.object().shape({
  type: Yup.string().oneOf(['tur', 'tur_retur']).required('Tipul este necesar'),
  airline: Yup.string().required('Compania aeriană este necesară'),
  fly_from: Yup.string().required('Aeroportul de plecare este necesar'),
  fly_to: Yup.string().required('Aeroportul de destinație este necesar'),
  fly_from_city: Yup.string().required('Orașul de plecare este necesar'),
  fly_to_city: Yup.string().required('Orașul de destinație este necesar'),
  date_from: Yup.string().required('Data plecării este necesară'),
  date_to: Yup.string().required('Data sosirii este necesară'),
  date_from_retur: Yup.string(),
  source: Yup.string()
    .oneOf(['online', 'offline'])
    .required('Sursa este necesară'),
  comment: Yup.string(),
  extra: Yup.string(),
  passengers: Yup.array()
    .of(
      Yup.object().shape({
        first_name: Yup.string().required('Prenumele este necesar'),
        last_name: Yup.string().required('Numele de familie este necesar'),
        gender: Yup.string().oneOf(['M', 'F']).required('Genul este necesar'),
        phone: Yup.string().required('Telefonul este necesar'),
        email: Yup.string()
          .email('Email-ul este invalid')
          .required('Email-ul este necesar'),
        bag_10kg: Yup.number().oneOf([0, 1]),
        bag_20kg: Yup.number().oneOf([0, 1]),
        date_of_birth: Yup.string().required('Data nașterii este necesară'),
        passport_issued_at: Yup.string().required(
          'Data eliberării pașaportului este necesară'
        ),
        passport_expires_at: Yup.string().required(
          'Data expirării pașaportului este necesară'
        ),
        passport_series: Yup.string().required(
          'Seria pașaportului este necesară'
        ),
        passport_number: Yup.string().required(
          'Numărul pașaportului este necesar'
        ),
        passport_country: Yup.string().required(
          'Țara pașaportului este necesară'
        ),
        reservation_code: Yup.string().required(
          'Codul de rezervare este necesar'
        ),
      })
    )
    .required('Trebuie să aveți cel puțin un pasager')
    .min(1, 'Trebuie să aveți cel puțin un pasager'),
})

interface IAdminPanelReservationForm {
  closeModal: () => void
}

const AdminPanelReservationForm = ({
  closeModal,
}: IAdminPanelReservationForm) => {
  const [api, context] = notification.useNotification()
  const { selectedFlight } = useFlightsContext()
  const { flight } = useFlightContext()
  const router = useRouter()

  const passengers = flight.adults + flight.children + flight.infants

  const formik = useFormik({
    initialValues: getInitialValues(
      selectedFlight as FlightDetails,
      passengers
    ),
    validationSchema,
    validate: (values) => {
      try {
        validationSchema.validateSync(values, { abortEarly: false })
      } catch (e) {
        return e.inner.reduce((errors: any, err: any) => {
          errors[err.path] = err.message
          return errors
        }, {})
      }
      return {}
    },
    onSubmit: (values) => {
      console.log({ values }, 'crm/sales/create')
      axs
        .post('/crm/sales/create', values)
        .then((res) => {
          api.success({
            message: 'Succes',
            description: res.data.message,
            placement: 'bottomRight',
            duration: 3,
            closable: true,
          })
          closeModal()
          router.push('/admin/tickets')
        })
        .catch((err) => {
          api.error({
            message: 'Eroare',
            description: err.response.data.message,
            placement: 'bottomRight',
            duration: 2,
            closable: true,
          })
          console.log(err.response.data)
        })
    },
  })
  const { Title } = Typography
  const { TextArea } = Input

  useEffect(() => {
    return () => {
      formik.resetForm()
    }
  }, [])
  return (
    <Form
      onFinish={formik.handleSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      {context}

      {/* Add more fields as required */}

      {formik.values.passengers.map((_: any, index: number) => (
        <div key={index}>
          <Title level={4} className="mt-4 flex items-center justify-center">
            Pasager {index + 1}
            {index !== 0 && (
              <Button
                shape="circle"
                className="ml-2"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  formik.setFieldValue(
                    'passengers',
                    formik.values.passengers.filter((_, i) => i !== index)
                  )
                }}
              />
            )}
          </Title>
          <Form.Item
            label="Prenume"
            validateStatus={
              formik.errors.passengers?.[index]?.first_name ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.first_name}
          >
            <Input
              name={`passengers[${index}].first_name`}
              value={formik.values.passengers[index].first_name}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Nume de familie"
            validateStatus={
              formik.errors.passengers?.[index]?.last_name ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.last_name}
          >
            <Input
              name={`passengers[${index}].last_name`}
              value={formik.values.passengers[index].last_name}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Gen"
            validateStatus={
              formik.errors.passengers?.[index]?.gender ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.gender}
          >
            <Select
              name={`passengers[${index}].gender`}
              value={formik.values.passengers[index].gender}
              onChange={(value) =>
                formik.setFieldValue(`passengers[${index}].gender`, value)
              }
            >
              <Option value="M">Masculin</Option>
              <Option value="F">Feminin</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Telefon"
            validateStatus={
              formik.errors.passengers?.[index]?.phone ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.phone}
          >
            <Input
              name={`passengers[${index}].phone`}
              value={formik.values.passengers[index].phone}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={
              formik.errors.passengers?.[index]?.email ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.email}
          >
            <Input
              name={`passengers[${index}].email`}
              value={formik.values.passengers[index].email}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Bagaj 10kg"
            validateStatus={
              formik.errors.passengers?.[index]?.bag_10kg ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.bag_10kg}
          >
            <Checkbox
              name={`passengers[${index}].bag_10kg`}
              checked={!!formik.values.passengers[index].bag_10kg}
              onChange={(e) =>
                formik.setFieldValue(
                  `passengers[${index}].bag_10kg`,
                  e.target.checked ? 1 : 0
                )
              }
            />
          </Form.Item>

          <Form.Item
            label="Bagaj 20kg"
            validateStatus={
              formik.errors.passengers?.[index]?.bag_20kg ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.bag_20kg}
          >
            <Checkbox
              name={`passengers[${index}].bag_20kg`}
              checked={!!formik.values.passengers[index].bag_20kg}
              onChange={(e) =>
                formik.setFieldValue(
                  `passengers[${index}].bag_20kg`,
                  e.target.checked ? 1 : 0
                )
              }
            />
          </Form.Item>

          <Form.Item
            label="Data nașterii"
            validateStatus={
              formik.errors.passengers?.[index]?.date_of_birth ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.date_of_birth}
          >
            <DatePicker
              name={`passengers[${index}].date_of_birth`}
              format={(date) => (date ? date.format('DD.MM.YYYY') : date)}
              onChange={(d) => {
                formik.setFieldValue(
                  `passengers[${index}].date_of_birth`,
                  d ? d.format('DD.MM.YYYY') : ''
                )
                console.log(d.format(), d.format('DD.MM.YYYY'))
                return d
              }}
            />
          </Form.Item>

          <Form.Item
            label="Data eliberării pașaportului"
            validateStatus={
              formik.errors.passengers?.[index]?.passport_issued_at
                ? 'error'
                : ''
            }
            help={formik.errors.passengers?.[index]?.passport_issued_at}
          >
            <DatePicker
              name={`passengers[${index}].passport_issued_at`}
              format={(date) => (date ? date.format('DD.MM.YYYY') : date)}
              onChange={(d) => {
                formik.setFieldValue(
                  `passengers[${index}].passport_issued_at`,
                  d ? d.format('DD.MM.YYYY') : ''
                )
                return d
              }}
            />
          </Form.Item>

          <Form.Item
            label="Data expirării pașaportului"
            validateStatus={
              formik.errors.passengers?.[index]?.passport_expires_at
                ? 'error'
                : ''
            }
            help={formik.errors.passengers?.[index]?.passport_expires_at}
          >
            <DatePicker
              name={`passengers[${index}].passport_expires_at`}
              format={(date) => (date ? date.format('DD.MM.YYYY') : date)}
              onChange={(d) => {
                formik.setFieldValue(
                  `passengers[${index}].passport_expires_at`,
                  d ? d.format('DD.MM.YYYY') : ''
                )
                return d
              }}
            />
          </Form.Item>

          <Form.Item
            label="Seria pașaportului"
            validateStatus={
              formik.errors.passengers?.[index]?.passport_series ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.passport_series}
          >
            <Input
              name={`passengers[${index}].passport_series`}
              value={formik.values.passengers[index].passport_series}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Numărul pașaportului"
            validateStatus={
              formik.errors.passengers?.[index]?.passport_number ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.passport_number}
          >
            <Input
              name={`passengers[${index}].passport_number`}
              value={formik.values.passengers[index].passport_number}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Țara pașaportului"
            validateStatus={
              formik.errors.passengers?.[index]?.passport_country ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.passport_country}
          >
            <Input
              name={`passengers[${index}].passport_country`}
              value={formik.values.passengers[index].passport_country}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Cod de rezervare"
            validateStatus={
              formik.errors.passengers?.[index]?.reservation_code ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.reservation_code}
          >
            <Input
              name={`passengers[${index}].reservation_code`}
              value={formik.values.passengers[index].reservation_code}
              onChange={formik.handleChange}
            />
          </Form.Item>

          {/*  source*/}
          <Form.Item
            label="Sursa"
            validateStatus={
              formik.errors.passengers?.[index]?.source ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.source}
            name={`passengers[${index}].source`}
          >
            <Select>
              <Option value="online">Online</Option>
              <Option value="offline">Offline</Option>
            </Select>
          </Form.Item>

          {/*comment*/}
          <Form.Item
            label="Comentariu"
            validateStatus={
              formik.errors.passengers?.[index]?.comment ? 'error' : ''
            }
            help={formik.errors.passengers?.[index]?.comment}
            name={`passengers[${index}].comment`}
          >
            <TextArea rows={2} />
          </Form.Item>
        </div>
      ))}

      <div className="flex justify-end">
        {/*<Button*/}
        {/*  type="default"*/}
        {/*  onClick={() => {*/}
        {/*    formik.setFieldValue('passengers', [*/}
        {/*      ...formik.values.passengers,*/}
        {/*      getInitialValues(extra).passengers[0],*/}
        {/*    ])*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Mai Adaugă Un Pasager*/}
        {/*</Button>*/}
        <Button type="primary" htmlType="submit">
          Trimite
        </Button>
      </div>
    </Form>
  )
}

export default AdminPanelReservationForm
