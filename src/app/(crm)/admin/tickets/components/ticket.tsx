import React from 'react'
import { Button, Checkbox, Select } from 'antd'

export const Ticket = () => {
  return (
    <section className="flex gap-8 p-5">
      <div className="w-3/5">
        <Section title="Informații despre zbor">
          {flightInfo.map((item, index) => (
            <div key={index} className="flex py-2">
              <span className="w-2/5 font-semibold">{item.title}</span>
              <span className="w-3/5">{item.info}</span>
            </div>
          ))}
        </Section>
        <Section title="Detalii rezervare">
          {reservationDetails.map((item, index) => (
            <div key={index} className="flex py-2">
              <span className="w-2/5 font-semibold">{item.title}</span>
              <span className="w-3/5">{item.info}</span>
            </div>
          ))}
        </Section>
        <Section title="Alte date">
          <div className="flex gap-8 py-2" defaultValue={1}>
            <Select className="min-w-48" defaultValue={leadStatus[0]}>
              {leadStatus.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
            <Select className="min-w-48" defaultValue={'online'}>
              <Select.Option value="online">online</Select.Option>
              <Select.Option value="offline">offline</Select.Option>
            </Select>
          </div>
        </Section>
        <Section title="Biletele de avion">
          <div className="flex gap-2 py-2">
            <Button type="primary">Bilet John Doe</Button>
            <Button type="primary">Bilet John Doe</Button>
          </div>
          <div className="flex gap-2 py-1">
            <Button
              type="default"
              className=" bg-brand-green text-white hover:bg-brand-green"
            >
              Bilet Emilian Corlatescu
            </Button>
            <Button
              type="default"
              className=" bg-brand-green text-white hover:bg-brand-green"
            >
              Bilet Emilian Corlatescu
            </Button>
          </div>
        </Section>
        <Section title="Informații adiționale">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            magnam libero dolore totam. Cupiditate id repellat rerum quam sint,
            alias atque. Non ab hic, necessitatibus sapiente aliquid laborum
            officiis sed?
          </div>
        </Section>
      </div>
      <div className="w-2/5">
        <Section title="Verificare">
          {verification.map((item, index) => (
            <div key={index}>
              <Checkbox className="py-2">{item}</Checkbox>
            </div>
          ))}
        </Section>
        <Section title="Scopul călătoriei">
          {reason.map((item, index) => (
            <div key={index}>
              <Checkbox className="py-2">{item}</Checkbox>
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
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="mb-4">
              <p>JOHN DOE</p>
              <p>Codul de rezervare AACT62</p>
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

const flightInfo = [
  {
    title: 'Codul rezervîrii:',
    info: '145662',
  },
  {
    title: 'Tip zbor:',
    info: 'Întro direcție',
  },
  {
    title: 'Compania Aeriana:',
    info: 'RMO Air Moldova',
  },
  {
    title: 'Plecare din:',
    info: '12.04.2024 17:05 Warsav (WAW)',
  },
  {
    title: 'Destinația:',
    info: '12.04.2024 19:20 Chisinau (RMO)',
  },
]

const reservationDetails = [
  {
    title: 'Rezervat la ora:',
    info: '09.04.2024 12:50:20',
  },
  {
    title: 'Telefon:',
    info: '+373 777 777 77',
  },
  {
    title: 'Email:',
    info: 'johndoe@mail.com',
  },
  {
    title: 'Manager:',
    info: 'John Doe',
  },
]

const verification = [
  'Apelat 72h înainte de zbor tur',
  'Efectuare și expediere Check-in fax',
  'Verificare Check-in tur',
  'Apelat după zbor tur',
]

const reason = ['Business', 'Lucru peste hotare', 'Călătorie', 'Medicină']

const leadStatus = [
  'New',
  'In progress',
  'Closed',
  'Not interested',
  'Not reachable',
  'Not qualified',
  'Not valid',
  'Duplicate',
  'Invalid',
  'Spam',
]
