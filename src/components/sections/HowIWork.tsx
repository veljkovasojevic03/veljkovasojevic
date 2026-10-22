import type { Locale } from "@/i18n/routing";
import { howIWork } from "@/content/site";

/** Kako radim: naslov, tri koraka, veštine u dve kolone. */
export function HowIWork({ locale }: { locale: Locale }) {
  const columns = [howIWork.skills.solo, howIWork.skills.withAi];

  return (
    <section aria-labelledby="how-title" className="border-b border-line py-(--section-y)">
      <div className="wrap">
        <h2 id="how-title" className="display max-w-[14ch] text-h2">
          {howIWork.title[locale]}
        </h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {howIWork.steps[locale].map((step, i) => (
            <li key={step.title} className="border-t border-line pt-6">
              <span className="mono text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-4 text-[clamp(22px,2.2vw,28px)] leading-[1.15]">
                {step.title}
              </h3>
              <p className="mt-3 text-small leading-[1.7] text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-xl border border-line-2 bg-bg-2 p-6 sm:p-10">
          <h3 className="mono uppercase text-muted">{howIWork.skillsTitle[locale]}</h3>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {columns.map((column) => (
              <div key={column.label.en}>
                <h4 className="mono uppercase text-muted">{column.label[locale]}</h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {column.items[locale].map((skill) => (
                    <li
                      key={skill}
                      className="rounded-pill border border-line-2 px-4 py-2 text-[15px] font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
