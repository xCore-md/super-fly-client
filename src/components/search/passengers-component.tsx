import Image from 'next/image'
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import humanBlue from '@/assets/img/human-blue.svg'
import human from '@/assets/img/human.svg'
import infantsBlue from '@/assets/img/infants-blue.svg'
import infants from '@/assets/img/infants.svg'
import kidsBlue from '@/assets/img/kids-blue.svg'
import kids from '@/assets/img/kids.svg'
import { useState } from 'react'
import { useTranslationsContext } from '@/context/translations-context'
import { passengersInfoData } from '../search-components-desktop/search-passengers'

type TPassengers = 'adults' | 'children' | 'infants'

export function PassengersComponent({ formik, closeDrawer }: any) {
  const passengersProp = {
    adults: formik.values.adults || 0,
    children: formik.values.children || 0,
    infants: formik.values.infants || 0,
  }

  const { lang, translations: t } = useTranslationsContext()

  const [passengers, setPassengers] = useState(passengersProp)

  const passengersCount = passengers.adults + passengers.children

  const handleUpdatePassengersCount = (
    key: TPassengers,
    value: number,
    minusBtn?: boolean,
    field?: string
  ) => {
    // Condition 1: Disable update if passengersCount >= 9 and not reducing (except for infants)
    if (passengersCount >= 9 && !minusBtn && field !== 'infants') return

    // Condition 2: Reset infants count to 0 if adults count is changed and infants were more than adults
    if (field === 'adults' && passengers.infants > value) {
      setPassengers((prev) => ({ ...prev, infants: 0 }))
      formik.setFieldValue('infants', 0)
    }

    // Condition 3: Infants cannot exceed the adults count
    if (field === 'infants' && value > passengers.adults) return

    // Handle the decrement cases
    if (minusBtn) {
      // Prevent decreasing infants below 0
      if (field === 'infants' && passengers.infants === 0) return

      // Prevent reducing passengers count to below 1 for adults and children
      if (field !== 'infants' && passengersCount === 1) return
    }

    // Update the specific field
    setPassengers((prev) => ({ ...prev, [key]: value }))
    formik.setFieldValue(key, value)
  }

  const ableToSubmit =
    passengersCount > 0 &&
    formik.values.fly_from.city &&
    formik.values.fly_to.city &&
    formik.values.date_from

  return (
    <div>
      <div className="custom-shadow relative z-50 flex items-center gap-4 rounded-full bg-white px-4 py-2">
        <Image src={humanBlue} alt="icon" />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase text-brand-blue">
            {t.searchBar?.passengers}
          </span>
          <span className="text-xs font-bold">
            {passengersCount}{' '}
            {passengersCount > 1
              ? t.searchBar?.passengers
              : t.searchBar?.passenger}
          </span>
        </div>
      </div>
      <div className="custom-shadow z-10 -mt-8 rounded-lg rounded-b-xl px-4 pb-4 pt-16">
        {passengersInfoData.map(
          ({ title, description, key, img, img2 }: any) => (
            <div key={key} className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={
                    passengers[key as keyof typeof passengers] > 0 ? img2 : img
                  }
                  className="h-8 w-8"
                  alt="icon"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase">
                    {title[lang]}
                  </span>
                  <span className="text-xs font-light">
                    {description[lang]}
                  </span>
                </div>
              </div>
              <div className="flex select-none items-center gap-2">
                <Button
                  className="btn-primary-custom"
                  type="primary"
                  disabled={passengers[key as TPassengers] === 0}
                  shape="circle"
                  onClick={() =>
                    handleUpdatePassengersCount(
                      key as TPassengers,
                      passengers[key as TPassengers] - 1,
                      true,
                      key
                    )
                  }
                  icon={
                    <MinusOutlined
                      style={{
                        color:
                          passengers[key as TPassengers] === 0
                            ? '#000'
                            : '#fff',
                      }}
                    />
                  }
                />
                <span className="w-4 text-center text-base text-black">
                  {passengers[key as TPassengers]}
                </span>
                <Button
                  className="btn-primary-custom"
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined style={{ color: '#fff' }} />}
                  onClick={() =>
                    handleUpdatePassengersCount(
                      key as TPassengers,
                      passengers[key as TPassengers] + 1,
                      false,
                      key
                    )
                  }
                />
              </div>
            </div>
          )
        )}
      </div>
      <Button
        size="large"
        disabled={!ableToSubmit}
        className="btn-primary mt-4 flex w-full items-center justify-center gap-1 rounded-full font-light disabled:bg-brand-blue disabled:opacity-55"
        onClick={() => closeDrawer()}
      >
        <span className="tracking-wide text-white">{t.searchBar?.confirm}</span>
        <SearchOutlined style={{ color: '#fff' }} />
      </Button>
    </div>
  )
}
