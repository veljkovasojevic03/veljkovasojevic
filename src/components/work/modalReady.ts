"use client";

import { createContext, useContext } from "react";

/**
 * false dok popup ulazi: video čeka kraj animacije, pa se okvir sa posterom
 * pomera bez trzanja. Van popupa (puna stranica) je uvek true.
 */
export const ModalReadyContext = createContext(true);

export function useModalReady(): boolean {
  return useContext(ModalReadyContext);
}
