# Objašnjenja za intervju

> Ne ide na sajt. Ovo je podsetnik: za svaku tehničku rečenicu iz `projekti-nacrt.md` stoji kako da je
> objasniš svojim rečima u 2–3 rečenice, plus pitanje koje bi neko mogao da postavi posle toga.
> Ako nešto od ovoga ne možeš da izgovoriš bez gledanja, javi pa da se ta rečenica na sajtu uprosti.

## Autoservis Tole

**Admin PIN se proverava u bazi, ne samo u aplikaciji**
Kad bi provera bila samo u interfejsu, neko ko zna da pošalje zahtev direktno ka Supabase-u mogao bi da obriše popravku bez PIN-a. Zato su zaštićene radnje napravljene kao funkcije u samoj bazi (RPC) koje prvo proveravaju PIN. U bazi se čuva samo heš PIN-a, ne sam PIN, a posle 5 promašaja funkcija odbija pokušaje 5 minuta.
*Moguće pitanje:* „Zašto heš?“ → Da ni onaj ko vidi bazu ne vidi PIN.

**Namerno bez automatskog skidanja iz magacina**
Vlasnik ponekad doda deo u popravku pa ga zameni, ili deo kupi usput. Automatsko skidanje bi pravilo pogrešno stanje koje niko ne bi primetio. Odluka je doneta u razgovoru sa vlasnikom.

## Fanout AI

**Sample mod**
Bez API ključa ili kad se potroši dnevni limit, server šalje unapred napisan tekst reč po reč, istim putem kao pravi AI odgovor. Interfejs ne zna razliku osim po oznaci „Sample“. Tako javni demo radi bez troška i ne može da potroši budžet.

**Kvote u jednoj transakciji**
Problem je „trka“: dva zahteva u istom trenutku oba pročitaju „ostala je 1 generacija“ i oba prođu. Rešenje je da provera i umanjenje budu jedna SQL naredba (`UPDATE … WHERE generations < limit`) unutar jedne transakcije, pa baza sama pusti samo jedan.
*Moguće pitanje:* „Šta je transakcija?“ → Niz koraka u bazi koji se izvrši ceo ili nikako.

**Izmene se crtaju jednom po frejmu**
Pet tekstova stiže paralelno, deo po deo. Kad bi React ponovo crtao ekran na svaki stigli deo, to bi bile stotine crtanja u sekundi. Zato se pristigli delovi skupljaju i ekran se osveži najviše jednom po frejmu (`requestAnimationFrame`).

**Potpisani zahtevi sa n8n-om**
Aplikacija i n8n dele tajni ključ. Svaki zahtev nosi potpis izračunat iz tog ključa i vremena slanja (HMAC). Primalac izračuna isto i uporedi; ako se ne slaže ili je zahtev star, odbija ga. Tako niko spolja ne može da glumi aplikaciju.

## Relay AI

**Shadow DOM**
Widget živi u „zatvorenoj kutiji“ unutar stranice: CSS sajta ne utiče na widget, a CSS widgeta ne kvari sajt. Zato vlasnik može da ga nalepi bilo gde jednom linijom.

**Pretraga razume značenje**
Svako FAQ pitanje se pretvori u niz brojeva (embedding) koji opisuje njegovo značenje. Pitanje posetioca se pretvori isto, pa se traže najsličniji nizovi. Uz to ide i obična pretraga po rečima, jer je model engleski i na srpskom slabije razume značenje.
*Moguće pitanje:* „Zašto ne pravi AI odgovor?“ → Košta po upitu; projekat mora da radi za 0, a tačan FAQ tekst ne može da izmisli ništa.

**Realtime sa rezervom**
Inbox i widget dobijaju nove poruke preko Supabase Realtime-a (websocket). Neke mreže blokiraju websockete, pa widget tada na svakih 5 sekundi sam pita server ima li novih poruka.

## CineSpire

**Controller sloj**
U Laravelu kontroler prima zahtev, proverava podatke (validacija), radi sa modelima i vraća prikaz. Dakle tu je logika: recenzije, liste, praćenje, admin.

**TMDB uvoz**
Admin kontroler pošalje upit TMDB API-ju sa nazivom, prikaže rezultate, a izabrani film povuče detalje i popuni formu. Admin ispravi šta treba i sačuva u našu bazu.

**Prosečna ocena**
Posle svake nove, izmenjene ili obrisane recenzije ponovo se izračuna prosek i broj ocena i upiše u film ili seriju, da se prosek ne bi računao pri svakom prikazu.

**Middleware za admina**
Sloj koji se izvrši pre kontrolera i propusti samo korisnika sa ulogom admin.

## SeniorGuard

**Pad na samom uređaju**
Ukupno ubrzanje se računa iz tri ose akcelerometra; ako pređe 2,5 g, to je pad. Odluka se donosi na ESP32, a ne u oblaku, jer bi slanje pa čekanje odgovora kasnilo, a bez interneta ne bi radilo.
*Moguće pitanje:* „Lažni alarmi?“ → Prag je kompromis; nagli pokreti ga mogu preći. Poboljšanje bi bila provera nepokretnosti posle udara.

**Zašto ESP32**
Ugrađen Wi-Fi i dovoljno memorije za šifrovanu (TLS) vezu sa Firebase-om, pa uređaju ne treba telefon kao posrednik.

**Oporavak firmvera**
Ako Wi-Fi pukne, firmver sam pokušava ponovo da se poveže, a periodični restart čisti stanje u kom bi uređaj mogao da „zaglavi“.
