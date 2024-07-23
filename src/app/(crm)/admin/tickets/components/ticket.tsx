import React, { useCallback, useEffect, useState } from 'react'
import { Button, Checkbox, Input, notification, Select } from 'antd'
import dayjs from 'dayjs'
import { Download } from 'lucide-react'
import axs from '@/lib/axios'
import { ReservationCode } from './reservation-code'

export const Ticket = ({
  data,
  updateAction,
  updateSale,
}: {
  data: any
  updateAction: any
  updateSale: any
}) => {
  const [stateData, setStateData] = useState(data)
  const [remoteUrl, setRemoteUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { passengers } = data
  const { TextArea } = Input
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    setStateData(data)
  }, [])

  useEffect(() => {
    if (remoteUrl) {
      window.open(remoteUrl, '_blank')
    }
  }, [remoteUrl])

  const verification =
    data.type === 'tur_retur' ? verificationTwoWay : verificationOneWay

  const handleChangeComment = useCallback(
    (e: any) => {
      setStateData({ ...stateData, comment: e.target.value })
    },
    [stateData]
  )

  const handleUpdateComment = () => {
    updateSale(stateData)
      .then(() => {
        api.success({
          message: 'Success',
          description: 'Comment updated',
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
      })
      .catch((err: any) => {
        api.error({
          message: 'Error',
          description: err.response.data.message,
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
      })
  }

  const handleUpdateSaleCheckboxes = useCallback(
    (scope: string) => {
      axs
        .put(`/crm/sales/${data.id}/checkbox/${scope}`)
        .then(() => {
          setStateData({ ...stateData, [scope]: !stateData[scope] })
          api.success({
            message: 'Success',
            description: 'User updated',
            placement: 'bottomRight',
            duration: 3,
            closable: true,
          })
        })
        .catch((err) => {
          console.log({ err })
        })
    },
    [stateData, data.id, api]
  )

  const handleUpdateStatuses = (name: string, value: string) => {
    setStateData({ ...stateData, [name]: value })
    updateSale({ ...stateData, [name]: value })
      .then(() => {
        api.success({
          message: 'Success',
          description: 'User status updated',
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
      })
      .catch((err: any) => {
        api.error({
          message: 'Error',
          description: err.response.data.message,
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
      })
  }

  const getPdfTicket = (passengerId: number) => {
    setLoading(true)
    axs
      .get(`/crm/sales/${data.id}/passengers/${passengerId}/ticket`)
      .then((res) => {
        setRemoteUrl(res.data.invoice)
        setLoading(false)
      })
      .catch((err) => console.log({ err }))
  }

  const soldPrice = stateData.passengers.reduce(
    (acc: number, passenger: any) => acc + Number(passenger.price_sold),
    0
  )

  const costPrice = stateData.passengers.reduce(
    (acc: number, passenger: any) => acc + Number(passenger.price_cost),
    0
  )

  const priceDifference = soldPrice - costPrice

  return (
    <section className="flex gap-8 p-5">
      {contextHolder}
      <div className="w-3/5">
        <Section title="Informații despre zbor">
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">ID:</span>
            <span className="w-3/5 capitalize">{stateData.id}</span>
          </div>
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Tip zbor:</span>
            <span className="w-3/5 capitalize">{stateData.type}</span>
          </div>
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Compania Aeriana:</span>
            <span className="w-3/5">{stateData.airline}</span>
          </div>
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Plecare din:</span>
            <span className="w-3/5">
              {dayjs(stateData.date_from).format('DD.MM.YYYY - HH:mm')}{' '}
              {stateData.fly_from_city} ({stateData.fly_from})
            </span>
          </div>
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Destinația:</span>
            <span className="w-3/5">
              {dayjs(stateData.date_to).format('DD.MM.YYYY - HH:mm')}{' '}
              {stateData.fly_to_city} ({stateData.fly_to})
            </span>
          </div>
        </Section>
        <Section title="Detalii rezervare">
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Rezervat la:</span>
            <span className="w-3/5">
              {dayjs(passengers[0].created_at).format('DD.MM.YYYY - HH:mm')}
            </span>
          </div>
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Telefon:</span>
            <span className="w-3/5">{passengers[0].phone}</span>
          </div>
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Email:</span>
            <span className="w-3/5">{passengers[0].email}</span>
          </div>
          <div className="flex py-2">
            <span className="w-2/5 font-semibold">Manager:</span>
            <span className="w-3/5">{stateData.operator.name}</span>
          </div>
        </Section>
        <Section title="Alte date">
          <div className="flex gap-4 py-2" defaultValue={1}>
            <div className="w-full">
              <p className="mb-2 font-semibold">Status</p>
              <Select
                className="w-full"
                onChange={(value) => handleUpdateStatuses('status', value)}
                defaultValue={stateData.status}
              >
                {Object.keys(status).map((key, index) => (
                  <Select.Option key={index} value={key}>
                    {status[key]}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <p className="mb-2 font-semibold">Source</p>
              <Select
                className="w-full"
                onChange={(value) => handleUpdateStatuses('source', value)}
                defaultValue={stateData.source}
              >
                {Object.keys(source).map((key, index) => (
                  <Select.Option key={index} value={key}>
                    {source[key]}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <p className="mb-2 font-semibold">Ticket status</p>
              <Select
                className="w-full"
                onChange={(value) =>
                  handleUpdateStatuses('ticket_status', value)
                }
                defaultValue={stateData.ticket_status}
              >
                {Object.keys(ticket_status).map((key, index) => (
                  <Select.Option key={index} value={key}>
                    {ticket_status[key]}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <p className="mb-2 font-semibold">Payment method</p>
              <Select
                className="w-full"
                onChange={(value) =>
                  handleUpdateStatuses('payment_method', value)
                }
                defaultValue={stateData.payment_method}
              >
                {Object.keys(payment_method).map((key, index) => (
                  <Select.Option key={index} value={key}>
                    {payment_method[key]}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </Section>
        <Section title="Biletele de avion">
          <div className="flex gap-2 py-2">
            {passengers.map((passenger: any, index: number) => (
              <Button
                key={index}
                type="default"
                className="flex"
                loading={loading}
                onClick={() => getPdfTicket(passenger.id)}
                icon={<Download className="flex h-5 w-5" />}
              >
                {passenger.first_name} {passenger.last_name}
              </Button>
            ))}
          </div>
        </Section>
        <Section title="Informații adiționale">
          <TextArea
            onChange={handleChangeComment}
            rows={6}
            defaultValue={stateData.comment}
          />
          <Button
            onClick={() => handleUpdateComment()}
            className="mt-4"
            type="primary"
          >
            Save comment
          </Button>
        </Section>
      </div>
      <div className="w-2/5">
        <Section title="Verificare">
          {Object.keys(verification).map((key) => (
            <div key={key}>
              <Checkbox
                checked={stateData[key]}
                onChange={() => handleUpdateSaleCheckboxes(key)}
                className="py-2"
              >
                {verification[key]}
              </Checkbox>
            </div>
          ))}
        </Section>
        <Section title="Scopul călătoriei">
          {Object.keys(reason).map((key) => (
            <div key={key}>
              <Checkbox
                onChange={() => handleUpdateSaleCheckboxes(key)}
                checked={stateData[key]}
                className="py-2"
              >
                {reason[key]}
              </Checkbox>
            </div>
          ))}
        </Section>
        <Section title="Date financiare">
          <div className=" flex flex-col gap-2">
            <p>
              Afost creat la:{' '}
              <span className="font-semibold">
                {dayjs(stateData.created_at).format('DD.MM.YYYY HH:mm')}
              </span>
            </p>
            <p>
              Reservat la:{' '}
              <span className="font-semibold">
                {dayjs(stateData.reserved_at).format('DD.MM.YYYY HH:mm')}
              </span>
            </p>
            {stateData.paid_at && (
              <p>
                Achitat:{' '}
                <span className="font-semibold">
                  {dayjs(stateData.paid_at).format('DD.MM.YYYY HH:mm')}
                </span>
              </p>
            )}
            <p>
              Pasageri:{' '}
              <span className="font-semibold">
                {stateData.passengers.length}
              </span>
            </p>
            <p>
              Total încasat: <span className="font-semibold">{soldPrice}</span>{' '}
              $
            </p>
            <p>
              Total de emis: <span className="font-semibold">{costPrice}</span>{' '}
              $
            </p>
            <p>
              Mark-up vînzare:{' '}
              <span className="font-semibold">{priceDifference}</span> $
            </p>
          </div>
        </Section>
        <Section title="Date pentru check-in">
          {passengers.map((p: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">
                {p.first_name} {p.last_name}
              </p>
              <div className="flex items-center gap-4">
                Codul de rezervare:
                <ReservationCode
                  reservationCode={p.reservation_code}
                  sale={stateData}
                  updateAction={updateAction}
                />
              </div>
            </div>
          ))}
        </Section>
      </div>
    </section>
  )
}

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="mb-4">
      <h2 className=" mb-2 w-full rounded-full bg-brand-gray px-6 py-3 font-semibold text-gray-500">
        {title}
      </h2>
      <div className="py-2">{children}</div>
    </div>
  )
}

interface IKeyValue {
  [key: string]: string
}

const verificationOneWay: IKeyValue = {
  check_in_tur: 'Check-in tur',
  called_24_hours_tur: 'Apelat 24h înainte de zbor tur',
  called_72_hours_tur: 'Apelat 72h înainte de zbor tur',
  called_after_tur: 'Apelat după zbor tur',
}

const verificationTwoWay: IKeyValue = {
  check_in_tur: 'Check-in tur',
  called_24_hours_tur: 'Apelat 24h înainte de zbor tur',
  called_72_hours_tur: 'Apelat 72h înainte de zbor tur',
  called_after_tur: 'Apelat după zbor tur',
  check_in_retur: 'Check-in retur',
  called_24_hours_retur: 'Apelat 24h înainte de zbor retur',
  called_72_hours_retur: 'Apelat 72h înainte de zbor retur',
  called_after_retur: 'Apelat după zbor retur',
}

const reason: IKeyValue = {
  scope_business: 'Business',
  scope_work: 'Lucru peste hotare',
  scope_travel: 'Călătorie',
  scope_medical: 'Medicină',
}

export const status: IKeyValue = {
  reserved: 'Rezervat',
  paid: 'Achitat',
  missed: 'Pierdut',
  refunded: 'Refundat',
}

export const source: IKeyValue = {
  office: 'Oficiu',
  facebook: 'Facebook',
  google: 'Google',
  call: 'Apel intrare',
  recommendation: 'Recomandare',
  ads1: 'Publicitate 1',
  ads2: 'Publicitate 2',
  ads3: 'Publicitate 3',
}

export const ticket_status: IKeyValue = {
  to_emit: 'De emis',
  emitted: 'Emis',
  debt: 'Datorie',
}

export const payment_method: IKeyValue = {
  cash: 'Cash',
  card: 'Card',
  'office-card': 'Card (in officiu)',
  bank: 'Banca',
  transfer: 'Transfer',
}
