import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Input } from 'antd'
import Image from 'next/image'
import departure from '@/assets/img/departure.svg'
import arrive from '@/assets/img/arrive.svg'

export function InputComponent({
  field,
  onSearch,
  options,
  formik,
  closeDrawer,
}: any) {
  const fieldTitle = field === 'flyFrom' ? 'ZBOR DIN' : 'ATERIZARE ÎN'
  const imageSrc = field === 'flyFrom' ? departure : arrive

  const [inputValue, setInputValue] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
    setInputValue(e.target.value)
  }, [])

  const inputRef = useRef<any>(null)

  useEffect(() => {
    if (field === 'flyFrom' && formik.values.fly_from.city) {
      setInputValue(formik.values.fly_from.city)
    }
    if (field === 'flyTo' && formik.values.fly_to.city) {
      setInputValue(formik.values.fly_to.city)
    }
  }, [formik.values.fly_from.city, formik.values.fly_to.city, field])

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200)
    }
  }, [])

  const handleSelect = (option: any) => {
    formik.setFieldValue(field === 'flyFrom' ? 'fly_from' : 'fly_to', option)
    closeDrawer()
  }

  return (
    <div>
      <div className="custom-shadow flex h-16 w-full items-center justify-between rounded-full bg-white py-2 pl-4 pr-2">
        <div className="flex items-center justify-start gap-4">
          <Image
            src={imageSrc}
            className=" text-brand-blue"
            alt="image"
            width={22}
            height={17}
          />

          <div className="flex flex-col">
            <span className="pt-1 text-xs font-bold uppercase text-brand-blue">
              {fieldTitle}
            </span>
            <Input
              ref={inputRef}
              className="border-none pl-0 font-semibold outline-none focus:shadow-none"
              type="text"
              placeholder="Barcelona"
              onChange={handleChange}
              value={inputValue}
              autoFocus={true}
            />
          </div>
        </div>
      </div>
      <ul className="mt-6">
        {inputValue.length > 0 && options.length > 0
          ? options.map((option: any) => (
              <li key={option.code} className="border-b-[1px] py-2">
                <span
                  className="flex justify-between gap-4"
                  onClick={() => handleSelect(option)}
                >
                  <span>
                    <span className="text-sm text-brand-blue">
                      {option.city}
                    </span>
                    ,
                    <span className="pl-1 text-xs text-gray-500">
                      {option.country}
                    </span>
                  </span>
                  <span>{option.code}</span>
                </span>
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
