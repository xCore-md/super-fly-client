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
import { useTranslationsContext } from '@/context/translations-context'
import { useSessionTimer } from '@/lib/hooks/useSessionTimer'
import { Button } from '@components/ui/button'

interface ExpireSessionModalProps {
  resetForm: () => void
  closeDrawer: () => void
}
// eslint-disable-next-line react/display-name
export const ExpireSessionModal = memo(
  ({ resetForm, closeDrawer }: ExpireSessionModalProps) => {
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
        {/*  eslint-disable-next-line  */}
        <SessionModal ref={ref} closeDrawer={closeDrawer} />
      </div>
    )
  }
)

// eslint-disable-next-line react/display-name
const SessionModal = forwardRef<any, { closeDrawer: () => void }>(
  ({ closeDrawer }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [visibilityState, setVisibilityState] = useState<any>(null)
    const router = useRouter()
    const { lang } = useTranslationsContext()

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
        // eslint-disable-next-line
        closeDrawer()
        showModal()
        localStorage.setItem('modalHiddenTime', new Date().toISOString())
      }
      if (visibilityState === 'visible') {
        const storage = localStorage.getItem('modalHiddenTime')
        if (storage) {
          const hiddenTime = new Date(storage)
          const currentTime = new Date()
          const diff = (currentTime.getTime() - hiddenTime.getTime()) / 1000
          if (diff > 30 * 60) {
            localStorage.removeItem('flight')
            localStorage.removeItem('lead')
            router.push('/')
          }
        }
      }
    }, [visibilityState, closeModal, router, closeDrawer])

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
          {info.title[lang]}
        </h2>
        <div className="rounded-2xl bg-white p-6 px-4  text-center md:px-6">
          <span className="text-sm font-medium text-gray-600">
            {info.subtitle[lang]}
          </span>
        </div>
        <div className="flex justify-center">
          <Button onClick={closeModal}>{info.buttonLabel[lang]}</Button>
        </div>
      </Modal>
    )
  }
)

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

const info: any = {
  title: {
    ro: 'Sesiunea dumneavoastră expiră în curând',
    ru: 'Ваша сессия скоро закончится',
  },
  subtitle: {
    ro: 'Doriți să continuați căutarea zborului? Pentru siguranța datelor dumneavoastră, sesiunea va expira în curând.',
    ru: 'Хотите продолжить поиск рейса? Для безопасности ваших данных сессия скоро закончится.',
  },
  buttonLabel: {
    ro: 'Continua',
    ru: 'Продолжить',
  },
}
