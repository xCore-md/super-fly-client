import { Button } from 'antd'
export default function Leads() {
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
    </section>
  )
}
