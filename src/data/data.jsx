import dayjs from 'dayjs'
import bagageDifference from '@/assets/img/bagage-difference.jpg'
import bagage from '@/assets/img/bagage.jpg'
import dub from '@/assets/img/bestOffers/dub.jpg'
import londra from '@/assets/img/bestOffers/londra.jpg'
import moscova from '@/assets/img/bestOffers/moscova.jpg'
import par from '@/assets/img/bestOffers/paris.jpg'
import roma from '@/assets/img/bestOffers/roma.jpg'
import telaviv_il from '@/assets/img/bestOffers/telaviv_il.jpg'
import aa from '@/assets/img/companies/aa.png'
import fo from '@/assets/img/companies/fo.png'
import hs from '@/assets/img/companies/hs.png'
import lpa from '@/assets/img/companies/lpa.png'
import lt from '@/assets/img/companies/lt.png'
import pa from '@/assets/img/companies/pa.png'
import ra from '@/assets/img/companies/ra.png'
import ta from '@/assets/img/companies/ta.png'
import tm from '@/assets/img/companies/tm.png'
import wa from '@/assets/img/companies/wa.png'
import dimensions from '@/assets/img/dimensions.jpg'
import noAlowed from '@/assets/img/no-alowed.jpg'
import barcelona from '@/assets/img/offers/barcelona.jpg'
import chicago from '@/assets/img/offers/chicago.jpg'
import dortmund from '@/assets/img/offers/dortmund.jpg'
import dublin from '@/assets/img/offers/dublin.jpg'
import frankfurt from '@/assets/img/offers/frankfurt.jpg'
import istanbul from '@/assets/img/offers/istanbul.jpg'
import larnaca from '@/assets/img/offers/larnaca.jpg'
import luton from '@/assets/img/offers/luton.jpg'
import milano from '@/assets/img/offers/milano.jpg'
import nice from '@/assets/img/offers/nice.jpg'
import paris from '@/assets/img/offers/paris.jpg'
import telaviv from '@/assets/img/offers/telaviv.jpg'
import verona from '@/assets/img/offers/verona.jpg'
import tarif from '@/assets/img/tarif.jpg'
import b_aeronave from '@/assets/img/b_aeronave.jpg'
import b_anulat from '@/assets/img/b_anulat.jpg'
import b_kids from '@/assets/img/b_kids.jpg'
import b_calatorie from '@/assets/img/b_calatorie.jpg'
import b_check_in from '@/assets/img/b_check_in.jpg'
import b_escala from '@/assets/img/b_escala.jpg'
import b_lowcost from '@/assets/img/b_lowcost.jpg'
import b_reservation from '@/assets/img/b_reservation.jpg'
import b_blost from '@/assets/img/b_blost.jpg'
import b_animals from '@/assets/img/b_animals.jpg'

export const offers = [
  {
    title: 'Paris',
    subtitle: 'Franța',
    price: 39,
    img: paris,
    code: 'CDG',
    cityId: 'paris_fr',
    city: 'Paris',
    country: 'Franța',
  },
  {
    title: 'Barcelona',
    subtitle: 'Spania',
    price: 44,
    img: barcelona,
    code: 'BCN',
    cityId: 'barcelona_es',
    city: 'Barcelona',
    country: 'Spania',
  },
  {
    title: 'Larnaca',
    subtitle: 'Cipru',
    price: 32,
    img: larnaca,
    code: 'LCA',
    cityId: 'larnaca_cy',
    city: 'Larnaca',
    country: 'Cipru',
  },
  {
    title: 'Tel Aviv',
    subtitle: 'Israel',
    price: 89,
    img: telaviv,
    code: 'TLV',
    cityId: 'telaviv_il',
    city: 'Tel Aviv',
    country: 'Israel',
  },
  {
    title: 'Milano',
    subtitle: 'Italia',
    price: 34,
    img: milano,
    code: 'MXP',
    cityId: 'milano_it',
    city: 'Milano',
    country: 'Italia',
  },
  {
    title: 'Frankfurt',
    subtitle: 'Germania',
    price: 39,
    img: frankfurt,
    code: 'FRA',
    cityId: 'frankfurt_de',
    city: 'Frankfurt',
    country: 'Germania',
  },
  {
    title: 'Luton',
    subtitle: 'Marea Britanie',
    price: 55,
    img: luton,
    code: 'LTN',
    cityId: 'london_gb',
    city: 'Luton',
    country: 'Anglia',
  },
  {
    title: 'Verona',
    subtitle: 'Italia',
    price: 45,
    img: verona,
    code: 'VRN',
    cityId: 'verona_it',
    city: 'Verona',
    country: 'Italia',
  },
  {
    title: 'Dortmund',
    subtitle: 'Germania',
    price: 75,
    img: dortmund,
    code: 'DTM',
    cityId: 'dortmund_de',
    city: 'Dortmund',
    country: 'Germania',
  },
  {
    title: 'Nice',
    subtitle: 'Franța',
    price: 49,
    img: nice,
    code: 'NCE',
    cityId: 'nice_fr',
    city: 'Nice',
    country: 'Franța',
  },
  {
    title: 'Dublin',
    subtitle: 'Irlanda',
    price: 73,
    img: dublin,
    code: 'DUB',
    cityId: 'dublin_ie',
    city: 'Dublin',
    country: 'Irlanda',
  },
  {
    title: 'Istanbul',
    subtitle: 'Turcia',
    price: 69,
    img: istanbul,
    code: 'IST',
    cityId: 'istanbul_tr',
    city: 'Istanbul',
    country: 'Turcia',
  },
  {
    title: 'Chicago',
    subtitle: 'USA',
    price: 539,
    img: chicago,
    code: 'ORD',
    cityId: 'chicago_us',
    city: 'Chicago',
    country: 'USA',
  },
]

