import Image from 'next/image'
import { Input, Button, Checkbox } from 'antd'
import logoWhite from '@/assets/img/logo-white.png'

export default function Login() {
  return (
    <section>
      <div className="absolute left-0 top-0 z-0 h-80 w-full">
        <div className="absolute left-0 top-0 flex h-full  w-full items-center justify-center ">
          <Image
            className="z-10 w-40"
            width={80}
            height={80}
            src={logoWhite}
            alt="logo"
          />
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center pt-60">
        <div className="z-10 flex w-[528px] flex-col rounded-xl bg-white px-10 py-16 shadow-md">
          <h4 className="mb-11 text-center text-3xl font-normal">
            Conectează-te
          </h4>
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-lg font-light">Email</span>
            <Input placeholder="noreplay@mail.com" className="py-3" />
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-light">Parola</span>
              <a href="#" className="text-xs text-brand-blue">
                A-ți uitat parola?
              </a>
            </div>
            <Input
              placeholder="noreplay@mail.com"
              type="password"
              className="py-3"
            />
          </div>
          <Checkbox>Memorează</Checkbox>
          <div className="mt-4 flex justify-center">
            <Button className="custom-shadow h-11 w-40 rounded-full border-0 bg-black text-base font-normal text-white hover:bg-slate-900 hover:text-white">
              Conecteză-te
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
