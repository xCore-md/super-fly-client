import dayjs from 'dayjs'
import b_aeronave from '@/assets/img/b_aeronave.jpg'
import b_animals from '@/assets/img/b_animals.jpg'
import b_anulat from '@/assets/img/b_anulat.jpg'
import b_blost from '@/assets/img/b_blost.jpg'
import b_calatorie from '@/assets/img/b_calatorie.jpg'
import b_check_in from '@/assets/img/b_check_in.jpg'
import b_escala from '@/assets/img/b_escala.jpg'
import b_kids from '@/assets/img/b_kids.jpg'
import b_lowcost from '@/assets/img/b_lowcost.jpg'
import b_reservation from '@/assets/img/b_reservation.jpg'
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

export const offers = [
  {
    title: {
      ro: 'Paris',
      ru: 'Париж',
    },
    subtitle: {
      ro: 'Franța',
      ru: 'Франция',
    },
    price: 39,
    img: paris,
    code: 'CDG',
    cityId: 'paris_fr',
    city: {
      ro: 'Paris',
      ru: 'Париж',
    },
    country: {
      ro: 'Franța',
      ru: 'Франция',
    },
  },
  {
    title: {
      ro: 'Barcelona',
      ru: 'Барселона',
    },
    subtitle: {
      ro: 'Spania',
      ru: 'Испания',
    },
    price: 44,
    img: barcelona,
    code: 'BCN',
    cityId: 'barcelona_es',
    city: {
      ro: 'Barcelona',
      ru: 'Барселона',
    },
    country: {
      ro: 'Spania',
      ru: 'Испания',
    },
  },
  {
    title: {
      ro: 'Larnaca',
      ru: 'Ларнака',
    },
    subtitle: {
      ro: 'Cipru',
      ru: 'Кипр',
    },
    price: 32,
    img: larnaca,
    code: 'LCA',
    cityId: 'larnaca_cy',
    city: {
      ro: 'Larnaca',
      ru: 'Ларнака',
    },
    country: {
      ro: 'Cipru',
      ru: 'Кипр',
    },
  },
  {
    title: {
      ro: 'Tel Aviv',
      ru: 'Тель-Авив',
    },
    subtitle: {
      ro: 'Israel',
      ru: 'Израиль',
    },
    price: 89,
    img: telaviv,
    code: 'TLV',
    cityId: 'telaviv_il',
    city: {
      ro: 'Tel Aviv',
      ru: 'Тель-Авив',
    },
    country: {
      ro: 'Israel',
      ru: 'Израиль',
    },
  },
  {
    title: {
      ro: 'Milano',
      ru: 'Милан',
    },
    subtitle: {
      ro: 'Italia',
      ru: 'Италия',
    },
    price: 34,
    img: milano,
    code: 'MXP',
    cityId: 'milano_it',
    city: {
      ro: 'Milano',
      ru: 'Милан',
    },
    country: {
      ro: 'Italia',
      ru: 'Италия',
    },
  },
  {
    title: {
      ro: 'Frankfurt',
      ru: 'Франкфурт',
    },
    subtitle: {
      ro: 'Germania',
      ru: 'Германия',
    },
    price: 39,
    img: frankfurt,
    code: 'FRA',
    cityId: 'frankfurt_de',
    city: {
      ro: 'Frankfurt',
      ru: 'Франкфурт',
    },
    country: {
      ro: 'Germania',
      ru: 'Германия',
    },
  },
  {
    title: {
      ro: 'Luton',
      ru: 'Лондон',
    },
    subtitle: {
      ro: 'Marea Britanie',
      ru: 'Великобритания',
    },
    price: 55,
    img: luton,
    code: 'LTN',
    cityId: 'london_gb',
    city: {
      ro: 'Luton',
      ru: 'Лондон',
    },
    country: {
      ro: 'Anglia',
      ru: 'Англия',
    },
  },
  {
    title: {
      ro: 'Verona',
      ru: 'Верона',
    },
    subtitle: {
      ro: 'Italia',
      ru: 'Италия',
    },
    price: 45,
    img: verona,
    code: 'VRN',
    cityId: 'verona_it',
    city: {
      ro: 'Verona',
      ru: 'Верона',
    },
    country: {
      ro: 'Italia',
      ru: 'Италия',
    },
  },
  {
    title: {
      ro: 'Dortmund',
      ru: 'Дортмунд',
    },
    subtitle: {
      ro: 'Germania',
      ru: 'Германия',
    },
    price: 75,
    img: dortmund,
    code: 'DTM',
    cityId: 'dortmund_de',
    city: {
      ro: 'Dortmund',
      ru: 'Дортмунд',
    },
    country: {
      ro: 'Germania',
      ru: 'Германия',
    },
  },
  {
    title: {
      ro: 'Nice',
      ru: 'Ницца',
    },
    subtitle: {
      ro: 'Franța',
      ru: 'Франция',
    },
    price: 49,
    img: nice,
    code: 'NCE',
    cityId: 'nice_fr',
    city: {
      ro: 'Nice',
      ru: 'Ницца',
    },
    country: {
      ro: 'Franța',
      ru: 'Франция',
    },
  },
  {
    title: {
      ro: 'Dublin',
      ru: 'Дублин',
    },
    subtitle: {
      ro: 'Irlanda',
      ru: 'Ирландия',
    },
    price: 73,
    img: dublin,
    code: 'DUB',
    cityId: 'dublin_ie',
    city: {
      ro: 'Dublin',
      ru: 'Дублин',
    },
    country: {
      ro: 'Irlanda',
      ru: 'Ирландия',
    },
  },
  {
    title: {
      ro: 'Istanbul',
      ru: 'Стамбул',
    },
    subtitle: {
      ro: 'Turcia',
      ru: 'Турция',
    },
    price: 69,
    img: istanbul,
    code: 'IST',
    cityId: 'istanbul_tr',
    city: {
      ro: 'Istanbul',
      ru: 'Стамбул',
    },
    country: {
      ro: 'Turcia',
      ru: 'Турция',
    },
  },
  {
    title: {
      ro: 'Chicago',
      ru: 'Чикаго',
    },
    subtitle: {
      ro: 'USA',
      ru: 'США',
    },
    price: 539,
    img: chicago,
    code: 'ORD',
    cityId: 'chicago_us',
    city: {
      ro: 'Chicago',
      ru: 'Чикаго',
    },
    country: {
      ro: 'USA',
      ru: 'США',
    },
  },
];


export const bestDestinations = [
  {
    title: {
      ro: 'Moscova',
      ru: 'Москва',
    },
    price: 220,
    img: moscova,
    cityId: 'moscova_ru',
    city: {
      ro: 'Moscova',
      ru: 'Москва',
    },
    country: {
      ro: 'Rusia',
      ru: 'Россия',
    },
    date_from: dayjs().add(20, 'days').format('YYYY-MM-DD'),
    code: 'DME',
    description: {
      ro: 'Descoperă splendoarea Moscovei! Rezervă acum bilete către capitala Rusiei și explorează istoria și cultura sa bogată.',
      ru: 'Откройте для себя великолепие Москвы! Забронируйте билеты в столицу России и исследуйте её богатую историю и культуру.',
    },
  },
  {
    title: {
      ro: 'Tel Aviv',
      ru: 'Тель-Авив',
    },
    price: 44,
    img: telaviv_il,
    cityId: 'tel-aviv_il',
    city: {
      ro: 'Tel Aviv',
      ru: 'Тель-Авив',
    },
    country: {
      ro: 'Israel',
      ru: 'Израиль',
    },
    code: 'TLV',
    description: {
      ro: 'Călătorește către Tel Aviv, inima culturală a Israelului! Găsește bilete convenabile pentru această destinație vibrantă și diversă.',
      ru: 'Путешествуйте в Тель-Авив, культурное сердце Израиля! Найдите доступные билеты в этот яркий и разнообразный город.',
    },
  },
  {
    title: {
      ro: 'Londra',
      ru: 'Лондон',
    },
    price: 44,
    img: londra,
    cityId: 'london_gb',
    city: {
      ro: 'Londra',
      ru: 'Лондон',
    },
    country: {
      ro: 'Regatul Unit',
      ru: 'Великобритания',
    },
    code: 'LTN',
    description: {
      ro: 'Bucură-te de farmecul Londrei! Rezervă bilete către capitala Regatului Unit și explorează istoria, teatrul și gastronomia sa remarcabilă.',
      ru: 'Насладитесь очарованием Лондона! Забронируйте билеты в столицу Великобритании и исследуйте её историю, театры и кулинарию.',
    },
  },
  {
    title: {
      ro: 'Roma',
      ru: 'Рим',
    },
    price: 44,
    img: roma,
    cityId: 'rome_it',
    city: {
      ro: 'Roma',
      ru: 'Рим',
    },
    country: {
      ro: 'Italia',
      ru: 'Италия',
    },
    code: 'FCO',
    description: {
      ro: 'Admiră frumusețea Romei antice! Găsește bilete pentru această capitală istorică și bucură-te de artă, arhitectură și bucătăria delicioasă.',
      ru: 'Полюбуйтесь красотой древнего Рима! Найдите билеты в этот исторический город и наслаждайтесь искусством, архитектурой и вкусной кухней.',
    },
  },
  {
    title: {
      ro: 'Paris',
      ru: 'Париж',
    },
    price: 44,
    img: par,
    code: 'ORY',
    cityId: 'paris_fr',
    city: {
      ro: 'Paris',
      ru: 'Париж',
    },
    country: {
      ro: 'Franța',
      ru: 'Франция',
    },
    description: {
      ro: 'Descoperă farmecul Franței! Rezervă bilete către Paris sau alte orașe franțuzești și bucură-te de artă, cultură și gastronomie de neegalat.',
      ru: 'Откройте для себя очарование Франции! Забронируйте билеты в Париж или другие французские города и наслаждайтесь искусством, культурой и гастрономией.',
    },
  },
  {
    title: {
      ro: 'Dublin',
      ru: 'Дублин',
    },
    price: 44,
    img: dub,
    code: 'DUB',
    cityId: 'dublin_ie',
    city: {
      ro: 'Dublin',
      ru: 'Дублин',
    },
    country: {
      ro: 'Irlanda',
      ru: 'Ирландия',
    },
    description: {
      ro: 'Zbor direct spre Dublin! Găsește bilete către capitala Irlandei și descoperă atmosfera sa prietenoasă, muzica tradițională și pub-urile autentice.',
      ru: 'Прямой рейс в Дублин! Найдите билеты в столицу Ирландии и откройте для себя её дружелюбную атмосферу, традиционную музыку и аутентичные пабы.',
    },
  },
];


