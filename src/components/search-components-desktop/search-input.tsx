import Image from 'next/image'
import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { SwapOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import arrive from '@/assets/img/arrive.svg'
import departure from '@/assets/img/departure.svg'
import { useIsTablet } from '@/lib/hooks/usIsTablet'

interface IProps {
  switchCities: any
  options: any[]
  formik: any
  field: string
  onSearch: any
  onClickField: any
  openFields: any
  setOpenFields?: any
  setOpenField?: any
  initialFieldsState?: any
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
  setOpenFields,
  setOpenField,
  initialFieldsState,
  placeholder,
}: IProps) {
  const [inputValue, setInputValue] = useState(formik.values[field].city || '')
  const isTablet = useIsTablet()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target

      if (value.length >= 3) {
        setOpenField?.(field, true)
      }
      setInputValue(value)
      onSearch(value)
    },
    [setInputValue, onSearch, setOpenField, field]
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

  const handleInputClick = useCallback(() => {
    if (field === 'fly_from' && !openFields[field] && !isTablet) {
      return setOpenFields?.(initialFieldsState)
    }
    onClickField(field)
  }, [onClickField, field])

  const tabletCondition = isTablet && field === 'fly_to'

  return (
    <div
      className={`relative flex w-full items-center justify-between gap-4 md:min-w-52 ${tabletCondition ? 'rounded-b-[27px]' : 'rounded-t-[27px]'} border-r-[1px] border-gray-300 bg-white pl-4 pr-1 max-[1024px]:border-b-[1px] max-[1024px]:py-2 max-[1024px]:pl-4 max-[1024px]:pr-0 lg:w-auto lg:rounded-none lg:bg-transparent`}
    >
      <div className="flex w-full items-center gap-2 overflow-hidden pr-2">
        <Image
          src={field === 'fly_from' ? departure : arrive}
          alt="image"
          width={22}
          height={17}
        />
        <Input
          placeholder={placeholder}
          name={field}
          id={field}
          value={inputValue}
          autoComplete="off"
          onClick={handleInputClick}
          onChange={handleChange}
          className="block h-8 w-full border-0 bg-transparent p-0 text-xs font-semibold text-black focus:shadow-none md:text-xxs"
        />
      </div>
      {field === 'fly_from' && (
        <Button
          type="link"
          onClick={switchCities}
          className="bottom-0.5 right-2 z-10 h-[36px] w-[36px] p-0 hover:bg-transparent max-[1024px]:absolute max-[1024px]:translate-y-[18px]"
        >
          <SwapOutlined className="text-xl" />
        </Button>
      )}
      {openFields[field] && (
        <div className="dropdown-shadow no-scrollbar absolute left-0 top-[40.5px] z-10 h-auto w-full overflow-hidden rounded-b-xl bg-white">
          <ul className="searchDropDownShadow flex flex-col overflow-scroll rounded-b-3xl px-2 pb-2 pt-4">
            {options.map((option: any) => (
              <li
                key={option.key}
                className="cursor-pointer select-none rounded-sm p-1 hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-xxs">
                    <span className="text-brand-blue">{option.city}</span>,
                    <span className="pl-1 text-gray-500">{option.country}</span>
                  </span>
                  <span className="text-xxs">{option.code}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
