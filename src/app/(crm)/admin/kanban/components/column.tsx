import { useCallback, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Input, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { DndCard, TCardType } from './card'

export type TColumnType = {
  id: string
  title: string
  cards: TCardType[]
  circleColor: string
  operators?: any[]
}

const Column = (props: TColumnType) => {
  const { id, cards, title, circleColor, operators } = props
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

  const operatorsOptions = operators?.map((operator) => ({
    label: <span>{operator.name}</span>,
    value: operator.name,
  }))

  const formik = useFormik({
    initialValues: {
      operator: {} as any,
      name: '',
      comment: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <Modal
        open={isOpenModal}
        onCancel={closeModal}
        onClose={closeModal}
        centered
        title={`Lead ${lead?.name || lead?.id}`}
        okText="Save"
      >
        {lead && (
          <form
            className="py-4"
            onChange={formik.handleChange}
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 font-medium">
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
              <div className="flex flex-col items-end gap-1">
                <label>Assigned</label>
                <Select
                  className="w-full min-w-44"
                  placeholder="operators"
                  showSearch
                  value={formik.values.operator.id}
                  options={operatorsOptions}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label>Lead name</label>
                <Input
                  name="name"
                  className="mt-1 w-full"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div>
                {lead.comments?.length > 0 ? (
                  <div>
                    <label className="text-xs font-medium uppercase">
                      Comments
                    </label>
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                ) : (
                  <span className=" italic">No comments yet</span>
                )}
              </div>
              <div className="w-full">
                <label className="text-sm">Comment</label>
                <Input.TextArea
                  name="comment"
                  className="mt-1 min-h-56 w-full"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
            </div>
          </form>
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
          {cards.map((lead, index) => (
            <DndCard
              key={index}
              id={lead.id}
              lead={lead}
              operators={operators}
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
