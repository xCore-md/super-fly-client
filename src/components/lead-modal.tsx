import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Drawer, Button, notification, Grid } from 'antd'
import dayjs from 'dayjs'
import PhoneInput from 'react-phone-input-2'
import leadSecondModal from '@/assets/img/lead-second-modal.png'
import operator from '@/assets/img/operator.png'
import { useFlightContext } from '@/context/flight-context'
import axs from '@/lib/axios'
import 'react-phone-input-2/lib/style.css'

const { useBreakpoint } = Grid

interface IProps {
  closable?: boolean
  delay?: number
}

export default function LeadModal({ closable = false, delay }: IProps) {
  const screens = useBreakpoint()
  const [openModal, setOpenModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [api, contextHolder] = notification.useNotification()
  const { flight } = useFlightContext()

  const onClose = () => {
    setOpenModal(false)
  }
  const showDelay = delay || 2000

  useEffect(() => {
    const lead = localStorage.getItem('lead')
    if (screens.xs && !lead) {
      setTimeout(() => {
        setOpenModal(true)
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
          fly_from: flight?.fly_from?.code,
          fly_to: flight?.fly_to?.code,
          date_from: dayjs(flight?.date_from).format('DD/MM/YYYY'),
          return_to: flight?.return_to
            ? dayjs(flight?.return_to).format('DD/MM/YYYY')
            : '',
          adults: flight?.adults,
          children: flight?.children,
          infants: flight?.infants,
        }

    axs
      .post('/create-lead', { ...data })
      .then(() => {
        setOpenModal(false)
        setPhone('')
        api.success({
          message: '',
          description:
            'Vă mulțumim pentru interesul acordat! Operatorii noștri vă vor contacta în scurt timp!',
          placement: 'bottomRight',
          duration: 4,
          closable: true,
        })

        localStorage.setItem('lead', JSON.stringify(data))
      })
      .catch((err) => {
        console.log({ err })
        api.error({
          message: 'Eroare',
          description: 'A apărut o eroare, vă rugăm să încercați din nou!',
          placement: 'bottomRight',
          duration: 4,
          closable: true,
        })
      })
  }, [phone, api, closable])

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={openModal}
      maskClosable={closable}
      closable={closable}
      height={closable ? 400 : 570}
      className={`home-drawer rounded-tl-[20px] rounded-tr-[20px] ${closable ? '' : 'blue-bg'}`}
    >
      {contextHolder}
      <div
        className={`flex flex-col items-center text-center ${closable ? '' : 'pt-14'}`}
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
            <Image
              src={leadSecondModal}
              alt="modal-banner"
              className="mb-6 mt-8 w-full"
            />
          </div>
        )}
        <PhoneInput
          containerClass="mt-4"
          inputStyle={{
            width: '100%',
            border: '1px solid #E7E7E7',
          }}
          country={'md'}
          value={phone}
          inputProps={{
            autoFocus: true,
          }}
          onChange={handlePhoneChange}
        />
        <Button
          onClick={handleSubmit}
          className="green-button mt-6 h-10 w-full rounded-full  border-0 text-sm "
        >
          Obține ofertele
        </Button>
      </div>
    </Drawer>
  )
}
