import Image from 'next/image'
import Link from 'next/link'
import offers from '@/assets/img/offers.jpg'
import CollapsibleBlock from './collapsible-block'
import { Card, CardContent, CardHeader } from './ui/card'

const Offers = () => {
  return (
    <section className="mt-44">
      <h2 className="mb-6 text-2xl font-medium">
        Cele mai populare destinatii
      </h2>
      <div className="flex gap-6">
        <div className="w-2/6">
          <Card className="mb-4 rounded-xl">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-medium">Chisinau - Roma</h3>
            </CardHeader>
            <CardContent>
              <p className="text-md pb-6 font-light">
                Este un oraș plin de istorie și cultură, cu obiective turistice
                celebre, cum ar fi Colosseum, Vatican și Fontana di Trevi.
              </p>
              <Link className="text-blue-700 underline" href="">
                Mai multe detalii
              </Link>
            </CardContent>
          </Card>
          <Image src={offers} alt="image" />
        </div>
        <div className="w-4/6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <CollapsibleBlock />
              {index !== 5 && (
                <div className="flex justify-center">
                  <hr className="my-3 w-[90%] border-t-gray-200" />
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
