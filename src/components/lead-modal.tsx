import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Drawer, Button, notification, Grid } from 'antd'
import PhoneInput from 'react-phone-input-2'
import operator from '@/assets/img/operator.png'
import 'react-phone-input-2/lib/style.css'
import axs from '@/lib/axios'

const { useBreakpoint } = Grid

export default function LeadModal() {
  const screens = useBreakpoint()
  const [openModal, setOpenModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [api, contextHolder] = notification.useNotification()

  const onClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    if (screens.xs) {
      setTimeout(() => {
        setOpenModal(true)
      }, 2000)
    }
  }, [screens])

  const handlePhoneChange = useCallback((phone: string) => {
    console.log({ phone })

    setPhone(phone)
  }, [])

  const handleSubmit = useCallback(() => {
    console.log({ phone })

    axs
      .post('/create-lead', { phone })
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
      })
      .catch((err) => {
        console.log(err)
      })
  }, [phone, api])
  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={openModal}
      height={400}
      className="home-drawer rounded-tl-[20px] rounded-tr-[20px]"
    >
      {contextHolder}
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
