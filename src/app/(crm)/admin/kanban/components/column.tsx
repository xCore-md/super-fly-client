import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { DndCard, TCardType } from './card'

export type TColumnType = {
  id: string
  title: string
  cards: TCardType[]
  circleColor: string
}

const Column = (section: TColumnType) => {
  const { id, cards, title, circleColor } = section
  const { setNodeRef } = useDroppable({ id })
  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        className="custom-shadow relative cursor-pointer overflow-hidden rounded-lg border bg-white px-2 py-3"
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

        <div className="flex flex-col gap-2">
          {section.cards.map((item, index) => (
            <DndCard key={index} id={item.id} phone={item.phone} />
          ))}
        </div>
      </div>
    </SortableContext>
  )
}

export default Column
