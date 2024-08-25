import Image from 'next/image'
import React, { useState } from 'react'
import {
  Select,
  Input,
  DatePicker,
  Button,
  Tabs,
  notification,
  Upload,
  UploadProps,
  Divider,
} from 'antd'
import PhoneInput from 'react-phone-input-2'
import tenKgSvg from '@/assets/img/bags/10kg.svg'
import twentyKgSvg from '@/assets/img/bags/20kg.svg'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import checkMarkSvg from '@/assets/img/check-mark.svg'
import passportSvg from '@/assets/img/passport.svg'
import { cn, handleCalendarKeyDown } from '@/lib/utils'
import { BagNumberInput } from '@components/form/bag-number-input'
import { ReservationCard } from '@components/reservation/reservation-card'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Checkbox } from '@components/ui/checkbox'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import 'react-phone-input-2/lib/style.css'

interface IMainFormProps {
  showBaggage?: boolean
  countries?: any
  passengersCount: number
  formik: any
  reservation: any
}

export const ReservationMainForm = ({
  showBaggage = true,
  passengersCount,
  countries,
  formik,
  reservation,
}: IMainFormProps) => {
  const [loading, setLoading] = useState(false)

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
        setLoading={setLoading}
        loading={loading}
        bagsPrice={reservation?.bags_price}
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
          loading={loading}
          setLoading={setLoading}
          index={0}
          bagsPrice={reservation?.bags_price}
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
  loading,
  setLoading,
  bagsPrice,
}: any) => {
  const { Option } = Select

  const [api, contextHolder] = notification.useNotification()
  const [files, setFiles] = useState<any>([])

  const uploadProps: UploadProps = {
    name: 'passport',
    action: `${process.env.NEXT_PUBLIC_API_URL}/files/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      setLoading(true)
      if (info.file.status === 'done') {
        api.success({
          message: 'File uploaded successfully',
          description: `${info.file.name} file uploaded successfully`,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
        setLoading(false)

        formik.setFieldValue(
          `passengers[${index}].passport_id`,
          info.file?.response?.id
        )
        const newFiles = [...files]
        newFiles[index] = info.file?.response?.path
        setFiles(newFiles)
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
    <>
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              onChange={(value) =>
                formik.setFieldValue(`passengers[${index}].gender`, value)
              }
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
              disabled={loading}
              showSearch
              onChange={(value) =>
                formik.setFieldValue(
                  `passengers[${index}].passport_country`,
                  value
                )
              }
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
              onChange={(p) =>
                formik.setFieldValue(`passengers[${index}].phone`, p)
              }
              disabled={loading}
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
            <Input
              className="h-10"
              type="text"
              name={formik.values.passengers?.[index]?.email}
              placeholder="Adresa de email*"
              disabled={loading}
              onChange={(e) =>
                formik.setFieldValue(
                  `passengers[${index}].email`,
                  e.target.value
                )
              }
            />
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              name={`passengers[${index}].passport_number`}
              disabled={loading}
              placeholder="Numărul pașaportului*"
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Upload {...uploadProps}>
              <Button
                type="primary"
                disabled={loading}
                className="flex h-10 min-w-full items-center justify-center rounded-lg px-8 font-light text-white shadow-md shadow-slate-400 hover:bg-brand-blue"
              >
                <span className="mr-2">Poza pașaport</span>
                <Image src={passportSvg} alt={'passport image'} />
              </Button>
            </Upload>
          </div>
          {formik.values.passengers?.[index]?.passport_id && (
            <div className="flex justify-between">
              <p className="flex flex-col text-xs">
                <span className="mb-2 text-gray-500">Document încărcat:</span>{' '}
                <span className=" w-60 overflow-hidden text-ellipsis whitespace-nowrap">
                  {files[index].split('/').pop()}
                </span>
              </p>
            </div>
          )}
        </div>

        <Separator className="my-8" />

        {showBaggage && (
          <BaggageSection formik={formik} index={index} bagsPrice={bagsPrice} />
        )}
      </ReservationCard>

      <OnlineCheckinSection index={index} formik={formik} />
    </>
  )
}
const BaggageSection = ({
  formik,
  index,
  bagsPrice,
}: {
  formik: any
  index: number
  bagsPrice: any
}) => {
  const bags: IBags[] = [
    {
      id: 'bagaj_de_mana',
      size: '20 x 40 x 50 cm',
      name: 'Bagaj de mana',
      imageUrl: tenKgSvg,
      type: '10kg',
    },
    {
      id: 'bagaj_de_cala',
      size: '28 x 52 x 78 cm',
      name: 'Bagaj de cala',
      imageUrl: twentyKgSvg,
      type: '20kg',
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
              <span className="text-xs text-[#757575]">20 x 30 x 40 cm</span>
              <div className="w-full lg:hidden">
                <h6 className="text-sm font-medium">Obiect personal</h6>
              </div>
            </div>
          </CardHeader>

          {/*desktop*/}
          <CardContent className="mt-auto hidden min-h-14 rounded-xl bg-brand-light-blue p-2 lg:block">
            <h6 className="text-sm font-medium">Obiect personal</h6>
            <div className="text-sm font-light text-green-600">
              Inclus Gratuit
            </div>
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
                  <BagTypeAndPrice
                    bag={bag}
                    bagsPrice={bagsPrice}
                    index={bagIndex}
                  />
                </div>
              </div>
            </CardHeader>

            {/*mobile*/}
            <CardContent className="flex-2 flex w-28 items-center border-l-2 px-5 py-3 lg:hidden lg:p-6">
              {bag.hideInput ? (
                <p className="mt-0.5 text-xs text-green-600">
                  {bagsPrice[index + 1]}
                </p>
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
              <BagTypeAndPrice
                bag={bag}
                bagsPrice={bagsPrice}
                index={bagIndex}
              />
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
  imageUrl: string
  hideInput?: boolean
  type: string
}

const BagTypeAndPrice = ({
  bag,
  bagsPrice,
  index,
}: {
  bag: IBags
  bagsPrice: any
  index: number
}) => {
  return (
    <>
      <h6 className="text-sm font-medium">{bag.name}</h6>
      <p
        className={cn('mt-0.5 text-xs text-green-600 lg:block', {
          hidden: bag.hideInput,
        })}
      >
        {bagsPrice[index + 1]} €
      </p>
    </>
  )
}

const OnlineCheckinSection = ({
  formik,
  index,
}: {
  formik: any
  index: number
}) => {
  const isOnlineCheckIn = React.useMemo(
    () => formik.values?.passengers?.[index]?.isOnlineCheckIn,
    [formik, index]
  )

  const handleAddCheckInOnline = () => {
    formik.setFieldValue(
      `passengers[${index}].isOnlineCheckIn`,
      !isOnlineCheckIn
    )
  }

  React.useEffect(() => {
    handleAddCheckInOnline()
  }, [])

  return (
    <ReservationCard
      className="relative cursor-pointer"
      onClick={handleAddCheckInOnline}
    >
      <main className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <h6 className="flex items-center text-base font-medium">
              Adaugă check-in-ul online!
            </h6>
            <span className="rounded-full bg-brand-yellow px-3 py-1 text-xxs">
              Popular
            </span>
          </div>
          <Checkbox className="ml-auto" checked={isOnlineCheckIn} />
        </div>

        <ul className="select-none text-sm font-normal text-[#7E7E7E]">
          <li className="mt-3 flex items-center">
            <CheckMark className="mt-0.5" />
            Dacă nu achiziționezi acest serviciu, va fi necesar să efectuezi
            check-in-ul independent
          </li>
          <li className="mt-2 flex items-center">
            <CheckMark className="mt-0.5" />
            Economisești timp și bani: check-in-ul direct la aeroport poate
            genera cheltuieli suplimentare sau întârzieri
          </li>
          <li className="mt-2 flex items-center">
            <CheckMark className="mt-0.5" />
            Emitem cărțile de îmbarcare la timp
          </li>
        </ul>
        <Divider className="my-3" />
        <div className="flex items-center space-x-2">
          <div className="ml-1 h-auto text-sm font-normal">
            Adaugă €8.99 per pasager
          </div>
        </div>
      </main>
    </ReservationCard>
  )
}

interface ICheckMarkProps {
  className?: string
}

const CheckMark = (props: ICheckMarkProps) => {
  return (
    <Image
      src={checkMarkSvg}
      alt={'check mark'}
      width={16}
      height={16}
      className={cn('mr-2 min-w-3 self-start', props.className)}
    />
  )
}
