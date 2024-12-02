import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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
  Checkbox,
} from 'antd'
import PhoneInput from 'react-phone-input-2'
import tenKgSvg from '@/assets/img/bags/10kg.svg'
import twentyKgSvg from '@/assets/img/bags/20kg.svg'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import checkMarkSvg from '@/assets/img/check-mark.svg'
import minus from '@/assets/img/minus.svg'
import passportSvg from '@/assets/img/passport.svg'
import { cn, handleCalendarKeyDown } from '@/lib/utils'
import { BagNumberInput } from '@components/form/bag-number-input'
import { ReservationCard } from '@components/reservation/reservation-card'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import 'react-phone-input-2/lib/style.css'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import plus from '@/assets/img/plus.svg'
import { useTranslationsContext } from '@/context/translations-context'

interface IMainFormProps {
  showBaggage?: boolean
  countries?: any
  passengersCount: number
  formik: any
  reservation: any
  isTermsChecked?: boolean
}

export const ReservationMainForm = ({
  showBaggage = true,
  passengersCount,
  countries,
  formik,
  reservation,
}: IMainFormProps) => {
  const [loading, setLoading] = useState(false)
  const { translations: t } = useTranslationsContext()

  const countriesOptions = countries?.map((country: any) => ({
    label: (
      <span className="flex items-center gap-2">
        <img className="h-3 w-4" src={country.flags.png} alt="icon" />{' '}
        {country.name.common} ({country.cca2})
      </span>
    ),
    value: country.name.common,
    code: country.cca2,
  }))

  const bagsPrice =
    Object.keys(reservation?.bags_price).length > 1
      ? reservation?.bags_price
      : { ...reservation?.bags_price, 2: reservation?.bags_price['1'] * 2 }

  const items = Array.from({ length: passengersCount }).map((_, index) => ({
    key: `index-${index}`,
    label: `${t.searchBar?.passenger} ${index + 1}`,
    children: (
      <PassengerForm
        key={index}
        index={index}
        countriesOptions={countriesOptions}
        showBaggage={showBaggage}
        formik={formik}
        setLoading={setLoading}
        loading={loading}
        bagsPrice={bagsPrice}
        t={t}
      />
    ),
  }))

  return (
    <div className="lg:mt-4">
      {passengersCount === 1 && (
        <PassengerForm
          countriesOptions={countriesOptions}
          showBaggage={showBaggage}
          formik={formik}
          loading={loading}
          setLoading={setLoading}
          index={0}
          bagsPrice={bagsPrice}
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
  const [visibleAdditionalInfo, setVisibleAdditionalInfo] = useState(false)
  const { lang, translations: t } = useTranslationsContext()

  useEffect(() => {
    formik.setFieldValue(`passengers[${index}].isOnlineCheckIn`, true)
  }, [])

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
          placement: 'topRight',
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
          placement: 'topRight',
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
        <div
          className="grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:gap-5"
          id="startForm"
        >
          <div className="relative">
            <Label
              htmlFor="first-name"
              className="mb-1 ml-1 text-[10px] lg:hidden"
            >
              {t.passengerForm?.firstName}
            </Label>
            <Input
              autoFocus
              className="h-10 rounded-lg"
              name={formik.values.passengers?.[index]?.first_name}
              type="text"
              disabled={loading}
              placeholder={t.passengerForm?.firstName + '*'}
              onChange={(e) =>
                formik.setFieldValue(
                  `passengers[${index}].first_name`,
                  e.target.value
                )
              }
            />
            {formik.errors?.passengers?.[index]?.first_name &&
              formik.touched?.passengers?.[index]?.first_name && (
                <span className="absolute -bottom-4 left-0 text-xxs text-red-500">
                  {formik.errors?.passengers?.[index]?.first_name}
                </span>
              )}
          </div>

          <div className="relative">
            <Label
              htmlFor="reservation-form-last-name"
              className="mb-1 ml-1 mt-3 text-[10px] lg:hidden"
            >
              {t.passengerForm?.lastName}
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
              className="h-10 rounded-lg"
              type="text"
              placeholder={t.passengerForm?.lastName + '*'}
            />
            {formik.errors?.passengers?.[index]?.last_name &&
              formik.touched?.passengers?.[index]?.last_name && (
                <span className="absolute -bottom-4 left-0 text-xxs text-red-500">
                  {formik.errors?.passengers?.[index]?.last_name}
                </span>
              )}
          </div>
          <div className="relative">
            <Label
              htmlFor="reservation-form-gen"
              className="mb-1 ml-1 mt-3 text-[10px] lg:hidden"
            >
              {t.passengerForm?.gen}
            </Label>
            <Select
              placeholder={t.passengerForm?.gen}
              className="h-10 w-full rounded-lg"
              disabled={loading}
              onChange={(value) =>
                formik.setFieldValue(`passengers[${index}].gender`, value)
              }
            >
              <Option value="M">{t.passengerForm?.male}</Option>
              <Option value="F">{t.passengerForm?.female}</Option>
            </Select>
            {formik.errors?.passengers?.[index]?.gender &&
              formik.touched?.passengers?.[index]?.gender && (
                <span className="absolute -bottom-4 left-0 text-xxs text-red-500">
                  {formik.errors?.passengers?.[index]?.gender}
                </span>
              )}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:mt-5 lg:gap-5">
          <div className="relative">
            <Label
              htmlFor="reservation-form-country-code"
              className="mb-1 ml-1 text-[10px] lg:hidden"
            >
              {t.passengerForm?.nationality}
            </Label>
            <Select
              placeholder={t.passengerForm?.nationality}
              className="h-10 w-full rounded-lg"
              options={countriesOptions}
              disabled={loading}
              showSearch
              onChange={(_, country: any) =>
                formik.setFieldValue(
                  `passengers[${index}].passport_country`,
                  country?.code
                )
              }
            />
            {formik.errors?.passengers?.[index]?.passport_country &&
              formik.touched?.passengers?.[index]?.passport_country && (
                <span className="absolute -bottom-4 left-0 text-xxs text-red-500">
                  {formik.errors?.passengers?.[index]?.passport_country}
                </span>
              )}
          </div>
          <div className="relative">
            <Label
              htmlFor="reservation-form-phone-number"
              className="mb-1 ml-1 mt-3 text-[10px] lg:hidden"
            >
              {t.passengerForm?.phoneNumber}
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
                borderRadius: 8,
              }}
              country={'md'}
            />
            {formik.errors?.passengers?.[index]?.phone &&
              formik.touched?.passengers?.[index]?.phone && (
                <span className="absolute -bottom-4 left-0 text-xxs text-red-500">
                  {formik.errors?.passengers?.[index]?.phone}
                </span>
              )}
          </div>
          <div className="relative">
            <Label
              htmlFor="reservation-form-email"
              className="mb-1 ml-1 text-[10px] lg:hidden"
            >
              {t.passengerForm?.emailAddress}
            </Label>
            <Input
              className="h-10 rounded-lg"
              type="text"
              name={formik.values.passengers?.[index]?.email}
              placeholder={t.passengerForm?.emailAddress + '*'}
              disabled={loading}
              onChange={(e) =>
                formik.setFieldValue(
                  `passengers[${index}].email`,
                  e.target.value
                )
              }
            />
            {formik.errors?.passengers?.[index]?.email &&
              formik.touched?.passengers?.[index]?.email && (
                <span className="absolute -bottom-4 left-0 text-xxs text-red-500">
                  {formik.errors?.passengers?.[index]?.email}
                </span>
              )}
          </div>
        </div>

        <Collapsible>
          <CollapsibleTrigger
            className="w-full"
            onClick={() => setVisibleAdditionalInfo(!visibleAdditionalInfo)}
          >
            <div className="mt-3 flex cursor-pointer items-center justify-between rounded-xl border border-[#E7E7E7] bg-[#F0F2FF] p-3 lg:mt-7">
              <div>
                <span className="text-xxs lg:text-sm">
                  {t.passengerForm?.addPassportData}
                </span>
                <span className="ml-4 rounded-lg bg-brand-blue px-2 py-1 text-xxs text-white">
                  {t.passengerForm?.optional}
                </span>
              </div>
              <Button
                className={`h-6 w-6 rounded-full p-0 lg:h-[32px] lg:w-[32px] ${visibleAdditionalInfo ? 'bg-white' : 'bg-brand-blue'}`}
              >
                <Image
                  src={visibleAdditionalInfo ? minus : plus}
                  alt="plus-icon"
                  width={12}
                  height={12}
                />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-3 grid grid-cols-1 gap-[10px] md:grid-cols-3 lg:mt-5 lg:flex-row lg:gap-5">
              <div>
                <Label className="mb-1 ml-1 mt-3 text-[10px] lg:hidden">
                  {t.passengerForm?.birthDate}
                </Label>
                <DatePicker
                  onKeyDown={handleCalendarKeyDown}
                  format={'DD.MM.YYYY'}
                  name={`passengers[${index}].date_of_birth`}
                  className="h-10 w-full rounded-lg"
                  placeholder={t.passengerForm?.birthDate}
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
                <Label className="mb-1 ml-1 mt-3 text-[10px] lg:hidden">
                  {t.passengerForm?.passportDate}
                </Label>
                <DatePicker
                  onKeyDown={handleCalendarKeyDown}
                  name={`passengers[${index}].passport_issued_at`}
                  format={'DD.MM.YYYY'}
                  className="h-10 w-full rounded-lg"
                  placeholder={t.passengerForm?.passportDate}
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
                <Label className="mb-1 ml-1 mt-3 text-[10px] lg:hidden">
                  {t.passengerForm?.passportExpire}
                </Label>
                <DatePicker
                  onKeyDown={handleCalendarKeyDown}
                  format={'DD.MM.YYYY'}
                  name={`passengers[${index}].passport_expires_at`}
                  className="h-10 w-full rounded-lg"
                  placeholder={t.passengerForm?.passportExpire}
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
                  className="mb-1 ml-1 text-[10px] lg:hidden"
                >
                  {t.passengerForm?.passportNumber}
                </Label>
                <Input
                  className="h-10 rounded-lg"
                  type="text"
                  name={`passengers[${index}].passport_number`}
                  disabled={loading}
                  placeholder={t.passengerForm?.passportNumber}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mt-4 lg:mt-0">
                <Upload {...uploadProps}>
                  <Button
                    type="primary"
                    disabled={loading}
                    className="custom-light-shadow flex h-10 min-w-full items-center justify-between rounded-lg bg-brand-blue px-4 font-light text-white hover:bg-brand-blue lg:justify-center lg:px-8"
                  >
                    <span className="mr-2">
                      {t.passengerForm?.passportImage}
                    </span>
                    <Image src={passportSvg} alt={'passport image'} />
                  </Button>
                </Upload>
              </div>
              {formik.values.passengers?.[index]?.passport_id && (
                <div className="relative flex flex-col items-start gap-2 lg:flex-row">
                  <p className="flex flex-col text-xs">
                    <span className="mb-2 text-gray-500">
                      {t.passengerForm?.imageLoaded}:
                    </span>{' '}
                    <span className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
                      {files[index].split('/').pop()}
                    </span>
                  </p>
                  <Button
                    type="link"
                    onClick={() => {
                      formik.setFieldValue(
                        `passengers[${index}].passport_id`,
                        ''
                      )
                      setFiles([])
                    }}
                    className="h-4 p-0 text-xs text-red-500 lg:text-xxs"
                  >
                    {t.passengerForm?.eraseImage}
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator className="mb-[10px] mt-6 bg-[#E7E7E7] lg:my-8" />

        {showBaggage && (
          <BaggageSection
            formik={formik}
            index={index}
            bagsPrice={bagsPrice}
            t={t}
            lang={lang}
          />
        )}
      </ReservationCard>

      <OnlineCheckinSection formik={formik} index={index} t={t} lang={lang} />
    </>
  )
}
const BaggageSection = ({
  formik,
  index,
  bagsPrice,
  t,
  lang,
}: {
  formik: any
  index: number
  bagsPrice: any
  t: any
  lang: string
}) => {
  const bags: IBags[] = [
    {
      id: 'bagaj_de_mana',
      size: '20 x 40 x 50 cm',
      name: {
        ro: 'Bagaj de mână',
        ru: 'Ручная кладь',
      },
      imageUrl: tenKgSvg,
      type: '10kg',
    },
    {
      id: 'bagaj_de_cala',
      size: '28 x 52 x 78 cm',
      name: {
        ro: 'Bagaj de cală',
        ru: 'Багаж',
      },
      imageUrl: twentyKgSvg,
      type: '20kg',
    },
  ]

  return (
    <section className="grid gap-[10px] lg:grid-cols-3 lg:justify-center lg:gap-6">
      <div>
        <Card className="baggage-card-shadow flex justify-between rounded-xl text-center lg:mb-4 lg:h-[244px] lg:flex-col">
          <CardHeader className="flex flex-1 flex-row items-center justify-center gap-5 space-y-0 px-5 py-3 lg:min-h-[169px] lg:max-w-none lg:flex-1 lg:flex-col lg:justify-end lg:gap-0">
            <Image
              src={eightKgSvg}
              alt="bag"
              height={75}
              className="w-[34px] select-none lg:mb-3 lg:mr-0 lg:w-16"
            />

            <div className="w-full text-left lg:text-center">
              <span className="text-xs text-[#757575]">20 x 30 x 40 cm</span>
              <div className="w-full lg:hidden">
                <h6 className="text-xs font-medium lg:text-sm">
                  {t.passengerForm?.personalBaggage}
                </h6>
              </div>
            </div>
            <div className="block whitespace-nowrap text-xxs font-medium text-[#288E3E] lg:hidden">
              {t.passengerForm?.freeIncluded}
            </div>
          </CardHeader>

          {/*desktop*/}
          <CardContent className="mt-auto hidden min-h-14 rounded-xl bg-brand-light-blue p-2 lg:block">
            <h6 className="text-sm font-medium">
              {t.passengerForm?.personalBaggage}
            </h6>
            <div className="text-sm font-light text-green-600">
              {t.passengerForm?.freeIncluded}
            </div>
          </CardContent>
        </Card>
      </div>
      {bags.map((bag, bagIndex) => (
        <div key={bag.id}>
          <Card className="baggage-card-shadow flex justify-between rounded-xl text-center lg:mb-4 lg:h-[244px] lg:flex-col">
            <CardHeader className="padding-right-none flex max-w-72 flex-1 flex-row items-center justify-center gap-5 py-3 pl-5 lg:min-h-[169px] lg:max-w-none lg:flex-col lg:justify-end lg:gap-0 lg:px-5">
              <Image
                src={bag.imageUrl}
                alt="bag"
                height={75}
                className="w-[34px] select-none lg:mb-3 lg:mr-0 lg:w-16"
              />

              <div className="w-full border-r-[1px] border-[#E7E7E7] text-left lg:border-0 lg:text-center">
                <span className="text-xs text-[#757575]">{bag.size}</span>
                <div className="w-full lg:hidden">
                  <BagTypeAndPrice
                    bag={bag}
                    bagsPrice={bagsPrice}
                    index={bagIndex}
                    lang={lang}
                  />
                </div>
              </div>
            </CardHeader>

            {/*mobile*/}
            <CardContent className="flex-2 flex w-28 items-center px-5 py-3 lg:hidden ">
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
                lang={lang}
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
  name: {
    [key: string]: string
  }
  imageUrl: string
  hideInput?: boolean
  type: string
}

const BagTypeAndPrice = ({
  bag,
  bagsPrice,
  index,
  lang,
}: {
  bag: IBags
  bagsPrice: any
  index: number
  lang: string
}) => {
  return (
    <>
      <h6 className="text-xs font-medium lg:text-sm">{bag.name[lang]}</h6>
      <p
        className={cn('mt-0.5 text-[10px] text-green-600 lg:block lg:text-xs', {
          hidden: bag.hideInput,
        })}
      >
        {Math.round(bagsPrice[index + 1])} €
      </p>
    </>
  )
}

const OnlineCheckinSection = ({ formik, index, t, lang }: any) => {
  return (
    <ReservationCard
      className="relative cursor-pointer"
      onClick={() =>
        formik.setFieldValue(
          `passengers[${index}].isOnlineCheckIn`,
          !formik.values?.passengers?.[index]?.isOnlineCheckIn
        )
      }
    >
      <main className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <h6 className="flex items-center text-base font-medium">
              {t.passengerForm?.onlineCheckIn}
            </h6>
            <span className="rounded-full bg-brand-yellow px-3 py-1 text-xxs">
              {t.passengerForm?.popular}
            </span>
          </div>
          <Checkbox
            className="ml-auto"
            name={`passengers[${index}].isOnlineCheckIn`}
            onChange={formik.handleChange}
            checked={formik.values?.passengers?.[index]?.isOnlineCheckIn}
          />
        </div>

        <ul className="select-none text-sm font-normal text-[#7E7E7E]">
          <li className="mt-3 flex items-center">
            <CheckMark className="mt-1 w-3 lg:mt-0.5" />
            {servicesComments.a[lang]}
          </li>
          <li className="mt-2 flex items-center">
            <CheckMark className="mt-1 w-3 lg:mt-0.5" />
            {servicesComments.b[lang]}
          </li>
          <li className="mt-2 flex items-center">
            <CheckMark className="mt-1 w-3 lg:mt-0.5" />
            {servicesComments.c[lang]}
          </li>
        </ul>
        <Divider className="my-3" />
        <div className="flex items-center space-x-2">
          <div className="ml-1 h-auto text-sm font-normal">
            {servicesComments.add[lang]}
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

const servicesComments: any = {
  a: {
    ro: ' Dacă nu achiziționezi acest serviciu, va fi necesar să efectuezi check-in-ul independent',
    ru: 'Если вы не приобретаете эту услугу, вам придется самостоятельно проходить регистрацию на рейс',
  },
  b: {
    ro: ' Economisești timp și bani: check-in-ul direct la aeroport poate genera cheltuieli suplimentare sau întârzieri',
    ru: 'Экономьте время и деньги: регистрация на рейс в аэропорту может вызвать дополнительные расходы или задержки',
  },
  c: {
    ro: ' Emitem cărțile de îmbarcare la timp',
    ru: 'Мы выдаем посадочные талоны вовремя',
  },
  add: {
    ro: 'Adaugă €8.99 per pasager',
    ru: 'Добавить €8.99 за пассажира',
  },
}
