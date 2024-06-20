'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { Button, Drawer, notification } from 'antd'
import { Grid } from 'antd'
import gsap from 'gsap'
import PhoneInput from 'react-phone-input-2'
import operator from '@/assets/img/operator.png'
import plane from '@/assets/img/plane.png'
import axs from '@/lib/axios'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'
import 'react-phone-input-2/lib/style.css'

const { useBreakpoint } = Grid

export const Banner = () => {
  const screens = useBreakpoint()
  const [phone, setPhone] = useState('')
  const [api, contextHolder] = notification.useNotification()

  const [openModal, setOpenModal] = useState(false)
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    gsap.fromTo('.banner-title', { y: -20, opacity: 0 }, { y: 0, opacity: 1 })
    gsap.fromTo(
      '.banner-sub',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5 }
    )
    gsap.fromTo(
      '.search-bar',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, delay: 1, duration: 1.5 }
    )
    gsap.fromTo(
      '.banner-image',
      { scale: 0.2 },
      { scale: 1, opacity: 1, duration: 4 }
    )
  })

  const onClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    if (screens.xs) {
      setTimeout(() => {
        setOpenModal(true)
      }, 3000)
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
    <section className="mb-32 max-[1440px]:px-5 max-[1024px]:px-0 lg:mb-56">
      {contextHolder}
      <div className="absolute left-0 top-0 z-0 h-full w-full rounded-b-[40px] bg-brand-blue lg:h-[650px]">
        <div className="relative h-full w-full">
          <Image
            fill
            className="banner-image h-full rounded-b-[50px] object-contain opacity-0"
            src={plane}
            alt="'plane"
            priority
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-2 flex flex-col items-center lg:mb-14">
          <h1 className="banner-title mb-8 text-2xl  font-medium text-white opacity-0  lg:text-[44px]">
            Începe Călătoria Ta
          </h1>
          <p className="banner-sub hidden w-[386px] text-center text-sm font-light text-white opacity-0 lg:block">
            Lorem ipsum dolor sit amet consectetur. Interdum non ultrices tortor
            faucibus dis eget. Urna porttitor eget tincidunt sagittis est ac
            aliquet.
          </p>
        </div>

        <div className="search-bar opacity-0">
          <SearchBarWithTabs />
        </div>
      </div>

      <Drawer
        placement="bottom"
        onClose={onClose}
        open={openModal}
        height={400}
        className="home-drawer rounded-tl-[20px] rounded-tr-[20px]"
      >
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
    </section>
  )
}
