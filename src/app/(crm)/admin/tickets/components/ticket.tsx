import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Select } from 'antd'
import dayjs from 'dayjs'
import { Download } from 'lucide-react'
import axs from '@/lib/axios'

export const Ticket = ({ data }: { data: any }) => {
  const [stateData, setStateData] = useState(data)
  const [remoteUrl, setRemoteUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { passengers } = data

  useEffect(() => {
    setStateData(data)
  }, [data])

  useEffect(() => {
    if (remoteUrl) {
      window.open(remoteUrl, '_blank')
    }
  }, [remoteUrl])

  const verification =
    data.type === 'tur_retur' ? verificationTwoWay : verificationOneWay

  // const handleUpdatePassengerCheckboxes = (
  //   passengerId: number,
  //   verification: string
  // ) => {
  //   axs
  //     .put(
  //       `/crm/sales/${data.id}/passengers/${passengerId}/checkbox/${verification}`
  //     )
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log({ err })
  //     })
  // }

  const handleUpdateScopeTravelCheckboxes = (scope: string) => {
    axs
      .put(`/crm/sales/${data.id}/checkbox/${scope}`)
      .then(() => {
        setStateData({ ...stateData, [scope]: !stateData[scope] })
      })
      .catch((err) => {
        console.log({ err })
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

  return (
    <section className="flex gap-8 p-5">
      <div className="w-3/5">
        <Section title="Informații despre zbor">
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
            <span className="w-2/5 font-semibold">Rezervat la ora:</span>
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
          <div className="flex gap-8 py-2" defaultValue={1}>
            <Select className="min-w-48" defaultValue={stateData.status}>
              {Object.keys(leadStatus).map((key, index) => (
                <Select.Option key={index} value={key}>
                  {leadStatus[key]}
                </Select.Option>
              ))}
            </Select>
            <Select className="min-w-48" defaultValue={stateData.source}>
              <Select.Option value="online">online</Select.Option>
              <Select.Option value="offline">offline</Select.Option>
            </Select>
          </div>
        </Section>
        <Section title="Biletele de avion">
          <div className="flex gap-2 py-2">
            {passengers.map((passenger: any, index: number) => (
              <Button
                key={index}
                type="primary"
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
          <div>{stateData.comment}</div>
        </Section>
      </div>
      <div className="w-2/5">
        <Section title="Verificare">
          {Object.keys(verification).map((key, index) => (
            <div key={index}>
              <Checkbox className="py-2">{verification[key]}</Checkbox>
            </div>
          ))}
        </Section>
        <Section title="Scopul călătoriei">
          {Object.keys(reason).map((key, index) => (
            <div key={index}>
              <Checkbox
                onChange={() => handleUpdateScopeTravelCheckboxes(key)}
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
            <Checkbox>Refund</Checkbox>
            <p>Achitat: 09.04.2024 14:20:32</p>
            <p>Pasageri: 2</p>
            <p>Total încasat: 350$</p>
            <p>Total de emis: 150$</p>
            <p>Mark-up vînzare: 80$</p>
          </div>
        </Section>
        <Section title="Date pentru check-in">
          {passengers.map((p: any, index: number) => (
            <div key={index} className="mb-4">
              <p>
                {p.first_name} {p.last_name}
              </p>
              <p>
                Codul de rezervare{' '}
                <span className="font-semibold">{p.reservation_code}</span>
              </p>
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

const leadStatus: IKeyValue = {
  new: 'New',
  in_progress: 'In progress',
  closed: 'Closed',
  not_interested: 'Not interested',
  not_reachable: 'Not reachable',
  not_qualified: 'Not qualified',
  not_valid: 'Not valid',
  duplicate: 'Duplicate',
  invalid: 'Invalid',
  spam: 'Spam',
}
