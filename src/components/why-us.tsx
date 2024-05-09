import Image from 'next/image'
import why1 from '@/assets/img/why1.svg'
import why2 from '@/assets/img/why2.svg'
import why3 from '@/assets/img/why3.svg'
import why4 from '@/assets/img/why4.svg'
import why5 from '@/assets/img/why5.svg'
import why6 from '@/assets/img/why6.svg'

export const WhyUs = ({ title }) => {
  const items = [
    {
      image: why1,
      title: 'Siguranță',
    },
    {
      image: why2,
      title: 'Comfort',
    },
    {
      image: why3,
      title: 'Eficiență',
    },
    {
      image: why4,
      title: 'Support 24/7',
    },
    {
      image: why5,
      title: 'Rapiditate',
    },
    {
      image: why6,
      title: 'Oferte Exclusive',
    },
  ]
  return (
    <>
      <div className="mb-14 flex flex-col items-center">
        <h3 className="mb-2 text-2xl font-normal">{title}</h3>
        <p className="text-md text-center font-light text-gray-700">
          Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium
          pellentesque tincidunt quam
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {items.map(({ image, title }) => (
          <div
            key={title}
            className="flex items-start gap-6 rounded-lg border border-gray-200 bg-white p-6"
          >
            <Image src={image} alt="icon" />
            <div>
              <h4 className="mb-3 text-xl font-medium ">{title}</h4>
              <span className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur. Mattis pretium
                pellentesque tincidunt quam. Lorem ipsum dolor sit amet
                consectetur.
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
