"use client";

import { useEffect, useRef, type RefObject } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import type { ProjectSlug } from "@/content/projects";
import { motionTransition, springFloat } from "@/lib/motion";
import { VideoFrame } from "./VideoFrame";
import type { WorkItem } from "./WorkRows";

/** Širina pregleda; visina = traka sa tačkicama + 16:9 + ivice. */
const W = 360;
const H = Math.round((W * 9) / 16) + 34;
/** Razmak od kursora i ivica ekrana. */
const GAP = 24;
const EDGE = 12;

/** Stanje koje drži lista; ova komponenta samo crta i pomera pregled. */
export type PreviewState = {
  slug: ProjectSlug | null;
  visible: boolean;
  /** Red uz koji pregled stoji (tastatura, smanjen pokret); null = prati kursor. */
  anchor: HTMLElement | null;
  /** Gde je kursor bio kad se pregled pojavio. */
  at: { x: number; y: number } | null;
};

type Props = {
  items: WorkItem[];
  label: string;
  placeholder: string;
  state: PreviewState;
  reduce: boolean;
  listRef: RefObject<HTMLElement | null>;
};

function cursorTarget(cx: number, cy: number) {
  // Uvek sa one strane kursora gde ima mesta.
  const x = cx > window.innerWidth / 2 ? cx - W - GAP : cx + GAP;
  const y = Math.min(Math.max(cy - H / 2, EDGE), window.innerHeight - H - EDGE);
  return { x, y };
}

function rowTarget(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const above = rect.top - H - EDGE;
  return { x: rect.right - W, y: above >= EDGE ? above : rect.bottom + EDGE };
}

/**
 * Video pregled koji pluta uz kursor (oprugom) ili stoji iznad reda (tastatura,
 * smanjen pokret). Ukras: isti sadržaj je u redu i u popupu. Učitava se posebno,
 * samo na računaru sa mišem, pa telefon ne preuzima Motion.
 */
export function FloatingPreview({ items, label, placeholder, state, reduce, listRef }: Props) {
  const x = useSpring(0, springFloat);
  const y = useSpring(0, springFloat);
  // Pun transform string (hardverski ubrzan), ne x/y prečice.
  const transform = useTransform(() => `translate3d(${x.get()}px, ${y.get()}px, 0)`);
  const shown = useRef(false);
  const { slug, visible, anchor, at } = state;

  const place = (target: { x: number; y: number }, instant: boolean) => {
    if (instant) {
      x.jump(target.x);
      y.jump(target.y);
    } else {
      x.set(target.x);
      y.set(target.y);
    }
  };

  // Pojavljivanje i promena reda: prvi put bez preletanja preko ekrana.
  useEffect(() => {
    if (!visible) {
      shown.current = false;
      return;
    }
    const target = anchor ? rowTarget(anchor) : at ? cursorTarget(at.x, at.y) : null;
    if (target) place(target, !shown.current || reduce);
    shown.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- place koristi stabilne opruge
  }, [visible, anchor, at, slug, reduce]);

  // Uz kursor: prati pomeranje miša preko liste.
  useEffect(() => {
    const list = listRef.current;
    if (!visible || anchor || reduce || !list) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") place(cursorTarget(e.clientX, e.clientY), false);
    };
    list.addEventListener("pointermove", onMove);
    return () => list.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- place koristi stabilne opruge
  }, [visible, anchor, reduce, listRef]);

  // Uz red: prati red pri skrolu.
  useEffect(() => {
    if (!visible || !anchor) return;
    const onScroll = () => place(rowTarget(anchor), true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- place koristi stabilne opruge
  }, [visible, anchor]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40"
      style={{ transform, width: W, height: H }}
    >
      <motion.div
        className="relative size-full"
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          transform: visible || reduce ? "scale(1)" : "scale(0.94)",
        }}
        transition={motionTransition.fast}
      >
        {items.map((item) => {
          const on = item.slug === slug;
          return (
            <div
              key={item.slug}
              className="absolute inset-0 transition-opacity duration-(--dur-fast) ease-out"
              style={{ opacity: on ? 1 : 0 }}
            >
              <VideoFrame
                sources={item.sources}
                frame={item.frame}
                placeholder={placeholder}
                playing={visible && on && !reduce}
                sizes={`${W}px`}
              />
            </div>
          );
        })}
        <span className="tag tag-hot absolute bottom-3 left-3 bg-bg/80 backdrop-blur-sm">{label}</span>
      </motion.div>
    </motion.div>
  );
}
