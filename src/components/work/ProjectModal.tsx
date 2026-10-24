"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/lib/motion";
import { startScroll, stopScroll } from "@/lib/smoothScroll";
import { restoreFocus } from "@/lib/returnFocus";
import { useMediaQuery, useReducedMotion } from "@/lib/useMediaQuery";
import { ModalReadyContext } from "./modalReady";

type Props = {
  closeLabel: string;
  children: React.ReactNode;
};

/**
 * Popup projekta (presretnuta ruta /radovi/<slug>). Zatvaranje (dugme, Escape,
 * klik van) prvo odigra izlaz, pa vrati adresu sa router.back(); „Nazad“ u
 * browseru zatvara popup sam, jer ruta prestaje da postoji.
 */
export function ProjectModal({ closeLabel, children }: Props) {
  const router = useRouter();
  // Next.js čuva prethodnu rutu skrivenu u <Activity>: efekat se pokreće svaki put
  // kad popup postane vidljiv, a čisti kad se sakrije, pa se stanje tu vraća na početak.
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [ready, setReady] = useState(false);
  const closingRef = useRef(false);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // Lenis ne sme da vrti stranicu ispod popupa.
    stopScroll();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- prikaz prati vidljivost <Activity>
    setVisible(true);
    return () => {
      // Sakriven bez zatvaranja iz popupa = „Nazad“ u browseru; fokus nazad na red.
      if (!closingRef.current) requestAnimationFrame(restoreFocus);
      startScroll();
      closingRef.current = false;
      setVisible(false);
      setClosing(false);
      setReady(false);
    };
  }, []);

  const close = () => {
    closingRef.current = true;
    setClosing(true);
  };

  const open = visible && !closing;

  // Na računaru panel blago izraste, na telefonu (ceo ekran) uđe odozdo.
  // Pomera se samo okvir; video je unutra i ne menja veličinu.
  // Obe krajnje vrednosti imaju iste funkcije, da Motion interpolira broj po broj.
  const [from, to] = wide
    ? ["translateY(12px) scale(0.98)", "translateY(0px) scale(1)"]
    : ["translateY(32px)", "translateY(0px)"];
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, transform: from };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, transform: to };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && close()}>
      <AnimatePresence
        onExitComplete={() => {
          // Samo posle zatvaranja iz popupa; „Nazad“ u browseru je adresu već vratio.
          if (!closingRef.current) return;
          router.back();
          restoreFocus();
        }}
      >
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                // Lenis inače guta točkić; ovde skroluje sam popup.
                data-lenis-prevent
                className="fixed inset-0 z-80 overflow-y-auto overscroll-contain bg-bg/80 backdrop-blur-sm md:px-6 md:py-[6vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: motionTransition.fast }}
                transition={motionTransition.medium}
              >
                <Dialog.Content
                  forceMount
                  asChild
                  aria-describedby={undefined}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <motion.div
                    className="relative mx-auto min-h-full w-full bg-bg outline-none md:min-h-0 md:max-w-[960px] lg:max-w-[1200px] md:rounded-xl md:border md:border-line-2 md:bg-bg-2 md:shadow-glow-frame"
                    initial={hidden}
                    animate={shown}
                    exit={{ ...hidden, transition: motionTransition.fast }}
                    transition={motionTransition.medium}
                    onAnimationComplete={() => setReady(true)}
                  >
                    <div className="sticky top-0 z-10 flex justify-end bg-bg/80 p-3 backdrop-blur-md md:bg-transparent md:p-4 md:backdrop-blur-none">
                      <Dialog.Close className="btn btn-ghost btn-sm bg-bg/80 backdrop-blur-sm">
                        {closeLabel}
                        <span aria-hidden="true">✕</span>
                      </Dialog.Close>
                    </div>
                    <div className="px-(--gutter) pb-16 md:-mt-6 md:px-12 md:pb-14">
                      <ModalReadyContext value={ready}>{children}</ModalReadyContext>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Naslov popupa; Radix ga vezuje za aria-labelledby. */
export function ModalTitle({
  className,
  translate,
  children,
}: {
  className?: string;
  /** "no" za vlastita imena (ime projekta). */
  translate?: "yes" | "no";
  children: React.ReactNode;
}) {
  return (
    <Dialog.Title asChild>
      <h2 className={className} translate={translate}>
        {children}
      </h2>
    </Dialog.Title>
  );
}
