import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

export default function ManageReservations() {
  return (
    <section className="mx-auto mb-24 mt-16 w-full max-w-[737px] animate-fade-up rounded-2xl bg-white p-7 shadow-md fill-mode-forwards">
      <div className="mx-auto flex max-w-[588px]  flex-col">
        <h2 className="text-center text-xl font-bold text-brand-blue lg:text-2xl">
          Gestionarea rezervărilor
        </h2>

        <p className="mt-3 text-center text-base text-[#828282] lg:text-lg">
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
