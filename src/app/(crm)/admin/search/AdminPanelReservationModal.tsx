import { useRouter } from 'next/navigation'
import React from 'react'
import { Modal, notification } from 'antd'
import AdminPanelReservationForm from '@/app/(crm)/admin/search/AdminPanelReservationForm'
import axs from '@/lib/axios'

interface IAdminPanelReservationModal {
  showModal: boolean
  // eslint-disable-next-line no-unused-vars
  setShowModal: (b: boolean) => void
}

export const AdminPanelReservationModal = ({
  showModal,
  setShowModal,
}: IAdminPanelReservationModal) => {
  const [api, context] = notification.useNotification()
  const router = useRouter()

  const closeModal = () => setShowModal(false)
  const onSubmit = (values: any) => {
    const passengers = values.passengers.map((passenger: any) => ({
      ...passenger,
      baggage: passenger.baggage.filter((bag: any) => bag?.count > 0),
    }))

    const data = { ...values, passengers }

    axs
      .post('/crm/sales/create', data)
      .then((res) => {
        api.success({
          message: 'Success',
          description: res.data.message,
          placement: 'topRight',
          duration: 3,
          closable: true,
        })
        closeModal()
        router.push('/admin/tickets')
      })
      .catch((err) => {
        api.error({
          message: 'Eroare',
          description: err.response.data.message,
          placement: 'topRight',
          duration: 2,
          closable: true,
        })
        console.log(err.response.data)
      })
  }
  return (
    <Modal
      open={showModal}
      title="Rezervare"
      closable={true}
      onClose={closeModal}
      onCancel={closeModal}
      centered
      footer={[]}
      destroyOnClose
      width={800}
      className="w1-[1200px] max-1w-[94%]"
    >
      {context}
      <AdminPanelReservationForm onSubmit={onSubmit} closeModal={closeModal} />
    </Modal>
  )
}
