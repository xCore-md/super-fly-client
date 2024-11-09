import { useState, useEffect } from 'react'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Input, notification } from 'antd'

interface IPassenger {
  reservationCode: string
  updateAction: any
  sale: any
}

export function ReservationCode({
  reservationCode,
  updateAction,
  sale,
}: IPassenger) {
  const [code, setCode] = useState('')
  const [editable, setEditable] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    setCode(reservationCode)
  }, [reservationCode])

  const handleUpdatePassengerCode = () => {
    updateAction({
      saleId: sale.id,
      passengerId: sale.passengers[0].id,
      passenger: { ...sale.passengers[0], reservation_code: code },
    })
    api.success({
      message: 'Success',
      description: 'Reservation code updated',
      placement: 'topRight',
      duration: 3,
      closable: true,
    })
    setEditable(false)
  }

  return (
    <div className="flex items-center gap-2">
      {contextHolder}
      {editable ? (
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={!editable}
          className="w-fit"
        />
      ) : (
        <span className="font-semibold">{code}</span>
      )}
      {editable ? (
        <div className=" flex gap-2">
          <Button
            onClick={() => setEditable(!editable)}
            type="default"
            icon={<CloseOutlined style={{ fontSize: 14 }} />}
            className="h-8 w-4"
          />
          <Button
            onClick={() => handleUpdatePassengerCode()}
            type="primary"
            icon={<CheckOutlined style={{ fontSize: 14 }} />}
            className="h-8 w-4"
          />
        </div>
      ) : (
        <Button
          onClick={() => setEditable(!editable)}
          type="default"
          icon={<EditOutlined style={{ fontSize: 14 }} />}
          className="h-8 w-4"
        />
      )}
    </div>
  )
}
