import { Label } from '@radix-ui/react-label'
import { Button } from 'antd'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import human from '@/assets/img/human.svg'
import humanBlue from '@/assets/img/human-blue.svg'
import kids from '@/assets/img/kids.svg'
import kidsBlue from '@/assets/img/kids-blue.svg'
import infants from '@/assets/img/infants.svg'
import infantsBlue from '@/assets/img/infants-blue.svg'
import { useIsMobile } from '@/lib/hooks/usIsMobile'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useTranslationsContext } from '@/context/translations-context'

interface IProps {
  onClickField: any
  formik: any
  openFields: any
  applyPassengers: any
}

export function SearchPassengers(props: IProps) {
  const { onClickField, formik, applyPassengers, openFields } = props
  const { translations: t } = useTranslationsContext()

  const isMobile = useIsMobile()

  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setShowDropdown(openFields.passengers)
  }, [openFields, isMobile])

  const [passengersObject, setPassengersObject] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  })

  useEffect(() => {
    setPassengersObject({
      adults: formik.values.adults || 0,
      children: formik.values.children || 0,
      infants: formik.values.infants || 0,
    })
  }, [formik.values.adults, formik.values.children, formik.values.infants])

  const updatePassengersCount = (key: string, value: number) => {
    formik.setFieldValue(key, value)
    setPassengersObject((prev) => ({ ...prev, [key]: value }))
  }

  const handleShowDropdown = useCallback(() => {
    onClickField('passengers')
  }, [showDropdown])

  const submitPassengers = () => {
    applyPassengers(passengersObject)
    setShowDropdown(false)
    onClickField('passengers')
  }

  const passengersCount = Object.values(passengersObject).reduce(
    (a, b) => a + b
  )

  return (
    <div className="relative flex min-w-28 items-center gap-1 pl-5 max-[1024px]:mt-2 max-[1024px]:w-full max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:py-2 md:pl-2">
      <Image
        className="h-4 w-3 md:h-6 md:w-4"
        src={showDropdown ? humanBlue : human}
        alt="image"
        width={14}
        height={14}
      />
      <div
        className="ml-1 flex w-full flex-col items-start justify-start gap-0.5"
        onClick={handleShowDropdown}
      >
        <Label
          className={`pointer-events-none text-[8px] font-semibold uppercase  ${showDropdown ? 'text-brand-blue' : 'text-gray-400'}`}
        >
          {t.searchBar?.passengers}
        </Label>

        <span className="flex w-full cursor-pointer select-none justify-start gap-1 text-xs font-semibold text-slate-500 md:text-xxs">
          <span>{passengersCount || ''}</span>
          <span>
            {t.searchBar?.passengers}
            {passengersCount > 1 ? 'i' : ''}
          </span>
        </span>
      </div>

      {showDropdown && (
        <PopoverContent
          passengers={passengersObject}
          updatePassengersCount={updatePassengersCount}
          submitPassengers={submitPassengers}
        />
      )}
    </div>
  )
}

type TPassengers = 'adults' | 'children' | 'infants'

interface IPopoverContent {
  passengers: {
    adults: number
    children: number
    infants: number
  }

  updatePassengersCount: any
  submitPassengers: () => void
}
const PopoverContent = ({
  passengers,
  updatePassengersCount,
  submitPassengers,
}: IPopoverContent) => {
  const { lang, translations: t } = useTranslationsContext()
  const handleUpdatePassengersCount = (key: TPassengers, value: number) => {
    const currentCount = Object.values(passengers).reduce((a, b) => a + b)

    if (value < 0 || (currentCount <= 1 && value === 0)) return

    updatePassengersCount(key, value)
  }

  return (
    <div
      className={`dropdown-shadow absolute left-0 top-[37px] z-20 h-auto w-full min-w-[172px] rounded-b-3xl bg-white`}
    >
      <div className="searchDropDownShadow flex w-full flex-col gap-y-4 px-2 py-4">
        {passengersInfoData.map(
          ({ title, img, img2, description, key }: any) => (
            <div className="flex items-center justify-between" key={key}>
              <div className="flex items-center gap-1">
                <Image
                  src={
                    passengers[key as keyof typeof passengers] > 0 ? img2 : img
                  }
                  alt="image"
                  className="h-5 w-4"
                />
                <div className="flex flex-col">
                  <h4 className="text-xxs font-bold text-black">
                    {title[lang]}
                  </h4>
                  <span className="text-[6px] text-gray-500">
                    {description[lang]}
                  </span>
                </div>
              </div>
              <div className="flex select-none items-center gap-1">
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  style={{ width: 16, height: 16, minWidth: 16 }}
                  icon={<LeftOutlined style={{ width: 8 }} />}
                  className={` text-black ${passengers[key as TPassengers] === 0 ? 'text-black' : 'text-white'}`}
                  disabled={passengers[key as TPassengers] === 0}
                  onClick={() =>
                    handleUpdatePassengersCount(
                      key as TPassengers,
                      passengers[key as TPassengers] - 1
                    )
                  }
                />

                <span className="w-3 pt-0.5 text-center text-sm font-bold text-black">
                  {passengers[key as TPassengers]}
                </span>
                <Button
                  type="primary"
                  size="small"
                  style={{ width: 16, height: 16, minWidth: 16 }}
                  shape="circle"
                  icon={<RightOutlined style={{ width: 8 }} />}
                  className=""
                  onClick={() =>
                    handleUpdatePassengersCount(
                      key as TPassengers,
                      passengers[key as TPassengers] + 1
                    )
                  }
                />
              </div>
            </div>
          )
        )}
      </div>

      <div className="mb-5 mt-1 flex justify-center">
        <Button
          type="primary"
          className="custom-light-shadow h-6 w-[98px] rounded-full bg-[#596AD9] text-xxs font-semibold"
          onClick={() => submitPassengers()}
        >
          {t.searchBar?.confirm}
        </Button>
      </div>
    </div>
  )
}

export const passengersInfoData: any = [
  {
    title: {
      ro: 'Adulți',
      ru: 'Взрослые',
    },
    description: {
      ro: 'Mai mult de 12 ani',
      ru: 'Старше 12 лет',
    },
    img: human,
    img2: humanBlue,
    key: 'adults',
  },
  {
    title: {
      ro: 'Copii',
      ru: 'Дети',
    },
    description: {
      ro: '2-12 ani',
      ru: 'От 2 до 12 лет',
    },
    img: kids,
    img2: kidsBlue,
    key: 'children',
  },
  {
    title: {
      ro: 'Infanți',
      ru: 'Младенцы',
    },
    description: {
      ro: 'Pînă la 2 ani, fără loc',
      ru: 'До 2 лет, без места',
    },
    img: infants,
    img2: infantsBlue,
    key: 'infants',
  },
]
