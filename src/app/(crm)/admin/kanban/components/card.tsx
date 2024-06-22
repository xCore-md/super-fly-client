import Image from 'next/image'
import { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import crossDrag from '@/assets/img/crm/cross-drag.svg'
import messages from '@/assets/img/crm/messages.svg'
import users from '@/assets/img/crm/users.svg'

export type TCardType = {
  id: string
  phone: string
}

export const DndCard: FC<TCardType> = ({ id, phone }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform) }}
    >
      <div className="rounded-lg border bg-gray-100 p-2" id={id}>
        <span className="flex w-full items-center justify-between">
          <span className="text-xs font-light">RMO - MXP</span>
          <span className="rounded-lg bg-red-500 px-2 py-1 text-xs font-light text-white">
            2d{id}
          </span>
        </span>
        <span className="my-2 flex text-sm font-semibold text-black">
          {phone}
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
    </div>
  )
}
