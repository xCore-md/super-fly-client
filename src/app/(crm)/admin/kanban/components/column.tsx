import { useCallback, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Avatar, Modal } from 'antd'
import { DndCard, TCardType } from './card'
import dayjs from 'dayjs'

export type TColumnType = {
  id: string
  title: string
  cards: TCardType[]
  circleColor: string
}

const Column = (section: TColumnType) => {
  const { id, cards, title, circleColor } = section
  const { setNodeRef } = useDroppable({ id })
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [lead, setLead] = useState<any>(null)

  const closeModal = useCallback(() => {
    setIsOpenModal(false)
    setLead(null)
  }, [])

  const openModal = useCallback((lead: any) => {
    setLead(lead)
    setIsOpenModal(true)
  }, [])

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <Modal
        open={isOpenModal}
        onCancel={closeModal}
        onClose={closeModal}
        centered
      >
        {lead && (
          <div className="py-4">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-base font-semibold">Lead {lead.id}</span>
                <div className="flex items-center gap-2 ">
                  {lead.flight_from ? (
                    <span>
                      {lead.flight_from} - {lead.flight_to}
                    </span>
                  ) : (
                    <span>No flight info</span>
                  )}
                </div>
                {lead.date_from && (
                  <div className="gap flex items-center">
                    <span>{dayjs(lead.date_from).format('DD.MM.YYYY')}</span>
                    {lead.return_to && (
                      <span>
                        {' '}
                        - {dayjs(lead.return_to).format('DD.MM.YYYY')}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2 pr-8">
                <Avatar src="https://i.pravatar.cc/300" />
                <span>{lead.user?.name}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <div
        ref={setNodeRef}
        className="custom-shadow relative select-none overflow-hidden rounded-lg border bg-white px-2 py-3"
      >
        <span
          className={`absolute -left-3 -top-3 h-10 w-10 rounded-full ${circleColor} `}
        ></span>
        <div className="flex">
          <span className="w-full text-center text-lg font-light text-gray-600">
            {title}
          </span>
        </div>

        <hr className="mb-3 mt-2 border-t-[1px]" />

        <div className="scroll-small flex max-h-[520px] min-h-[500px] flex-col gap-2 overflow-y-scroll">
          {section.cards.map((lead, index) => (
            <DndCard
              key={index}
              id={lead.id}
              lead={lead}
              openModal={openModal}
              closeModal={closeModal}
            />
          ))}
        </div>
      </div>
    </SortableContext>
  )
}

export default Column
