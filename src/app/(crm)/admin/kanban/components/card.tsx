import Image from 'next/image'
import { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import dayjs from 'dayjs'
import crossDrag from '@/assets/img/crm/cross-drag.svg'
import messages from '@/assets/img/crm/messages.svg'
import users from '@/assets/img/crm/users.svg'

export type TCardType = {
  id: string
  lead: any
}

export const DndCard: FC<TCardType> = ({ id, lead }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
  })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform) }}
    >
      <div className="rounded-lg border bg-gray-100 p-2" id={id}>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide">
                {lead.flight_from
                  ? `${lead.flight_from} ${lead.return_to ? '<->' : '-'} ${lead.flight_to}`
                  : 'No flight info'}
              </span>
              <span className="rounded-lg bg-green-300 px-1 py-0.5 text-xs font-normal">
                {lead.return_to ? 'tur|retur' : 'tur'}
              </span>
            </div>
            <div>
              <span className="text-xs font-light tracking-wide">
                {dayjs(lead.date_from).format('DD.MM.YYYY HH:mm')}
              </span>
              {lead.return_to && (
                <span className="text-xs font-light tracking-wide">
                  {' -'} {dayjs(lead.return_to).format('DD.MM.YYYY HH:mm')}
                </span>
              )}
            </div>
          </div>
        </div>
        <span className="my-2 flex text-base font-medium tracking-wide text-black">
          {lead.phone}
        </span>
        <div className="flex justify-between">
          {lead.flight_from ? (
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Image src={users} width={16} height={16} alt="icon" />
                  <span className="text-xs text-black">
                    {lead.adults + lead.children + lead.infants}
                  </span>
                </span>
                {lead.comments?.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Image src={messages} width={16} height={16} alt="icon" />
                    <span className="text-xs text-black">
                      {lead.comments.length}
                    </span>
                  </span>
                )}
                {lead.actionsCount && lead.actionsCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Image src={crossDrag} width={16} height={16} alt="icon" />
                    <span className="text-xs text-black">
                      {lead.actionsCount}
                    </span>
                  </span>
                )}
              </span>
            </span>
          ) : (
            <span className="text-xs font-light">No data</span>
          )}
          <span className="rounded-lg bg-blue-400 px-2 py-1 text-xs font-light text-white">
            {lead.time}
          </span>
        </div>
      </div>
    </div>
  )
}
