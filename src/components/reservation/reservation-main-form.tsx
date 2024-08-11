import Image from 'next/image'
import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import {
  Select,
  Input,
  DatePicker,
  Button,
  Tabs,
  notification,
  Upload,
  UploadProps,
} from 'antd'
import PhoneInput from 'react-phone-input-2'
import tenKgSvg from '@/assets/img/bags/10kg.svg'
import twentyKgSvg from '@/assets/img/bags/20kg.svg'
import thirtyKgSvg from '@/assets/img/bags/30kg.svg'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import passportSvg from '@/assets/img/passport.svg'
import { cn, handleCalendarKeyDown } from '@/lib/utils'
import { BagNumberInput } from '@components/form/bag-number-input'
import { ReservationCard } from '@components/reservation/reservation-card'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import 'react-phone-input-2/lib/style.css'
// import axs from '@/lib/axios'

interface IMainFormProps {
  showBaggage?: boolean
  countries?: any
  passengersCount: number
  formik: any
}

export const ReservationMainForm = ({
  showBaggage = true,
  passengersCount,
  countries,
  formik,
}: IMainFormProps) => {
  const countriesOptions = countries?.map((country: any) => ({
    label: (
      <span className="flex items-center gap-2">
        <img className="h-3 w-4" src={country.flags.png} alt="icon" />{' '}
        {country.name.common} ({country.cca2})
      </span>
    ),
    value: country.cca2,
  }))

  const items = Array.from({ length: passengersCount }).map((_, index) => ({
    key: `index-${index}`,
    label: `Pasager ${index + 1}`,
    children: (
      <PassengerForm
        key={index}
        index={index}
        countriesOptions={countriesOptions}
        showBaggage={showBaggage}
        formik={formik}
      />
    ),
  }))

  return (
    <div className="mt-4">
      {passengersCount === 1 && (
        <PassengerForm
          countriesOptions={countriesOptions}
          showBaggage={showBaggage}
          formik={formik}
          index={0}
        />
      )}
      {passengersCount > 1 && <Tabs items={items} defaultActiveKey={'0'} />}
    </div>
  )
}

