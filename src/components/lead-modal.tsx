import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Drawer, Button, notification } from 'antd'
import dayjs from 'dayjs'
import PhoneInput from 'react-phone-input-2'
import checkIconLeadModal from '@/assets/img/check-icon-lead-modal.png'
import leadModalCompanies from '@/assets/img/lead-modal-companies.png'
import operator from '@/assets/img/operator.png'
import { useFlightContext } from '@/context/flight-context'
import { useTranslationsContext } from '@/context/translations-context'
import axs from '@/lib/axios'
import 'react-phone-input-2/lib/style.css'
import { gtagReportConversion } from '@/lib/hooks/googleTagManager'

interface IProps {
  closable?: boolean
  delay?: number
  country?: any
  dataLoaded?: boolean
}

export default function LeadModal({
  closable = false,
  delay,
  country,
}: IProps) {
  const [openModal, setOpenModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [api, contextHolder] = notification.useNotification()
  const { flight } = useFlightContext()
  const { lang } = useTranslationsContext()
  const [storageFlight, setStorageFlight] = useState<any>(null)

  const scrollTopFunc = () => {
    document.body.style.overflow = 'auto'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const onClose = () => {
    setOpenModal(false)
    scrollTopFunc()
  }

  useEffect(() => {
    const showDelay = delay || 2000
    const storageLead = localStorage.getItem('lead')
    const storageFlight = localStorage.getItem('flight')
    const lead = storageLead && JSON.parse(storageLead)
    const isExpired =
      lead && dayjs().diff(dayjs(lead?.expirationAt), 'minute') > 30

    if (storageFlight) {
      setStorageFlight(JSON.parse(storageFlight))
    }

    if (window.innerWidth <= 768) {
      if (!storageLead || isExpired) {
        setTimeout(() => {
          setOpenModal(true)
          document.body.style.overflow = 'hidden'
        }, showDelay)
      }
    }
  }, [])

  const handleChangePhoneNumber = useCallback(
    (inputValue: string, countryData: any) => {
      // Allow only numbers and a single "+" at the start

      setCountryCode(countryData.dialCode)
      if (/^(?:\+)?\d*$/.test(inputValue)) {
        setPhone(inputValue)
      }
    },
    []
  )

  const handleSubmit = useCallback(() => {
    const minPhoneLength = countryCode?.length + 8
    const maxPhoneLength = countryCode?.length + 15
    const invalidPhoneNumber =
      phone.length < minPhoneLength || phone.length > maxPhoneLength
    if (invalidPhoneNumber) {
      api.open({
        message: '',
        description: (
          <div>
            <h4 className="text-base font-medium">{info.attention[lang]}</h4>
            <p>{info.introducePhoneNumber[lang]}</p>
          </div>
        ),
        placement: 'topRight',
        closable: true,
      })
      return
    }
    const flightData = storageFlight || flight
    const data = closable
      ? { phone }
      : {
          phone,
          flight_from: flightData?.fly_from?.code,
          flight_to: flightData?.fly_to?.code,
          date_from: dayjs(flightData?.date_from).format('DD.MM.YYYY'),
          return_to: flightData?.return_to
            ? dayjs(flightData?.return_to).format('DD.MM.YYYY')
            : '',
          adults: flightData?.adults,
          children: flightData?.children,
          infants: flightData?.infants,
          expirationAt: dayjs(),
        }

    const storageLead = localStorage.getItem('lead')
    if (storageLead) {
      gtagReportConversion()
    }
    axs
      .post('/create-lead', { ...data })
      .then(() => {
        localStorage.setItem('lead', JSON.stringify(data))

        setOpenModal(false)
        setPhone('')
        api.success({
          message: '',
          description: info.notificationSuccessMessage[lang],
          placement: 'topRight',
          duration: 4,
          closable: true,
        })

        scrollTopFunc()
      })
      .catch((err) => {
        console.log({ err })
        api.open({
          message: '',
          description: (
            <div>
              <h4 className="text-base font-medium">{info.attention[lang]}</h4>
              <p>{info.introducePhoneNumber[lang]}</p>
            </div>
          ),
          placement: 'topRight',
          closable: true,
        })
      })
  }, [phone, api, closable])

  const afterOpenChange = (open: boolean) => {
    if (open) {
      const inputElement = document.getElementById('leadPhoneInputId')
      inputElement?.focus()
    }
  }

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={openModal}
      afterOpenChange={afterOpenChange}
      maskClosable={closable}
      closable={closable}
      height={closable ? 400 : 520}
      className={`home-drawer rounded-tl-[20px] rounded-tr-[20px] ${closable ? '' : 'blue-bg'}`}
    >
      {contextHolder}
      <div
        className={`flex flex-col items-center text-center ${closable ? '' : 'pt-[30px]'}`}
      >
        {closable ? (
          <div className="flex flex-col items-center text-center">
            <div className="flex w-full justify-center">
              <div className="relative w-24">
                <div className="pointer-events-none relative flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full bg-[#E1E1E1] ">
                  <Image
                    className=" h-[90%] w-[90%] translate-y-1 object-contain"
                    src={operator}
                    alt="operator"
                    priority
                  />
                </div>
                <span className="absolute right-1 top-4 animate-pulse rounded-full bg-green-400 p-1.5"></span>
              </div>
            </div>
            <p className="mt-2 text-lg font-semibold text-brand-blue">
              {info.firstModalTitle[lang]}
            </p>
            <p className="mt-1 max-w-72 text-sm font-light">
              {info.firstModalSubtitle[lang]}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <p className="font-medium text-white">
              {flight?.fly_from?.city || 'Milano'},{' '}
              {flight?.fly_to?.city || 'Italia'} {info.receiveDiscount[lang]}
            </p>
            <div className="mb-6 mt-8 flex w-full items-center justify-center">
              <div className="relative">
                <div className=" absolute right-[100px] top-0 flex h-[31px] w-[95px] items-center justify-center rounded-full rounded-br-none bg-[#11D2A4] text-xxs text-white shadow-lg">
                  <span>-30% {info.discount[lang]}</span>
                </div>
                <div className="absolute left-[105px] top-6 flex h-[31px] w-[95px] items-center justify-center rounded-full rounded-bl-none bg-[#11D2A4] text-xxs text-white shadow-lg">
                  <span>{info.directFlight[lang]}</span>
                </div>
                <div className=" absolute right-[70px] top-[110px] flex h-[31px] w-fit items-center justify-center text-nowrap rounded-full rounded-tr-none bg-[#11D2A4] px-2 text-xxs text-white shadow-lg">
                  <span>{info.freeCheckIn[lang]}</span>
                </div>
                <img
                  className="h-[120px] w-[120px] rounded-full object-cover"
                  src={country?.flags?.png}
                  alt="flag"
                />
              </div>
            </div>
            <div className="mb-2 mt-8">
              <Image className="px-4" src={leadModalCompanies} alt="img" />
            </div>

            <div className="mb-1 mt-2 flex w-full items-start gap-2">
              <Image
                width={20}
                height={20}
                className="h-5 w-5"
                src={checkIconLeadModal}
                alt="check-icon"
              />
              <span className="text-left text-xxs text-white">
                {info.benefits[lang]}
              </span>
            </div>
          </div>
        )}

        <div className="mt-2 w-full">
          <PhoneInput
            onChange={handleChangePhoneNumber}
            onKeyDown={(e) => {
              if (phone.length === 0 && e.key === '0') {
                e.preventDefault()
              }
            }}
            value={phone}
            preferredCountries={[
              'md',
              'es',
              'pt',
              'ru',
              'it',
              'ie',
              'de',
              'il',
            ]}
            preserveOrder={['preferredCountries']}
            inputStyle={{
              height: 42,
              width: '100%',
              borderRadius: 16,
              fontWeight: '400',
              outline: 'none',
              border: '1px solid #E7E7E7',
            }}
            containerClass="modal-phone-input"
            inputProps={{
              id: 'leadPhoneInputId',
              autoFocus: true,
              type: 'text',
              autoComplete: 'off',
            }}
            placeholder={info.fillPhoneNumber[lang]}
            country={'md'}
            countryCodeEditable={false}
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="green-button  mt-4 h-10 w-full rounded-full  border-0 text-sm "
        >
          {info.firstModalButtonLabel[lang]}
        </Button>
      </div>
    </Drawer>
  )
}

const info: any = {
  firstModalTitle: {
    ro: 'Fii Informat!',
    ru: 'Будьте в курсе!',
  },
  firstModalSubtitle: {
    ro: 'Introduce datele de contact, și operatorii noștri revin cu oferte personalizate.',
    ru: 'Введите контактные данные, и наши операторы предложат вам персонализированные предложения.',
  },
  firstModalButtonLabel: {
    ro: 'Obține ofertele',
    ru: 'Получить предложения',
  },
  fillPhoneNumber: {
    ro: 'Introduceți numărul de telefon',
    ru: 'Введите номер телефона',
  },
  receiveDiscount: {
    ro: 'obține reducere la primul zbor de -30%, și chek-in gratuit!',
    ru: 'получите скидку на первый рейс -30%, и бесплатный чек-ин!',
  },
  discount: {
    ro: 'reducere',
    ru: 'скидка',
  },
  directFlight: {
    ro: 'Zbor direct!',
    ru: 'Прямой рейс!',
  },
  freeCheckIn: {
    ro: 'Check-in gratuit!',
    ru: 'Бесплатный чек-ин!',
  },
  benefits: {
    ro: 'Beneficiază de oferte exclusive care nu sunt plasate online!',
    ru: 'Получите эксклюзивные предложения, которые не размещаются онлайн!',
  },
  attention: {
    ro: 'Atenție!',
    ru: 'Внимание!',
  },
  introducePhoneNumber: {
    ro: 'Introduceți numărul de telefon corect ✅',
    ru: 'Введите правильный номер телефона ✅',
  },
  notificationSuccessMessage: {
    ro: 'Vă mulțumim pentru interesul acordat! Operatorii noștri vă vor contacta în scurt timp!',
    ru: 'Спасибо за ваш интерес! Наши операторы свяжутся с вами в ближайшее время!',
  },
}
