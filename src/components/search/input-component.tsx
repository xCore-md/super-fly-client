import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Input, Spin } from 'antd'
import arrive from '@/assets/img/arrive.svg'
import departure from '@/assets/img/departure.svg'
import { useTranslationsContext } from '@/context/translations-context'

export function InputComponent({
  field,
  onSearch,
  options,
  formik,
  openDrawer,
  loading,
}: any) {
  const { lang, translations: t } = useTranslationsContext()
  const fieldTitle =
    field === 'fly_from'
      ? t.searchBar?.departurePlaceholder
      : t.searchBar?.arrivalPlaceholder
  const imageSrc = field === 'fly_from' ? departure : arrive

  const [inputValue, setInputValue] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
    setInputValue(e.target.value)
  }, [])

  const handleSelect = (option: any) => {
    formik.setFieldValue(field === 'fly_from' ? 'fly_from' : 'fly_to', option)
    if (field === 'fly_from') {
      openDrawer('fly_to')
    }
    if (field === 'fly_to') {
      openDrawer('date_from')
    }
  }

  return (
    <div>
      <div className="custom-shadow flex h-16 w-full items-center justify-between rounded-full bg-white py-2 pl-4 pr-2">
        <div className="flex w-full items-center justify-start gap-4">
          <Image
            src={imageSrc}
            className=" text-brand-blue"
            alt="image"
            width={22}
            height={17}
          />

          <div className="flex w-full flex-col pr-4">
            <span className="pt-1 text-xs font-bold uppercase text-brand-blue">
              {fieldTitle}
            </span>
            <Input
              className="w-full border-none pl-0 font-semibold outline-none focus:shadow-none focus:outline-none focus:ring-0"
              type="text"
              placeholder={placeholder[lang]}
              onChange={handleChange}
              value={inputValue}
            />
          </div>
        </div>
      </div>
      <List options={options} handleSelect={handleSelect} loading={loading} />
    </div>
  )
}

const List = ({ options, handleSelect, loading }: any) => {
  if (loading)
    return (
      <div className="flex items-center justify-center py-8">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    )

  return (
    <ul className="mt-6">
      {options.length > 0
        ? options.map((option: any) => (
            <li key={option.code} className="border-b-[1px] py-2">
              <span
                className="flex justify-between gap-4"
                onClick={() => handleSelect(option)}
              >
                <span>
                  <span className="text-sm text-brand-blue">{option.city}</span>
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
  )
}

const placeholder: any = {
  ro: 'Ex. Chisinau',
  ru: 'Доп. Кишинев',
}
