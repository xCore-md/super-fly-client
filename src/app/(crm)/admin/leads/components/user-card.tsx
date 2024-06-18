import { useCallback, useState } from 'react'
import {
  notification,
  Popover,
  Button,
  Popconfirm,
  Input,
  Modal,
  Switch,
  Select,
} from 'antd'
import { FormikValues, useFormik } from 'formik'
import axs from '@/lib/axios'

export const UserCard = ({ user, setUsers }: any) => {
  const [api, contextHolder] = notification.useNotification()
  const [editUser, setEditUser] = useState<any>(false)

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      is_active: user.is_active,
      role: user.role,
    },
    isInitialValid: false,
    validate: (values) => {
      const errors: Partial<FormikValues> = {}
      if (!values.name) errors.name = 'Required'
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: (values) => {
      const storage = localStorage.getItem('userData')
      const token = storage ? JSON.parse(storage).token : ''
      const headers = { Authorization: 'Bearer ' + token }
      axs
        .put(`/crm/user/update/${user.id}`, values, { headers })
        .then((res) => {
          setEditUser(false)

          setUsers((prev: any) => {
            const newUsers = prev.map((u: any) =>
              u.id === user.id ? res.data : u
            )
            return newUsers
          })

          api.success({
            message: 'Message',
            description: `User ${user.name} updated successfully`,
            placement: 'bottomRight',
            duration: 2,
            closable: true,
          }),
            200
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

  const handleCloseModal = useCallback(() => {
    setEditUser(false)
    formik.resetForm()
  }, [formik])

  const handleOpenModal = useCallback(() => {
    setEditUser(true)

    formik.setValues({
      name: user.name,
      email: user.email,
      is_active: user.is_active,
      role: user.role,
    })
  }, [user.name, user.email, user.is_active, user.role, formik])

  const handleDelete = useCallback(() => {
    const storage = localStorage.getItem('userData')
    const token = storage ? JSON.parse(storage).token : ''

    axs
      .delete(`/crm/user/delete/${user.id}`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        setUsers((prev: any) => prev.filter((u: any) => u.id !== user.id))
        setTimeout(() => {
          api.success({
            message: 'Message',
            description: res.data.message,
            placement: 'bottomRight',
            duration: 2,
            closable: true,
          })
        }, 500)
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
  }, [api])

  const handleSubmitUpdate = useCallback(
    (e: any) => {
      e.preventDefault()
      setEditUser(false)
      formik.handleSubmit()
    },
    [formik]
  )

  return (
    <div
      className={`custom-shadow relative flex flex-col items-center justify-center rounded-lg p-8 ${user.role === 'admin' ? ' bg-black text-white' : 'bg-white'} ${user.is_active ? '' : ' bg-gray-300'}`}
    >
      {contextHolder}
      <Popover
        placement="bottom"
        content={
          <div className="flex flex-col gap-2 p-2">
            <Button size="small" type="primary" onClick={handleOpenModal}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={handleDelete}
            >
              <Button size="small" type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        }
      >
        <Button
          size="middle"
          shape="circle"
          className="absolute right-2 top-2 flex items-start justify-center bg-gray-200 "
        >
          <span className="-mt-2 flex text-lg font-medium">...</span>
        </Button>
      </Popover>
      <img
        className=" mb-4 h-16 w-16 rounded-full"
        src="https://picsum.photos/200"
        alt="icon"
      />
      <span>{user.name}</span>
      <span
        className={`my-1 text-xs ${user.role === 'admin' ? 'text-white' : 'text-gray-500'}`}
      >
        {user.email}
      </span>

      <Modal
        open={editUser}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        okText="Save"
        centered
        title={`Edit ${user.name} details`}
        onOk={handleSubmitUpdate}
      >
        <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
          <div className="flex flex-col gap-4 pt-4">
            <Input placeholder="Name" name="name" value={formik.values.name} />
            <Input
              placeholder="Email"
              name="email"
              value={formik.values.email}
            />
            <div className="flex gap-6">
              <Switch
                size="default"
                checkedChildren="active"
                unCheckedChildren="disabled"
                defaultChecked
                checked={formik.values.is_active}
                onChange={(value) => formik.setFieldValue('is_active', value)}
              />
              <Select
                className="h-6 w-24 text-xs"
                value={formik.values.role}
                onChange={(value) => formik.setFieldValue('role', value)}
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
