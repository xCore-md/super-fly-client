import { useState } from 'react'
import { Button, Input, notification } from 'antd'
import { useFormik } from 'formik'
import { IPassenger } from '@/app/(crm)/admin/tickets/components/passengers'
import { baggages } from '@/data/data'
import axs from '@/lib/axios'

export const BaggageComponent = ({
  data,
  updateAction,
}: {
  data: any
  updateAction: any
}) => {
  const [api, context] = notification.useNotification()
  const [passengers] = useState(data.passengers)

  const handleUpdateBaggage = (passenger: any) => {
    axs.put(
      `/crm/sales/${data.id}/passengers/${passenger.id}/baggage/{{baggage-id}}/update`
    )
    api.success({
      message: 'Success',
      description: 'Baggage updated successfully',
      placement: 'bottomRight',
      duration: 3,
      closable: true,
    })
  }
  return (
    <div className="min-h-[800px]">
      {context}
      {passengers.map((passenger: IPassenger, index: number) => (
        <PassengerRow
          passenger={passenger}
          key={index}
          updateAction={handleUpdateBaggage}
        />
      ))}
    </div>
  )
}

interface IPassengerRow {
  passenger: IPassenger
  updateAction: any
}
const PassengerRow = ({ passenger, updateAction }: IPassengerRow) => {
  const formik = useFormik({
    initialValues: passenger,
    onSubmit: (values) => {
      updateAction({ ...passenger, baggage: values.baggage })
    },
  })

  return (
    <form
      onChange={formik.handleChange}
      onSubmit={formik.handleSubmit}
      className="mb-4 flex justify-between rounded-lg border bg-white p-4 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-bold">
          {passenger.first_name} {passenger.last_name}
        </h2>
        <Button htmlType="submit" type="primary" className="mt-4">
          Save
        </Button>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {baggages.map((baggage, i) => (
          <Input
            key={baggage.type}
            addonBefore={baggage.type}
            name={`baggage[${i}].count`}
            value={formik.values?.baggage[i]?.count || ''}
            onChange={(e) =>
              formik.setFieldValue(`baggage[${i}]`, {
                type: baggage.type,
                count: Number(e.target.value),
              })
            }
          />
        ))}
      </div>
    </form>
  )
}
