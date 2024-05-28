import Image from 'next/image'
import crossDrag from '@/assets/img/crm/cross-drag.svg'
import drag from '@/assets/img/crm/drag.svg'
import messages from '@/assets/img/crm/messages.svg'
import users from '@/assets/img/crm/users.svg'

export default function Kanban() {
  const sections = [
    { title: 'Now', circleColor: 'bg-green-500' },
    { title: 'Proces', circleColor: 'bg-yellow-500' },
    { title: 'Așteptare', circleColor: 'bg-red-500' },
    { title: 'To Pay', circleColor: 'bg-blue-500' },
  ]
  return (
    <div className="mt-8 grid grid-cols-4 gap-4">
      {sections.map(({ title, circleColor }, index) => (
        <div
          key={index}
          className="custom-shadow relative cursor-pointer overflow-hidden rounded-lg border bg-white px-2 py-3"
        >
          <span
            className={`absolute -left-3 -top-3 h-10 w-10 rounded-full ${circleColor}`}
          ></span>
          <div className="flex">
            <span className="w-full text-center text-lg font-light text-gray-600">
              {title}
            </span>
            <Image src={drag} width={20} height={20} alt="icon" />
          </div>
          <hr className="mb-3 mt-2  border-t-[1px]" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="rounded-lg border bg-gray-100 p-2" key={index}>
                <span className="flex w-full items-center justify-between">
                  <span className="text-xs font-light">RMO - MXP</span>
                  <span className="rounded-lg bg-red-500 px-2 py-1 text-xs font-light text-white">
                    2d
                  </span>
                </span>
                <span className="my-2 flex text-sm font-semibold text-black">
                  +373 64 456 654
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Image src={users} width={16} height={16} alt="icon" />
                    <span className="text-xs text-black">1</span>
                  </span>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <span key={index} className="flex items-center gap-1">
                      <Image src={messages} width={16} height={16} alt="icon" />
                      <span className="text-xs text-black">2</span>
                    </span>
                  ))}
                  <span className="flex items-center gap-1">
                    <Image src={crossDrag} width={16} height={16} alt="icon" />
                    <span className="text-xs text-black">3</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
