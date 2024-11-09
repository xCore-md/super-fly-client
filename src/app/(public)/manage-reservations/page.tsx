'use client'

import React, { useCallback } from 'react'
import { Button, notification } from 'antd'
import { Formik, Form, ErrorMessage } from 'formik'
import axs from '@/lib/axios'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

export default function ManageReservations() {
  const [isConfirmed, setIsConfirmed] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()

  const confirmReservation = useCallback(
    ({ email, code: sale_id }: any) => {
      setLoading(true)

      axs
        .post('/check-fly', { email, sale_id })
        .then(() => {
          setIsConfirmed(true)
          setLoading(false)
        })
        .catch((error) => {
          console.log({ error })

          setIsConfirmed(false)
          setLoading(false)
          api.error({
            message: 'Error',
            description: 'Invalid code or email',
            placement: 'topRight',
            duration: 2,
            closable: true,
          })
        })
    },
    [setLoading, setIsConfirmed, api]
  )

  return (
    <section className="mx-auto mb-24 mt-16 w-full max-w-[737px] animate-fade-up rounded-2xl bg-white p-7 shadow-md fill-mode-forwards">
      {contextHolder}
      {!isConfirmed ? (
        <FormComponent confirm={confirmReservation} loading={loading} />
      ) : (
        <div className="mt-10 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-brand-green lg:text-2xl">
            Efectuat cu succes!
          </h2>

          <p className="mt-4 text-center text-base text-[#828282]">
            In scurt timp ve-ți fi telefonat de operatorul dumnevoastrǎ!
          </p>
        </div>
      )}
    </section>
  )
}

const FormComponent = ({ confirm, loading }: any) => {
  return (
    <div className="mx-auto flex max-w-[588px]  flex-col">
      <h2 className="text-center text-xl font-semibold text-brand-blue lg:text-2xl">
        Gestionarea rezervărilor
      </h2>

      <Formik
        initialValues={{ code: '', email: '' }}
        onSubmit={(values) => {
          confirm(values)
        }}
        validate={(values) => {
          const errors: any = {}

          if (!values.code) {
            errors.code = 'Required'
          }

          if (!values.email) {
            errors.email = 'Required'
          }

          if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Invalid email address'
          }

          return errors
        }}
      >
        {({ handleSubmit, handleChange }) => (
          <Form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="mt-10 flex flex-col gap-4"
          >
            <div>
              <Label className="text-sm">Codul de confirmare</Label>
              <Input
                name="code"
                type="text"
                placeholder="xxxxxx"
                className="mt-2"
              />
              <ErrorMessage
                name="code"
                component="span"
                className=" text-sm text-red-500"
              />
            </div>

            <div>
              <Label className="text-sm">Email-ul folosit la rezervare</Label>
              <Input
                name="email"
                type="text"
                placeholder="E-mail"
                className="mt-2"
              />
              <ErrorMessage
                name="email"
                component="span"
                className=" text-sm text-red-500"
              />
            </div>

            <Button
              htmlType="submit"
              loading={loading}
              className="btn-primary mt-4 flex h-11 flex-1 items-center justify-center rounded-lg px-8 text-base font-light text-white shadow-md shadow-slate-400"
            >
              Verifică
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
