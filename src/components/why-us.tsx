import Image from 'next/image'

import why1 from '@/assets/img/why1.svg'
import why2 from '@/assets/img/why2.svg'
import why3 from '@/assets/img/why3.svg'
import why4 from '@/assets/img/why4.svg'
import why5 from '@/assets/img/why5.svg'
import why6 from '@/assets/img/why6.svg'

export const WhyUs = () => {
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
    <section className="mt-20 mb-36">
      <div className="flex flex-col items-center mb-14">
        <h3 className="text-2xl font-normal mb-2">Rezervați cu Noi</h3>
        <p className="text-md font-light text-gray-700 text-center">
          Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium
          pellentesque tincidunt quam
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {items.map(({ image, title }) => (
          <div
            key={title}
            className="flex items-start gap-6 p-6 border border-gray-200 rounded-lg bg-white"
          >
            <Image src={image} alt="icon" />
            <div>
              <h4 className="text-xl mb-3 font-medium ">{title}</h4>
              <span className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur. Mattis pretium
                pellentesque tincidunt quam. Lorem ipsum dolor sit amet
                consectetur.
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
