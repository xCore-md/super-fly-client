import Link from 'next/link'
import CollapsibleBlock from './collapsible-block'
import { Card, CardContent, CardHeader } from './ui/card'

const Offers = () => {
  return (
    <section className="mt-24 lg:mt-44">
      <h2 className="mb-6 text-2xl font-medium">
        Cele mai populare destinatii
      </h2>
      <div className="flex gap-6">
        <div className="hidden w-2/6 lg:block">
          <Card className="mb-4 rounded-xl">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-medium">Chisinau - Roma</h3>
            </CardHeader>
            <CardContent>
              <p className="pb-6 text-base font-light">
                Este un oraș plin de istorie și cultură, cu obiective turistice
                celebre, cum ar fi Colosseum, Vatican și Fontana di Trevi.
              </p>
              <Link className="text-blue-700 underline" href="">
                Mai multe detalii
              </Link>
            </CardContent>
          </Card>
          <div className="pointer-events-none h-[280px] w-[430px] overflow-hidden rounded-2xl">
            <iframe
              width={530}
              height={320}
              className="scale-145 -translate-y-4"
              src="https://www.youtube.com/embed/XoOaKs2ug_k?autoplay=1&mute=1&controls=0&si=1-uydeTh0s9Ynu1M&amp;clip=Ugkx1AV2pwbUY8vgXx7589tXaZhxG3S7FGgE&amp;clipt=EOzayAMYzK_MAw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <CollapsibleBlock />
              {index !== 5 && (
                <div className="flex justify-center">
                  <hr className="my-3 h-0 w-[90%] border-t-0 border-t-gray-200 lg:border-t" />
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