export const usefulInfo = [
  {
    header: {
      ro: 'Informații despre CHECK IN',
      ru: 'Информация о регистрации на рейс',
    },
    title: {
      ro: 'Ghid Complet pentru Check-In: Tot ce Trebuie Să Știi',
      ru: 'Полное руководство по регистрации на рейс: все, что нужно знать',
    },
    shortText: {
      ro: 'Check-in-ul este un pas esențial în pregătirea pentru o călătorie cu avionul. Acesta poate fi realizat online sau la aeroport și implică confirmarea prezenței pasagerului pe zborul rezervat. Alegeți opțiunea de check-in online pentru a economisi timp și pentru a evita cozile lungi și costuri adiționale. Multe companii aeriene permit check-in-ul cu până la 24 de ore înainte de zbor.',
      ru: 'Регистрация на рейс — это важный шаг в подготовке к полету. Она может быть выполнена онлайн или в аэропорту и включает подтверждение присутствия пассажира на забронированном рейсе. Выбирайте онлайн-регистрацию, чтобы сэкономить время и избежать длинных очередей и дополнительных затрат. Многие авиакомпании позволяют регистрироваться за 24 часа до рейса.',
    },
    content: {
      ro: (
        <div>
          <p>Check-in-ul este un pas esențial în pregătirea pentru o călătorie cu avionul. Acesta poate fi realizat online sau la aeroport și implică confirmarea prezenței pasagerului pe zborul rezervat. Alegeți opțiunea de check-in online pentru a economisi timp și pentru a evita cozile lungi și costuri adiționale. Multe companii aeriene permit check-in-ul cu până la 24 de ore înainte de zbor.</p>
          <p>Un alt aspect important este alegerea locului. De cele mai multe ori, aveți opțiunea de a selecta locul dorit contra cost în timpul check-in-ului online, ceea ce vă poate ajuta să evitați surprizele neplăcute în ziua zborului. Prețul locurilor selectate poate varia în dependență de compania aeriană. Este recomandat să verificați și politica companiei privind bagajele de mână, deoarece fiecare are reguli diferite.</p>
          <p>Pentru pasagerii care preferă să facă check-in la aeroport, este important să ajungeți cu suficient timp înainte de zbor. De regulă, este recomandat să fiți acolo cu două ore înainte pentru zborurile interne și cu trei ore pentru cele internaționale. Verificați informațiile despre terminalul de plecare și poarta de îmbarcare, deoarece acestea se pot schimba.</p>
          <p>După ce ați efectuat check-in-ul, nu uitați să obțineți cartela de îmbarcare, care poate fi tipărită sau salvată pe telefonul mobil. Asigurați-vă că aveți toate documentele necesare, inclusiv un act de identitate valabil. În cazul în care aveți bagaje de verificat, îndreptați-vă către ghișeul de check-in pentru a le preda.</p>
          <p>Odată ce ați trecut de controlul de securitate, verificați informațiile despre zborul dvs. pe panourile de afişare din aeroport pentru a găsi detalii actualizate despre poarta de îmbarcare și timpul de îmbarcare. Fie că alegeți check-in online sau la aeroport, pregătirea adecvată va face călătoria dvs. mult mai plăcută.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Регистрация на рейс — это важный шаг в подготовке к полету. Она может быть выполнена онлайн или в аэропорту и включает подтверждение присутствия пассажира на забронированном рейсе. Выбирайте онлайн-регистрацию, чтобы сэкономить время и избежать длинных очередей и дополнительных затрат. Многие авиакомпании позволяют регистрироваться за 24 часа до рейса.</p>
          <p>Еще один важный аспект — выбор места. Чаще всего у вас есть возможность выбрать желаемое место за дополнительную плату во время онлайн-регистрации, что поможет избежать неприятных сюрпризов в день вылета. Стоимость выбранных мест может варьироваться в зависимости от авиакомпании. Рекомендуется также ознакомиться с правилами перевозки ручной клади у каждой авиакомпании, так как они могут отличаться.</p>
          <p>Для пассажиров, предпочитающих регистрироваться в аэропорту, важно прибыть заблаговременно. Обычно рекомендуется быть в аэропорту за два часа до внутренних рейсов и за три часа до международных. Проверьте информацию о терминале отправления и выходе на посадку, так как они могут изменяться.</p>
          <p>После регистрации не забудьте получить посадочный талон, который можно распечатать или сохранить на мобильном телефоне. Убедитесь, что у вас есть все необходимые документы, включая действительное удостоверение личности. Если у вас есть багаж для сдачи, отправляйтесь к стойке регистрации, чтобы его сдать.</p>
          <p>После прохождения контроля безопасности проверьте информацию о вашем рейсе на табло в аэропорту, чтобы найти актуальные данные о выходе на посадку и времени посадки. Независимо от того, выберете ли вы онлайн-регистрацию или регистрацию в аэропорту, правильная подготовка сделает ваше путешествие намного приятнее.</p>
        </div>
      ),
    },
    img: b_check_in,
  },  
  {
    header: {
      ro: 'Zbor cu escală',
      ru: 'Рейс с пересадкой',
    },
    title: {
      ro: 'Ce Trebuie Să Știi Despre Zborurile cu Escală',
      ru: 'Что нужно знать о рейсах с пересадкой',
    },
    shortText: {
      ro: 'Zborurile cu escală pot fi o alegere inteligentă pentru călătorii care doresc să economisească bani. De multe ori, acestea oferă tarife mai mici comparativ cu zborurile directe. Totuși, este esențial să înțelegeți cum funcționează escalările și ce implicații au asupra călătoriei.',
      ru: 'Рейсы с пересадкой могут быть разумным выбором для путешественников, которые хотят сэкономить деньги. Часто такие рейсы предлагают более низкие тарифы по сравнению с прямыми рейсами. Однако важно понимать, как работают пересадки и какие они имеют последствия для поездки.',
    },
    content: {
      ro: (
        <div>
          <p>Zborurile cu escală pot fi o alegere inteligentă pentru călătorii care doresc să economisească bani. De multe ori, acestea oferă tarife mai mici comparativ cu zborurile directe. Totuși, este esențial să înțelegeți cum funcționează escalările și ce implicații au asupra călătoriei.</p>
          <p>În primul rând, asigurați-vă că sunteți conștient de durata escalelor. Unele escale pot fi scurte, iar altele pot dura câteva ore sau chiar o zi întreagă. Este important să verificați timpul de așteptare între zboruri, mai ales dacă aveți bagaje de verificat. Dacă companiile aeriene sunt diferite atunci este necesar să recuperați bagajele și să le reîncărcați pentru zborul următor, ceea ce poate consuma timp.</p>
          <p>Dacă aveți o escală mai lungă, profitați de ocazie pentru a explora orașul de escală, dacă timpul vă permite. Multe aeroporturi oferă tururi sau transport facil către atracții locale, astfel încât să puteți transforma așteptarea într-o mini-aventură.</p>
          <p>De asemenea, verificați politica companiei aeriene privind transferurile între zboruri. Unele companii oferă asistență pentru pasagerii care au nevoie să se deplaseze între terminale, mai ales în aeroporturile mari. Este important să fiți conștient de procedurile de imigrare, mai ales dacă escală înseamnă și intrarea într-o altă țară.</p>
          <p>Nu uitați să verificați și eventualele cerințe de viză, dacă este cazul. Unele țări necesită o viză de tranzit, chiar dacă nu părăsiți zona de tranzit a aeroportului. Informațiile despre viză pot fi găsite pe site-ul ambasadei respective sau pe site-ul oficial al companiei aeriene. <a href="https://mfa.gov.md/ro/content/regim-fara-vize">https://mfa.gov.md/ro/content/regim-fara-vize</a></p>
          <p>În concluzie, zborurile cu escală pot fi o alegere practică și economică, dar este important să fiți bine informat despre toate aspectele implicate pentru a vă asigura o călătorie fără probleme.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Рейсы с пересадкой могут быть разумным выбором для путешественников, которые хотят сэкономить деньги. Часто такие рейсы предлагают более низкие тарифы по сравнению с прямыми рейсами. Однако важно понимать, как работают пересадки и какие они имеют последствия для поездки.</p>
          <p>Во-первых, убедитесь, что вы осведомлены о продолжительности пересадок. Некоторые пересадки могут быть короткими, а другие могут длиться несколько часов или даже целый день. Важно проверить время ожидания между рейсами, особенно если у вас есть багаж для сдачи. Если авиакомпании разные, может понадобиться забрать багаж и зарегистрировать его заново для следующего рейса, что может занять время.</p>
          <p>Если у вас длинная пересадка, воспользуйтесь возможностью исследовать город пересадки, если позволяет время. Многие аэропорты предлагают туры или удобный транспорт к местным достопримечательностям, чтобы вы могли превратить ожидание в небольшое приключение.</p>
          <p>Также проверьте политику авиакомпании в отношении трансферов между рейсами. Некоторые авиакомпании предоставляют помощь пассажирам, которым нужно перемещаться между терминалами, особенно в крупных аэропортах. Важно быть в курсе процедур иммиграции, особенно если пересадка означает въезд в другую страну.</p>
          <p>Не забудьте проверить требования к визам, если это необходимо. Некоторые страны требуют транзитную визу, даже если вы не покидаете транзитную зону аэропорта. Информацию о визах можно найти на сайте посольства соответствующей страны или на официальном сайте авиакомпании. <a href="https://mfa.gov.md/ro/content/regim-fara-vize">https://mfa.gov.md/ro/content/regim-fara-vize</a></p>
          <p>В заключение, рейсы с пересадкой могут быть практичным и экономичным выбором, но важно быть хорошо информированным обо всех аспектах, чтобы обеспечить себе комфортное путешествие.</p>
        </div>
      ),
    },
    img: b_escala,
  },  
  {
    header: {
      ro: 'Zbor low-cost',
      ru: 'Бюджетные авиарейсы',
    },
    title: {
      ro: 'Cum Să Găsiți Cele Mai Bune Oferte pentru Zboruri Low-Cost',
      ru: 'Как найти лучшие предложения на бюджетные авиарейсы',
    },
    shortText: {
      ro: 'Zborurile low-cost au revoluționat călătoriile aeriene, făcându-le mai accesibile pentru toată lumea. Totuși, aceste zboruri vin cu propriile sale reguli și limitări. În această secțiune, vă vom arăta cum să găsiți cele mai bune oferte și ce trebuie să aveți în vedere.',
      ru: 'Бюджетные авиарейсы революционизировали авиапутешествия, сделав их более доступными для всех. Однако такие рейсы имеют свои правила и ограничения. В этом разделе мы расскажем, как найти лучшие предложения и на что следует обратить внимание.',
    },
    content: {
      ro: (
        <div>
          <p>Zborurile low-cost au revoluționat călătoriile aeriene, făcându-le mai accesibile pentru toată lumea. Totuși, aceste zboruri vin cu propriile sale reguli și limitări. În această secțiune, vă vom arăta cum să găsiți cele mai bune oferte și ce trebuie să aveți în vedere.</p>
          <p>Primul pas în găsirea unui zbor low-cost este să faceți cercetări. Utilizați motoare de căutare specializate în căutarea zborurilor pentru a compara prețurile de la diferite companii aeriene. De asemenea, înscrierea pentru newslettere ale companiilor aeriene poate oferi acces anticipat la oferte speciale.</p>
          <p>Un alt aspect important este flexibilitatea. Dacă aveți un program flexibil, încercați să căutați zboruri în zilele săptămânii, când prețurile sunt adesea mai mici. De asemenea, verificați opțiunile de zbor în afara sezonului turistic, când cererea este mai mică.</p>
          <p>Când rezervați un zbor low-cost, fiți atenți la costurile suplimentare. Companiile aeriene low-cost pot percepe taxe pentru bagaje, alegerea locurilor și alte servicii. Este esențial să citiți cu atenție termenii și condițiile înainte de a finaliza rezervarea.</p>
          <p>Înainte de a călători, asigurați-vă că aveți toate informațiile necesare despre check-in, deoarece multe companii low-cost nu oferă opțiunea de check-in la aeroport. De asemenea, verificați regulile privind bagajele, deoarece acestea pot varia de la o companie la alta.</p>
          <p>În concluzie, zborurile low-cost pot fi o modalitate excelentă de a economisi bani, dar necesită o atenție suplimentară la detalii. Planificarea și informarea corespunzătoare vor transforma călătoria dvs. într-o experiență plăcută și fără surprize.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Бюджетные авиарейсы революционизировали авиапутешествия, сделав их более доступными для всех. Однако такие рейсы имеют свои правила и ограничения. В этом разделе мы расскажем, как найти лучшие предложения и на что следует обратить внимание.</p>
          <p>Первый шаг к поиску бюджетного авиарейса — это исследование. Используйте специализированные поисковые системы для сравнения цен от различных авиакомпаний. Также подписка на рассылки авиакомпаний может предоставить вам ранний доступ к специальным предложениям.</p>
          <p>Другой важный аспект — это гибкость. Если у вас гибкий график, попробуйте искать рейсы на будние дни, когда цены обычно ниже. Также проверьте варианты полетов вне туристического сезона, когда спрос меньше.</p>
          <p>При бронировании бюджетного авиарейса обратите внимание на дополнительные расходы. Бюджетные авиакомпании могут взимать плату за багаж, выбор мест и другие услуги. Очень важно внимательно ознакомиться с условиями перед завершением бронирования.</p>
          <p>Перед путешествием убедитесь, что у вас есть вся необходимая информация о регистрации на рейс, так как многие бюджетные авиакомпании не предлагают возможность регистрации в аэропорту. Также ознакомьтесь с правилами перевозки багажа, так как они могут отличаться у разных авиакомпаний.</p>
          <p>В заключение, бюджетные авиарейсы могут быть отличным способом сэкономить деньги, но требуют дополнительного внимания к деталям. Правильное планирование и информированность сделают ваше путешествие приятным и без сюрпризов.</p>
        </div>
      ),
    },
    img: b_lowcost,
  },  
  {
    header: {
      ro: 'Reguli de călătorie',
      ru: 'Правила путешествий',
    },
    title: {
      ro: 'Reguli de Călătorie: Ce Trebuie Să Știți Înainte de Zbor',
      ru: 'Правила путешествий: что нужно знать перед полетом',
    },
    shortText: {
      ro: 'Înainte de a vă îmbarca într-o călătorie cu avionul, este esențial să cunoașteți regulile de călătorie pentru a evita neplăcerile. Aceste reguli variază de la o companie aeriană la alta și sunt stabilite de autoritățile de aviație civilă.',
      ru: 'Перед тем как отправиться в путешествие на самолете, важно знать правила, чтобы избежать неприятностей. Эти правила варьируются в зависимости от авиакомпании и устанавливаются органами гражданской авиации.',
    },
    content: {
      ro: (
        <div>
          <p>Înainte de a vă îmbarca într-o călătorie cu avionul, este esențial să cunoașteți regulile de călătorie pentru a evita neplăcerile. Aceste reguli variază de la o companie aeriană la alta și sunt stabilite de autoritățile de aviație civilă.</p>
          <p>Un aspect crucial este controlul de securitate. Toți pasagerii sunt obligați să treacă printr-un control de securitate riguros, iar obiectele interzise, cum ar fi lichidele în cantități mari sau articolele ascuțite, trebuie să fie lăsate acasă. Verificați lista cu obiectele permise și interzise pe site-ul companiei aeriene sau al aeroportului.</p>
          <p>Documentele de identitate sunt, de asemenea, esențiale. Asigurați-vă că aveți un act de identitate valabil, cum ar fi pașaportul sau cartea de identitate, și că acestea corespund numelui utilizat la rezervarea biletului. În cazul zborurilor internaționale, verificați cerințele de viză pentru țara de destinație.</p>
          <p>Bagajele sunt un alt aspect important. Fiecare companie aeriană are propriile sale reguli privind dimensiunile și greutatea bagajelor de mână și a celor de cală. Asigurați-vă că respectați aceste reguli pentru a evita taxe suplimentare.</p>
          <p>În plus, informați-vă despre politica de modificare sau anulare a rezervării. Unele companii oferă opțiuni flexibile, în timp ce altele aplică penalizări. Este bine să știți în avans ce opțiuni aveți, în cazul în care planurile dvs. se schimbă.</p>
          <p>În concluzie, cunoașterea regulilor de călătorie vă va ajuta să aveți o experiență plăcută și lipsită de stres. Planificați din timp, informați-vă și verificați toate detaliile pentru a evita surprizele neplăcute.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Перед тем как отправиться в путешествие на самолете, важно знать правила, чтобы избежать неприятностей. Эти правила варьируются в зависимости от авиакомпании и устанавливаются органами гражданской авиации.</p>
          <p>Ключевой аспект — это проверка безопасности. Все пассажиры обязаны проходить тщательный контроль безопасности, и запрещенные предметы, такие как большие объемы жидкости или острые предметы, должны оставаться дома. Ознакомьтесь со списком разрешенных и запрещенных предметов на сайте авиакомпании или аэропорта.</p>
          <p>Документы также имеют важное значение. Убедитесь, что у вас есть действительное удостоверение личности, такое как паспорт или ID-карта, и что оно соответствует имени, указанному при бронировании билета. В случае международных рейсов проверьте визовые требования для страны назначения.</p>
          <p>Багаж — еще один важный аспект. Каждая авиакомпания имеет свои правила относительно размеров и веса ручной клади и зарегистрированного багажа. Убедитесь, что вы соблюдаете эти правила, чтобы избежать дополнительных сборов.</p>
          <p>Кроме того, ознакомьтесь с политикой изменения или отмены бронирования. Некоторые компании предлагают гибкие условия, в то время как другие применяют штрафы. Лучше заранее узнать свои варианты на случай изменения планов.</p>
          <p>В заключение, знание правил путешествий поможет вам провести поездку приятно и без стресса. Планируйте заранее, изучайте информацию и проверяйте все детали, чтобы избежать неприятных сюрпризов.</p>
        </div>
      ),
    },
    img: b_calatorie,
  },   
  {
    header: {
      ro: 'Informații despre aeronave',
      ru: 'Информация об авиалайнерах',
    },
    title: {
      ro: 'Tipuri de Aeronave: Ce Să Știți Despre Zborul Dvs.',
      ru: 'Типы авиалайнеров: что нужно знать о вашем рейсе',
    },
    shortText: {
      ro: 'Când călătoriți cu avionul, este esențial să înțelegeți ce tip de aeronavă veți folosi. Există diferite tipuri de aeronave, fiecare cu caracteristici specifice care influențează confortul și experiența de zbor.',
      ru: 'Путешествуя на самолете, важно понимать, какой тип авиалайнера будет использоваться. Существуют различные типы самолетов, каждый из которых имеет особенности, влияющие на комфорт и впечатления от полета.',
    },
    content: {
      ro: (
        <div>
          <p>Când călătoriți cu avionul, este esențial să înțelegeți ce tip de aeronavă veți folosi. Există diferite tipuri de aeronave, fiecare cu caracteristici specifice care influențează confortul și experiența de zbor.</p>
          <p>Aeronavele de tip narrow-body, cum ar fi Boeing 737 sau Airbus A320, sunt adesea folosite pentru zboruri interne sau scurte. Aceste aeronave au un singur culoar și oferă, în general, mai puțin spațiu pentru picioare comparativ cu cele de tip wide-body. Acestea sunt ideale pentru zboruri rapide și eficiente.</p>
          <p>Pe de altă parte, aeronavele de tip wide-body, precum Boeing 777 sau Airbus A380, sunt destinate zborurilor internaționale pe distanțe lungi. Acestea dispun de două culoare și oferă un confort superior, cu mai mult spațiu și facilități mai bune, cum ar fi divertismentul la bord și mese calde.</p>
          <p>De asemenea, este important să știți că anumite aeronave sunt dotate cu caracteristici specifice, cum ar fi Wi-Fi sau prize pentru încărcarea dispozitivelor. Verificați informațiile despre aeronava dvs. înainte de zbor pentru a ști la ce să vă așteptați.</p>
          <p>Dacă sunteți interesat de aspectele tehnice ale aeronavelor, multe companii aeriene oferă detalii despre specificațiile tehnice ale aeronavelor utilizate. Cunoașterea acestor informații poate îmbogăți experiența de zbor.</p>
          <p>În concluzie, alegerea aeronavei poate influența semnificativ confortul călătoriei. Informați-vă despre tipul de aeronavă înainte de zbor pentru a vă asigura că aveți o experiență plăcută.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Путешествуя на самолете, важно понимать, какой тип авиалайнера будет использоваться. Существуют различные типы самолетов, каждый из которых имеет особенности, влияющие на комфорт и впечатления от полета.</p>
          <p>Самолеты узкофюзеляжного типа, такие как Boeing 737 или Airbus A320, часто используются для внутренних или коротких рейсов. Эти самолеты имеют один проход и, как правило, меньше места для ног по сравнению с широкофюзеляжными. Они идеально подходят для быстрых и эффективных перелетов.</p>
          <p>С другой стороны, широкофюзеляжные самолеты, такие как Boeing 777 или Airbus A380, предназначены для международных рейсов на дальние расстояния. Они имеют два прохода и предлагают больший комфорт, больше пространства и лучшие удобства, такие как развлекательные системы на борту и горячие блюда.</p>
          <p>Также важно знать, что некоторые самолеты оснащены специальными функциями, такими как Wi-Fi или розетки для зарядки устройств. Ознакомьтесь с информацией о вашем самолете перед полетом, чтобы знать, чего ожидать.</p>
          <p>Если вас интересуют технические аспекты самолетов, многие авиакомпании предоставляют детали о технических характеристиках используемых авиалайнеров. Знание этой информации может обогатить впечатления от полета.</p>
          <p>В заключение, выбор самолета может существенно повлиять на комфорт путешествия. Ознакомьтесь с типом авиалайнера перед полетом, чтобы ваше путешествие прошло приятно.</p>
        </div>
      ),
    },
    img: b_aeronave,
  },  
  {
    header: {
      ro: 'Rezervare bilete online',
      ru: 'Онлайн-бронирование билетов',
    },
    title: {
      ro: 'Cum Să Rezervați Bilete de Avion Online: Ghid Pas cu Pas',
      ru: 'Как забронировать авиабилеты онлайн: пошаговое руководство',
    },
    shortText: {
      ro: 'Rezervarea biletelor de avion online este acum o practică standard, datorită comodității și eficienței. Acest ghid vă va ajuta să navigați procesul de rezervare pentru a obține cele mai bune oferte.',
      ru: 'Онлайн-бронирование авиабилетов стало стандартной практикой благодаря удобству и эффективности. Это руководство поможет вам пройти процесс бронирования и найти лучшие предложения.',
    },
    content: {
      ro: (
        <div>
          <p>Rezervarea biletelor de avion online este acum o practică standard, datorită comodității și eficienței. Acest ghid vă va ajuta să navigați procesul de rezervare pentru a obține cele mai bune oferte.</p>
          <p>În primul rând, începeți prin a căuta pe site-uri de comparare a prețurilor. Aceste platforme vă permit să vizualizați opțiunile disponibile de la diferite companii aeriene și să comparați prețurile. Asigurați-vă că introduceți date corecte despre destinație, date de plecare și numărul de pasageri.</p>
          <p>După ce ați găsit zborul dorit, verificați detaliile legate de politică de bagaje și serviciile incluse. Unele companii aeriene low-cost pot percepe taxe suplimentare pentru bagaje de cală sau pentru alegerea locului.</p>
          <p>Odată ce ați confirmat zborul, va trebui să completați informațiile personale, inclusiv numele, data nașterii și detalii de contact. Verificați cu atenție aceste informații, deoarece erorile pot duce la probleme la check-in.</p>
          <p>După completarea rezervării, veți primi un e-mail de confirmare cu detalii despre zbor. Păstrați acest e-mail, deoarece va conține informații importante despre check-in și eventuale modificări ale zborului.</p>
          <p>În concluzie, rezervarea online a biletelor de avion este un proces simplu dacă știți pașii corecți. Fiți atent la detalii și verificați toate informațiile înainte de a finaliza rezervarea.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Онлайн-бронирование авиабилетов стало стандартной практикой благодаря удобству и эффективности. Это руководство поможет вам пройти процесс бронирования и найти лучшие предложения.</p>
          <p>Для начала воспользуйтесь сайтами для сравнения цен. Эти платформы позволяют просмотреть доступные варианты от различных авиакомпаний и сравнить цены. Убедитесь, что вы вводите правильные данные о пункте назначения, датах вылета и количестве пассажиров.</p>
          <p>После выбора подходящего рейса проверьте информацию о политике багажа и включенных услугах. Некоторые бюджетные авиакомпании могут взимать дополнительные сборы за багаж или выбор места.</p>
          <p>После подтверждения рейса вам потребуется заполнить личные данные, включая имя, дату рождения и контактную информацию. Внимательно проверяйте эти данные, так как ошибки могут вызвать проблемы при регистрации на рейс.</p>
          <p>После завершения бронирования вы получите электронное письмо с подтверждением и информацией о рейсе. Сохраните это письмо, так как в нем содержатся важные данные о регистрации и возможных изменениях рейса.</p>
          <p>В заключение, онлайн-бронирование авиабилетов — это простой процесс, если вы знаете правильные шаги. Обращайте внимание на детали и проверяйте всю информацию перед завершением бронирования.</p>
        </div>
      ),
    },
    img: b_reservation,
  },  
  {
    header: {
      ro: 'Aflați cum puteți să vă rambursezi banii pentru zborul anulat',
      ru: 'Как получить возврат денег за отмененный рейс',
    },
    title: {
      ro: 'Rambursări pentru Zboruri Anulate: Pașii de Urmat',
      ru: 'Возврат денег за отмененные рейсы: шаги, которые нужно предпринять',
    },
    shortText: {
      ro: 'Dacă zborul dvs. a fost anulat, este esențial să știți cum să solicitați rambursarea. Fie că este vorba de o situație neprevăzută sau de o decizie a companiei aeriene, cunoașterea pașilor corecți poate face procesul mai simplu.',
      ru: 'Если ваш рейс был отменен, важно знать, как запросить возврат денег. Будь то непредвиденная ситуация или решение авиакомпании, знание правильных шагов упростит процесс.',
    },
    content: {
      ro: (
        <div>
          <p>Dacă zborul dvs. a fost anulat, este esențial să știți cum să solicitați rambursarea. Fie că este vorba de o situație neprevăzută sau de o decizie a companiei aeriene, cunoașterea pașilor corecți poate face procesul mai simplu.</p>
          <p>Primul pas este să contactați compania aeriană cât mai curând posibil. Verificați site-ul oficial al companiei pentru informații despre politica de rambursare și modalitățile disponibile pentru a solicita restituirea banilor. Multe companii oferă opțiunea de a solicita rambursarea online, ceea ce poate economisi timp.</p>
          <p>Pregătiți documentele necesare, cum ar fi confirmarea rezervării și orice corespondență relevantă. Acestea vor fi utile în procesul de rambursare. Asigurați-vă că respectați termenul limită pentru solicitarea rambursării, deoarece companiile aeriene pot impune anumite restricții.</p>
          <p>Dacă ați plătit pentru servicii adiționale, cum ar fi bagaje sau asigurări, verificați dacă acestea sunt, de asemenea, rambursabile. Unele companii oferă compensații suplimentare în cazul anulării, în funcție de motivele acesteia.</p>
          <p>După ce ați trimis cererea de rambursare, păstrați o copie a documentelor trimise și urmăriți starea cererii. Unele companii oferă un număr de referință pentru a verifica progresul cererii.</p>
          <p>În concluzie, procesul de rambursare pentru zboruri anulate poate fi simplu dacă urmați pașii corecți. Fiți proactiv și informați-vă despre politica companiei aeriene pentru a vă asigura că recuperați banii cât mai repede.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Если ваш рейс был отменен, важно знать, как запросить возврат денег. Будь то непредвиденная ситуация или решение авиакомпании, знание правильных шагов упростит процесс.</p>
          <p>Первым шагом свяжитесь с авиакомпанией как можно скорее. Проверьте официальный сайт авиакомпании для получения информации о политике возврата и способах запроса возврата денег. Многие авиакомпании предлагают возможность запросить возврат онлайн, что сэкономит ваше время.</p>
          <p>Подготовьте необходимые документы, такие как подтверждение бронирования и всю соответствующую переписку. Эти документы будут полезны в процессе возврата. Убедитесь, что вы соблюдаете крайний срок для подачи запроса на возврат, так как авиакомпании могут устанавливать ограничения.</p>
          <p>Если вы оплатили дополнительные услуги, такие как багаж или страховка, проверьте, можно ли вернуть эти деньги. Некоторые авиакомпании предлагают дополнительные компенсации в случае отмены, в зависимости от причин отмены.</p>
          <p>После подачи запроса на возврат сохраните копию отправленных документов и следите за статусом заявки. Некоторые авиакомпании предоставляют номер для отслеживания хода обработки запроса.</p>
          <p>В заключение, процесс возврата денег за отмененные рейсы может быть простым, если вы следуете правильным шагам. Будьте проактивными и ознакомьтесь с политикой авиакомпании, чтобы как можно быстрее вернуть свои деньги.</p>
        </div>
      ),
    },
    img: b_anulat,
  },  
  {
    header: {
      ro: 'Bagaj pierdut',
      ru: 'Потерянный багаж',
    },
    title: {
      ro: 'Ce Să Facem Dacă Ți-a Dispărut Bagajul',
      ru: 'Что делать, если ваш багаж пропал',
    },
    shortText: {
      ro: 'Dacă ați ajuns la destinație și bagajul dvs. nu este pe bandă, nu intrați în panică. Există pași pe care îi puteți urma pentru a gestiona situația eficient.',
      ru: 'Если вы прибыли на место назначения, а ваш багаж не на конвейере, не паникуйте. Существует несколько шагов, которые помогут эффективно справиться с ситуацией.',
    },
    content: {
      ro: (
        <div>
          <p>Dacă ați ajuns la destinație și bagajul dvs. nu este pe bandă, nu intrați în panică. Există pași pe care îi puteți urma pentru a gestiona situația eficient.</p>
          <p>Primul lucru pe care trebuie să-l faceți este să raportați pierderea bagajului la biroul de lost & found al aeroportului imediat ce observați că bagajul nu a sosit. Asigurați-vă că aveți la îndemână toate documentele necesare, cum ar fi cartela de îmbarcare și dovada de predare a bagajului.</p>
          <p>Compania aeriană va emite un raport de pierdere și vă va oferi un număr de referință. Acest număr va fi esențial pentru a urmări starea bagajului dvs. În plus, companiile aeriene au obligația să compenseze pasagerii pentru cheltuielile ocazionate de întârzierea bagajului, așa că păstrați toate chitanțele pentru achizițiile efectuate în timpul așteptării.</p>
          <p>Este, de asemenea, important să verificați politica companiei aeriene referitoare la bagajele pierdute, deoarece fiecare companie are proceduri diferite. Unele pot oferi actualizări prin SMS sau e-mail cu privire la starea bagajului.</p>
          <p>Dacă bagajul nu este găsit într-un anumit termen, solicitați compensația pentru bagajul pierdut. Companiile aeriene au limite specifice de rambursare, așa că informați-vă despre drepturile dvs. ca pasager.</p>
          <p>În concluzie, pierderea bagajului poate fi stresantă, dar știind cum să reacționați și care sunt pașii corecți poate face procesul mai ușor. Fiți proactiv și informați-vă despre politica companiei aeriene pentru a vă asigura că obțineți tot ceea ce aveți dreptul.</p>
        </div>
      ),
      ru: (
        <div>
          <p>Если вы прибыли на место назначения, а ваш багаж не на конвейере, не паникуйте. Существует несколько шагов, которые помогут эффективно справиться с ситуацией.</p>
          <p>Первое, что нужно сделать, это сообщить о потере багажа в службу потерянных вещей аэропорта, как только вы заметите, что багаж не пришел. Убедитесь, что у вас есть все необходимые документы, такие как посадочный талон и квитанция о сдаче багажа.</p>
          <p>Авиакомпания составит отчет о потере и предоставит вам номер для отслеживания. Этот номер будет важен для отслеживания состояния вашего багажа. Кроме того, авиакомпании обязаны компенсировать пассажирам расходы, связанные с задержкой багажа, поэтому сохраняйте все чеки на покупки, сделанные во время ожидания.</p>
          <p>Также важно ознакомиться с политикой авиакомпании по поводу потерянного багажа, так как каждая авиакомпания имеет разные процедуры. Некоторые авиакомпании предоставляют обновления о статусе багажа через SMS или электронную почту.</p>
          <p>Если багаж не найден в течение определенного времени, запросите компенсацию за потерянный багаж. У авиакомпаний есть конкретные лимиты на возмещение, так что ознакомьтесь с вашими правами как пассажира.</p>
          <p>В заключение, потеря багажа может быть стрессовой ситуацией, но зная, как реагировать и какие шаги предпринять, можно значительно упростить процесс. Будьте проактивными и ознакомьтесь с политикой авиакомпании, чтобы получить все, на что вы имеете право.</p>
        </div>
      ),
    },
    img: b_blost,
  },  
  {
    header: {
      ro: 'Reguli de călătorie cu animalul de companie',
      ru: 'Правила путешествий с питомцем',
    },
    title: {
      ro: 'Călătoria cu Animalul de Companie: Reguli și Recomandări',
      ru: 'Путешествие с питомцем: правила и рекомендации',
    },
    shortText: {
      ro: 'Călătoria cu un animal de companie necesită planificare și respectarea unor reguli specifice impuse de compania aeriană și autoritățile de transport. Urmează acești pași pentru a asigura o experiență confortabilă pentru amândoi.',
      ru: 'Путешествие с питомцем требует планирования и соблюдения специфических правил, установленных авиакомпанией и транспортными властями. Следуйте этим шагам, чтобы обеспечить комфортное путешествие для вас обоих.',
    },
    content: {
      ro: (
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
      ru: (
        <div>
          <p>Путешествие с питомцем требует планирования и соблюдения специфических правил, установленных авиакомпанией и транспортными властями. Следуйте этим шагам, чтобы обеспечить комфортное путешествие для вас обоих:</p>
          
          <h3>Необходимые документы</h3>
          <ul>
            <li>Паспорт питомца</li>
            <li>Сертификат о здоровье</li>
            <li>Сертификат о прививках</li>
            <li>Микрочип</li>
          </ul>
          <p>Резервация для питомца должна быть сделана минимум за 24 часа до вылета.</p>
          
          <h3>Подготовьте перевозчик</h3>
          <p><strong>Для пассажирского салона:</strong> Общий вес животного и клетки не должен превышать 8 кг. Высота, ширина и длина клетки не могут превышать 23 см, 30 см и 40 см соответственно. Клетка должна быть специально разработана для транспортировки животных, независимо от того, является ли она жесткой или мягкой. Убедитесь, что клетка хорошо вентилируется и удобна.</p>
          <p><strong>Для грузового отсека:</strong> Если питомец путешествует в грузовом отсеке, используйте контейнер, соответствующий стандартам IATA, который должен быть жестким, хорошо вентилируемым и комфортным.</p>
    
          <h3>Животные, которые не допускаются:</h3>
          <ul>
            <li>Американский питбультерьер</li>
            <li>Американский стаффордширский терьер</li>
            <li>Питбультерьер</li>
            <li>Японский тоса</li>
            <li>Дого Аргентино</li>
            <li>Фила Бразилейро</li>
            <li>Американский булли</li>
          </ul>
    
          <p>Путешествие с вашим питомцем требует планирования и внимания к деталям, но с правильной подготовкой процесс может быть приятным для вас обоих. Для дополнительной информации и помощи, не стесняйтесь связаться с нами по номеру: <a href="tel:+373 69 639 555">+373 69 639 555</a></p>
        </div>
      ),
    },
    img: b_animals,
  },  
  {
    header: {
      ro: 'Reguli de călătorii pentru copiii minori',
      ru: 'Правила путешествий для несовершеннолетних',
    },
    title: {
      ro: 'Călătoria pentru Minori: Ghidul Complet pentru Siguranța Zborului',
      ru: 'Путешествие для несовершеннолетних: Полный гид для безопасного полета',
    },
    shortText: {
      ro: 'Călătoria unui minor cu avionul implică considerații și reguli specifice. Află tot ce trebuie să știi pentru a asigura o călătorie sigură și confortabilă pentru copilul tău.',
      ru: 'Путешествие несовершеннолетнего на самолете требует учета специфических правил. Узнайте все, что нужно для безопасного и комфортного путешествия для вашего ребенка.',
    },
    content: {
      ro: (
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
      ru: (
        <div>
          <p>Путешествие несовершеннолетнего (ребенка или подростка) на самолете требует учета дополнительных аспектов и специфических правил, которые могут различаться в зависимости от авиакомпании и направления. Вот все, что нужно знать о полетах несовершеннолетних:</p>
    
          <h3>1. Правила и Политики Авиакомпании: Услуги для Несовершеннолетних Без Сопровождения</h3>
          <p>Большинство авиакомпаний предлагают специальные услуги для несовершеннолетних, путешествующих без сопровождения, включая дополнительную помощь и наблюдение во время полета.</p>
    
          <h3>2. Необходимые Документы</h3>
          <ul>
            <li>Свидетельство о рождении</li>
            <li>Паспорт</li>
            <li>Формы согласия</li>
          </ul>
    
          <h3>3. Подготовка к Путешествию</h3>
          <p><strong>Резервация:</strong> Забронируйте место для несовершеннолетнего заранее и сообщите авиакомпании о необходимости услуг для несовершеннолетних без сопровождения.</p>
          <p><strong>Специальные Услуги:</strong> Проверьте и забронируйте специальные услуги для несовершеннолетних без сопровождения, такие как дополнительный уход и помощь в течение полета.</p>
    
          <h3>4. В Аэропорту</h3>
          <p><strong>Регистрация:</strong> Приезжайте в аэропорт заранее, чтобы завершить все формальности.</p>
          <p><strong>Передача Несовершеннолетнего:</strong> Если несовершеннолетний путешествует без сопровождения, передайте его сотрудникам авиакомпании на стойке регистрации, где он получит помощь и будет безопасно посажен на рейс.</p>
    
          <h3>5. Во время Полета</h3>
          <p><strong>Услуги для Несовершеннолетних:</strong> Если заказаны услуги для несовершеннолетних без сопровождения, бортпроводники будут заботиться о ребенке и обеспечат его благополучие во время полета.</p>
    
          <h3>6. По Прибытии</h3>
          <p><strong>Получение:</strong> Если несовершеннолетний путешествовал без сопровождения, убедитесь, что лицо, назначенное для его встречи, присутствует в бюро по встрече несовершеннолетних для его получения.</p>
    
          <p>Заранее планируя и проверяя все требования, вы сможете обеспечить безопасное и приятное путешествие для вашего ребенка. Для дополнительной информации и помощи свяжитесь с нами по номеру: <a href="tel:+373 69 639 555">+373 69 639 555</a></p>
        </div>
      ),
    },
    img: b_kids,
  },   
  {
    header: {
      ro: 'Obiecte admise în bagaj',
      ru: 'Предметы, разрешённые в багаже',
    },
    title: {
      ro: 'Obiecte Interzise la Bordul Aeronavei: Ce Trebuie Să Știi',
      ru: 'Запрещённые предметы на борту самолёта: Что нужно знать',
    },
    shortText: {
      ro: 'În general, obiectele pe care nu ai voie să le iei cu tine în avion (nici în bagajul de mână, nici în cel de cală) sunt acelea care pot pune în pericol siguranța aeronavei și a pasagerilor.',
      ru: 'Предметы, которые запрещено брать с собой в самолёт (ни в ручную кладь, ни в зарегистрированный багаж), могут представлять угрозу безопасности самолёта и пассажиров.',
    },
    content: {
      ro: (
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
      ru: (
        <div>
          <p>Предметы, которые запрещено брать с собой в самолёт (ни в ручную кладь, ни в зарегистрированный багаж), могут представлять угрозу безопасности самолёта и пассажиров. Список запрещённых предметов, которые нельзя провозить в зоне ограниченного доступа или на борту самолёта, включает следующие категории:</p>

          <h3>1. Огнестрельное оружие</h3>
          <ul>
            <li>Пистолеты, револьверы, карабины, ружья.</li>
            <li>Игрушечное оружие, копии и имитации оружия, которые можно принять за настоящее.</li>
            <li>Части огнестрельного оружия, за исключением оптических прицелов.</li>
            <li>Сигнальные пистолеты.</li>
            <li>Стартовые пистолеты.</li>
            <li>Игрушечные пистолеты и ружья любого типа.</li>
            <li>Оружие сжатого воздуха и CO2 (пневматические пистолеты, ружья).</li>
            <li>Луки, арбалеты и стрелы.</li>
            <li>Гарпуны и гарпунные пистолеты.</li>
            <li>Рогатки и катапульты.</li>
          </ul>

          <h3>2. Парализующие устройства</h3>
          <ul>
            <li>Электрошоковые устройства (шокеры, электрошоковые пистолеты).</li>
            <li>Электрошоковые дубинки.</li>
            <li>Устройства для оглушения и убийства животных.</li>
            <li>Химические вещества, газы и нейтрализующие спреи, такие как:</li>
            <li>Слезоточивые спреи.</li>
            <li>Спреи с перцем или острым перцем.</li>
            <li>Слезоточивый газ и кислотные спреи.</li>
          </ul>

          <h3>3. Острые или колющие предметы</h3>
          <ul>
            <li>Предметы, предназначенные для резки или рубки (топоры, секиры).</li>
            <li>Ледовые долота.</li>
            <li>Лезвия для бритья.</li>
            <li>Канцелярские ножи.</li>
            <li>Ножи с лезвием длиннее 6 см.</li>
            <li>Ножницы с лезвием длиннее 6 см.</li>
            <li>Оборудование для боевых искусств с острыми краями или лезвиями.</li>
            <li>Мечи и сабли.</li>
          </ul>

          <h3>4. Рабочие инструменты</h3>
          <ul>
            <li>Сверла и сверлильные наконечники (включая портативные дрели).</li>
            <li>Инструменты с лезвием или стержнем длиннее 6 см (отвёртки, долота).</li>
            <li>Пилы (включая портативные электрические пилы).</li>
            <li>Горелки для пайки.</li>
            <li>Пистолеты для забивания болтов и гвоздей.</li>
          </ul>

          <h3>5. Тупые предметы</h3>
          <ul>
            <li>Биты для бейсбола и софтбола.</li>
            <li>Дубинки.</li>
            <li>Снаряжение для боевых искусств.</li>
          </ul>

          <h3>6. Взрывчатые вещества и устройства</h3>
          <ul>
            <li>Боеприпасы.</li>
            <li>Взрывные капсюли.</li>
            <li>Детонаторы и шнуры.</li>
            <li>Копии или имитации взрывных устройств.</li>
            <li>Мины, гранаты и другие военные взрывные устройства.</li>
            <li>Фейерверки и другая пиротехника.</li>
            <li>Дымовые шашки и дымовые патроны.</li>
            <li>Динамит, порох и пластичные взрывчатые вещества.</li>
          </ul>
        </div>
      ),
    },
    img: bagage, 
  },  
  {
    header: {
      ro: 'Obiecte Admise în Bagajul de Mână',
      ru: 'Предметы, разрешённые в ручной клади'
    },
    title: {
      ro: 'Ce Poți Lua cu Tine în Bagajul de Mână: Reguli și Recomandări',
      ru: 'Что можно взять с собой в ручную кладь: правила и рекомендации'
    },
    shortText: {
      ro: 'Regulile pentru bagajele de mână includ atât dimensiuni, cât și conținut. Află ce obiecte sunt permise și cum să te pregătești corect pentru zbor.',
      ru: 'Правила для ручной клади включают как размеры, так и содержимое. Узнайте, какие предметы разрешены, и как правильно подготовиться к полёту.'
    },
    content: {
      ro: (
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
            <li><strong>Ambalare:</strong> Împachetează electronicele la final, deoarece la controlul de securitate va trebui să le плace într-un container separat, iar accesul rapid este esențial.</li>
          </ul>
        </div>
      ),
      ru: (
        <div>
          <p>Правила авиаперевозчиков для ручной клади касаются не только размеров и веса, но и её содержимого. Вот наиболее распространённые категории предметов, которые разрешено брать в ручную кладь при соблюдении определённых требований:</p>
  
          <h3>1. Косметика и жидкости</h3>
          <p>Косметика и средства личной гигиены часто становятся причиной необходимости оплачивать багаж в багажном отделении. Но если вы хотите уложиться в нормы ручной клади, соблюдайте следующие правила:</p>
          <ul>
            <li><strong>Ограничение на жидкости:</strong> всего 1 литр, разделённый на максимум 10 ёмкостей по 100 мл каждая.</li>
            <li><strong>Упаковка:</strong> Миниатюрные туалетные принадлежности (не более 100 мл) должны быть упакованы в прозрачные пакеты размером 20x20 см. Если ваш продукт превышает этот объём, перелейте его в ёмкости по 100 мл.</li>
            <li><strong>Рекомендация:</strong> Если вы летите в Европу, подумайте о том, чтобы отказаться от предметов, которые, как вы уверены, можно приобрести по месту (например, шампунь).</li>
          </ul>
          <p>Советуем приобрести специальный мешочек для перевозки косметики, соответствующий правилам, так как на досмотре потребуется выложить их из багажа и положить в специальные контейнеры.</p>
  
          <h3>2. Еда и лекарства</h3>
          <p>Еда и лекарства разрешены в ручной клади. Вот несколько важных моментов:</p>
          <ul>
            <li><strong>Еда:</strong> Если еда имеет жидкую консистенцию, её необходимо упаковать в ёмкости объёмом 100 мл, которые будут учтены в общем литре разрешённых жидкостей.</li>
            <li><strong>Лекарства:</strong> Лекарства в упаковке объёмом более 100 мл должны сопровождаться рецептом.</li>
          </ul>
          <p>Даже в короткое путешествие рекомендуется взять несколько универсальных лекарств на случай непредвиденных ситуаций, так как вы можете не иметь доступа к аптеке.</p>
  
          <h3>3. Электроника</h3>
          <p>Ноутбук, планшет и камера важны для многих путешественников. Их можно брать как в ручную кладь, так и в багаж, но рекомендуется взять их в ручную кладь, чтобы предотвратить повреждение при транспортировке. Несколько полезных советов:</p>
          <ul>
            <li><strong>Выбор:</strong> Подумайте, какая электроника действительно вам нужна, а от чего можно отказаться.</li>
            <li><strong>Упаковка:</strong> Упакуйте электронику в последнюю очередь, так как на досмотре её потребуется выложить отдельно для проверки.</li>
          </ul>
        </div>
      )
    },
    img: noAlowed
  },  
  {
    header: {
      ro: 'Bagajul de Călă: Care Sunt Tarifele?',
      ru: 'Багаж в багажное отделение: Какие тарифы?'
    },
    title: {
      ro: 'Costurile Asociate Bagajului de Călă: Ce Trebuie Să Știi',
      ru: 'Стоимость багажа в багажное отделение: Что нужно знать'
    },
    shortText: {
      ro: 'Călătoria cu avionul poate aduce costuri neașteptate legate de bagajul de cală. Află despre tarifele, limitele și modalitățile de plată pentru a planifica mai bine călătoria ta.',
      ru: 'Путешествие самолетом может повлечь неожиданные расходы на багаж в багажное отделение. Узнайте о тарифах, ограничениях и способах оплаты, чтобы лучше спланировать поездку.'
    },
    content: {
      ro: (
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
      ru: (
        <div>
          <p>Путешествие самолетом — это захватывающий опыт, полный эмоций и приключений, но важно быть хорошо информированным о связанных расходах, особенно когда речь идет о багаже в багажное отделение. Большинство авиакомпаний устанавливают различные тарифы на багаж в багажное отделение, и эти расходы могут существенно повлиять на общий бюджет вашего путешествия. В этой статье мы рассмотрим тарифы на багаж в багажное отделение и факторы, которые на них влияют.</p>
  
          <h3>1. Общие тарифы на багаж в багажное отделение</h3>
          <p>Тарифы на багаж в багажное отделение могут варьироваться в зависимости от множества факторов, включая авиакомпанию, направление, тип рейса (low-cost или традиционный) и класс купленного билета. В целом, вот некоторые диапазоны цен:</p>
          <ul>
            <li><strong>Бюджетные авиакомпании:</strong> Тарифы на багаж в багажное отделение в бюджетных авиакомпаниях могут начинаться от 10-20 евро за багаж до 20 кг, но могут достигать 50 евро или более, в зависимости от времени бронирования. Важно помнить, что часто эти компании взимают дополнительные сборы за багаж в багажное отделение, и цена значительно возрастает, если вы решите заплатить за багаж в последний момент, в аэропорту.</li>
            <li><strong>Традиционные авиакомпании:</strong> В случае с традиционными авиакомпаниями тарифы на багаж в багажное отделение обычно включены в стоимость билета, но существуют ограничения по весу. Если вы превысите лимит, вам придется заплатить дополнительный сбор, который может составлять от 25 до 100 евро в зависимости от того, насколько превышен вес.</li>
          </ul>
  
          <h3>2. Ограничения по весу и размеру</h3>
          <p>Очень важно проверить ограничения по весу и размеру багажа в багажное отделение перед рейсом. Обычно большинство авиакомпаний позволяют багаж до 20-23 кг, а размеры могут варьироваться, но обычно они должны соответствовать стандартным размерам, например, 158 см (длина + ширина + высота). Багаж, который превышает эти ограничения, может привести к дополнительным сборам.</p>
  
          <h3>3. Дополнительный багаж</h3>
          <p>Если вам нужно больше одного багажа в багажное отделение, важно знать, что многие авиакомпании позволяют приобрести дополнительный багаж, обычно по сниженной цене по сравнению с дополнительным сбором за превышение веса. Тарифы на дополнительный багаж могут варьироваться, но обычно составляют от 20 до 60 евро, в зависимости от авиакомпании и направления.</p>
  
          <h3>4. Скидки и предложения</h3>
          <p>Некоторые авиакомпании предлагают скидки на багаж в багажное отделение, если его приобрести онлайн заранее. Рекомендуется проверять официальный сайт авиакомпании на наличие предложений и специальных акций, которые могут сделать стоимость багажа более доступной. Также часто лояльные пассажиры или владельцы карт лояльности могут получить дополнительные скидки.</p>
  
          <h3>5. Способы оплаты</h3>
          <p>Большинство авиакомпаний позволяют оплатить тарифы на багаж в багажное отделение через их официальный сайт в момент бронирования билета или позже через мобильные приложения. Важно сохранять чеки и подтверждения об оплате, так как они могут понадобиться в случае споров.</p>
  
          <h3>6. Заключение</h3>
          <p>В заключение, расходы на багаж в багажное отделение могут значительно различаться в зависимости от авиакомпании, типа рейса и деталей бронирования. Убедитесь, что вы хорошо информированы о тарифах и правилах конкретной авиакомпании, с которой вы летите, чтобы избежать неприятных сюрпризов в аэропорту. Планируйте заранее и, если возможно, покупайте багаж в багажное отделение заранее, чтобы получить лучшие тарифы.</p>
        </div>
      )
    },
    img: tarif
  },  
  {
    header: {
      ro: 'Dimensiuni pentru Bagajul de Mână',
      ru: 'Размеры для Ручной Поклажи'
    },
    title: {
      ro: 'Ce Trebuie Să Știi Despre Dimensiunile Bagajului de Mână',
      ru: 'Что Нужно Знать о Размере Ручной Поклажи'
    },
    shortText: {
      ro: 'Respectarea dimensiunilor bagajului de mână este crucială pentru a evita problemele la aeroport. Află despre dimensiunile standard și sfaturi utile pentru a te asigura că te încadrezi în cerințe.',
      ru: 'Соблюдение размеров ручной поклажи крайне важно, чтобы избежать проблем в аэропорту. Узнай о стандартных размерах и полезных советах, чтобы убедиться, что твой багаж соответствует требованиям.'
    },
    content: {
      ro: (
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
      ru: (
        <div>
          <p>Путешествие самолетом включает множество правил и предписаний, и размеры ручной поклажи играют важную роль, чтобы избежать проблем в аэропорту. Каждая авиакомпания имеет свои собственные политики, поэтому крайне важно быть хорошо информированным перед отправлением. В этой статье мы рассмотрим стандартные размеры ручной поклажи и несколько полезных советов, чтобы убедиться, что ваш багаж соответствует требованиям.</p>
  
          <h3>1. Стандартные Размеры</h3>
          <p>В общем, максимальные размеры ручной поклажи могут варьироваться, но большинство авиакомпаний придерживаются следующих стандартов:</p>
          <ul>
            <li><strong>Длина:</strong> от 55 см до 56 см</li>
            <li><strong>Ширина:</strong> от 35 см до 45 см</li>
            <li><strong>Высота:</strong> от 20 см до 25 см</li>
          </ul>
          <p>Важно учитывать эти размеры, поскольку багаж, который превышает их, не будет принят как ручная поклажа и должен быть зарегистрирован.</p>
  
          <h3>2. Вес Ручной Поклажи</h3>
          <p>Кроме размеров, многие авиакомпании также ограничивают вес ручной поклажи, обычно в пределах от 7 кг до 10 кг. Рекомендуется проверить политику конкретной авиакомпании, с которой вы путешествуете, так как избыточный вес может привести к дополнительным сборам или необходимости зарегистрировать багаж.</p>
  
          <h3>3. Типы Ручной Поклажи</h3>
          <p>Существует несколько типов ручной поклажи, и правильный выбор может сыграть важную роль:</p>
          <ul>
            <li><strong>Чемоданы:</strong> Это самые популярные и предлагаются в различных размерах. Убедитесь, что размеры подходят под требования авиакомпании.</li>
            <li><strong>Рюкзаки:</strong> Очень удобные, рюкзаки часто легки в переноске и могут добавить комфорт в ваше путешествие. Проверьте размеры, чтобы убедиться, что они соответствуют требованиям.</li>
            <li><strong>Сумки на плечо:</strong> Некоторые сумки на плечо можно использовать как ручную поклажу, но важно убедиться, что они соответствуют разрешённым размерам.</li>
          </ul>
  
          <h3>4. Допустимые Ручные Поклажи</h3>
          <p>Кроме основного ручного багажа, многие авиакомпании также позволяют взять с собой дополнительный личный предмет, например:</p>
          <ul>
            <li>Маленькая сумка</li>
            <li>Ноутбук или планшет</li>
            <li>Сумка для коляски ребёнка</li>
          </ul>
          <p>Этот личный предмет обычно должен помещаться под кресло перед вами и иметь размеры около 40 см x 30 см x 15 см. Убедитесь, что проверили политику авиакомпании для соблюдения всех ограничений.</p>
  
          <h3>5. Полезные Советы</h3>
          <ul>
            <li><strong>Проверьте Политику Авиакомпании:</strong> Каждая компания имеет свои собственные правила. Убедитесь, что вы их знаете перед вылетом.</li>
            <li><strong>Измерьте Вашу Поклажу:</strong> Используйте измерительную ленту, чтобы проверить размеры вашего багажа. Лучше быть уверенным, чем столкнуться с неприятными сюрпризами в аэропорту.</li>
            <li><strong>Держите Важные Документы Под Рук:</strong> Убедитесь, что такие документы, как паспорт и авиабилеты, находятся в ручной поклаже.</li>
            <li><strong>Упаковывайте Эффективно:</strong> Используйте методы упаковки для максимального использования пространства в ручной поклаже.</li>
          </ul>
  
          <h3>6. Заключение</h3>
          <p>Размеры ручной поклажи — важный аспект планирования путешествия на самолёте. Соблюдение этих требований поможет избежать проблем в аэропорту и сделает путешествие более комфортным. Убедитесь, что вы проверили политику ручной поклажи вашей авиакомпании и подготовьтесь заранее для приятного путешествия.</p>
        </div>
      )
    },
    img: dimensions
  },   
  {
    header: {
      ro: 'Diferența dintre Bagajul de Mână și Bagajul de Călă',
      ru: 'Разница между ручной кладью и багажом для сдачи',
    },
    title: {
      ro: 'Află Ce Este Mai Potrivit pentru Călătoria Ta',
      ru: 'Узнай, что лучше для твоего путешествия',
    },
    shortText: {
      ro: 'Înțelegerea diferențelor dintre bagajul de mână și bagajul de călă este esențială pentru o experiență de zbor fără probleme. Descoperă principalele distincții pentru a-ți organiza călătoria eficient.',
      ru: 'Понимание различий между ручной кладью и сдаваемым багажом важно для комфортного полета. Узнай основные различия, чтобы лучше организовать свое путешествие.',
    },
    content: {
      ro: (
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
      ru: (
        <div>
          <p>Когда вы путешествуете на самолете, важно понять различия между ручной кладью и сдаваемым багажом, так как это может повлиять на ваш полет и организацию путешествия. В этой статье мы рассмотрим основные различия между этими двумя типами багажа.</p>
    
          <h3>1. Определение и использование</h3>
          <ul>
            <li><strong>Ручная кладь:</strong> Этот тип багажа разрешен на борту самолета и должен соответствовать определенным размерам и весу, установленным авиакомпанией. Ручная кладь идеально подходит для необходимых и ценных вещей, таких как документы, электроника, косметика и одежда, которые могут понадобиться во время полета.</li>
            <li><strong>Сдаваемый багаж:</strong> Этот багаж сдается на регистрации и транспортируется в грузовом отсеке самолета. Он предназначен для более крупных и тяжелых вещей, которые не могут быть помещены в салон. Сдаваемый багаж полезен для более длительных поездок, когда необходимо взять больше вещей.</li>
          </ul>
    
          <h3>2. Размеры и вес</h3>
          <ul>
            <li><strong>Ручная кладь:</strong> Обычно максимальные размеры ручной клади составляют от 55 см до 56 см в длину, 35 см в ширину и 20 см в высоту. Максимальный вес часто варьируется от 7 кг до 10 кг, но эти значения могут различаться в зависимости от авиакомпании.</li>
            <li><strong>Сдаваемый багаж:</strong> Размеры и вес сдаваемого багажа обычно больше. Большинство авиакомпаний разрешают сдаваемый багаж весом до 20 кг или 23 кг, а общие размеры (длина + ширина + высота) могут достигать 158 см. Важно проверить политику конкретной авиакомпании.</li>
          </ul>
    
          <h3>3. Стоимость</h3>
          <ul>
            <li><strong>Ручная кладь:</strong> В большинстве случаев ручная кладь включена в стоимость билета, но некоторые бюджетные авиакомпании могут взимать дополнительную плату за перевес ручной клади, превышающий установленные ограничения.</li>
            <li><strong>Сдаваемый багаж:</strong> Стоимость сдаваемого багажа значительно варьируется. У бюджетных авиакомпаний тарифы могут начинаться с 10-20 евро за багаж весом 20 кг, но могут достигать 50 евро и более в зависимости от времени бронирования. Традиционные авиакомпании могут включать сдаваемый багаж в стоимость билета, но могут быть дополнительные сборы за перевес.</li>
          </ul>
    
          <h3>4. Доступность</h3>
          <ul>
            <li><strong>Ручная кладь:</strong> Этот тип багажа доступен на протяжении всего полета, поэтому вы можете быстро получить доступ к необходимым вещам, таким как книги, электронные устройства или другие важные предметы.</li>
            <li><strong>Сдаваемый багаж:</strong> После сдачи багажа вы не сможете получить к нему доступ до прибытия в пункт назначения. Это может стать проблемой, если вам нужно что-то из багажа во время полета.</li>
          </ul>
    
          <h3>5. Правила и ограничения</h3>
          <ul>
            <li><strong>Ручная кладь:</strong> Существуют строгие ограничения на жидкости, опасные вещества и острые предметы. Обычно жидкости должны быть в контейнерах объемом не более 100 мл, а общий объем не должен превышать 1 литра.</li>
            <li><strong>Сдаваемый багаж:</strong> Для сдаваемого багажа правила менее строгие, но важно соблюдать ограничения по транспортировке запрещенных или опасных веществ.</li>
          </ul>
    
          <h3>6. Заключение</h3>
          <p>В заключение, выбор между ручной кладью и сдаваемым багажом зависит от ваших личных потребностей, длительности путешествия и предметов, которые вы планируете взять с собой. Понимание различий между этими двумя типами багажа поможет вам лучше спланировать путешествие, избежать неприятных сюрпризов в аэропорту и наслаждаться более комфортным полетом.</p>
        </div>
      ),
    },
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
