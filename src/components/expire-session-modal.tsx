'use client'
import { useRouter } from 'next/navigation'
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Modal } from 'antd'
import { useSessionTimer } from '@/lib/hooks/useSessionTimer'
import { Button } from '@components/ui/button'

// eslint-disable-next-line react/display-name
export const ExpireSessionModal = memo(
  ({ resetForm }: { resetForm: () => void }) => {
    const router = useRouter()
    const ref = React.useRef<{ showModal: () => void }>(null)

    const useSessionConfig = React.useMemo(
      () => ({
        duration: 3 * 60,
        onExpire: () => {
          localStorage.removeItem('flight')
          localStorage.removeItem('lead')
          resetForm()
          router.push('/')
        },

        onThirtyMinExpire: () => {
          ref?.current?.showModal()
          clearPhoneNumber()
        },
      }),
      [resetForm, router]
    )
    useSessionTimer(useSessionConfig)

    return (
      <div>
        <SessionModal ref={ref} />
      </div>
    )
  }
)

// eslint-disable-next-line react/display-name
const SessionModal = forwardRef((_props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibilityState, setVisibilityState] = useState<any>(null)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setVisibilityState(document.visibilityState)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  })

  useEffect(() => {
    if (visibilityState === 'hidden') {
      showModal()
    }
  }, [visibilityState, closeModal])

  useImperativeHandle(ref, () => ({
    showModal,
  }))
  return (
    <Modal
      title=""
      onCancel={closeModal}
      onClose={closeModal}
      open={isModalOpen}
      centered
      footer={null}
    >
      <h2 className="mt-4 text-center text-xl font-semibold text-brand-blue">
        Sesiunea dumneavoastră expiră în curând
      </h2>
      <div className="rounded-2xl bg-white p-6 px-4  text-center md:px-6">
        <span className="text-sm font-medium text-gray-600">
          Doriți să continuați căutarea zborului? Pentru siguranța datelor
          dumneavoastră, sesiunea va expira în curând.
        </span>
      </div>
      <div className="flex justify-center">
        <Button onClick={closeModal}>Continua</Button>
      </div>
    </Modal>
  )
})

const clearPhoneNumber = () => {
  const flight = JSON.parse(localStorage.getItem('flight') || '{}')
  const lead = JSON.parse(localStorage.getItem('lead') || '{}')

  if (flight.phone) {
    localStorage.setItem(
      'flight',
      JSON.stringify({
        ...flight,
        phone: '',
      })
    )
  }
  if (lead.phone) {
    localStorage.setItem(
      'lead',
      JSON.stringify({
        ...lead,
        phone: '',
      })
    )
  }
}
