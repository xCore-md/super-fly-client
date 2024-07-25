import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, DatePicker, Typography } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axs from '@/lib/axios'
import { handleCalendarKeyDown } from '@/lib/utils'

const { Option } = Select

interface IPassenger {
  first_name: string
  last_name: string
  gender: 'M' | 'F' | ''
  date_of_birth: string
  passport_issued_at: string
  passport_expires_at: string
  passport_number: string
  passport_country: string
}

interface FormValues {
  passengers: IPassenger[]
}

const getInitialValues = (passengers: number): FormValues => ({
  passengers: Array.from({ length: passengers }, () => ({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    passport_issued_at: '',
    passport_expires_at: '',
    passport_number: '',
    passport_country: '',
  })),
})

const validationSchema = Yup.object().shape({
  passengers: Yup.array()
    .of(
      Yup.object().shape({
        first_name: Yup.string().required('Prenumele este necesar'),
        last_name: Yup.string().required('Numele de familie este necesar'),
        gender: Yup.string().oneOf(['M', 'F']).required('Genul este necesar'),
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
              onKeyDown={handleCalendarKeyDown}
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
              onKeyDown={handleCalendarKeyDown}
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
              onKeyDown={handleCalendarKeyDown}
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
