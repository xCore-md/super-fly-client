import React from 'react'

import { SwapOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import Image from 'next/image'
import departure from '@/assets/img/departure.svg'
import arrive from '@/assets/img/arrive.svg'
import { useCallback, useEffect, useState } from 'react'
import { useIsMobile } from '@/lib/hooks/usIsMobile'

interface IProps {
  switchCities: any
  options: any[]
  formik: any
  field: string
  onSearch: any
  onClickField: any
  openFields: any
  placeholder?: string
}

export function SearchInput({
  switchCities,
  options,
  formik,
  field,
  onSearch,
  onClickField,
  openFields,
  placeholder,
}: IProps) {
  const [inputValue, setInputValue] = useState(formik.values[field].city || '')
  const isMobile = useIsMobile()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setInputValue(value)
      onSearch(value)
    },
    [setInputValue, onSearch]
  )

  useEffect(() => {
    setInputValue(formik.values[field].city)
  }, [formik.values[field].city])

  const handleSelectOption = (option: any) => {
    formik.setFieldValue(field, option)

    if (field === 'fly_from') {
      onClickField('fly_to')
    }

    if (field === 'fly_to') {
      setTimeout(() => onClickField('date_from'), 100)
    }
  }

  const mobileCondition = isMobile && field === 'fly_to'

  return (
    <div
      className={`relative flex w-full min-w-[292px] items-center justify-between gap-4 ${mobileCondition ? 'rounded-b-[27px]' : 'rounded-t-[27px]'} border-r-[1px] border-gray-300 bg-white pl-6 pr-3 max-[1024px]:border-b-[1px] max-[1024px]:py-2 max-[1024px]:pl-4 max-[1024px]:pr-0 lg:w-auto lg:rounded-none lg:bg-transparent`}
    >
      <div className="flex w-auto items-center gap-4">
        <Image
          src={field === 'fly_from' ? departure : arrive}
          alt="image"
          width={22}
          height={17}
        />
        <Input
          placeholder={placeholder}
          name={field}
          value={inputValue}
          onClick={() => onClickField(field)}
          onChange={handleChange}
          className="block h-8 w-full border-0 bg-transparent p-0 text-sm font-semibold text-black focus:shadow-none md:min-w-36"
        />
      </div>
      {field === 'fly_from' && (
        <Button
          type="link"
          onClick={switchCities}
          className="bottom-0.5 right-2 z-20 h-[36px] w-[36px] p-0 hover:bg-transparent max-[1024px]:absolute max-[1024px]:translate-y-[18px]"
        >
          <SwapOutlined className="text-xl" />
        </Button>
      )}
      {openFields[field] && (
        <div className="custom-shadow absolute left-[1px] top-2 -z-10 h-auto w-full rounded-3xl bg-white pb-4 pt-12">
          <ul className="flex h-fit max-h-72 flex-col overflow-scroll px-2">
            {options.map((option: any) => (
              <li
                key={option.key}
                className="cursor-pointer select-none rounded-sm px-2 py-2 hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                <span className="flex justify-between gap-4">
                  <span>
                    <span className="text-sm text-brand-blue">
                      {option.city}
                    </span>
                    ,
                    <span className="pl-1 text-sm text-gray-500">
                      {option.country}
                    </span>
                  </span>
                  <span>{option.code}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
