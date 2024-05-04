import Link from 'next/link'
import CollapsibleComponent from './collapsible-component'

const Questions = () => {
  const items = [
    {
      title: 'Cum pot rezerva un zbor?',
    },
    {
      title: 'Pot să-mi schimb rezervarea de bilet?',
    },
    {
      title: 'Cum pot rezerva un bilet preventiv?',
    },
    {
      title: 'Cum anulez un bilet de zbor?',
    },
    {
      title: 'Cum restitui banii după anularea biletului de zbor?',
    },
  ]
  return (
    <section className="flex pt-16 pb-20">
      <div className="w-1/3">
        <h3 className="text-xl font-medium mb-2">Întrebări frecvente</h3>
        <p className="text-md text-gray-700 font-light mb-8">
          Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium
          pellentesque tincidunt quam
        </p>
        <Link href="" className="text-blue-500 underline text-md">
          Ai Nevoie de Ajutor?
        </Link>
      </div>
      <div className="w-2/3">
        <div className="flex flex-col gap-4">
          {items.map(({ title }) => (
            <CollapsibleComponent
              key={title}
              title={title}
              content={
                <span className="text-md text-gray-500 px-2 py-3 block">
                  Lorem ipsum dolor sit amet consectetur. Mattis pretium
                  pellentesque tincidunt quam. Lorem ipsum dolor sit amet
                  consectetur. Lorem ipsum dolor sit amet consectetur. Mattis
                  pretium pellentesque tincidunt quam. Lorem ipsum dolor sit
                  amet consectetur.
                </span>
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Questions
