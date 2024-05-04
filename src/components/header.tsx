import Image from 'next/image'
import supportImgUrl from '@/assets/img/support.png'
import logoWhite from '@/assets/img/logo-white.png'

export const Header = () => {
  const tel = '+(373) 60 456 654'
  return (
    <header>
      <div className="container flex mx-auto justify-between items-center h-20 border-b-[0.1px] border-b-blue-500 p-0 relative z-10">
        <a className="w-[152px]" href="">
          <Image src={logoWhite} alt="logo" />
        </a>

        <nav className="pl-32">
          <ul className="flex gap-9 text-xs text-white">
            <li>Acasa</li>
            <li>Despre noi</li>
            <li>Informatii utile</li>
            <li>Contacte</li>
            <li>Gestionare rezervari</li>
          </ul>
        </nav>

        <div className="flex items-center">
          <div>
            <a href={tel} className="flex flex-col text-white">
              <span className=" text-[10px] text-right">Contacteaza-ne</span>
              <span className="text-base">{tel}</span>
            </a>
          </div>
          <Image
            className="ml-4"
            src={supportImgUrl}
            alt="support"
            width={48}
            height={48}
          />
          <div className="ml-16 flex items-center text-sm uppercase cursor-pointer text-white">
            ro
          </div>
        </div>
      </div>
    </header>
  )
}