export const bestDestinations = [
  {
    title: 'Moscova',
    price: 220,
    img: moscova,
    cityId: 'moscova_ru',
    city: 'Moscova',
    country: 'Rusia',
    date_from: dayjs().add(20, 'days').format('YYYY-MM-DD'),
    code: 'DME',
    description:
      'Descoperă splendoarea Moscovei! Rezervă acum bilete către capitala Rusiei și explorează istoria și cultura sa bogată.',
  },
  {
    title: 'Tel Aviv',
    price: 44,
    img: telaviv_il,
    cityId: 'tel-aviv_il',
    city: 'Tel Aviv',
    country: 'Israel',
    code: 'TLV',
    description:
      'Călătorește către Tel Aviv, inima culturală a Israelului! Găsește bilete convenabile pentru această destinație vibrantă și diversă.',
  },
  {
    title: 'Londra',
    price: 44,
    img: londra,
    cityId: 'london_gb',
    city: 'Londra',
    country: 'Regatul Unit',
    code: 'LTN',
    description:
      'Bucură-te de farmecul Londrei! Rezervă bilete către capitala Regatului Unit și explorează istoria, teatrul și gastronomia sa remarcabilă.',
  },
  {
    title: 'Roma',
    price: 44,
    img: roma,
    cityId: 'rome_it',
    city: 'Roma',
    country: 'Italia',
    code: 'FCO',
    description:
      'Admiră frumusețea Romei antice! Găsește bilete pentru această capitală istorică și bucură-te de artă, arhitectură și bucătăria delicioasă.',
  },
  {
    title: 'Franța',
    price: 44,
    img: par,
    code: 'ORY',
    cityId: 'paris_fr',
    city: 'Paris',
    country: 'Franța',
    description:
      'Descoperă farmecul Franței! Rezervă bilete către Paris sau alte orașe franțuzești și bucură-te de artă, cultură și gastronomie de neegalat.',
  },
  {
    title: 'Dublin',
    price: 44,
    img: dub,
    code: 'DUB',
    cityId: 'dublin_ie',
    city: 'Dublin',
    country: 'Irlanda',
    description:
      'Zbor direct spre Dublin! Găsește bilete către capitala Irlandei și descoperă atmosfera sa prietenoasă, muzica tradițională și pub-urile autentice.',
  },
]

