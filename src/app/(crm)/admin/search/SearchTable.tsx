import { Table, TableProps } from 'antd'

interface DataType {
  zbor: string
  aterizare: string
  tur: string
  retur: string
  data: string
}

const columns: TableProps<DataType>['columns'] = [
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
interface DataType {
  zbor: string
  aterizare: string
  tur: string
  retur: string
  data: string
}

const data: DataType[] = [
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
  {
    zbor: 'Aeroportul Internațional Chișinău',
    aterizare: 'Aeroportul Internațional Chișinău',
    tur: '12.04.2024',
    retur: '12.04.2024',
    data: '09.04.2024 12:04:59',
  },
]

export const SearchTable = () => {
  return <Table columns={columns} dataSource={data} pagination={false} />
}
