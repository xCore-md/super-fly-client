import Image, { StaticImageData } from 'next/image'

interface IStatisticCardProps {
  img: StaticImageData
  title: string
  month: string
  value: string | number
}
export default function StatisticCard({
  img,
  title,
  month,
  value,
}: IStatisticCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <Image className=" mb-2 h-10 w-10" src={img} alt="icon" />
      <h4 className="mb-2 text-lg font-medium text-gray-500">{title}</h4>
      <p className="mb-2 text-xl font-semibold text-gray-500">{value}</p>
      <span className="text-sm font-medium text-gray-500">{month}</span>
    </div>
  )
}
