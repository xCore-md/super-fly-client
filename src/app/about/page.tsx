import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import aboutBanner from '@/assets/img/about-banner.png'
import fourteen from '@/assets/img/fourteen.svg'
import hundred from '@/assets/img/hundred.svg'
import people from '@/assets/img/people.jpg'
import thirteen from '@/assets/img/thirteen.svg'
import { WhyUs } from '@/components/why-us'

export default function About() {
  return (
    <div className="mt-4 pb-20">
      <Header />
      <div className="mb-8 mt-20 flex justify-center">
        <div className="mb-14 flex w-[1000px] flex-col  items-center">
          <h3 className="mb-6 text-2xl font-medium">Despre noi</h3>
          <p className="text-md mb-6 text-center font-light text-gray-700">
            Superfly.md este o agenție de bilete avia care oferă bilete de avion
            și servicii de călătorie la prețuri avantajoase. Ne străduim să
            oferim clienților noștri cele mai bune oferte pentru călătorii în
            destinații din întreaga lume. Superfly.md oferă suport gratuit 24 de
            ore pe zi, astfel încât clienții pot beneficia de ajutor în orice
            moment al zilei. În plus, agenția oferă check-in gratuit și ajutor
            în alegerea zborului corect pentru nevoile fiecărui client. Cu o
            experiență de ani de zile în industria biletelor avia, echipa
            noastră este formată din profesioniști cu experiență și pasionați de
            călătorii.
          </p>
          <p className="text-md text-center font-light text-gray-700">
            Superfly.md se mândrește cu faptul că oferă cele mai bune soluții și
            cele mai mici preturi pentru biletele de avion, astfel încât
            clienții pot călători fără grijă. În plus, agenția oferă și servicii
            de rezervare de bilete la avion, astfel încât clienții pot fi siguri
            că locurile lor sunt asigurate pe zborul dorit. Misiunea noastră
            este de a oferi clienților noștri o experiență de călătorie
            memorabilă, fără a-i împovăra cu cheltuieli mari. Ne mândrim cu
            faptul că suntem o agenție de bilete avia de încredere, care pune
            clienții pe primul loc. De aceea, vă oferim servicii de calitate
            superioară, începând cu procesul de rezervare și până la întoarcerea
            acasă. Cu o gamă largă de servicii și un personal dedicat și
            profesionist, Superfly.md este alegerea ideală pentru cei care
            doresc să călătorească confortabil și în siguranță. Vă mulțumim
            pentru că ați ales Superfly.md pentru călătoria dvs. și vă promitem
            că vom face tot posibilul pentru a vă oferi o experiență de
            călătorie memorabilă și fără griji.
          </p>
        </div>
      </div>

      <Image className="rounded-[20px]" src={aboutBanner} alt="image" />

      <section className=" my-[60px]">
        <WhyUs title="6 Motive să rezervați cu noi!" />
      </section>
      <hr className="  border-t-gray-200" />

      <div className="mt-[60px]">
        <div className="mb-14 flex flex-col items-center">
          <h3 className="mb-2 text-2xl font-normal">Succesele noastre</h3>
          <p className="text-md text-center font-light text-gray-700">
            Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium
            pellentesque tincidunt quam
          </p>
        </div>
        <div className="flex gap-6">
          <div className="w-1/3">
            <div className="mb-4 rounded-lg border border-brand-gray bg-white px-6 pb-8 pt-6">
              <h3 className="mb-2 text-xl font-normal">
                Descoperă Succesele Noastre
              </h3>
              <p className="text-md text-justify font-normal text-gray-700">
                La Superfly, suntem mândri să împărtășim cu tine povestea
                noastră de succes. De-a lungul anilor, am călătorit alături de
                mii de clienți înspre destinații exotice, orașe vibrante și
                aventuri captivante. Cu fiecare călătorie, am adunat experiențe
                neprețuite și am creat amintiri de neuitat pentru fiecare
                pasager.
              </p>
            </div>
            <Image src={people} alt="image" />
            <Link
              href="#"
              className="mt-6 flex h-11 items-center justify-center rounded-full bg-blue-700 px-8 font-light text-white shadow-md shadow-slate-400 hover:bg-blue-600"
            >
              <span>Rezervă acum</span>
            </Link>
          </div>
          <div className="w-2/3">
            <ul className="flex flex-col gap-6">
              <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                <div className="flex items-center gap-4">
                  <Image
                    className=" min-w-[89px]"
                    width={230}
                    height={95}
                    src={fourteen}
                    alt="icon"
                  />
                  <p className="text-md ml-2 font-normal text-gray-600">
                    Fiecare dintre cei peste 40 de mii de pasageri mulțumiți
                    este pentru noi o poveste de succes. De la călătoriile de
                    afaceri până la vacanțele în familie sau aventurile solo, am
                    avut privilegiul să fim alături de clienții noștri în
                    fiecare etapă a călătoriei lor. Alătură-te și tu comunității
                    noastre de pasageri mulțumiți și descoperă de ce Superfly
                    este alegerea preferată pentru călătoriile tale. Te invităm
                    să explorezi lumea alături de noi și să devii parte din
                    familia Superfly!
                  </p>
                </div>
              </li>
              <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                <div className="flex items-center gap-4">
                  <Image
                    className=" min-w-[89px]"
                    width={230}
                    height={73}
                    src={thirteen}
                    alt="icon"
                  />
                  <p className="text-md ml-2 font-normal text-gray-600">
                    Indiferent dacă călătorești pentru afaceri sau pentru
                    plăcere, căutăm mereu cele mai bune opțiuni de zbor pentru
                    nevoile tale. Cu parteneriate solide cu operatori aerieni de
                    renume, putem oferi tarife competitive, oferte exclusive și
                    servicii personalizate pentru fiecare călătorie. Fie că
                    visezi să explorezi orașele vibrante ale Europei, să te
                    relaxezi pe plajele exotice ale insulelor tropicale sau să
                    te aventuri în locuri îndepărtate și misterioase,
                    colaborarea noastră cu peste 600 de operatori aerieni îți
                    oferă libertatea de a-ți îndeplini fiecare vis de călătorie.
                    Alătură-te nouă și profită de avantajele colaborării noastre
                    extinse cu operatorii aerieni din întreaga lume. Descoperă
                    lumea alături de Superfly și transformă fiecare călătorie
                    într-o experiență de neuitat!
                  </p>
                </div>
              </li>
              <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                <div className="flex items-center gap-4">
                  <Image
                    className=" min-w-[89px]"
                    width={230}
                    height={69}
                    src={hundred}
                    alt="icon"
                  />
                  <p className="text-md ml-2 font-normal text-gray-600">
                    La Superfly, ne străduim să facem procesul de achiziție a
                    biletelor de avion cât mai ușor și mai convenabil pentru
                    clienții noștri. De aceea, suntem mândri să oferim o gamă
                    variată de opțiuni de plată, astfel încât să poți alege
                    metoda care ți se potrivește cel mai bine. Cu peste 6 tipuri
                    de plăți securizate disponibile, ne asigurăm că fiecare
                    călător are libertatea de a-și achita biletele în modul
                    dorit. Indiferent de metoda de plată aleasă, la Superfly ne
                    angajăm să asigurăm că fiecare tranzacție este sigură,
                    eficientă și transparentă. Alegeți opțiunea care vi se
                    potrivește și bucurați-vă de experiența noastră de rezervare
                    a biletelor de avion fără griji!
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <>
      <div className="absolute left-0 top-0 z-0 h-64 w-full"></div>
    </>
  )
}
