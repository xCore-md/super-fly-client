import Image from 'next/image'
import supportImgUrl from '@/assets/img/support.png'

export const Header = () => {
  const tel = '+(373) 60 456 654'
  return (
    <header className="shadow-xl">
      <div className="container flex mx-auto justify-between items-center h-20">
        <div className="font-bold text-xl">superfly{/*todo add image*/}</div>

        <nav>
          <ul className="flex">
            <li className="text-xs">Acasa</li>
            <li className="ml-9 text-xs">Despre noi</li>
            <li className="ml-9 text-xs">Informatii utile</li>
            <li className="ml-9 text-xs">Contacte</li>
            <li className="ml-9 text-xs">Gestionare rezervari</li>
          </ul>
        </nav>

        <div className="flex align-middle">
          <div>
            <a href={tel} className="flex flex-col">
              <span className="text-[10px] text-right">Contacteaza-ne</span>
              <span className="text-base">{tel}</span>
            </a>
          </div>
          <Image src={supportImgUrl} alt={'support'} width={48} height={48} />
          <div className="ml-16 flex items-center text-sm uppercase">ro</div>
        </div>
      </div>
    </header>
  )
}
