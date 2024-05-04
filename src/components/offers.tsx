import Link from 'next/link'
import { Card, CardContent, CardHeader } from './ui/card'
import Image from 'next/image'
import offers from '@/assets/img/offers.jpg'
import CollapsibleComponent from './collapsible-component'

const Offers = () => {
  return (
    <section>
      <h2 className="text-2xl font-medium mb-6">Oferte de Zbor de Top</h2>
      <div className="flex gap-6">
        <div className="w-2/6">
          <Card className="mb-4 rounded-xl">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-medium">Chișinău - Milano</h3>
            </CardHeader>
            <CardContent>
              <p className="text-md font-light pb-6">
                Lorem ipsum dolor sit amet consectetur. Mattis pretium
                pellentesque tincidunt quam. Lorem ipsum dolor sit amet
                consectetur. Mattis pretium pellentesque tincidunt quam. Lorem
                ipsum dolor sit amet consectetur.
              </p>
              <Link className="underline text-blue-700" href="">
                Mai multe detalii
              </Link>
            </CardContent>
          </Card>
          <Image src={offers} alt="image" />
        </div>
        <div className="w-4/6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <CollapsibleComponent />
              {index !== 5 && (
                <div className="flex justify-center">
                  <hr className="my-3 border-t-gray-200 w-[90%]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Offers