export const usefulInfo = [
  {
    header: 'Informații despre CHECK IN',
    title: 'Ghid Complet pentru Check-In: Tot ce Trebuie Să Știi',
    shortText: 'Check-in-ul este un pas esențial în pregătirea pentru o călătorie cu avionul. Acesta poate fi realizat online sau la aeroport și implică confirmarea prezenței pasagerului pe zborul rezervat. Alegeți opțiunea de check-in online pentru a economisi timp și pentru a evita cozile lungi și costuri adiționale. Multe companii aeriene permit check-in-ul cu până la 24 de ore înainte de zbor.',
    content: (
      <div>
        <p>Check-in-ul este un pas esențial în pregătirea pentru o călătorie cu avionul. Acesta poate fi realizat online sau la aeroport și implică confirmarea prezenței pasagerului pe zborul rezervat. Alegeți opțiunea de check-in online pentru a economisi timp și pentru a evita cozile lungi și costuri adiționale. Multe companii aeriene permit check-in-ul cu până la 24 de ore înainte de zbor.</p>
        <p>Un alt aspect important este alegerea locului. De cele mai multe ori, aveți opțiunea de a selecta locul dorit contra cost în timpul check-in-ului online, ceea ce vă poate ajuta să evitați surprizele neplăcute în ziua zborului. Prețul locurilor selectate poate varia în dependență de compania aeriană. Este recomandat să verificați și politica companiei privind bagajele de mână, deoarece fiecare are reguli diferite.</p>
        <p>Pentru pasagerii care preferă să facă check-in la aeroport, este important să ajungeți cu suficient timp înainte de zbor. De regulă, este recomandat să fiți acolo cu două ore înainte pentru zborurile interne și cu trei ore pentru cele internaționale. Verificați informațiile despre terminalul de plecare și poarta de îmbarcare, deoarece acestea se pot schimba.</p>
        <p>După ce ați efectuat check-in-ul, nu uitați să obțineți cartela de îmbarcare, care poate fi tipărită sau salvată pe telefonul mobil. Asigurați-vă că aveți toate documentele necesare, inclusiv un act de identitate valabil. În cazul în care aveți bagaje de verificat, îndreptați-vă către ghișeul de check-in pentru a le preda.</p>
        <p>Odată ce ați trecut de controlul de securitate, verificați informațiile despre zborul dvs. pe panourile de afişare din aeroport pentru a găsi detalii actualizate despre poarta de îmbarcare și timpul de îmbarcare. Fie că alegeți check-in online sau la aeroport, pregătirea adecvată va face călătoria dvs. mult mai plăcută.</p>
      </div>
      ),
    img: b_check_in,
  },
  {
    header: 'Zbor cu escală',
    title: 'Ce Trebuie Să Știi Despre Zborurile cu Escală',
    shortText: 'Zborurile cu escală pot fi o alegere inteligentă pentru călătorii care doresc să economisească bani. De multe ori, acestea oferă tarife mai mici comparativ cu zborurile directe. Totuși, este esențial să înțelegeți cum funcționează escalările și ce implicații au asupra călătoriei.',
    content: (
      <div>
        <p>Zborurile cu escală pot fi o alegere inteligentă pentru călătorii care doresc să economisească bani. De multe ori, acestea oferă tarife mai mici comparativ cu zborurile directe. Totuși, este esențial să înțelegeți cum funcționează escalările și ce implicații au asupra călătoriei.</p>
        <p>În primul rând, asigurați-vă că sunteți conștient de durata escalelor. Unele escale pot fi scurte, iar altele pot dura câteva ore sau chiar o zi întreagă. Este important să verificați timpul de așteptare între zboruri, mai ales dacă aveți bagaje de verificat. Dacă companiile aeriene sunt diferite atunci este necesar să recuperați bagajele și să le reîncărcați pentru zborul următor, ceea ce poate consuma timp.</p>
        <p>Dacă aveți o escală mai lungă, profitați de ocazie pentru a explora orașul de escală, dacă timpul vă permite. Multe aeroporturi oferă tururi sau transport facil către atracții locale, astfel încât să puteți transforma așteptarea într-o mini-aventură.</p>
        <p>De asemenea, verificați politica companiei aeriene privind transferurile între zboruri. Unele companii oferă asistență pentru pasagerii care au nevoie să se deplaseze între terminale, mai ales în aeroporturile mari. Este important să fiți conștient de procedurile de imigrare, mai ales dacă escală înseamnă și intrarea într-o altă țară.</p>
        <p>Nu uitați să verificați și eventualele cerințe de viză, dacă este cazul. Unele țări necesită o viză de tranzit, chiar dacă nu părăsiți zona de tranzit a aeroportului. Informațiile despre viză pot fi găsite pe site-ul ambasadei respective sau pe site-ul oficial al companiei aeriene. <a href="https://mfa.gov.md/ro/content/regim-fara-vize">https://mfa.gov.md/ro/content/regim-fara-vize</a></p>
        <p>În concluzie, zborurile cu escală pot fi o alegere practică și economică, dar este important să fiți bine informat despre toate aspectele implicate pentru a vă asigura o călătorie fără probleme.</p>
      </div>
      ),
    img: b_escala,
  },
  {
    header: 'Zbor low-cost',
    title: 'Cum Să Găsiți Cele Mai Bune Oferte pentru Zboruri Low-Cost',
    shortText: 'Zborurile low-cost au revoluționat călătoriile aeriene, făcându-le mai accesibile pentru toată lumea. Totuși, aceste zboruri vin cu propriile sale reguli și limitări. În această secțiune, vă vom arăta cum să găsiți cele mai bune oferte și ce trebuie să aveți în vedere.',
    content: (
      <div>
        <p>Zborurile low-cost au revoluționat călătoriile aeriene, făcându-le mai accesibile pentru toată lumea. Totuși, aceste zboruri vin cu propriile sale reguli și limitări. În această secțiune, vă vom arăta cum să găsiți cele mai bune oferte și ce trebuie să aveți în vedere.</p>
        <p>Primul pas în găsirea unui zbor low-cost este să faceți cercetări. Utilizați motoare de căutare specializate în căutarea zborurilor pentru a compara prețurile de la diferite companii aeriene. De asemenea, înscrierea pentru newslettere ale companiilor aeriene poate oferi acces anticipat la oferte speciale.</p>
        <p>Un alt aspect important este flexibilitatea. Dacă aveți un program flexibil, încercați să căutați zboruri în zilele săptămânii, când prețurile sunt adesea mai mici. De asemenea, verificați opțiunile de zbor în afara sezonului turistic, când cererea este mai mică.</p>
        <p>Când rezervați un zbor low-cost, fiți atenți la costurile suplimentare. Companiile aeriene low-cost pot percepe taxe pentru bagaje, alegerea locurilor și alte servicii. Este esențial să citiți cu atenție termenii și condițiile înainte de a finaliza rezervarea.</p>
        <p>Înainte de a călători, asigurați-vă că aveți toate informațiile necesare despre check-in, deoarece multe companii low-cost nu oferă opțiunea de check-in la aeroport. De asemenea, verificați regulile privind bagajele, deoarece acestea pot varia de la o companie la alta.</p>
        <p>În concluzie, zborurile low-cost pot fi o modalitate excelentă de a economisi bani, dar necesită o atenție suplimentară la detalii. Planificarea și informarea corespunzătoare vor transforma călătoria dvs. într-o experiență plăcută și fără surprize.</p>
      </div>
    ),
    img: b_lowcost,
  },
  {
    header: 'Reguli de călătorie',
    title: 'Reguli de Călătorie: Ce Trebuie Să Știți Înainte de Zbor',
    shortText: 'Înainte de a vă îmbarca într-o călătorie cu avionul, este esențial să cunoașteți regulile de călătorie pentru a evita neplăcerile. Aceste reguli variază de la o companie aeriană la alta și sunt stabilite de autoritățile de aviație civilă.',
    content: (
      <div>
        <p>Înainte de a vă îmbarca într-o călătorie cu avionul, este esențial să cunoașteți regulile de călătorie pentru a evita neplăcerile. Aceste reguli variază de la o companie aeriană la alta și sunt stabilite de autoritățile de aviație civilă.</p>
        <p>Un aspect crucial este controlul de securitate. Toți pasagerii sunt obligați să treacă printr-un control de securitate riguros, iar obiectele interzise, cum ar fi lichidele în cantități mari sau articolele ascuțite, trebuie să fie lăsate acasă. Verificați lista cu obiectele permise și interzise pe site-ul companiei aeriene sau al aeroportului.</p>
        <p>Documentele de identitate sunt, de asemenea, esențiale. Asigurați-vă că aveți un act de identitate valabil, cum ar fi pașaportul sau cartea de identitate, și că acestea corespund numelui utilizat la rezervarea biletului. În cazul zborurilor internaționale, verificați cerințele de viză pentru țara de destinație.</p>
        <p>Bagajele sunt un alt aspect important. Fiecare companie aeriană are propriile sale reguli privind dimensiunile și greutatea bagajelor de mână și a celor de cală. Asigurați-vă că respectați aceste reguli pentru a evita taxe suplimentare.</p>
        <p>În plus, informați-vă despre politica de modificare sau anulare a rezervării. Unele companii oferă opțiuni flexibile, în timp ce altele aplică penalizări. Este bine să știți în avans ce opțiuni aveți, în cazul în care planurile dvs. se schimbă.</p>
        <p>În concluzie, cunoașterea regulilor de călătorie vă va ajuta să aveți o experiență plăcută și lipsită de stres. Planificați din timp, informați-vă și verificați toate detaliile pentru a evita surprizele neplăcute.</p>
      </div>
    ),
    img: b_calatorie, 
  },  
  {
    header: 'Informații despre aeronave',
    title: 'Tipuri de Aeronave: Ce Să Știți Despre Zborul Dvs.',
    shortText: 'Când călătoriți cu avionul, este esențial să înțelegeți ce tip de aeronavă veți folosi. Există diferite tipuri de aeronave, fiecare cu caracteristici specifice care influențează confortul și experiența de zbor.',
    content: (
      <div>
        <p>Când călătoriți cu avionul, este esențial să înțelegeți ce tip de aeronavă veți folosi. Există diferite tipuri de aeronave, fiecare cu caracteristici specifice care influențează confortul și experiența de zbor.</p>
        <p>Aeronavele de tip narrow-body, cum ar fi Boeing 737 sau Airbus A320, sunt adesea folosite pentru zboruri interne sau scurte. Aceste aeronave au un singur culoar și oferă, în general, mai puțin spațiu pentru picioare comparativ cu cele de tip wide-body. Acestea sunt ideale pentru zboruri rapide și eficiente.</p>
        <p>Pe de altă parte, aeronavele de tip wide-body, precum Boeing 777 sau Airbus A380, sunt destinate zborurilor internaționale pe distanțe lungi. Acestea dispun de două culoare și oferă un confort superior, cu mai mult spațiu și facilități mai bune, cum ar fi divertismentul la bord și mese calde.</p>
        <p>De asemenea, este important să știți că anumite aeronave sunt dotate cu caracteristici specifice, cum ar fi Wi-Fi sau prize pentru încărcarea dispozitivelor. Verificați informațiile despre aeronava dvs. înainte de zbor pentru a ști la ce să vă așteptați.</p>
        <p>Dacă sunteți interesat de aspectele tehnice ale aeronavelor, multe companii aeriene oferă detalii despre specificațiile tehnice ale aeronavelor utilizate. Cunoașterea acestor informații poate îmbogăți experiența de zbor.</p>
        <p>În concluzie, alegerea aeronavei poate influența semnificativ confortul călătoriei. Informați-vă despre tipul de aeronavă înainte de zbor pentru a vă asigura că aveți o experiență plăcută.</p>
      </div>
    ),
    img: b_aeronave,
  },
  {
    header: 'Rezervare bilete online',
    title: 'Cum Să Rezervați Bilete de Avion Online: Ghid Pas cu Pas',
    shortText: 'Rezervarea biletelor de avion online este acum o practică standard, datorită comodității și eficienței. Acest ghid vă va ajuta să navigați procesul de rezervare pentru a obține cele mai bune oferte.',
    content: (
      <div>
        <p>Rezervarea biletelor de avion online este acum o practică standard, datorită comodității și eficienței. Acest ghid vă va ajuta să navigați procesul de rezervare pentru a obține cele mai bune oferte.</p>
        <p>În primul rând, începeți prin a căuta pe site-uri de comparare a prețurilor. Aceste platforme vă permit să vizualizați opțiunile disponibile de la diferite companii aeriene și să comparați prețurile. Asigurați-vă că introduceți date corecte despre destinație, date de plecare și numărul de pasageri.</p>
        <p>După ce ați găsit zborul dorit, verificați detaliile legate de politică de bagaje și serviciile incluse. Unele companii aeriene low-cost pot percepe taxe suplimentare pentru bagaje de cală sau pentru alegerea locului.</p>
        <p>Odată ce ați confirmat zborul, va trebui să completați informațiile personale, inclusiv numele, data nașterii și detalii de contact. Verificați cu atenție aceste informații, deoarece erorile pot duce la probleme la check-in.</p>
        <p>După completarea rezervării, veți primi un e-mail de confirmare cu detalii despre zbor. Păstrați acest e-mail, deoarece va conține informații importante despre check-in și eventuale modificări ale zborului.</p>
        <p>În concluzie, rezervarea online a biletelor de avion este un proces simplu dacă știți pașii corecți. Fiți atent la detalii și verificați toate informațiile înainte de a finaliza rezervarea.</p>
      </div>
    ),
    img: b_reservation, 
  },  
  {
    header: 'Aflați cum puteți să vă rambursezi banii pentru zborul anulat',
    title: 'Rambursări pentru Zboruri Anulate: Pașii de Urmat',
    shortText: 'Dacă zborul dvs. a fost anulat, este esențial să știți cum să solicitați rambursarea. Fie că este vorba de o situație neprevăzută sau de o decizie a companiei aeriene, cunoașterea pașilor corecți poate face procesul mai simplu.',
    content: (
      <div>
        <p>Dacă zborul dvs. a fost anulat, este esențial să știți cum să solicitați rambursarea. Fie că este vorba de o situație neprevăzută sau de o decizie a companiei aeriene, cunoașterea pașilor corecți poate face procesul mai simplu.</p>
        <p>Primul pas este să contactați compania aeriană cât mai curând posibil. Verificați site-ul oficial al companiei pentru informații despre politica de rambursare și modalitățile disponibile pentru a solicita restituirea banilor. Multe companii oferă opțiunea de a solicita rambursarea online, ceea ce poate economisi timp.</p>
        <p>Pregătiți documentele necesare, cum ar fi confirmarea rezervării și orice corespondență relevantă. Acestea vor fi utile în procesul de rambursare. Asigurați-vă că respectați termenul limită pentru solicitarea rambursării, deoarece companiile aeriene pot impune anumite restricții.</p>
        <p>Dacă ați plătit pentru servicii adiționale, cum ar fi bagaje sau asigurări, verificați dacă acestea sunt, de asemenea, rambursabile. Unele companii oferă compensații suplimentare în cazul anulării, în funcție de motivele acesteia.</p>
        <p>După ce ați trimis cererea de rambursare, păstrați o copie a documentelor trimise și urmăriți starea cererii. Unele companii oferă un număr de referință pentru a verifica progresul cererii.</p>
        <p>În concluzie, procesul de rambursare pentru zboruri anulate poate fi simplu dacă urmați pașii corecți. Fiți proactiv și informați-vă despre politica companiei aeriene pentru a vă asigura că recuperați banii cât mai repede.</p>
      </div>
    ),
    img: b_anulat, 
  }, 
  {
    header: 'Bagaj pierdut',
    title: 'Ce Să Facem Dacă Ți-a Dispărut Bagajul',
    shortText: 'Dacă ați ajuns la destinație și bagajul dvs. nu este pe bandă, nu intrați în panică. Există pași pe care îi puteți urma pentru a gestiona situația eficient.',
    content: (
      <div>
        <p>Dacă ați ajuns la destinație și bagajul dvs. nu este pe bandă, nu intrați în panică. Există pași pe care îi puteți urma pentru a gestiona situația eficient.</p>
        <p>Primul lucru pe care trebuie să-l faceți este să raportați pierderea bagajului la biroul de lost & found al aeroportului imediat ce observați că bagajul nu a sosit. Asigurați-vă că aveți la îndemână toate documentele necesare, cum ar fi cartela de îmbarcare și dovada de predare a bagajului.</p>
        <p>Compania aeriană va emite un raport de pierdere și vă va oferi un număr de referință. Acest număr va fi esențial pentru a urmări starea bagajului dvs. În plus, companiile aeriene au obligația să compenseze pasagerii pentru cheltuielile ocazionate de întârzierea bagajului, așa că păstrați toate chitanțele pentru achizițiile efectuate în timpul așteptării.</p>
        <p>Este, de asemenea, important să verificați politica companiei aeriene referitoare la bagajele pierdute, deoarece fiecare companie are proceduri diferite. Unele pot oferi actualizări prin SMS sau e-mail cu privire la starea bagajului.</p>
        <p>Dacă bagajul nu este găsit într-un anumit termen, solicitați compensația pentru bagajul pierdut. Companiile aeriene au limite specifice de rambursare, așa că informați-vă despre drepturile dvs. ca pasager.</p>
        <p>În concluzie, pierderea bagajului poate fi stresantă, dar știind cum să reacționați și care sunt pașii corecți poate face procesul mai ușor. Fiți proactiv și informați-vă despre politica companiei aeriene pentru a vă asigura că obțineți tot ceea ce aveți dreptul.</p>
      </div>
    ),
    img: b_blost, 
  },  
  {
    header: 'Reguli de călătorie cu animalul de companie',
    title: 'Călătoria cu Animalul de Companie: Reguli și Recomandări',
    shortText: 'Călătoria cu un animal de companie necesită planificare și respectarea unor reguli specifice impuse de compania aeriană și autoritățile de transport. Urmează acești pași pentru a asigura o experiență confortabilă pentru amândoi.',
    content: (
      <div>
        <p>Călătoria cu un animal de companie necesită planificare și respectarea unor reguli specifice impuse de compania aeriană și autoritățile de transport. Urmează acești pași pentru a asigura o experiență cât mai lină și confortabilă pentru amândoi:</p>
        
        <h3>Documentele Necesare</h3>
        <ul>
          <li>Pașaportul animalului</li>
          <li>Certificat de sănătate</li>
          <li>Certificat de vaccinare</li>
          <li>Microchip</li>
        </ul>
        <p>Rezervarea pentru animal trebuie făcută cu cel puțin 24 de ore înainte de plecare.</p>
        
        <h3>Pregătește Transportatorul</h3>
        <p><strong>Pentru cabină de pasageri:</strong> Greutatea totală a animalului și a cuștii nu poate depăși 8 kg. Înălțimea, lățimea și lungimea cuștii nu pot depăși, în ordine, 23 cm, 30 cm și 40 cm. Indiferent dacă custodia are o suprafață dură sau o structură moale, trebuie să fie concepută special pentru transportul animalelor de companie. Asigură-te că este bine ventilat și confortabil.</p>
        <p><strong>Pentru cargo:</strong> Dacă animalul călătorește în compartimentul de cargo, folosește un transportator conform standardelor IATA, care să fie rigid, bine ventilat și confortabil.</p>
  
        <h3>Animalele care nu sunt admise:</h3>
        <ul>
          <li>American Pitbull Terrier</li>
          <li>American Staffordshire Terrier</li>
          <li>Pitbull Terrier</li>
          <li>Japanese Tosa</li>
          <li>Dogo Argentino</li>
          <li>Fila Brasileiro</li>
          <li>American Bully</li>
        </ul>
  
        <p>Călătoria cu animalul tău de companie necesită planificare și atenție la detalii, dar cu pregătirea corectă, experiența poate fi una plăcută pentru amândoi. Pentru detalii suplimentare și asistență, nu ezita să ne contactezi la numărul: <a href="tel:+373 69 639 555">+373 69 639 555</a></p>
      </div>
    ),
    img: b_animals, 
  },
  {
    header: 'Reguli de călătorii pentru copiii minori',
    title: 'Călătoria pentru Minori: Ghidul Complet pentru Siguranța Zborului',
    shortText: 'Călătoria unui minor cu avionul implică considerații și reguli specifice. Află tot ce trebuie să știi pentru a asigura o călătorie sigură și confortabilă pentru copilul tău.',
    content: (
      <div>
        <p>Călătoria unui minor (copil sau adolescent) cu avionul implică unele considerații suplimentare și reguli specifice, care variază în funcție de compania aeriană și destinație. Iată tot ce trebuie să știi despre zborul minorilor:</p>
  
        <h3>1. Reguli și Politici ale Companiei Aeriene: Servicii pentru Minori Neînsoțiți</h3>
        <p>Majoritatea companiilor aeriene oferă servicii speciale pentru minori care călătoresc fără însoțitor, inclusiv asistență suplimentară și supraveghere pe parcursul zborului.</p>
  
        <h3>2. Documente Necesare</h3>
        <ul>
          <li>Certificat de Naștere</li>
          <li>Pașaport</li>
          <li>Formulare de Consimțământ</li>
        </ul>
  
        <h3>3. Pregătiri pentru Călătorie</h3>
        <p><strong>Rezervare:</strong> Rezervă locul pentru minor în avans și informează operatorul despre necesitatea serviciilor pentru minori neînsoțiți.</p>
        <p><strong>Servicii Speciale:</strong> Verifică și rezervă serviciile speciale pentru minori neînsoțiți, cum ar fi îngrijirea suplimentară și asistență pe parcursul zborului.</p>
  
        <h3>4. La Aeroport</h3>
        <p><strong>Check-in:</strong> Ajungi la aeroport cu suficient timp înainte de plecare pentru a finaliza toate formalitățile.</p>
        <p><strong>Predarea Minorului:</strong> Dacă minorul călătorește neînsoțit, predă-l personalului companiei aeriene la biroul de check-in, unde acesta va primi asistență și va fi îmbarcat în siguranță.</p>
  
        <h3>5. În Zbor</h3>
        <p><strong>Servicii pentru Minori:</strong> Dacă serviciile pentru minori neînsoțiți sunt rezervate, personalul de cabină va avea grijă de minor și va asigura bunăstarea acestuia pe parcursul zborului.</p>
  
        <h3>6. După Sosire</h3>
        <p><strong>Recuperare:</strong> Dacă minorul a călătorit neînsoțit, asigură-te că persoana desemnată pentru a-l prelua la destinație este prezentă la biroul de recuperare a minorilor pentru a-l întâlni.</p>
  
        <p>Planificând din timp și verificând toate cerințele, poți asigura o experiență de zbor sigură și plăcută pentru minorul tău. Pentru detalii suplimentare și asistență, nu ezita să ne contactezi la numărul: <a href="tel:+373 69 639 555">+373 69 639 555</a></p>
      </div>
    ),
    img: b_kids,
  },  
  {
    header: 'Obiecte admise în bagaj',
    title: 'Obiecte Interzise la Bordul Aeronavei: Ce Trebuie Să Știi',
    shortText: 'În general, obiectele pe care nu ai voie să le iei cu tine în avion (nici în bagajul de mână, nici în cel de cală) sunt acelea care pot pune în pericol siguranța aeronavei și a pasagerilor.',
    content: (
      <div>
        <p>În general, obiectele pe care nu ai voie să le iei cu tine în avion (nici în bagajul de mână, nici în cel de cală) sunt acelea care pot pune în pericol siguranța aeronavei și a pasagerilor. Lista obiectelor interzise, pe care nu le poți aduce în zona de securitate cu acces restricționat sau la bordul aeronavei, cuprinde următoarele categorii:</p>
  
        <h3>1. Arme de foc</h3>
        <ul>
          <li>Pistoale, revolvere, carabine, puști.</li>
          <li>Arme de jucărie, copii și imitații ale armelor de foc care pot fi confundate cu cele adevărate.</li>
          <li>Părți componente ale armelor de foc, cu excepția lunetelor telescopice.</li>
          <li>Pistoale lansatoare de rachete de semnalizare.</li>
          <li>Pistoale de start.</li>
          <li>Pistoale și puști de jucărie de orice tip.</li>
          <li>Arme cu aer comprimat și cu CO2 (pistoale, puști cu alice, carabine).</li>
          <li>Arcuri, arbalete și săgeți.</li>
          <li>Harpoane și lansatoare de harpoane.</li>
          <li>Praștii și catapulte.</li>
        </ul>
  
        <h3>2. Dispozitive cu efect paralizant</h3>
        <ul>
          <li>Dispozitive cu electrosocuri (pistoale cu electrosocuri, pistoale paralizante – taser).</li>
          <li>Bastoane cu electrosocuri.</li>
          <li>Dispozitive de asomare și de ucidere a animalelor.</li>
          <li>Substanțe chimice, gaze și spray-uri neutralizante, cum ar fi:</li>
          <li>Spray-uri cu substanțe iritant-lacrimogene.</li>
          <li>Spray-uri cu piper sau ardei iute.</li>
          <li>Gaz lacrimogen și spray-uri cu acid.</li>
        </ul>
  
        <h3>3. Obiecte cu vârf sau muchie ascuțită</h3>
        <ul>
          <li>Obiecte concepute pentru a tăia/toca (topoare, securi).</li>
          <li>Daltă de spart gheața.</li>
          <li>Lame de ras.</li>
          <li>Cuttere.</li>
          <li>Cuțite cu lame mai lungi de 6 cm.</li>
          <li>Foarfece cu lame mai lungi de 6 cm.</li>
          <li>Echipamente de arte marțiale cu vârf sau lamă ascuțită.</li>
          <li>Săbii și spade.</li>
        </ul>
  
        <h3>4. Unelte de lucru</h3>
        <ul>
          <li>Burghie și vârfuri de burghie (inclusiv mașini de găurit electrice portabile).</li>
          <li>Unelte cu lamă sau tijă cu lungimea mai mare de 6 cm (șurubelnițe, daltă).</li>
          <li>Fierăstraie (inclusiv fierăstraie electrice portabile).</li>
          <li>Arzătoare de sudură.</li>
          <li>Pistoale de împușcat bolturi și pistoale de bătut cuie.</li>
        </ul>
  
        <h3>5. Instrumente contundente</h3>
        <ul>
          <li>Bate de baseball și softball.</li>
          <li>Bastoane.</li>
          <li>Echipamente specifice artelor marțiale.</li>
        </ul>
  
        <h3>6. Substanțe și dispozitive explozive</h3>
        <ul>
          <li>Muniție.</li>
          <li>Capse detonante.</li>
          <li>Detonatoare și fitiluri.</li>
          <li>Copii sau imitații ale dispozitivelor explozibile.</li>
          <li>Mine, grenade și alte dispozitive explozibile militare.</li>
          <li>Artificii și alte articole pirotehnice.</li>
          <li>Bombe fumigene și cartușe fumigene.</li>
          <li>Dinamită, praf de pușcă și explozibili plastici.</li>
        </ul>
      </div>
    ),
    img: bagage, 
  },  
  {
    header: 'Obiecte Admise în Bagajul de Mână',
    title: 'Ce Poți Lua cu Tine în Bagajul de Mână: Reguli și Recomandări',
    shortText: 'Regulile pentru bagajele de mână includ atât dimensiuni, cât și conținut. Află ce obiecte sunt permise și cum să te pregătești corect pentru zbor.',
    content: (
      <div>
        <p>Regulile impuse de operatorii de zbor pentru bagajele de mână nu se limitează doar la dimensiune și greutate, ci vizează și conținutul. Iată cele mai comune categorii de obiecte admise în bagajul de mână, cu condiția să respecte anumite reglementări:</p>
  
        <h3>1. Produse Cosmetice și Lichide</h3>
        <p>Produsele cosmetice și de îngrijire personală sunt un motiv frecvent pentru care mulți călători aleg să plătească pentru un bagaj de cală. Însă, dacă dorești să te încadrezi în limita admisă pentru bagajul de mână, trebuie să respecți următoarele reguli:</p>
        <ul>
          <li><strong>Limită de lichide:</strong> 1 litru total, împărțit în maximum 10 recipiente a câte 100 ml fiecare.</li>
          <li><strong>Ambalare:</strong> Produsele de toaletă mini (max. 100 ml) trebuie să fie depozitate în pungi transparente cu dimensiunea de 20x20 cm. Dacă produsele tale depășesc acest volum, transferă-le în sticle de 100 ml.</li>
          <li><strong>Recomandare:</strong> Dacă zbori în Europa, consideră să renunți la produsele pe care nu ești sigur că le vei folosi, deoarece poți cumpăra unele articole de la destinație (de exemplu, șampon).</li>
        </ul>
        <p>Te sfătuim să achiziționezi un săculeț special pentru transportul produselor cosmetice, conform reglementărilor, deoarece la controlul de securitate va trebui să le scoți din bagaj și să le depui în tavile speciale.</p>
  
        <h3>2. Mâncare și Medicamente</h3>
        <p>Atât mâncarea, cât și medicamentele sunt permise în bagajul de mână. Iată câteva aspecte importante:</p>
        <ul>
          <li><strong>Mâncare:</strong> Dacă mâncarea are o consistență lichidă, aceasta trebuie depozitată în recipiente de 100 ml, care se vor contabiliza ca parte din cele 1 litru de lichide permise.</li>
          <li><strong>Medicii:</strong> Medicamentele ambalate în recipiente mai mari de 100 ml trebuie să fie însoțite de o rețetă medicală.</li>
        </ul>
        <p>Chiar dacă pleci într-o călătorie scurtă, este recomandat să ai cu tine câteva medicamente de uz general pentru situații neprevăzute, deoarece nu știi dacă vei avea acces la o farmacie.</p>
  
        <h3>3. Obiecte Electronice</h3>
        <p>Laptopul, tableta și aparatul foto sunt esențiale pentru multe persoane în timpul călătoriei. Acestea sunt permise atât în bagajul de mână, cât și în cel de cală, dar este recomandat să le iei în bagajul de mână pentru a preveni deteriorarea în timpul manipulării. Câteva sfaturi utile:</p>
        <ul>
          <li><strong>Selectare:</strong> Gândește-te la electronicele de care ai cu adevărat nevoie și la cele de care poți renunța.</li>
          <li><strong>Ambalare:</strong> Împachetează electronicele la final, deoarece la controlul de securitate va trebui să le plasezi într-un container separat, iar accesul rapid este esențial.</li>
        </ul>
      </div>
    ),
    img: noAlowed,
  }, 
  {
    header: 'Bagajul de Călă: Care Sunt Tarifele?',
    title: 'Costurile Asociate Bagajului de Călă: Ce Trebuie Să Știi',
    shortText: 'Călătoria cu avionul poate aduce costuri neașteptate legate de bagajul de cală. Află despre tarifele, limitele și modalitățile de plată pentru a planifica mai bine călătoria ta.',
    content: (
      <div>
        <p>Călătoria cu avionul este o experiență plină de emoție și aventură, dar este important să fii bine informat despre costurile asociate, în special când vine vorba despre bagajul de cală. Majoritatea companiilor aeriene impun tarife variate pentru bagajele de cală, iar aceste costuri pot influența bugetul total al călătoriei tale. În acest articol, vom explora tarifele pentru bagajul de cală și factorii care le pot influența.</p>
  
        <h3>1. Tarifele Generale pentru Bagajul de Călă</h3>
        <p>Tarifele pentru bagajul de cală variază în funcție de mai mulți factori, inclusiv compania aeriană, destinația, tipul zborului (low-cost sau tradițional) și categoria biletului achiziționat. În general, iată câteva intervale de prețuri:</p>
        <ul>
          <li><strong>Companii aeriene low-cost:</strong> Tarifele pentru bagajul de cală la companiile low-cost pot începe de la 10-20 de euro pentru un bagaj de 20 kg, dar pot ajunge până la 50 de euro sau mai mult, în funcție de momentul rezervării. Este important să reții că, adesea, aceste companii percep taxe suplimentare pentru bagajele de cală, iar prețul crește considerabil dacă alegi să plătești pentru bagajul de călă în ultima clipă, la aeroport.</li>
          <li><strong>Companii aeriene tradiționale:</strong> În cazul companiilor aeriene tradiționale, tarifele pentru bagajul de cală sunt de obicei incluse în prețul biletului, dar există limite de greutate. Dacă depășești limita, poți fi nevoit să plătești o taxă suplimentară, care poate varia între 25 și 100 de euro, în funcție de cantitatea de greutate în exces.</li>
        </ul>
  
        <h3>2. Limitele de Greutate și Dimensiune</h3>
        <p>Este esențial să verifici limitele de greutate și dimensiune pentru bagajul de cală înainte de zbor. În general, majoritatea companiilor aeriene permit un bagaj de cală cu o greutate maximă de 20-23 kg, iar dimensiunile pot varia, dar de obicei trebuie să se încadreze în dimensiuni standard, precum 158 cm (lungime + lățime + înălțime). Bagajele care depășesc aceste limite pot atrage taxe suplimentare.</p>
  
        <h3>3. Bagaje Suplimentare</h3>
        <p>Dacă ai nevoie de mai mult de un bagaj de cală, este important să știi că multe companii aeriene permit achiziționarea unui bagaj suplimentar, de obicei la un preț redus comparativ cu taxa de depășire a greutății. Tarifele pentru bagaje suplimentare pot varia, dar în general sunt cuprinse între 20 și 60 de euro, în funcție de compania aeriană și de destinație.</p>
  
        <h3>4. Reduceri și Oferte</h3>
        <p>Unele companii aeriene oferă reduceri pentru bagajele de cală atunci când sunt achiziționate online în avans. Este recomandat să verifici site-ul oficial al companiei aeriene pentru oferte și promoții speciale, care pot face costul bagajului de cală mai accesibil. De asemenea, călătorii frecvenți sau cei care dețin carduri de fidelitate pot beneficia de reduceri suplimentare.</p>
  
        <h3>5. Modalități de Plată</h3>
        <p>Majoritatea companiilor aeriene permit plata tarifelor pentru bagajul de cală prin intermediul site-ului lor oficial, la momentul rezervării biletului sau ulterior, prin intermediul aplicațiilor mobile. Este important să păstrezi chitanțele și confirmările de plată, deoarece acestea pot fi necesare în cazul unor dispute.</p>
  
        <h3>6. Concluzie</h3>
        <p>În concluzie, costurile asociate cu bagajul de cală pot varia semnificativ în funcție de compania aeriană, tipul zborului și detaliile rezervării. Asigură-te că te informezi cu privire la tarifele și reglementările specifice ale companiei aeriene cu care călătorești, pentru a evita surprizele neplăcute la aeroport. Planifică din timp și, dacă este posibil, achiziționează bagajele de cală în avans pentru a beneficia de cele mai bune tarife.</p>
      </div>
    ),
    img: tarif, 
  },   
  {
    header: 'Dimensiuni pentru Bagajul de Mână',
    title: 'Ce Trebuie Să Știi Despre Dimensiunile Bagajului de Mână',
    shortText: 'Respectarea dimensiunilor bagajului de mână este crucială pentru a evita problemele la aeroport. Află despre dimensiunile standard și sfaturi utile pentru a te asigura că te încadrezi în cerințe.',
    content: (
      <div>
        <p>Călătoria cu avionul aduce cu sine o serie de reguli și reglementări, iar dimensiunile bagajului de mână sunt esențiale pentru a evita problemele la aeroport. Fiecare companie aeriană are propriile sale politici, așa că este crucial să fii bine informat înainte de a pleca. În acest articol, vom explora dimensiunile standard pentru bagajul de mână și câteva sfaturi utile pentru a te asigura că te încadrezi în cerințe.</p>
  
        <h3>1. Dimensiuni Standard</h3>
        <p>În general, dimensiunile maxime admise pentru bagajul de mână variază, dar majoritatea companiilor aeriene urmează aceste standarde:</p>
        <ul>
          <li><strong>Lungime:</strong> între 55 cm și 56 cm</li>
          <li><strong>Lățime:</strong> între 35 cm și 45 cm</li>
          <li><strong>Înălțime:</strong> între 20 cm și 25 cm</li>
        </ul>
        <p>Este important să ții cont de aceste măsuri, deoarece bagajele care depășesc aceste dimensiuni nu vor fi acceptate ca bagaj de mână și vor trebui verificate.</p>
  
        <h3>2. Greutatea Bagajului de Mână</h3>
        <p>Pe lângă dimensiuni, multe companii aeriene impun și o limită de greutate pentru bagajul de mână, de obicei între 7 kg și 10 kg. Este recomandat să verifici politica specifică a companiei cu care călătorești, deoarece greutatea excesivă poate duce la taxe suplimentare sau la obligativitatea de a verifica bagajul.</p>
  
        <h3>3. Tipuri de Bagaje de Mână</h3>
        <p>Există mai multe tipuri de bagaje de mână, iar alegerea celui potrivit poate face o mare diferență:</p>
        <ul>
          <li><strong>Trolere:</strong> Acestea sunt cele mai populare și vin în diverse dimensiuni. Asigură-te că dimensiunile se încadrează în limitele stabilite de compania aeriană.</li>
          <li><strong>Rucsaci:</strong> Foarte practici, rucsacii sunt adesea ușor de transportat și pot fi utilizați pentru a adăuga mai mult confort călătoriei. Verifică dimensiunile pentru a te asigura că se încadrează în cerințe.</li>
          <li><strong>Genți de umăr:</strong> Unele genți de umăr pot fi folosite ca bagaj de mână, dar este esențial să te asiguri că respectă dimensiunile permise.</li>
        </ul>
  
        <h3>4. Bagajele de Mână Acceptate</h3>
        <p>Pe lângă bagajul de mână principal, multe companii aeriene permit și un articol personal suplimentar, cum ar fi:</p>
        <ul>
          <li>O geantă mică</li>
          <li>Un laptop sau o tabletă</li>
          <li>O geantă pentru căruciorul unui copil</li>
        </ul>
        <p>Acest articol personal trebuie să se încadreze de obicei sub scaunul din fața ta și să aibă dimensiuni reduse, de aproximativ 40 cm x 30 cm x 15 cm. Verifică politica companiei aeriene pentru a te asigura că te încadrezi în limitele impuse.</p>
  
        <h3>5. Sfaturi Utile</h3>
        <ul>
          <li><strong>Verifică Politicile Companiei Aeriene:</strong> Fiecare companie are reguli diferite. Asigură-te că le cunoști înainte de a pleca.</li>
          <li><strong>Măsoară-ți Bagajul:</strong> Folosește un metru pentru a verifica dimensiunile bagajului tău. Este mai bine să fii sigur decât să ai surprize neplăcute la aeroport.</li>
          <li><strong>Păstrează Documentele Importante:</strong> Asigură-te că documentele importante, cum ar fi pașaportul și biletele de avion, sunt la îndemână în bagajul de mână.</li>
          <li><strong>Ambalează Eficient:</strong> Folosește tehnici de împachetare eficiente pentru a maximiza spațiul din bagajul de mână.</li>
        </ul>
  
        <h3>6. Concluzie</h3>
        <p>Dimensiunile bagajului de mână sunt un aspect esențial în planificarea unei călătorii cu avionul. Respectarea acestor cerințe te va ajuta să eviți problemele la aeroport și să te bucuri de o călătorie mai relaxantă. Asigură-te că verifici toate detaliile cu privire la politica bagajului de mână a companiei aeriene alese și pregătește-te din timp pentru o experiență de călătorie plăcută.</p>
      </div>
    ),
    img: dimensions, 
  },  
  {
    header: 'Diferența dintre Bagajul de Mână și Bagajul de Călă',
    title: 'Află Ce Este Mai Potrivit pentru Călătoria Ta',
    shortText: 'Înțelegerea diferențelor dintre bagajul de mână și bagajul de călă este esențială pentru o experiență de zbor fără probleme. Descoperă principalele distincții pentru a-ți organiza călătoria eficient.',
    content: (
      <div>
        <p>Atunci când călătorești cu avionul, este esențial să înțelegi diferențele dintre bagajul de mână și bagajul de călă, deoarece acest lucru poate influența experiența ta de zbor și organizarea călătoriei. În acest articol, vom analiza principalele distincții între aceste două tipuri de bagaje.</p>
  
        <h3>1. Definiție și Utilizare</h3>
        <ul>
          <li><strong>Bagajul de Mână:</strong> Acest tip de bagaj este permis la bordul aeronavei și trebuie să respecte anumite dimensiuni și greutăți impuse de compania aeriană. Bagajul de mână este ideal pentru obiecte esențiale și de valoare, cum ar fi documentele de călătorie, electronicele, produsele cosmetice și articolele de îmbrăcăminte necesare în timpul zborului.</li>
          <li><strong>Bagajul de Călă:</strong> Acest bagaj este verificat la aeroport înainte de îmbarcare și transportat în compartimentul de marfă al aeronavei. Este destinat articolelor mai mari sau mai grele, care nu pot fi transportate în cabină. Bagajul de călă este util pentru călătorii mai lungi, când este necesar să aduci mai multe lucruri.</li>
        </ul>
  
        <h3>2. Dimensiuni și Greutate</h3>
        <ul>
          <li><strong>Bagajul de Mână:</strong> De obicei, dimensiunile maxime pentru bagajul de mână variază între 55 cm și 56 cm în lungime, 35 cm în lățime și 20 cm în înălțime. Greutatea maximă este adesea între 7 kg și 10 kg, dar aceste valori pot varia în funcție de compania aeriană.</li>
          <li><strong>Bagajul de Călă:</strong> Dimensiunile și greutatea bagajului de călă sunt, de obicei, mai mari. Majoritatea companiilor permit un bagaj de călă cu o greutate maximă de 20 kg sau 23 kg, iar dimensiunile totale (lungime + lățime + înălțime) pot ajunge până la 158 cm. Este important să verifici politica specifică a companiei aeriene.</li>
        </ul>
  
        <h3>3. Costuri</h3>
        <ul>
          <li><strong>Bagajul de Mână:</strong> În majoritatea cazurilor, bagajul de mână este inclus în prețul biletului de avion, dar anumite companii low-cost pot percepe taxe pentru a transporta bagaje de mână care depășesc limitele specificate.</li>
          <li><strong>Bagajul de Călă:</strong> Tarifele pentru bagajul de călă variază semnificativ. La companiile low-cost, costurile pot începe de la 10-20 de euro pentru un bagaj de 20 kg, dar pot ajunge la 50 de euro sau mai mult, în funcție de momentul rezervării. Companiile tradiționale pot include bagajul de călă în prețul biletului, dar taxe suplimentare pot apărea dacă depășești limita de greutate.</li>
        </ul>
  
        <h3>4. Accesibilitate</h3>
        <ul>
          <li><strong>Bagajul de Mână:</strong> Acest tip de bagaj este accesibil pe parcursul întregului zbor, astfel încât poți accesa rapid obiectele de care ai nevoie, cum ar fi cărțile, dispozitivele electronice sau alte articole esențiale.</li>
          <li><strong>Bagajul de Călă:</strong> Odată ce bagajul de călă a fost verificat, nu ai acces la el până la sosirea la destinație. Acest lucru poate fi o problemă dacă ai nevoie de ceva din bagaj pe parcursul zborului.</li>
        </ul>
  
        <h3>5. Reguli și Restricții</h3>
        <ul>
          <li><strong>Bagajul de Mână:</strong> Există restricții stricte privind lichidele, substanțele periculoase și obiectele ascuțite. De obicei, lichidele trebuie să fie în recipiente de maximum 100 ml, iar cantitatea totală nu trebuie să depășească 1 litru.</li>
          <li><strong>Bagajul de Călă:</strong> Reglementările pentru bagajul de călă sunt mai puțin stricte, dar este important să respecți regulile legate de transportul substanțelor interzise sau periculoase.</li>
        </ul>
  
        <h3>6. Concluzie</h3>
        <p>În concluzie, alegerea dintre bagajul de mână și bagajul de călă depinde de nevoile tale personale, durata călătoriei și articolele pe care intenționezi să le aduci. Înțelegerea diferențelor dintre cele două tipuri de bagaje te va ajuta să planifici mai bine călătoria, să eviți surprizele neplăcute la aeroport și să te bucuri de o experiență de zbor mai plăcută.</p>
      </div>
    ),
    img: bagageDifference,
  }
]

export const comapnies = [
  {
    title: 'Ryanair',
    image: ra,
  },
  {
    title: 'Wizz Air',
    image: wa,
  },
  {
    title: 'Tarom',
    image: tm,
  },
  {
    title: 'Turkish Airlines',
    image: ta,
  },
  {
    title: 'Pegasus Airlines',
    image: pa,
  },
  {
    title: 'Lot Polish Airlines',
    image: lpa,
  },
  {
    title: 'Fly One',
    image: fo,
  },
  {
    title: 'Aegean Airlines',
    image: aa,
  },
  {
    title: 'Lufthansa',
    image: lt,
  },
  {
    title: 'Hi Sky',
    image: hs,
  },
]

export const baggages = [
  {
    type: '10kg',
    count: 0,
  },
  {
    type: '15kg',
    count: 0,
  },
  {
    type: '20kg',
    count: 0,
  },
  {
    type: '23kg',
    count: 0,
  },
  {
    type: '30kg',
    count: 0,
  },
  {
    type: '32kg',
    count: 0,
  },
]
