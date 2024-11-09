'use client'

import { useEffect, useState } from 'react'
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
import { notification } from 'antd'
import axs from '@/lib/axios'
import Column, { TColumnType } from './components/column'
import { statusesColumns } from './utils/config'

const initialColumns = Object.values(statusesColumns).map((obj) => ({
  id: obj.id,
  title: obj.title,
  circleColor: obj.color,
  cards: obj.cards,
}))

export default function Kanban() {
  const [columns, setColumns] = useState<TColumnType[]>(initialColumns)
  const [startColumnId, setStartColumnId] = useState<string | null>(null)
  const [api, contextHolder] = notification.useNotification()
  const storage = localStorage.getItem('userData')
  const token = storage ? JSON.parse(storage).token : ''
  const [operators, setOperators] = useState<any[]>([])

  const headers = {
    Authorization: 'Bearer ' + token,
  }

  const getOperators = () => {
    axs.get('/crm/user/list').then((res) => {
      setOperators(res.data.data)
    })
  }

  useEffect(() => {
    getOperators()
    axs
      .get('/crm/leads', { headers })
      .then((res) => {
        const leads = res.data.leads

        const newColumns = columns.map((column) => {
          return {
            ...column,
            cards: leads[column.id]
              ? leads[column.id].map((lead: any) => ({
                  ...lead,
                  id: String(lead.id),
                }))
              : [],
          }
        })
        setColumns(newColumns)
      })
      .catch((err) => {
        api.error({
          message: 'Error',
          description: err.response.data.message,
          placement: 'topRight',
          duration: 2,
          closable: true,
        })
        console.log(err.response.data)
      })
  }, [])

  const changeLeadStatus = (id: string, status: string) => {
    const urlencoded = new URLSearchParams({ status })
    axs
      .put(`/crm/leads/change-status/${id}`, urlencoded, { headers })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        api.error({
          message: 'Error',
          description: err.response.data.message,
          placement: 'topRight',
          duration: 2,
          closable: true,
        })
        console.log(err.response.data)
      })
  }

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

    if (startColumnId !== overColumn.id) {
      changeLeadStatus(activeId, overColumn.id)
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
      onDragStart={(e) =>
        setStartColumnId(String(e.active.data.current?.sortable.containerId))
      }
    >
      {contextHolder}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {columns.map((section: TColumnType) => (
          <Column key={section.id} {...section} operators={operators} />
        ))}
      </div>
    </DndContext>
  )
}
