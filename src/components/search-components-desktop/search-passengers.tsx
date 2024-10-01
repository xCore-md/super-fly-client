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

interface IProps {
  onClickField: any
  formik: any
  openFields: any
  applyPassengers: any
}

export function SearchPassengers(props: IProps) {
  const { onClickField, formik, applyPassengers, openFields } = props

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

  return (
    <div className="relative flex items-center gap-2 pl-4 max-[1024px]:mt-2 max-[1024px]:w-full max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:py-2 max-[1024px]:pl-6 md:min-w-[240px]">
      <Image
        className="max-[1024px]:h-8 max-[1024px]:w-3"
        src={showDropdown ? humanBlue : human}
        alt="image"
        width={14}
        height={14}
      />
      <div
        className="ml-1 flex w-full max-w-sm flex-col items-start justify-start pr-4 pt-2"
        onClick={handleShowDropdown}
      >
        <Label
          className={`pointer-events-none text-xs font-semibold uppercase  ${showDropdown ? 'text-brand-blue' : 'text-gray-400'}`}
        >
          PASAGERI
        </Label>

        <span className="flex h-8 w-full cursor-pointer select-none justify-start  py-1.5 text-sm font-semibold text-slate-500">
          <span
            className={
              Object.values(passengersObject).reduce((a, b) => a + b) > 0
                ? 'flex w-4'
                : ''
            }
          >
            {Number(Object.values(passengersObject).reduce((a, b) => a + b)) ||
              ''}
          </span>
          <span> Passengers</span>
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
  const handleUpdatePassengersCount = (key: TPassengers, value: number) => {
    const currentCount = Object.values(passengers).reduce((a, b) => a + b)

    if (value < 0 || (currentCount <= 1 && value === 0)) return

    updatePassengersCount(key, value)
  }

  return (
    <div
      className={`dropdown-shadow absolute left-0 top-[61px] z-10 h-auto w-full min-w-[304px] rounded-b-3xl bg-white`}
    >
      <div className="searchDropDownShadow flex w-full flex-col gap-y-6 p-4">
        {PopoverData.map(({ title, img, img2, description, key }) => (
          <div className="flex items-center justify-between" key={key}>
            <div className="flex items-center gap-2">
              <Image
                src={
                  passengers[key as keyof typeof passengers] > 0 ? img2 : img
                }
                alt="image"
                className="h-8 w-6"
              />
              <div className="flex flex-col">
                <h4 className="text-base font-semibold text-black">{title}</h4>
                <span className="text-xs text-gray-500">{description}</span>
              </div>
            </div>
            <div className="flex select-none items-center gap-2">
              <Button
                type="primary"
                className={`h-8 w-8 rounded-full text-black ${passengers[key as TPassengers] === 0 ? 'text-black' : 'text-white'}`}
                disabled={passengers[key as TPassengers] === 0}
                onClick={() =>
                  handleUpdatePassengersCount(
                    key as TPassengers,
                    passengers[key as TPassengers] - 1
                  )
                }
              >
                -
              </Button>
              <span className="w-4 text-center text-base text-black">
                {passengers[key as TPassengers]}
              </span>
              <Button
                type="primary"
                className="h-8 w-8 rounded-full "
                onClick={() =>
                  handleUpdatePassengersCount(
                    key as TPassengers,
                    passengers[key as TPassengers] + 1
                  )
                }
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mb-4 mt-6">
        <Button
          type="primary"
          className=" w-full rounded-full bg-brand-blue"
          onClick={() => submitPassengers()}
        >
          Confirmați
        </Button>
      </div>
    </div>
  )
}

const PopoverData = [
  {
    title: 'Adulți',
    description: 'Mai mult de 12 ani',
    img: human,
    img2: humanBlue,
    key: 'adults',
  },
  {
    title: 'Copii',
    description: '2-12 ani',
    img: kids,
    img2: kidsBlue,
    key: 'children',
  },
  {
    title: 'Infanți',
    description: 'Pînă la 2 ani, fără loc',
    img: infants,
    img2: infantsBlue,
    key: 'infants',
  },
]
