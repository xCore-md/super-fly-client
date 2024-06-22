'use client'

import { useState } from 'react'
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import Column, { TColumnType } from './components/column'

const initialSections = [
  {
    id: 'Column1',
    title: 'Now',
    circleColor: 'bg-green-500',
    cards: Array.from({ length: 5 }, (_, index) => ({
      id: `Column1-item-${index}`,
      phone: `+3736955555${index}`,
    })),
  },
  {
    id: 'Column2',
    title: 'Proces',
    circleColor: 'bg-yellow-500',
    cards: Array.from({ length: 5 }, (_, index) => ({
      id: `Column2-item-${index}`,
      phone: `+3736955555${index}`,
    })),
  },
  {
    id: 'Column3',
    title: 'Așteptare',
    circleColor: 'bg-red-500',
    cards: Array.from({ length: 5 }, (_, index) => ({
      id: `Column3-item-${index}`,
      phone: `+3736955555${index}`,
    })),
  },
  {
    id: 'Column4',
    title: 'To Pay',
    circleColor: 'bg-blue-500',
    cards: Array.from({ length: 5 }, (_, index) => ({
      id: `Column4-item-${index}`,
      phone: `+3736955555${index}`,
    })),
  },
]

export default function Kanban() {
  const [columns, setColumns] = useState<TColumnType[]>(initialSections)

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null
    }
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null
    }
    const id = String(unique)
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }))
    })
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId
    return columns.find((c) => c.id === columnId) ?? null
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null

    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null
    }

    setColumns((prevState) => {
      const activeItems = activeColumn.cards
      const overItems = overColumn.cards

      const activeIndex = activeItems.findIndex((i) => i.id === activeId)
      const overIndex = overItems.findIndex((i) => i.id === overId)

      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0
        const modifier = putOnBelowLastItem ? 1 : 0
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          return {
            ...c,
            cards: activeItems.filter((i) => i.id !== activeId),
          }
        } else if (c.id === overColumn.id) {
          return {
            ...c,
            cards: [
              ...overItems.slice(0, newIndex()),
              activeItems[activeIndex],
              ...overItems.slice(newIndex(), overItems.length),
            ],
          }
        } else {
          return c
        }
      })
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId)
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId)
    if (activeIndex !== overIndex) {
      console.log({ activeColumn, overColumn, activeIndex, overIndex })

      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            return {
              ...column,
              cards: arrayMove(overColumn.cards, activeIndex, overIndex),
            }
          } else {
            return column
          }
        })
      })
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="mt-8 grid grid-cols-4 gap-4">
        {columns.map((section: TColumnType) => (
          <Column key={section.id} {...section} />
        ))}
      </div>
    </DndContext>
  )
}
