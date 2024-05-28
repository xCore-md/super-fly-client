'use client'
import React from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'

export default function ClientsPage() {
  return (
    <div className="flex gap-6">
      <aside className="">
        <CategoryList />
      </aside>

      <main className="w-full">
        <SearchInput />
        <ListComponent />
      </main>
    </div>
  )
}

interface Category {
  name: string
  count: number
}

const categories: Category[] = [
  { name: 'Toate', count: 28 },
  { name: 'Categorie 1', count: 2 },
  { name: 'Categorie 2', count: 13 },
  { name: 'Categorie 3', count: 4 },
  { name: 'Categorie 4', count: 6 },
]

const CategoryList: React.FC = () => {
  return (
    <ul className="min-w-[230px] rounded-lg bg-white p-6 shadow-lg">
      {categories.map((category, index) => (
        <li key={index} className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <span
              className={`mr-2 h-3 w-3 rounded-full ${index === 0 ? 'bg-[#FFBD00]' : 'bg-[#DCDCDC]'}`}
            ></span>
            <span className={index === 0 ? 'font-bold' : ''}>
              {category.name}
            </span>
          </div>
          <div className={`w-[21px]`}>
            <span
              className={`${index === 1 ? ' bg-red-500 text-white' : 'bg-[#F8F6F2] text-gray-700'} rounded-md px-2 py-1 text-left`}
            >
              {category.count}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

interface ListItem {
  title: string
  description: string
  date: string
  smallDescription?: string
}

const listItems: ListItem[] = [
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description:
      'Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.',
    smallDescription: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
    smallDescription: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
    smallDescription: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
    smallDescription: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
    smallDescription: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
    smallDescription: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
    smallDescription: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Feb 11',
  },
]
const ListComponent: React.FC = () => {
  return (
    <div className="-translate-y-[40px] rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-xl font-bold">Toate</h1>
      <ul>
        {listItems.map((item, index) => (
          <li
            key={index}
            className="grid grid-cols-6 items-center justify-between gap-4 border-b py-4"
          >
            <div className="col-span-2">
              <p className="text-base">{item.title}</p>
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
            </div>

            <p className="col-span-3 self-start text-sm text-gray-600">
              {item.description}
            </p>

            <div className="col-span-1 self-start text-right text-gray-600">
              {item.date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SearchInput = () => {
  return (
    <div className="flex -translate-y-[74px]">
      <Input
        type="text"
        placeholder="Caută client..."
        className="max-w-[550px] rounded-full shadow-lg"
      />
      <Button className="mt-[3px] h-[34px] w-[34px] -translate-x-[38px] rounded-full bg-brand-green p-0 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          fill="none"
          viewBox="0 0 14 15"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13.5l-3.037-3.037m0 0a5.25 5.25 0 10-7.426-7.426 5.25 5.25 0 007.426 7.426z"
          ></path>
        </svg>
      </Button>
    </div>
  )
}