const PassengerForm = ({
  formik,
  index = 0,
  countriesOptions,
  showBaggage,
}: any) => {
  const { Option } = Select

  const [api, contextHolder] = notification.useNotification()

  const props: UploadProps = {
    name: 'file',
    action: `${process.env.NEXT_PUBLIC_API_URL}/files/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        api.success({
          message: 'File uploaded successfully',
          description: `${info.file.name} file uploaded successfully`,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
      } else if (info.file.status === 'error') {
        api.error({
          message: 'File upload failed',
          description: `${info.file.name} file upload failed.`,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
      }
    },
  }

  return (
    <ReservationCard>
      {contextHolder}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div>
          <Label htmlFor="first-name" className="mb-1 ml-1 lg:hidden">
            Prenume
          </Label>
          <Input
            autoFocus
            className="h-10"
            name={formik.values.passengers?.[index]?.first_name}
            type="text"
            placeholder="Prenume*"
            onChange={(e) =>
              formik.setFieldValue(
                `passengers[${index}].first_name`,
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label
            htmlFor="reservation-form-last-name"
            className="mb-1 ml-1 mt-3 lg:hidden"
          >
            Nume
          </Label>
          <Input
            onChange={(e) =>
              formik.setFieldValue(
                `passengers[${index}].last_name`,
                e.target.value
              )
            }
            name={formik.values.passengers?.[index]?.last_name}
            className="h-10"
            type="text"
            placeholder="Nume*"
          />
        </div>
        <div>
          <Select
            placeholder="Gen"
            className="h-10 w-full"
            onChange={formik.handleChange}
          >
            <Option value="M">Masculin</Option>
            <Option value="F">Feminin</Option>
          </Select>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-5">
        <div>
          <Label
            htmlFor="reservation-form-country-code"
            className="mb-1 ml-1 lg:hidden"
          >
            Nationalitate
          </Label>
          <Select
            placeholder="Nationalitate"
            className="h-10 w-full"
            options={countriesOptions}
            showSearch
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Label
            htmlFor="reservation-form-phone-number"
            className="mb-1 ml-1 mt-3 lg:hidden"
          >
            Numar de telefon
          </Label>
          <PhoneInput
            onChange={(p) => formik.setFieldValue('phone', p)}
            inputStyle={{
              width: '100%',
              height: '40px',
              border: '1px solid #E7E7E7',
            }}
            country={'md'}
          />
        </div>
        <div className="flex flex-col lg:gap-5">
          <Label
            htmlFor="reservation-form-email"
            className="mb-1 ml-1 lg:hidden"
          >
            Adresa de email
          </Label>
          <Input className="h-10" type="text" placeholder="Adresa de email*" />
        </div>
      </div>

      <div className="mt-3 rounded-md border border-[#E7E7E7] bg-[#F0F2FF] p-3 text-sm lg:mt-7">
        Adaugă datele pașaportului
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 lg:mt-5 lg:flex-row lg:gap-5">
        <div>
          <Label className="mb-1 ml-1 mt-3 lg:hidden">Data nașterii</Label>
          <DatePicker
            onKeyDown={handleCalendarKeyDown}
            format={'DD.MM.YYYY'}
            name={`passengers[${index}].date_of_birth`}
            className="h-10 w-full"
            placeholder="Data nașterii"
            onChange={(d) => {
              formik.setFieldValue(
                `passengers[${index}].date_of_birth`,
                d ? d.format('DD.MM.YYYY') : ''
              )
              return d
            }}
          />
        </div>
        <div>
          <Label className="mb-1 ml-1 mt-3 lg:hidden">
            Data eliberării pașaportului
          </Label>
          <DatePicker
            onKeyDown={handleCalendarKeyDown}
            name={`passengers[${index}].passport_issued_at`}
            format={'DD.MM.YYYY'}
            className="h-10 w-full"
            placeholder="Data eliberării pașaportului"
            onChange={(d) => {
              formik.setFieldValue(
                `passengers[${index}].passport_issued_at`,
                d ? d.format('DD.MM.YYYY') : ''
              )
              return d
            }}
          />
        </div>
        <div>
          <Label className="mb-1 ml-1 mt-3 lg:hidden">
            Data expirării pașaportului
          </Label>
          <DatePicker
            onKeyDown={handleCalendarKeyDown}
            format={'DD.MM.YYYY'}
            name={`passengers[${index}].passport_expires_at`}
            className="h-10 w-full"
            placeholder="Data expirării pașaportului"
            onChange={(d) => {
              formik.setFieldValue(
                `passengers[${index}].passport_expires_at`,
                d ? d.format('DD.MM.YYYY') : ''
              )
              return d
            }}
          />
        </div>
        <div className="flex flex-col lg:gap-5">
          <Label
            htmlFor="reservation-form-email"
            className="mb-1 ml-1 lg:hidden"
          >
            Numărul pașaportului
          </Label>
          <Input
            className="h-10"
            type="text"
            placeholder="Numărul pașaportului*"
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Upload {...props}>
            <Button
              type="primary"
              className="flex h-10 min-w-full items-center justify-center rounded-lg px-8 font-light text-white shadow-md shadow-slate-400 hover:bg-brand-blue"
            >
              <span className="mr-2">Poza pașaport</span>
              <Image src={passportSvg} alt={'passport image'} />
            </Button>
          </Upload>
        </div>
        <div className="flex justify-between">
          <p className="text-xs">
            <span className="mb-2 text-gray-500">Document încărcat:</span>{' '}
            <span>file321455xx45522668adasda65ss.jpg</span>
          </p>
          <Button
            icon={<DeleteOutlined />}
            className="min-w-8 text-xs text-red-500"
          />
        </div>
      </div>

      <Separator className="my-8" />

      {showBaggage && <BaggageSection formik={formik} index={index} />}
    </ReservationCard>
  )
}
const BaggageSection = ({ formik, index }: { formik: any; index: number }) => {
  const bags: IBags[] = [
    {
      id: 'bagaj_de_mana',
      size: '57 x 20 x 38 cm',
      name: 'Bagaj de mana',
      price: '10.99€',
      imageUrl: tenKgSvg,
      type: '10kg',
    },
    {
      id: 'bagaj_de_cala',
      size: '78 x 28 x 52 cm',
      name: 'Bagaj de cala',
      price: '20.99€',
      imageUrl: twentyKgSvg,
      type: '20kg',
    },
    {
      id: 'bagaj_de_cala_mare',
      size: '78 x 28 x 52 cm',
      name: 'Bagaj de cala',
      price: '30.99€',
      imageUrl: thirtyKgSvg,
      type: '30kg',
    },
  ]

  return (
    <section className="grid gap-2 lg:grid-cols-4 lg:gap-6">
      <div>
        <Card className="mb-4 flex h-[244px] justify-between rounded-xl text-center lg:flex-col">
          <CardHeader className="flex max-w-72 flex-1 flex-col items-center justify-center px-5 py-3 lg:min-h-[169px] lg:max-w-none lg:flex-1  lg:justify-end lg:p-6">
            <Image
              src={eightKgSvg}
              alt="bag"
              height={75}
              className="mb-3 w-12 select-none lg:mr-0 lg:w-16"
            />

            <div className="w-full text-center lg:text-center">
              <span className="text-xs text-[#757575]">40 x 20 x 30 cm</span>
              <div className="w-full lg:hidden">
                <h6 className="text-sm font-medium">Obiect personal</h6>
              </div>
            </div>
          </CardHeader>

          {/*mobile*/}
          <CardContent className="flex-2 flex w-28 items-center border-l-2 px-5 py-3 lg:hidden lg:p-6">
            <p className="mt-0.5 text-xs text-green-600">{bags[0].price}</p>
          </CardContent>

          {/*desktop*/}
          <CardContent className="mt-auto hidden min-h-14 rounded-xl bg-brand-light-blue p-2 lg:block">
            <BagTypeAndPrice bag={bags[0]} />
          </CardContent>
        </Card>
      </div>
      {bags.map((bag, bagIndex) => (
        <div key={bag.id}>
          <Card className="mb-4 flex h-[244px] justify-between rounded-xl text-center lg:flex-col">
            <CardHeader className="flex max-w-72 flex-1 flex-col items-center justify-center px-5 py-3 lg:min-h-[169px] lg:max-w-none lg:flex-1  lg:justify-end lg:p-6">
              <Image
                src={bag.imageUrl}
                alt="bag"
                height={75}
                className="mb-3 w-12 select-none lg:mr-0 lg:w-16"
              />

              <div className="w-full text-center lg:text-center">
                <span className="text-xs text-[#757575]">{bag.size}</span>
                <div className="w-full lg:hidden">
                  <BagTypeAndPrice bag={bag} />
                </div>
              </div>
            </CardHeader>

            {/*mobile*/}
            <CardContent className="flex-2 flex w-28 items-center border-l-2 px-5 py-3 lg:hidden lg:p-6">
              {bag.hideInput ? (
                <p className="mt-0.5 text-xs text-green-600">{bag.price}</p>
              ) : (
                <BagNumberInput
                  formik={formik}
                  passengerIndex={index}
                  bag={bag}
                  bagIndex={bagIndex}
                />
              )}
            </CardContent>

            {/*desktop*/}
            <CardContent className="mt-auto hidden min-h-14 rounded-xl bg-brand-light-blue p-2 lg:block">
              <BagTypeAndPrice bag={bag} />
            </CardContent>
          </Card>

          <div className="hidden lg:block">
            {bag.hideInput ? null : (
              <BagNumberInput
                formik={formik}
                passengerIndex={index}
                bag={bag}
                bagIndex={bagIndex}
              />
            )}
          </div>
        </div>
      ))}
    </section>
  )
}

interface IBags {
  id: string
  size: string
  name: string
  price: string
  imageUrl: string
  hideInput?: boolean
  type: string
}

const BagTypeAndPrice = ({ bag }: { bag: IBags }) => {
  return (
    <>
      <h6 className="text-sm font-medium">{bag.name}</h6>
      <p
        className={cn('mt-0.5 text-xs text-green-600 lg:block', {
          hidden: bag.hideInput,
        })}
      >
        {bag.price}
      </p>
    </>
  )
}
