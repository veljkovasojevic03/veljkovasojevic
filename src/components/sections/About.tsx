import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { about, sectionIds, ui } from "@/content/site";
import { imageSource } from "@/lib/media";
import { Placeholder } from "@/components/ui/BrowserFrame";
import { Rich } from "@/components/ui/Rich";
import { VVMark } from "@/components/brand/VVMark";
import { FlipCard } from "@/components/about/FlipCard";
import { CircularText } from "@/components/about/CircularText";

/** O meni: kartica koja se okreće (fotografija / lična karta) i tri pasusa. */
export function About({ locale }: { locale: Locale }) {
  const photo = imageSource("veljko");
  const card = about.card;

  const front = (
    <>
      {photo ? (
        <Image
          src={photo}
          alt={ui.photoAlt[locale]}
          fill
          sizes="(min-width: 768px) 440px, 100vw"
          className="object-cover"
        />
      ) : (
        <Placeholder label={ui.placeholders.photo[locale]} />
      )}
      <FlipHint />
      <CircularText
        text={card.ring[locale]}
        className="absolute right-[6%] bottom-[5%] w-[30%] max-w-[136px] min-w-[96px]"
      />
    </>
  );

  const back = (
    <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
      <div aria-hidden="true" className="hero-dots absolute inset-0" />
      <VVMark className="relative w-14" cut="var(--bg-2)" />
      <div className="relative">
        <p className="display text-[clamp(28px,3.4vw,40px)] leading-[1.05]">{card.name[locale]}</p>
        <ul className="mt-5 grid gap-1.5 text-small text-muted">
          <li>{card.degree[locale]}</li>
          <li>{card.school[locale]}</li>
          <li>{card.place[locale]}</li>
        </ul>
        <p className="mt-6 inline-flex items-center gap-2 text-small font-medium">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent shadow-glow-accent" />
          {card.status[locale]}
        </p>
      </div>
    </div>
  );

  return (
    <section
      id={sectionIds.about}
      aria-labelledby="about-title"
      className="border-b border-line py-(--section-y)"
    >
      <div className="wrap">
        <h2 id="about-title" className="eyebrow">
          {about.title[locale]}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 lg:items-center">
          <FlipCard
            front={front}
            back={back}
            label={ui.flipCard[locale]}
            className="mx-auto aspect-4/5 w-full max-w-[440px]"
          />

          <div className="grid max-w-[60ch] gap-6 text-lede leading-[1.7] text-muted">
            {about.paragraphs[locale].map((paragraph, i) => (
              <p key={i}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
        </div>

        {/* Mesto za opcioni 3D sto (faza 11, samo na Veljkov zahtev). Bez koda. */}
      </div>
    </section>
  );
}

/** Mala ikona okretanja u uglu (ukras; dugme ima svoj naziv). */
function FlipHint() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-4 right-4 grid size-9 place-items-center rounded-full border border-line-2 bg-bg/70 text-muted backdrop-blur-sm"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 12a8 8 0 1 1-2.34-5.66" strokeLinecap="round" />
        <path d="M20 4v4h-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
