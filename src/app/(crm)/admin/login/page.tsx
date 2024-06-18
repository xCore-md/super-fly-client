'use client'

import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { Input, Button, notification, Modal } from 'antd'
import { FormikValues, useFormik } from 'formik'
import logoWhite from '@/assets/img/logo-white.png'
import axs from '@/lib/axios'

export default function Login() {
  const [api, contextHolder] = notification.useNotification()
  const [openResetPassword, setOpenResetPassword] = useState(false)

  const formik = useFormik({
    initialValues: initialValues,
    isInitialValid: false,

    validate: (values) => {
      const errors: Partial<FormikValues> = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Password must be at least 7 characters'
      }

      return errors
    },
    onSubmit: (values) => {
      axs
        .post('/crm/auth/login', values)
        .then((res) => {
          localStorage.setItem('userData', JSON.stringify(res.data))
          window.location.href = '/admin'
        })
        .catch((err) => {
          api.error({
            message: 'Error',
            description: err.response.data.message,
            placement: 'bottomRight',
            duration: 2,
            closable: true,
          })

          console.log(err.response.data)
        })
    },
  })

  const openModal = useCallback(() => {
    setOpenResetPassword(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpenResetPassword(false)
  }, [])

  const formikResetPassword = useFormik({
    initialValues: {
      email: '',
    },
    isInitialValid: false,
    validate: (values) => {
      const errors: Partial<FormikValues> = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: (values) => {
      axs
        .post('/crm/auth/reset-password', values)
        .then((res) => {
          api.success({
            message: 'Success',
            description: res.data.message,
            placement: 'bottomRight',
            duration: 3,
            closable: true,
          })
          closeModal()
        })
        .catch((err) => {
          api.error({
            message: 'Error',
            description: err.response.data.message,
            placement: 'bottomRight',
            duration: 2,
            closable: true,
          })
          console.log(err.response.data)
        })
    },
  })

  const onResetPasswordKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        formikResetPassword.handleSubmit()
      }
    },
    [formikResetPassword]
  )

  return (
    <section>
      {contextHolder}
      <div className="absolute left-0 top-0 z-0 h-80 w-full">
        <div className="absolute left-0 top-0 flex h-full  w-full items-center justify-center ">
          <Image
            className="z-10 w-40"
            width={80}
            height={80}
            src={logoWhite}
            alt="logo"
          />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
        <div className="flex h-full w-full items-center justify-center pt-60">
          <div className="z-10 flex w-[528px] flex-col rounded-xl bg-white px-10 py-16 shadow-md">
            <h4 className="mb-11 text-center text-3xl font-normal">
              Conectează-te
            </h4>
            <div className="mb-6 flex flex-col gap-2">
              <span className="text-lg font-light">Email</span>
              <Input
                name="email"
                placeholder="noreplay@mail.com"
                className="py-3"
                onPressEnter={() => formik.handleSubmit()}
              />
            </div>
            <div className="mb-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-light">Parola</span>
                <Button
                  type="text"
                  onClick={openModal}
                  className="text-xs text-brand-blue"
                >
                  A-ți uitat parola?
                </Button>
              </div>
              <Input
                name="password"
                placeholder="noreplay@mail.com"
                type="password"
                className="py-3"
                onPressEnter={() => formik.handleSubmit()}
              />
            </div>
            {/* <Checkbox>Memorează</Checkbox> */}
            <div className="mt-4 flex justify-center">
              <Button
                disabled={!formik.isValid}
                htmlType="submit"
                type="primary"
                shape="round"
                size="large"
                // className="custom-shadow h-11 w-40 rounded-full border-0 bg-black text-base font-normal text-white"
              >
                Conecteză-te
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Modal
        open={openResetPassword}
        title="Reset password"
        closable={true}
        onCancel={closeModal}
        onClose={closeModal}
        onOk={() => formikResetPassword.handleSubmit()}
        okButtonProps={{ disabled: !formikResetPassword.isValid }}
        okText="Reset"
        centered
      >
        <form
          onSubmit={formikResetPassword.handleSubmit}
          onChange={formikResetPassword.handleChange}
        >
          <Input
            placeholder="Email"
            className="my-2 p-2"
            name="email"
            onPressEnter={onResetPasswordKeyDown}
            value={formikResetPassword.values.email}
          />
        </form>
      </Modal>
    </section>
  )
}

const initialValues = {
  email: '',
  password: '',
}
