import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { Modal } from 'antd'
import clock from '@/assets/img/clock.svg'
import mail from '@/assets/img/mail.svg'
import marker from '@/assets/img/marker.svg'
import phone from '@/assets/img/phone.svg'
import { Button } from '@components/ui/button'

const OurOfficeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <div>
      <Button
        variant="ghost"
        className="flex h-9 w-full items-center justify-center gap-4 rounded-full bg-brand-green lg:bg-brand-light-blue"
        onClick={showModal}
      >
        <span className="hidden text-xxs text-brand-blue lg:block">
          Achitare la oficiul nostru
        </span>
        <span className="block text-xxs text-white lg:hidden">
          Oficiul nostru
        </span>
      </Button>
      <Modal
        title=""
        onCancel={closeModal}
        onClose={closeModal}
        open={isModalOpen}
        footer={null}
      >
        <h2 className="mt-4 text-center text-2xl font-semibold text-brand-blue">
          Contactează-ne
        </h2>
        <div className="rounded-2xl bg-white p-12 shadow-md">
          <ul className="flex flex-col gap-6">
            <li className="flex w-full justify-between border-b-[1px] border-b-gray-200 pb-4 ">
              <Link
                href="tel:+(373) 60 456 654"
                className="flex items-center gap-4"
              >
                <span className="text-sm font-semibold">Telefon:</span>
                <span className="text-sm font-medium text-gray-600">
                  +(373) 60 456 654
                </span>
              </Link>
              <Image src={phone} alt="icon" />
            </li>
            <li className="flex w-full justify-between border-b-[1px] border-b-gray-200 pb-4 ">
              <Link
                href="mailto:info@superfly.md"
                className="flex items-center gap-4"
              >
                <span className="text-sm font-semibold">Email:</span>
                <span className="text-sm font-medium text-gray-600">
                  info@superfly.md
                </span>
              </Link>
              <Image src={mail} alt="icon" />
            </li>
            <li className="flex w-full justify-between border-b-[1px] border-b-gray-200 pb-4 ">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Adresa:</span>
                <span className="text-sm font-medium text-gray-600">
                  str. A. Sciusev 62a
                </span>
              </div>
              <Image src={marker} alt="icon" />
            </li>
            <li className="flex w-full justify-between ">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">
                  Graficul de lucru:
                </span>
                <span className="text-sm font-medium text-gray-600">
                  Luni-Duminică, 9:00-18:00
                </span>
              </div>
              <Image src={clock} alt="icon" />
            </li>
          </ul>
        </div>

        <iframe
          className="mt-5 h-[300px] w-full rounded-[20px] border-0 border-gray-200 focus:border-0 focus-visible:border-0"
          loading="lazy"
          id="mapWithOurLocation"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.053308026205!2d28.826282677124617!3d47.01955862833004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c2df05fe8e7%3A0xb9598dac3f330e65!2zU3RyYWRhIEFsZXhlaSDFnmNpdXNldiA2MkEsIENoaciZaW7Eg3UsINCc0L7Qu9C00L7QstCw!5e0!3m2!1sru!2s!4v1722370156015!5m2!1sru!2s"
        ></iframe>
      </Modal>
    </div>
  )
}
export default OurOfficeModal
