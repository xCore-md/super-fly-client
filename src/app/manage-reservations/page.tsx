import { Label } from '@/components/ui/label'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'

export default function ManageReservations() {
  return (
    <section className="mx-auto mb-24 mt-16 w-full max-w-[737px] rounded-2xl bg-white p-7 shadow-md">
      <div className="mx-auto flex max-w-[588px]  flex-col">
        <h2 className="text-center text-2xl font-bold text-brand-blue">
          Gestionarea rezervărilor
        </h2>

        <p className="mt-3 text-center text-lg text-[#828282]">
          Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
          tincidunt quam. Lorem ipsum dolor sit amet consectetur.
        </p>

        <Label htmlFor="code" className="mb-1 mt-6 text-sm">
          Codul de confirmare
        </Label>
        <Input id="code" type="text" placeholder="xxxxxx" className="" />

        <Label htmlFor="email" className="mb-1 mt-5 text-sm">
          Email-ul folosit la rezervare
        </Label>
        <Input id="email" type="text" placeholder="E-mail" className="" />

        <Button className="mt-6 flex h-11 flex-1 items-center justify-center rounded-lg bg-brand-blue px-8 text-base font-light text-white shadow-md shadow-slate-400">
          Verifică
        </Button>
      </div>
    </section>
  )
}
