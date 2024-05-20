import Image from 'next/image'
import mastercardWhite from '@/assets/img/mastercard-white.svg'
import mastercard from '@/assets/img/mastercard.svg'
import paynetWhite from '@/assets/img/paynet-white.svg'
import paynet from '@/assets/img/paynet.svg'
import visaWhite from '@/assets/img/visa-white.svg'
import visa from '@/assets/img/visa.svg'
import { ReservationSummary } from '@/components/reservation/reservation-summary'
import { FlyContent } from '../../components/flights/flights-listing'

export default function ConfirmReservationPage() {
  return (
    <section className="flex justify-center pb-20 pt-5 lg:pt-14">
      <div className="flex w-full flex-col gap-2 lg:max-w-[1152px] lg:flex-row lg:gap-20">
        <div className="lg:w-2/3">
          <div className="mr-14 flex w-full flex-col justify-between gap-1 rounded-2xl bg-brand-blue px-5 py-2 text-white lg:h-[63px] lg:flex-row lg:items-center lg:gap-0 lg:rounded-lg">
            <div>
              <span className="mr-2 text-xs lg:font-medium">
                Confirmarea rezervării:
              </span>
              <span className="text-sm font-medium lg:text-base lg:font-light">
                MPGP75
              </span>
            </div>
            <div className="hidden text-xs lg:block">
              <span className="mr-2 lg:font-medium">Statusul rezervării:</span>
              <span className="font-medium lg:font-light">
                Se așteaptă plata
              </span>
            </div>
            <div className="text-xs">
              <span className="mr-2 lg:font-medium">Email:</span>
              <span className="font-medium lg:font-light">client@mail.com</span>
            </div>
          </div>

          <div className="mr-14 mt-3 flex w-full flex-col justify-between gap-1 rounded-2xl bg-brand-green px-5 py-2 text-white lg:hidden lg:h-[63px] lg:flex-row lg:items-center lg:gap-0 lg:rounded-lg">
            <div className="text-xs">
              <span className="mr-2">Statusul rezervării:</span>
              <span className="font-medium">Se așteaptă plata</span>
            </div>
          </div>

          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="custom-shadow mt-6 w-full gap-5 rounded-2xl bg-white px-5 py-7 lg:px-10"
            >
              {index === 0 && (
                <div className="mb-10 flex flex-wrap justify-between">
                  <div className="flex w-3/4 flex-col">
                    <span className="mb-1 text-xxs text-gray-400">
                      Numele/Prenumele
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      John Doe
                    </span>
                  </div>
                  <div className="flex w-1/4 flex-col">
                    <span className="mb-1 text-xxs text-gray-400">
                      Naționalitate
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      MD
                    </span>
                  </div>
                  <div className="flex w-3/4 flex-col">
                    <span className="mb-1 text-xxs text-gray-400">
                      Numărul (carte de identitate/pașaport)
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      AB4567894563
                    </span>
                  </div>
                  <div className="flex w-1/5 flex-col">
                    <span className="mb-1 text-xxs text-gray-400">Expiră</span>
                    <span className="text-xs font-medium text-gray-700">
                      11/11/2030
                    </span>
                  </div>
                </div>
              )}

              {/*desktop*/}
              <div className="col-span-3 hidden flex-col justify-center lg:flex">
                <div className="grid grid-cols-3">
                  <div className="mr-2 text-right">
                    <div className="text-2xl font-bold">
                      {index === 0 ? 'Chișinău' : 'Milano Bergamo'}
                    </div>
                    <div className="text-xs text-gray-700">RMO</div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-gray-700">Jo, 24 Ian</span>
                      <span className="text-xl font-normal">11:35</span>
                    </div>
                  </div>
                  <div className=" mt-2">
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <p className="text-xs text-gray-700">2 h 50 min</p>
                    </div>

                    <span className="fly-line block h-[1px] w-full bg-blue-700" />

                    <div className="mb-1 mt-1 flex items-center justify-center gap-2 text-xs text-brand-blue">
                      Direct
                    </div>

                    {/*<div className="mt-2 flex justify-between">*/}
                    {/*  <span className="text-xs text-gray-600">MDA</span>*/}
                    {/*  <span className="text-xs text-gray-600">BGY</span>*/}
                    {/*</div>*/}
                  </div>
                  <div className="ml-2 text-left">
                    <div className="text-2xl font-bold">
                      {index === 1 ? 'Chișinău' : 'Milano Bergamo'}
                    </div>
                    <div className="text-xs text-gray-700">BGY</div>
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-xl font-normal">11:35</span>
                      <span className="text-xs text-gray-700">Jo, 24 Ian</span>
                    </div>
                  </div>
                </div>
              </div>

              {/*todo: add date*/}
              {/*Mobile*/}
              <div className="lg:hidden">
                <FlyContent
                  withoutAction
                  withoutActionFlightNumber
                  withoutHeader
                  withoutFooter
                  pricePlacement="top"
                />
              </div>
            </div>
          ))}
          <div className="custom-shadow mt-4 rounded-lg bg-white p-4 text-xxs text-gray-400 lg:bg-[#F0F2FF]">
            <div className="flex">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.00025 10.5C6.81318 10.5001 7.61096 10.2799 8.30881 9.86294C9.00666 9.44597 9.57852 8.84773 9.96364 8.13181C10.3488 7.41588 10.5327 6.609 10.496 5.79689C10.4594 4.98478 10.2034 4.19778 9.75525 3.5195L6.17775 7.4945C6.01064 7.68021 5.78008 7.79664 5.53143 7.82089C5.28279 7.84513 5.03408 7.77543 4.83425 7.6255L3.20025 6.4C3.09416 6.32044 3.02403 6.20199 3.00527 6.07071C2.98652 5.93944 3.02068 5.80609 3.10025 5.7C3.17981 5.59391 3.29826 5.52378 3.42954 5.50503C3.56081 5.48627 3.69416 5.52043 3.80025 5.6L5.43425 6.8255L9.10725 2.745C8.57515 2.23705 7.92664 1.8673 7.2185 1.66811C6.51036 1.46892 5.76419 1.44637 5.04531 1.60244C4.32644 1.7585 3.65678 2.08842 3.09498 2.56331C2.53318 3.03819 2.09637 3.64357 1.82279 4.32642C1.5492 5.00927 1.4472 5.74879 1.5257 6.48021C1.6042 7.21163 1.86081 7.91265 2.27307 8.5219C2.68532 9.13114 3.24065 9.63003 3.89043 9.97489C4.54021 10.3197 5.26463 10.5 6.00025 10.5Z"
                  fill="#23CFA6"
                />
              </svg>
              <span className="ml-2 font-semibold">
                Rezervarea efectuată cu succes
              </span>
            </div>
            <p className="my-4">
              Atenție prețul pentru această rezervare se poate modifica în orice
              moment, agenția nu poate garanta păstrarea prețului. Pentru a
              evita majorări de tarif, vă rugăm sa faceți plata cît mai repede
              posibil.
            </p>
            <p>
              Vă rugăm să verificați cu atenție datele de contact, informațiile
              despre pasageri, detaliile de zbor și serviciile selectate.
            </p>
          </div>

          <div className="custom-shadow mt-4 rounded-xl bg-white p-3 lg:px-7 lg:py-9">
            <h4 className="mb-6 text-lg">Selectați metoda de plată</h4>
            <div className="flex w-full gap-5">
              <div className="flex h-9 w-full items-center justify-center gap-4 rounded-full bg-brand-green lg:bg-brand-light-blue">
                <span className="hidden text-xxs text-brand-blue lg:inline">
                  Card bancar
                </span>
                <span className="flex gap-1">
                  <Image
                    src={mastercard}
                    width={31}
                    height={24}
                    alt="icon"
                    className="hidden lg:block"
                  />
                  <Image
                    src={mastercardWhite}
                    width={31}
                    height={24}
                    alt="icon"
                    className="block lg:hidden"
                  />
                  <Image
                    src={visa}
                    width={50}
                    height={28}
                    alt="icon"
                    className="hidden lg:block"
                  />
                  <Image
                    src={visaWhite}
                    width={50}
                    height={28}
                    alt="icon"
                    className="block lg:hidden"
                  />
                </span>
              </div>
              <div className="flex h-9 w-full items-center justify-center gap-4 rounded-full bg-brand-green lg:bg-brand-light-blue">
                <span className="hidden text-xxs text-brand-blue lg:inline">
                  Plată electronică
                </span>
                <span>
                  <Image
                    src={paynet}
                    width={43}
                    height={22}
                    alt="icon"
                    className="hidden lg:block"
                  />
                  <Image
                    src={paynetWhite}
                    width={43}
                    height={22}
                    alt="icon"
                    className="block lg:hidden"
                  />
                </span>
              </div>
              <div className="flex h-9 w-full items-center justify-center gap-4 rounded-full bg-brand-green lg:bg-brand-light-blue">
                <span className="hidden text-xxs text-brand-blue lg:block">
                  Achitare la oficiul nostru
                </span>
                <span className="block text-xxs text-white lg:hidden">
                  Oficiul nostru
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <ReservationSummary />
        </div>
      </div>
    </section>
  )
}
