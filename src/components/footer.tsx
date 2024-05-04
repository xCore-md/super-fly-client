import Image from 'next/image'
import Link from 'next/link'
import fb from '@/assets/img/fb.svg'
import insta from '@/assets/img/insta.svg'
import logo from '@/assets/img/logo-footer.png'
import mail from '@/assets/img/mail.svg'
import mastercard from '@/assets/img/mastercard.svg'
import paynet from '@/assets/img/paynet.svg'
import phone from '@/assets/img/phone.svg'
import visa from '@/assets/img/visa.svg'

export const Footer = () => {
  const list = [
    {
      title: 'Țările de Top',
      items: [
        { title: 'Philippines', href: '#' },
        { label: 'Italy', href: '#' },
        { label: 'United Kingdom', href: '#' },
        { label: 'Spain', href: '#' },
        { label: 'Nigeria', href: '#' },
        { label: 'France', href: '#' },
      ],
    },
    {
      title: 'Orașe de Top',
      items: [
        { label: 'London', href: '#' },
        { label: 'Paris', href: '#' },
        { label: 'Rome', href: '#' },
        { label: 'Dubai', href: '#' },
        { label: 'Manila', href: '#' },
        { label: 'Lagos', href: '#' },
      ],
    },
    {
      title: 'Companii Aeriene',
      items: [
        { label: 'Qatar Airways', href: '#' },
        { label: 'Philippine Airlines', href: '#' },
        { label: 'Turkish Airlines', href: '#' },
        { label: 'Lufthansa Airlines', href: '#' },
        { label: 'Kenya Airways', href: '#' },
        { label: 'Ethiopian Airlines', href: '#' },
      ],
    },
    {
      title: 'Ajutor & Support',
      items: [
        { label: 'Rezervările mele', href: '#' },
        { label: 'Support Clienți', href: '#' },
        { label: 'Taxe pentru Bagaje', href: '#' },
        { label: 'Informații utile', href: '#' },
        { label: 'Întrebări frecvente', href: '#' },
      ],
    },
    {
      title: 'Despre Noi',
      items: [
        { label: 'Despre Noi', href: '#' },
        { label: 'Recenzii', href: '#' },
        { label: 'Contactează-ne', href: '#' },
        { label: 'Politica de Confidențialitate', href: '#' },
        { label: 'Termeni și Condiții', href: '#' },
      ],
    },
  ]
  return (
    <div className="rounded-t-[40px] border-t-2 bg-white px-0 py-14">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-5">
          {list.map(({ title, items }) => (
            <div key={title}>
              <h4 className="mb-5 text-lg font-medium text-blue-700">
                {title}
              </h4>
              <ul key={title}>
                {items.map(({ label, href }) => (
                  <li
                    key={label}
                    className="mb-5 text-gray-500 transition-all hover:text-gray-900"
                  >
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="my-8" />
        <div className="mb-10 grid grid-cols-12 items-center">
          <Link href="/">
            <Image src={logo} alt="log" width={82} height={16} />
          </Link>
          <p className="col-span-4 text-[10px] text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam. Lorem ipsum dolor sit amet consectetur. Mattis
            pretium pellentesque tincidunt quam
          </p>
          <div className="col-span-2 flex justify-center gap-4">
            <Link href="/">
              <Image src={fb} alt="social" width={32} height={32} />
            </Link>
            <Link href="/">
              <Image src={insta} alt="social" width={32} height={32} />
            </Link>
          </div>
          <div className="col-span-2 flex flex-col items-center">
            <Link
              href="tel:+(373) 60 456 654"
              className="mb-2 flex items-center gap-1"
            >
              <Image src={phone} alt="icon" width={20} height={20} />
              <span className="text-xs">+(373) 60 456 654</span>
            </Link>
            <Link
              href="mailto:info@superfly.md"
              className="flex items-center gap-1"
            >
              <Image src={mail} alt="icon" width={20} height={20} />
              <span className="text-xs">info@superfly.md</span>
            </Link>
          </div>
          <div className="col-span-3 flex items-center justify-end gap-16">
            <Image src={mastercard} width={52} height={40} alt="icon" />
            <Image src={visa} width={78} height={44} alt="icon" />
            <Image src={paynet} width={73} height={38} alt="icon" />
          </div>
        </div>
        <iframe
          className="h-[300px] w-full rounded-[20px] border-0 border-gray-200 focus:border-0 focus-visible:border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
    &q=Space+Needle,Seattle+WA"
        ></iframe>
      </div>
    </div>
  )
}
