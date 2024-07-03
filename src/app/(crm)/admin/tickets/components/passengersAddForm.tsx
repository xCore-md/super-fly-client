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
  Typography,
} from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const { Option } = Select

interface IPassenger {
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
  passengers: IPassenger[]
}

const getInitialValues = (passengers: number): FormValues => ({
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
  onSubmit: (values: FormValues) => void
}

const PassengerAddForm = ({
  closeModal,
  onSubmit,
}: IAdminPanelReservationForm) => {
  const passengers = 1

  const formik = useFormik({
    initialValues: getInitialValues(passengers),
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

          <Form.Item
            label="Bagaj 10kg"
            validateStatus={
              // @ts-ignore
              formik.errors.passengers?.[index]?.bag_10kg ? 'error' : ''
            }
            // @ts-ignore
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
              // @ts-ignore
              formik.errors.passengers?.[index]?.bag_20kg ? 'error' : ''
            }
            // @ts-ignore
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
              // @ts-ignore
              formik.errors.passengers?.[index]?.date_of_birth ? 'error' : ''
            }
            // @ts-ignore
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
              // @ts-ignore
              formik.errors.passengers?.[index]?.passport_issued_at
                ? 'error'
                : ''
            }
            // @ts-ignore
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
              // @ts-ignore
              formik.errors.passengers?.[index]?.passport_expires_at
                ? 'error'
                : ''
            }
            // @ts-ignore
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
              // @ts-ignore
              formik.errors.passengers?.[index]?.passport_series ? 'error' : ''
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
            label="Țara pașaportului"
            validateStatus={
              // @ts-ignore
              formik.errors.passengers?.[index]?.passport_country ? 'error' : ''
            }
            // @ts-ignore
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
            <Select>
              <Option value="online">Online</Option>
              <Option value="offline">Offline</Option>
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

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          Trimite
        </Button>
      </div>
    </Form>
  )
}

export default PassengerAddForm
