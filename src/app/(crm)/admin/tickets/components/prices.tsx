import { Button, Input } from 'antd'

export const PricesContent = ({ data }: { data: any }) => {
  const { passengers } = data

  return (
    <div className="min-h-[800px] max-w-[680px] space-y-4">
      {passengers.map((p: any, index: number) => (
        <div className="flex flex-col rounded-lg border p-4" key={index}>
          <h2 className="text-lg font-bold">
            {p.first_name} {p.last_name}
          </h2>
          <div className="mt-2 flex space-x-4">
            <div>
              <label>Prețul la companie</label>
              <Input defaultValue="92.00" className="mt-1" />
            </div>
            <div className="">
              <label>Prețul cu care sa vândut</label>
              <Input defaultValue="92.00" className="mt-1" />
            </div>
            <Button
              type="primary"
              className="ml-4 mt-4 self-end bg-brand-green"
            >
              Salvează
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
