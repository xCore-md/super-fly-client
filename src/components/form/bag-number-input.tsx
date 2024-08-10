'use client'

import { useState } from 'react'
import { Button } from '@components/ui/button'

type actionType = 'minus' | 'plus'

export const BagNumberInput = ({
  formik,
  passengerIndex,
  bag,
  bagIndex,
}: {
  formik: any
  passengerIndex: number
  bag: any
  bagIndex: number
}) => {
  const [value, setValue] = useState(0)
  const onChange = (type: actionType) => () => {
    const newValue = type === 'plus' ? value + 1 : value - 1
    if (newValue >= 0 && newValue <= 99) {
      setValue(newValue)
      formik.setFieldValue(
        `passengers[${passengerIndex || 0}].baggage[${bagIndex}]`,
        {
          type: bag.type,
          count: newValue,
        }
      )
    }
  }

  const isPlusDisabled = value === 99
  return (
    <div className="flex select-none items-center justify-center">
      <Button
        className="btn-extended mr-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gray-200 p-0 text-center text-xl font-normal text-black hover:bg-gray-200/80 "
        onClick={onChange('minus')}
      >
        -
      </Button>

      <span className="w-4 text-center text-xl font-medium lg:text-base">
        {value}
      </span>

      <Button
        className="btn-extended ml-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-blue p-0 text-center text-xl font-normal text-white hover:bg-brand-blue/80 "
        onClick={onChange('plus')}
        disabled={isPlusDisabled}
      >
        +
      </Button>
    </div>
  )
}
