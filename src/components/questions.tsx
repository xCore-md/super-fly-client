import Link from 'next/link'
import CollapsibleComponent from './collapsible-component'

const Questions = () => {
  const items = [
    {
      title: 'Cum pot să rezerv un bilet de avion pe acest website?',
      text: 'Pentru a rezerva un bilet de avion, pur și simplu accesează pagina noastră de rezervări și introdu detaliile călătoriei tale, inclusiv destinația, datele călătoriei și numărul de pasageri. Apoi, selectează opțiunea dorită și finalizează plata pentru a confirma rezervarea.',
    },
    {
      title: 'Ce opțiuni de plată sunt acceptate pentru biletele de avion?',
      text: 'Acceptăm diverse metode de plată, inclusiv carduri de credit/debit și plăți online securizate. Detaliile despre opțiunile de plată disponibile vor fi afișate în timpul procesului de rezervare.',
    },
    {
      title: 'Pot să modific sau să anulez o rezervare deja efectuată?',
      text: 'Da, în majoritatea cazurilor, poți să modifici sau să anulezi o rezervare deja efectuată, în funcție de politica companiei aeriene și de condițiile tarifare aplicabile. Te rugăm să consulți secțiunea noastră de Politici și Termeni și Condiții pentru mai multe informații sau să ne contactezi pentru asistență.',
    },
    {
      title:
        'Ce fac dacă întâmpin probleme sau întârzieri în timpul călătoriei mele?',
      text: 'În cazul unor probleme sau întârzieri în timpul călătoriei tale, te rugăm să contactezi echipa noastră de suport clienți, disponibilă 24/7. Vom face tot posibilul pentru a te asista și a rezolva situația în cel mai eficient mod posibil.',
    },
    {
      title:
        'Care sunt beneficiile de a rezerva bilete de avion prin intermediul acestei agenții?',
      text: 'Rezervând bilete de avion prin intermediul agenției noastre, beneficiezi de acces la tarife competitive, oferte exclusive și o gamă largă de opțiuni de zbor. În plus, oferim suport clienți dedicat și servicii personalizate pentru a-ți asigura o experiență de călătorie fără probleme.',
    },
  ]
  return (
    <section className="flex pb-20 pt-16">
      <div className="w-1/3">
        <h3 className="mb-2 text-xl font-medium">Întrebări frecvente</h3>
        <p className="mb-8 text-base font-light text-gray-700">
          Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium
          pellentesque tincidunt quam
        </p>
        <span className="flex flex-col gap-2">
          <span>Ai Nevoie de Ajutor?</span>
          <Link
            href="tel:+37360851555"
            className="text-base text-blue-500 underline"
          >
            Suna: +37360 851 555
          </Link>
        </span>
      </div>
      <div className="w-2/3">
        <div className="flex flex-col gap-4">
          {items.map(({ title, text }) => (
            <CollapsibleComponent
              key={title}
              title={title}
              content={
                <span className="block px-2 py-3 text-base text-gray-500">
                  {text}
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
