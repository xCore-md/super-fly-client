import Image from 'next/image'
import card1 from '@/assets/img/card1.jpg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const BlogList = () => {
  return (
    <section className="mb-44">
      <h2 className="text-2xl font-medium mb-6">Cele mai bune oferte</h2>
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <a key={index} href="#">
            <Card className=" rounded-t-[16px] pb-4 hover:shadow-lg transition-all overflow-hidden">
              <CardHeader className="p-0 rounded-xl">
                <Image src={card1} alt="card" />
              </CardHeader>
              <CardContent>
                <h3 className="mt-4 text-xl">
                  Lorem ipsum dolor sit amet consectetur. Mattis pretium
                  pellentesque tincidunt quam.
                </h3>
                <p className="text-md font-light mt-4">
                  Lorem ipsum dolor sit amet consectetur. Mattis pretium
                  pellentesque tincidunt quam.
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm font-light">
          Obțineți economii mari la zboruri și pachete de vacanță cu promoțiile
          noastre exclusive. <br /> Răsfoiți cele mai recente oferte și
          rezervați-vă astăzi următoarea călătorie!
        </p>
        <Button className="bg-blue-700 font-light rounded-full px-8 shadow-md shadow-slate-400">
          Vezi Toate Ofertele
        </Button>
      </div>
    </section>
  )
}
