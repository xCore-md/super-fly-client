import humanBlue from '@/assets/img/human-blue.svg'
import human from '@/assets/img/human.svg'
import infantsBlue from '@/assets/img/infants-blue.svg'
import infants from '@/assets/img/infants.svg'
import kidsBlue from '@/assets/img/kids-blue.svg'
import kids from '@/assets/img/kids.svg'
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'

type TPassengers = 'adults' | 'children' | 'infants'

export function PassengersComponent({ formik, submitSearch }: any) {
  const passengers = {
    adults: formik.values.adults || 0,
    children: formik.values.children || 0,
    infants: formik.values.infants || 0,
  }

  const passengersCount =
    passengers.adults + passengers.children + passengers.infants

  const handleUpdatePassengersCount = (key: TPassengers, value: number) => {
    const currentCount = Object.values(passengers).reduce((a, b) => a + b)

    if (value < 0 || (currentCount <= 1 && value === 0)) return

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
            PASAGERI
          </span>
          <span className="text-xs font-bold">
            {passengersCount} {passengersCount > 1 ? 'Pasageri' : 'Pasager'}
          </span>
        </div>
      </div>
      <div className="custom-shadow z-10 -mt-8 rounded-lg rounded-b-xl px-4 pb-4 pt-16">
        {data.map(({ title, description, key, img, img2 }) => (
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
                <span className="text-xs font-bold uppercase">{title}</span>
                <span className="text-xs font-light">{description}</span>
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
                    passengers[key as TPassengers] - 1
                  )
                }
                icon={
                  <MinusOutlined
                    style={{
                      color:
                        passengers[key as TPassengers] === 0 ? '#000' : '#fff',
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
                    passengers[key as TPassengers] + 1
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        size="large"
        disabled={!ableToSubmit}
        className="btn-primary mt-4 flex w-full items-center justify-center gap-1 rounded-full font-light"
        onClick={() => submitSearch()}
      >
        <span className="tracking-wide text-white">Confirmă și caută</span>
        <SearchOutlined style={{ color: '#fff' }} />
      </Button>
    </div>
  )
}

const data = [
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
