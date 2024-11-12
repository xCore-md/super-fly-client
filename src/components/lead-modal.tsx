import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Drawer, Button, notification, Grid } from 'antd'
import dayjs from 'dayjs'
import PhoneInput from 'react-phone-input-2'
import checkIconLeadModal from '@/assets/img/check-icon-lead-modal.png'
import leadModalCompanies from '@/assets/img/lead-modal-companies.png'
import operator from '@/assets/img/operator.png'
import { useFlightContext } from '@/context/flight-context'
import axs from '@/lib/axios'
import 'react-phone-input-2/lib/style.css'

const { useBreakpoint } = Grid

interface IProps {
  closable?: boolean
  delay?: number
  country?: any
}

export default function LeadModal({
  closable = false,
  delay,
  country,
}: IProps) {
  const screens = useBreakpoint()
  const [openModal, setOpenModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [api, contextHolder] = notification.useNotification()
  const { flight } = useFlightContext()

  const onClose = () => {
    setOpenModal(false)
    document.body.style.overflow = 'auto'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const showDelay = delay || 2000

  useEffect(() => {
    const lead = localStorage.getItem('lead')
    const isExpired =
      lead && dayjs().diff(dayjs(JSON.parse(lead).expirationAt), 'minutes') > 30

    if (screens.xs && (!lead || isExpired)) {
      setTimeout(() => {
        setOpenModal(true)
        document.body.style.overflow = 'hidden'
      }, showDelay)
    }
  }, [screens, showDelay])

  const handlePhoneChange = useCallback((phone: string) => {
    return setPhone(phone)
  }, [])

  const handleSubmit = useCallback(() => {
    const data = closable
      ? { phone }
      : {
          phone,
          flight_from: flight?.fly_from?.code,
          flight_to: flight?.fly_to?.code,
          date_from: dayjs(flight?.date_from).format('DD.MM.YYYY'),
          return_to: flight?.return_to
            ? dayjs(flight?.return_to).format('DD.MM.YYYY')
            : '',
          adults: flight?.adults,
          children: flight?.children,
          infants: flight?.infants,
          expirationAt: dayjs(),
        }

    axs
      .post('/create-lead', { ...data })
      .then(() => {
        document.body.style.overflow = 'auto'
        setOpenModal(false)
        setPhone('')
        api.success({
          message: '',
          description:
            'Vă mulțumim pentru interesul acordat! Operatorii noștri vă vor contacta în scurt timp!',
          placement: 'topRight',
          duration: 4,
          closable: true,
        })

        localStorage.setItem('lead', JSON.stringify(data))
      })
      .catch((err) => {
        console.log({ err })
        api.error({
          message: 'Eroare',
          description: (
            <div>
              <h4 className="text-base font-medium">Atenție!</h4>
              <p>Introduceți numărul de telefon corect ✅</p>
            </div>
          ),
          placement: 'topRight',
          closable: true,
        })
      })
  }, [phone, api, closable])

  const afterOpenChange = (open: boolean) => {
    if (open) {
      const inputElement = document.getElementById('leadPhoneInputRef')
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
              Fii Informat!
            </p>
            <p className="mt-1 max-w-72 text-sm font-light">
              Introduce datele de contact, și operatorii noștri revin cu oferte
              personalizate.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <p className="font-medium text-white">
              {flight?.fly_from?.city || 'Milano'},{' '}
              {flight?.fly_to?.city || 'Italia'} obține reducere la primul zbor
              de -30%, și chek-in gratuit!
            </p>
            <div className="mb-6 mt-8 flex w-full items-center justify-center">
              <div className="relative">
                <div className=" absolute right-[100px] top-0 flex h-[31px] w-[95px] items-center justify-center rounded-full rounded-br-none bg-[#11D2A4] text-xxs text-white shadow-lg">
                  <span>-30% reducere</span>
                </div>
                <div className="absolute left-[105px] top-6 flex h-[31px] w-[95px] items-center justify-center rounded-full rounded-bl-none bg-[#11D2A4] text-xxs text-white shadow-lg">
                  <span>Zbor direct!</span>
                </div>
                <div className=" absolute right-[70px] top-[110px] flex h-[31px] w-[95px] items-center justify-center rounded-full rounded-tr-none bg-[#11D2A4] text-xxs text-white shadow-lg">
                  <span>Check-in gratuit!</span>
                </div>
                <img
                  className="h-[120px] w-[120px] rounded-full"
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
                Beneficiază de oferte exclusive care <br /> nu sunt plasate
                online!
              </span>
            </div>
          </div>
        )}
        <PhoneInput
          containerClass="mt-2"
          inputStyle={{
            width: '100%',
            border: '1px solid #E7E7E7',
          }}
          country={'md'}
          value={phone}
          onFocus={() => document.getElementById('leadPhoneInputRef')?.focus()}
          inputProps={{
            id: 'leadPhoneInputRef',
            tabIndex: 0,
          }}
          onChange={handlePhoneChange}
        />
        <Button
          onClick={handleSubmit}
          className="green-button  mt-4 h-10 w-full rounded-full  border-0 text-sm "
        >
          Obține ofertele
        </Button>
      </div>
    </Drawer>
  )
}
