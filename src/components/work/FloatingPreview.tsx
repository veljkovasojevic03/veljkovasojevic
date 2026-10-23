"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
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

type Options = { enabled: boolean; reduce: boolean };

export type PreviewState = ReturnType<typeof useFloatingPreview>;

/**
 * Stanje pregleda koji pluta uz kursor. Mišem: prati kursor oprugom, uvek sa one
 * strane kursora gde ima mesta. Tastaturom (i uz smanjen pokret): stoji iznad reda.
 */
export function useFloatingPreview({ enabled, reduce }: Options) {
  const [active, setActive] = useState<ProjectSlug | null>(null);
  const [visible, setVisible] = useState(false);
  const x = useSpring(0, springFloat);
  const y = useSpring(0, springFloat);
  const shown = useRef(false);
  const anchor = useRef<HTMLElement | null>(null);

  const place = (tx: number, ty: number) => {
    // Prvo pojavljivanje i smanjen pokret: bez preletanja preko ekrana.
    if (!shown.current || reduce) {
      x.jump(tx);
      y.jump(ty);
    } else {
      x.set(tx);
      y.set(ty);
    }
  };

  const placeAtCursor = (cx: number, cy: number) => {
    const tx = cx > window.innerWidth / 2 ? cx - W - GAP : cx + GAP;
    const ty = Math.min(Math.max(cy - H / 2, EDGE), window.innerHeight - H - EDGE);
    place(tx, ty);
  };

  const placeAtRow = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const above = rect.top - H - EDGE;
    place(rect.right - W, above >= EDGE ? above : rect.bottom + EDGE);
  };

  const reveal = (slug: ProjectSlug) => {
    shown.current = true;
    setActive(slug);
    setVisible(true);
  };

  // Pregled vezan za red (tastatura) prati red pri skrolu.
  useEffect(() => {
    if (!visible) return;
    const onScroll = () => {
      if (anchor.current) placeAtRow(anchor.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return {
    active,
    visible: enabled && visible,
    x,
    y,
    reduce,
    show(slug: ProjectSlug, e: PointerEvent<HTMLElement>) {
      if (!enabled || e.pointerType !== "mouse") return;
      if (reduce) {
        anchor.current = e.currentTarget;
        placeAtRow(e.currentTarget);
      } else {
        anchor.current = null;
        placeAtCursor(e.clientX, e.clientY);
      }
      reveal(slug);
    },
    showAt(slug: ProjectSlug, el: HTMLElement) {
      // Samo fokus tastaturom; klik mišem već ima pregled uz kursor.
      if (!enabled || !el.matches(":focus-visible")) return;
      anchor.current = el;
      placeAtRow(el);
      reveal(slug);
    },
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (!enabled || reduce || e.pointerType !== "mouse" || !shown.current) return;
      anchor.current = null;
      placeAtCursor(e.clientX, e.clientY);
    },
    hide() {
      shown.current = false;
      anchor.current = null;
      setVisible(false);
    },
  };
}

type Props = {
  items: WorkItem[];
  label: string;
  placeholder: string;
  state: PreviewState;
};

/** Video pregled iznad liste (ukras; isti sadržaj je u redu i u popupu). */
export function FloatingPreview({ items, label, placeholder, state }: Props) {
  const { active, visible, x, y, reduce } = state;
  const transform = useTranslate(x, y);

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
          const on = item.slug === active;
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

/** Pun transform string (hardverski ubrzan), ne x/y prečice. */
function useTranslate(x: MotionValue<number>, y: MotionValue<number>) {
  return useTransform(() => `translate3d(${x.get()}px, ${y.get()}px, 0)`);
}
