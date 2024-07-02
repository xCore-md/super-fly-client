import { useEffect, useState } from 'react'
import { Empty, Table, TableProps, Tag, notification } from 'antd'
import dayjs from 'dayjs'
import axs from '@/lib/axios'

interface IDataType {
  zbor: string
  aterizare: string
  tur: string
  user: {}
  retur: string
  data: string
}

export const SearchTable = () => {
  const [data, setData] = useState<IDataType[]>([])
  const [api, contextHolder] = notification.useNotification()
  const [user, setUser] = useState({})

  useEffect(() => {
    const storage = localStorage.getItem('userData')
    const userData = storage ? JSON.parse(storage) : null
    if (userData) {
      setUser(userData.user)

      axs
        .get('/crm/search-logs')
        .then((res) => {
          if (res.data.length) {
            const historyData = res.data.map((item: any) => ({
              user: item.user,
              zbor: item.fly_from,
              aterizare: item.fly_to,
              tur: dayjs(item.date_from).format('DD.MM.YYYY'),
              retur: dayjs(item.return_to).format('DD.MM.YYYY'),
              data: dayjs(item.createdAt).format('DD.MM.YYYY | HH:mm'),
            }))

            setData(historyData)
          }
        })
        .catch((err) => {
          console.log({ err })
          api.error({
            message: 'Message',
            description: err.response.data.message,
            placement: 'bottomRight',
            duration: 3,
            closable: true,
          })
        })
    }
  }, [])

  return (
    <>
      {contextHolder}
      {data.length ? (
        <Table
          className="text-center"
          columns={generateColumns(user)}
          dataSource={data}
          pagination={false}
        />
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </>
  )
}

const generateColumns = (user: any) => {
  const baseColumns: TableProps<IDataType>['columns'] = [
    {
      title: 'Zbor din',
      dataIndex: 'zbor',
    },
    {
      title: 'Aterizare în',
      dataIndex: 'aterizare',
    },
    {
      title: 'Tur',
      dataIndex: 'tur',
    },
    {
      title: 'Retur',
      dataIndex: 'retur',
    },
    {
      title: 'Datele căutare',
      dataIndex: 'data',
    },
  ]

  if (user && user.role === 'admin') {
    return [
      {
        title: 'Utilizator',
        dataIndex: 'user',
        render: (user: any) => (
          <>
            <div>
              <p className="mb-2">{user.name}</p>
              <Tag color={user.role === 'admin' ? 'black' : 'blue'}>
                {user.role}
              </Tag>
            </div>
          </>
        ),
      },
      ...baseColumns,
    ]
  }

  return baseColumns
}
