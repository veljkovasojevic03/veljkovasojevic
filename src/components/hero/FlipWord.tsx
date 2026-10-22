"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DURATION_MS, EASE_OUT_CSS, STAGGER_MS } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useMediaQuery";

/** Koliko dugo jedna reč stoji. */
const HOLD_MS = 2600;
/** Ugao preklapanja slova (flip oko X ose). */
const FLIP_DEG = 85;

type Props = {
  words: readonly string[];
};

function letters(word: string) {
  return Array.from(word);
}

/**
 * Reč koja se menja (logika iz design/stil-poredjenje.html).
 * Slova se preklope jedno za drugim; širina se pomera ka sledećoj reči,
 * pa ostatak rečenice ne skače. Čitač ekrana čuje celu rečenicu iz roditelja,
 * a ovaj deo je aria-hidden.
 */
export function FlipWord({ words }: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Povećava se kad smena preskoči krug (reč van ekrana), da se tajmer ponovo pokrene.
  const [tick, setTick] = useState(0);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const firstRender = useRef(true);
  const visible = useRef(true);

  /** Meri širinu reči istim fontom, sa istim prelomom na slova. */
  const widthOf = useCallback(
    (word: string) => {
      const measure = measureRef.current;
      if (!measure) return 0;
      measure.textContent = "";
      for (const char of letters(word)) {
        const span = document.createElement("span");
        span.className = "inline-block whitespace-pre";
        span.textContent = char;
        measure.appendChild(span);
      }
      const width = Math.ceil(measure.getBoundingClientRect().width) + 2;
      measure.textContent = "";
      return width;
    },
    [],
  );

  const setWidth = useCallback(
    (word: string, animate: boolean) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      wrap.style.transition = animate
        ? `width ${DURATION_MS.medium}ms ${EASE_OUT_CSS}`
        : "none";
      wrap.style.width = `${widthOf(word)}px`;
    },
    [widthOf],
  );

  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Početna širina: tek kad se font učita, i ponovo pri promeni veličine.
  useEffect(() => {
    const sync = () => setWidth(words[indexRef.current], false);
    document.fonts.ready.then(sync);
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [words, setWidth]);

  // Pauza kad reč nije na ekranu.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // Smena reči.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let cancelled = false;

    const timer = window.setTimeout(async () => {
      if (!visible.current || document.hidden) {
        setTick((t) => t + 1);
        return;
      }
      const next = (index + 1) % words.length;

      const outgoing = reduce
        ? [
            wrap.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: DURATION_MS.fast,
              easing: EASE_OUT_CSS,
              fill: "forwards",
            }),
          ]
        : Array.from(wrap.children).map((el, i) =>
            el.animate(
              [
                { transform: "rotateX(0deg)", opacity: 1 },
                { transform: `rotateX(${FLIP_DEG}deg)`, opacity: 0 },
              ],
              {
                duration: DURATION_MS.fast,
                delay: i * (STAGGER_MS / 2),
                easing: EASE_OUT_CSS,
                fill: "forwards",
              },
            ),
          );

      await Promise.all(outgoing.map((a) => a.finished.catch(() => undefined)));
      if (!cancelled) setIndex(next);
    }, HOLD_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [index, tick, words, reduce, setWidth]);

  // Ulazak nove reči.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    wrap.getAnimations().forEach((a) => a.cancel());
    // Širina se menja tek sada: dok stara reč izlazi, ne sme da se odseče.
    setWidth(words[index], !reduce);

    if (reduce) {
      wrap.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: DURATION_MS.fast,
        easing: EASE_OUT_CSS,
      });
      return;
    }
    Array.from(wrap.children).forEach((el, i) => {
      el.animate(
        [
          { transform: `rotateX(-${FLIP_DEG}deg)`, opacity: 0 },
          { transform: "rotateX(0deg)", opacity: 1 },
        ],
        {
          duration: DURATION_MS.medium,
          delay: i * STAGGER_MS,
          easing: EASE_OUT_CSS,
          fill: "backwards",
        },
      );
    });
  }, [index, words, reduce, setWidth]);

  return (
    <>
      <span
        ref={wrapRef}
        aria-hidden="true"
        className="inline-block align-bottom whitespace-nowrap text-energy [clip-path:inset(-0.4em_-0.05em_-0.4em_-0.2em)] [perspective:700px]"
      >
        {letters(words[index]).map((char, i) => (
          <span
            key={`${index}-${i}`}
            className="inline-block whitespace-pre [backface-visibility:hidden] [transform-origin:50%_60%_-0.3em]"
          >
            {char}
          </span>
        ))}
      </span>
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre"
      />
    </>
  );
}
