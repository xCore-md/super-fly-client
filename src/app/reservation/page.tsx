import Image from 'next/image'
import React from 'react'
import img from '@/assets/img/img.png'
import { FlightsListing } from '@components/flights/flights-listing'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'

export default function Reservation() {
  return (
    <div className="mt-4 flex pb-10 pt-12">
      <section className="flex w-2/3 flex-col">
        <h2 className="text-xs font-bold">Informații zbor:</h2>

        <FlightsListing length={4} />

        <MainForm />

        <Button className="bg-brand-green mt-8 flex h-11 items-center justify-center rounded-full px-8 font-light text-white shadow-md shadow-slate-400">
          Rezervă acum
        </Button>
      </section>
      <aside className="flex w-1/3">
        {/*<Image src={img} alt={'img'} />*/}
      </aside>
    </div>
  )
}

const MainForm = () => {
  return (
    <div className="mt-14 rounded-2xl bg-white p-10 shadow-md">
      <div className="flex gap-5">
        <Input type="text" placeholder="Prenume*" />
        <Input type="text" placeholder="Nume*" />
      </div>
      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Codul tarii*" />
        <Input type="text" placeholder="Numar de telefon*" />
      </div>
      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Adresa de email*" />
      </div>

      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Prenume*" />
        <Input type="text" placeholder="Nume*" />
        <Input type="text" placeholder="Data nașterii*" />
      </div>
      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Număr document*" />
        <Input type="text" placeholder="Data Eliberării*" />
        <Input type="text" placeholder="Data Expirării*" />
      </div>
      <Button className="mt-8 flex h-11 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400">
        <span className="mr-1">Poza pașaport</span>
        <svg
          width="26"
          height="27"
          viewBox="0 0 26 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.78661 7.90625H7.5317C7.59821 6.69201 7.82366 5.59951 8.16607 4.7433C6.92902 5.33807 6.02232 6.50379 5.78661 7.90625ZM5.78661 9.34375C6.02277 10.7462 6.92902 11.9119 8.16607 12.5067C7.82321 11.6505 7.59821 10.558 7.5317 9.34375H5.78661ZM10 12.8787C10.3433 12.544 10.9272 11.3324 11.046 9.34375H8.95357C9.07277 11.332 9.6567 12.544 10 12.8787ZM8.95402 7.90625H11.0464C10.9277 5.91801 10.3438 4.70602 10.0004 4.37135C9.6567 4.70602 9.07277 5.91801 8.95402 7.90625ZM11.8339 12.5067C13.071 11.9119 13.9777 10.7462 14.2134 9.34375H12.4683C12.4018 10.558 12.1768 11.6505 11.8339 12.5067ZM18.5714 0H2.85714C1.27902 0 0 1.28701 0 2.875V20.125C0 21.713 1.27902 23 2.85714 23H18.5714C19.3603 23 20 22.3563 20 21.5625V1.4375C20 0.64373 19.3603 0 18.5714 0ZM15 18.6875H5C4.60714 18.6875 4.28571 18.3641 4.28571 17.9688C4.28571 17.5734 4.60714 17.25 5 17.25H15C15.3929 17.25 15.7143 17.5734 15.7143 17.9688C15.7143 18.3641 15.3929 18.6875 15 18.6875ZM10 14.375C6.8442 14.375 4.28571 11.8005 4.28571 8.625C4.28571 5.44947 6.8442 2.875 10 2.875C13.1558 2.875 15.7143 5.44947 15.7143 8.625C15.7143 11.8005 13.1558 14.375 10 14.375ZM11.8339 4.7433C12.1768 5.59951 12.4018 6.69201 12.4683 7.90625H14.2134C13.9777 6.50379 13.071 5.33807 11.8339 4.7433Z"
            fill="white"
          />
          <rect x="12" y="14" width="14" height="13" rx="6.5" fill="#3F4ED6" />
          <path
            d="M15.5 17.4663H16.8125L17.6875 16.5996H20.3125L21.1875 17.4663H22.5C22.7321 17.4663 22.9546 17.5576 23.1187 17.7201C23.2828 17.8826 23.375 18.1031 23.375 18.3329V23.5329C23.375 23.7628 23.2828 23.9832 23.1187 24.1458C22.9546 24.3083 22.7321 24.3996 22.5 24.3996H15.5C15.2679 24.3996 15.0454 24.3083 14.8813 24.1458C14.7172 23.9832 14.625 23.7628 14.625 23.5329V18.3329C14.625 18.1031 14.7172 17.8826 14.8813 17.7201C15.0454 17.5576 15.2679 17.4663 15.5 17.4663ZM19 18.7663C18.4198 18.7663 17.8634 18.9945 17.4532 19.4009C17.043 19.8072 16.8125 20.3583 16.8125 20.9329C16.8125 21.5076 17.043 22.0587 17.4532 22.465C17.8634 22.8713 18.4198 23.0996 19 23.0996C19.5802 23.0996 20.1366 22.8713 20.5468 22.465C20.957 22.0587 21.1875 21.5076 21.1875 20.9329C21.1875 20.3583 20.957 19.8072 20.5468 19.4009C20.1366 18.9945 19.5802 18.7663 19 18.7663ZM19 19.6329C19.3481 19.6329 19.6819 19.7699 19.9281 20.0137C20.1742 20.2575 20.3125 20.5882 20.3125 20.9329C20.3125 21.2777 20.1742 21.6084 19.9281 21.8522C19.6819 22.096 19.3481 22.2329 19 22.2329C18.6519 22.2329 18.3181 22.096 18.0719 21.8522C17.8258 21.6084 17.6875 21.2777 17.6875 20.9329C17.6875 20.5882 17.8258 20.2575 18.0719 20.0137C18.3181 19.7699 18.6519 19.6329 19 19.6329Z"
            fill="white"
          />
        </svg>
      </Button>

      <p className="mt-5">
        <span className="text-gray-500">Document încărcat:</span>{' '}
        <span>file321455xx45522668adasda65ss.jpg</span>
      </p>
      <p className="mt-1 text-red-500">Șterge poza</p>
    </div>
  )
}