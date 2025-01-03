'use client'

import React, { useEffect, useState } from 'react'
import { Button, Empty, Input, Modal, notification } from 'antd'
import { useFormik, FormikValues } from 'formik'
import axs from '@/lib/axios'
import { UserCard } from './components/user-card'

export default function Operators() {
  const [openModal, setOpenModal] = useState(false)
  const [users, setUsers] = useState<any>([])
  const [api, contextHolder] = notification.useNotification()
  const storage = localStorage.getItem('userData')
  const token = storage ? JSON.parse(storage).token : ''

  useEffect(() => {
    const headers = {
      Authorization: 'Bearer ' + token,
    }
    axs
      .get('/crm/user/list', { headers })
      .then((res) => {
        setUsers(res.data.data)
      })
      .catch((err) => {
        api.error({
          message: 'Error',
          description: err.response.data.message,
          placement: 'topRight',
          duration: 2,
          closable: true,
        })
        console.log(err.response.data)
      })
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    isInitialValid: false,

    validate: (values) => {
      const errors: Partial<FormikValues> = {}
      if (!values.name) errors.name = 'Required'
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
      }
      if (!values.password_confirmation) {
        errors.password_confirmation = 'Required'
      } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Passwords do not match'
      }
      return errors
    },
    onSubmit: (values) => {
      axs
        .post('/crm/user/create', values, {
          headers: { Authorization: 'Bearer ' + token },
        })
        .then((res) => {
          setUsers([...users, res.data])
          api.success({
            message: 'Message',
            description: `User ${res.data.name} created successfully`,
            placement: 'topRight',
            duration: 2,
            closable: true,
          })
          setOpenModal(false)
          formik.resetForm()
        })
        .catch((err) => {
          api.error({
            message: 'Error',
            description: err.response.data.message,
            placement: 'topRight',
            duration: 2,
            closable: true,
          })
          console.log(err.response.data)
        })
    },
  })

  const onCancel = () => {
    setOpenModal(false)
    formik.resetForm()
  }

  return (
    <section>
      <div className="relative z-10 p-1.5">
        <h4 className="banner-title mb-8 text-2xl font-light text-white">
          Vinzatorri {users.length > 0 ? `(${users.length})` : ''}
        </h4>
      </div>
      {users.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {contextHolder}

          {users.map((user: any, index: number) => (
            <UserCard user={user} key={index} setUsers={setUsers} />
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
            onOk={() => formik.handleSubmit()}
            okButtonProps={{ disabled: !formik.isValid }}
            onCancel={() => onCancel()}
            okText="Create"
          >
            <div className="py-4">
              <form
                onSubmit={formik.handleSubmit}
                onChange={formik.handleChange}
                className="flex flex-col gap-4"
              >
                <Input
                  className="w-full rounded-lg border border-gray-300 p-2"
                  placeholder="Name"
                  value={formik.values.name}
                  name="name"
                  onPressEnter={() => formik.handleSubmit()}
                  autoFocus={true}
                />
                <Input
                  className="w-full rounded-lg border border-gray-300 p-2"
                  placeholder="Email"
                  value={formik.values.email}
                  name="email"
                  onKeyDown={() => formik.handleSubmit()}
                />
                <Input
                  className="w-full rounded-lg border border-gray-300 p-2"
                  placeholder="Password"
                  value={formik.values.password}
                  name="password"
                  type="password"
                  onKeyDown={() => formik.handleSubmit()}
                />
                <Input
                  className="w-full rounded-lg border border-gray-300 p-2"
                  placeholder="Password Confirmation"
                  value={formik.values.password_confirmation}
                  name="password_confirmation"
                  type="password"
                  onPressEnter={() => formik.handleSubmit()}
                />
              </form>
            </div>
          </Modal>
        </div>
      ) : (
        <div className="mt-40 flex w-full justify-center">
          <div>
            <Empty />
          </div>
        </div>
      )}
    </section>
  )
}

const initialValues = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}
