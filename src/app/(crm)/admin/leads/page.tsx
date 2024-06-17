'use client'

import { useState } from 'react'
import { Button, Input, Modal } from 'antd'

export default function Leads() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <section className="grid grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="custom-shadow relative flex flex-col items-center justify-center rounded-lg bg-white p-8"
        >
          <Button className="absolute right-2 top-2 flex h-6 w-6 items-start justify-center rounded-full bg-gray-200 px-0 py-0">
            <span className="-mt-2 flex text-lg">...</span>
          </Button>
          <img
            className=" mb-4 h-16 w-16 rounded-full"
            src="https://picsum.photos/200"
            alt="icon"
          />
          <span>John Doe</span>
          <span className="text-sm text-gray-500">Poziția Ocupată</span>
        </div>
      ))}
      <div className="fixed bottom-10 right-10 flex w-full justify-end">
        <Button
          type="primary"
          shape="circle"
          size="large"
          className="p-0 text-2xl font-thin"
          onClick={() => setOpenModal(true)}
        >
          +
        </Button>
      </div>
      <Modal
        open={openModal}
        title="ADD USER"
        onCancel={() => setOpenModal(false)}
        okText="Create"
      >
        <div className="py-4">
          <form className="flex flex-col gap-4">
            <Input
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Name"
            />
            <Input
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Email"
            />
            <Input
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Password"
              type="password"
            />
            <Input
              className="w-full rounded-lg border border-gray-300 p-2"
              placeholder="Password Confirmation"
              type="password"
            />
          </form>
        </div>
      </Modal>
    </section>
  )
}
