import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, DatePicker, Typography } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { baggages } from '@/data/data'
import axs from '@/lib/axios'
import { source } from '../../tickets/components/ticket'

const { Option } = Select

interface IPassenger {
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
  passport_number: string
  passport_country: string
  reservation_code: string
}

interface FormValues {
  passengers: IPassenger[]
}

const getInitialValues = (passengers: number): FormValues => ({
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
    passport_number: '',
    passport_country: '',
    reservation_code: '',
  })),
})

const validationSchema = Yup.object().shape({
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

const PassengerAddForm = ({ onSubmit }: IAdminPanelReservationForm) => {
  const passengers = 1
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

  const formik = useFormik({
    initialValues: getInitialValues(passengers),
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
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
  const { Title } = Typography
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

  return (
    <Form
      onFinish={formik.handleSubmit}
      labelCol={{ span: 10 }}
      onFocus={() => {
        Object.keys(formik.errors).forEach((field) => {
          formik.setFieldTouched(field, false)
          formik.setFieldError(field, '')
        })
      }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      {/* Add more fields as required */}

      {formik.values.passengers.map((_: any, index: number) => (
        <div key={index}>
          <Title level={3} className="!mb-6">
            Adauga un pasager
          </Title>
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

          {baggages.map((baggage, i) => (
            <Form.Item key={i} label={baggage.type}>
              <Input
                name={`passengers[${index}].baggage[${i}].count`}
                value={
                  formik.values.passengers[index]?.baggage?.[i]?.count || ''
                }
                onChange={(e) =>
                  formik.setFieldValue(`passengers[${index}].baggage[${i}]`, {
                    type: baggage.type,
                    count: Number(e.target.value),
                  })
                }
              />
            </Form.Item>
          ))}

          <Form.Item
            label="Data nașterii"
            validateStatus={
              // @ts-ignore
              formik.errors.passengers?.[index]?.date_of_birth ? 'error' : ''
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

          <Form.Item
            label="Numărul pașaportului"
            validateStatus={
              // @ts-ignore
              formik.errors.passengers?.[index]?.passport_number ? 'error' : ''
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

          <Form.Item
            label="Nationalitate"
            validateStatus={
              // @ts-ignore
              formik.errors.passengers?.[index]?.passport_country ? 'error' : ''
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

          <Form.Item
            label="Cod de rezervare"
            validateStatus={
              // @ts-ignore
              formik.errors.passengers?.[index]?.reservation_code ? 'error' : ''
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
        </div>
      ))}

      <div className="flex justify-start">
        <Button type="primary" htmlType="submit">
          Adaugă Pasagerul
        </Button>
      </div>
    </Form>
  )
}

export default PassengerAddForm
