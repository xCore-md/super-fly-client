import { Button, Input } from 'antd'

export const PricesContent = () => {
  return (
    <div className="min-h-[800px] max-w-[680px] space-y-4">
      <div className="flex flex-col rounded-lg border p-4">
        <h2 className="text-lg font-bold">JOHN DOE</h2>
        <div className="mt-2 flex space-x-4">
          <div>
            <label>Prețul la companie</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <div className="">
            <label>Prețul cu care sa vândut</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <Button type="primary" className="ml-4 mt-4 self-end bg-brand-green">
            Salvează
          </Button>
        </div>
      </div>
      <div className="flex flex-col rounded-lg border p-4">
        <h2 className="text-lg font-bold">JOHN DOE</h2>
        <div className="mt-2 flex space-x-4">
          <div>
            <label>Prețul la companie</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <div>
            <label>Prețul cu care sa vândut</label>
            <Input defaultValue="92.00" className="mt-1" />
          </div>
          <Button type="primary" className="mt-4 self-end bg-brand-green">
            Salvează
          </Button>
        </div>
      </div>
    </div>
  )
}
