import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Col,
  Row,
  Tabs,
  TabsProps,
} from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFlightContext } from '@/context/flight-context'
import { useFlightsContext } from '@/context/flights-context'
import { baggages } from '@/data/data'
import axs from '@/lib/axios'
import { source } from '../tickets/components/ticket'

const { Option } = Select

interface Passenger {
  first_name: string
  last_name: string
  gender: 'M' | 'F' | ''
  phone: string
  email: string
  baggage: any
  source: string
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
  source: string
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
  source: string
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
    source: 'office',
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
    baggage: [],
    source: '',
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
  source: Yup.string().required('Sursa este necesară'),
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
        baggage: Yup.array(),
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
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: FormValues) => void
}

const AdminPanelReservationForm = ({
  onSubmit,
}: IAdminPanelReservationForm) => {
  const { selectedFlight } = useFlightsContext()
  const { flight } = useFlightContext()
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

  const passengers = flight.adults + flight.children + flight.infants

  const formik = useFormik({
    initialValues: getInitialValues(
      selectedFlight as FlightDetails,
      passengers
    ),
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    validate: (values) => {
      try {
        validationSchema.validateSync(values, { abortEarly: false })
      } catch (e: any) {
        return e.inner.reduce((errors: any, err: any) => {
          errors[err.path] = err.message
          return errors
        }, {})
      }
      return {}
    },
    onSubmit: onSubmit,
  })
  const { TextArea } = Input

  useEffect(() => {
    return () => {
      formik.resetForm()
    }
  }, [])

  const countriesOptions = countries.map((country: any) => ({
    label: (
      <span className="flex items-center gap-2">
        <img className="h-3 w-4" src={country.flags.png} alt="icon" />{' '}
        {country.name.common} ({country.cca2})
      </span>
    ),
    value: country.cca2,
  }))

  const items: TabsProps['items'] = formik.values.passengers.map(
    (_: any, index: number) => ({
      key: index.toString(),
      label: `Pasager ${index + 1}`,
      children: (
        <div key={index}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Prenume"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.first_name ? 'error' : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.first_name}
              >
                <Input
                  name={`passengers[${index}].first_name`}
                  value={formik.values.passengers[index].first_name}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Nume de familie"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.last_name ? 'error' : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.last_name}
              >
                <Input
                  name={`passengers[${index}].last_name`}
                  value={formik.values.passengers[index].last_name}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Gen"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.gender ? 'error' : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.gender}
                name={`passengers[${index}].gender`}
              >
                <Select
                  value={formik.values.passengers[index].gender}
                  onChange={(value) =>
                    formik.setFieldValue(`passengers[${index}].gender`, value)
                  }
                >
                  <Option value="M">Masculin</Option>
                  <Option value="F">Feminin</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Telefon"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.phone ? 'error' : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.phone}
              >
                <Input
                  name={`passengers[${index}].phone`}
                  value={formik.values.passengers[index].phone}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.email ? 'error' : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.email}
              >
                <Input
                  name={`passengers[${index}].email`}
                  value={formik.values.passengers[index].email}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {baggages.map((baggage, i) => (
              <Col span={4} key={i}>
                <Form.Item className="flex gap-2">
                  <Input
                    addonBefore={baggage.type}
                    name={`passengers[${index}].baggage[${i}].count`}
                    value={
                      formik.values.passengers[index]?.baggage?.[i]?.count || ''
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        `passengers[${index}].baggage[${i}]`,
                        {
                          type: baggage.type,
                          count: Number(e.target.value),
                        }
                      )
                    }
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Data nașterii"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.date_of_birth
                    ? 'error'
                    : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.date_of_birth}
              >
                <DatePicker
                  className="w-full"
                  name={`passengers[${index}].date_of_birth`}
                  format={'DD.MM.YYYY'}
                  onChange={(d) => {
                    formik.setFieldValue(
                      `passengers[${index}].date_of_birth`,
                      d ? d.format('DD.MM.YYYY') : ''
                    )
                    return d
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Data eliberării pașaportului"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.passport_issued_at
                    ? 'error'
                    : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.passport_issued_at}
              >
                <DatePicker
                  className="w-full"
                  name={`passengers[${index}].passport_issued_at`}
                  format={'DD.MM.YYYY'}
                  onChange={(d) => {
                    formik.setFieldValue(
                      `passengers[${index}].passport_issued_at`,
                      d ? d.format('DD.MM.YYYY') : ''
                    )
                    return d
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Data expirării pașaportului"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.passport_expires_at
                    ? 'error'
                    : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.passport_expires_at}
              >
                <DatePicker
                  className="w-full"
                  name={`passengers[${index}].passport_expires_at`}
                  format={'DD.MM.YYYY'}
                  onChange={(d) => {
                    formik.setFieldValue(
                      `passengers[${index}].passport_expires_at`,
                      d ? d.format('DD.MM.YYYY') : ''
                    )
                    return d
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Seria pașaportului"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.passport_series
                    ? 'error'
                    : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.passport_series}
              >
                <Input
                  name={`passengers[${index}].passport_series`}
                  value={formik.values.passengers[index].passport_series}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Numărul pașaportului"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.passport_number
                    ? 'error'
                    : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.passport_number}
              >
                <Input
                  name={`passengers[${index}].passport_number`}
                  value={formik.values.passengers[index].passport_number}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Nationalitate"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.passport_country
                    ? 'error'
                    : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.passport_country}
              >
                <Select
                  options={countriesOptions}
                  onChange={(value) =>
                    formik.setFieldValue(
                      `passengers[${index}].passport_country`,
                      value
                    )
                  }
                  value={formik.values.passengers[index].passport_country}
                  showSearch
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Cod de rezervare"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.reservation_code
                    ? 'error'
                    : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.reservation_code}
              >
                <Input
                  name={`passengers[${index}].reservation_code`}
                  value={formik.values.passengers[index].reservation_code}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              {/*  source*/}
              <Form.Item
                label="Sursa"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.source ? 'error' : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.source}
                name={`passengers[${index}].source`}
              >
                <Select
                  onChange={(e) =>
                    formik.setFieldValue(`passengers[${index}].source`, e)
                  }
                  value={formik.values.passengers[index].source}
                >
                  {Object.keys(source).map((key) => (
                    <Option key={key} value={key}>
                      {source[key]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              {/*comment*/}
              <Form.Item
                label="Comentariu"
                validateStatus={
                  // @ts-ignore
                  formik.errors.passengers?.[index]?.comment ? 'error' : ''
                }
                // @ts-ignore
                help={formik.errors.passengers?.[index]?.comment}
                name={`passengers[${index}].comment`}
              >
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    })
  )

  return (
    <Form
      onFinish={formik.handleSubmit}
      onFocus={() => {
        Object.keys(formik.errors).forEach((field) => {
          formik.setFieldTouched(field, false)
          formik.setFieldError(field, '')
        })
      }}
      layout="vertical"
    >
      <Tabs defaultActiveKey="0" items={items} />
      <Button
        className="absolute bottom-0 right-0 mb-4 mr-4"
        type="primary"
        htmlType="submit"
      >
        Rezerva
      </Button>
    </Form>
  )
}

export default AdminPanelReservationForm
