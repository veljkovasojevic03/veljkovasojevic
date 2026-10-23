import { V1, V2, VV_GAP, VV_VIEWBOX_ATTR } from "./vvGeometry";

/**
 * VV znak: prvo V u boji teksta, drugo u boji struje, sa rezom u boji
 * pozadine oko drugog V (utisak preplitanja). Privremena geometrija dok
 * Claude Design ne pošalje konačan oblik.
 */
type Props = {
  className?: string;
  /** Za GSAP Flip u uvodu (cilj na koji znak sleće). */
  "data-vv-target"?: boolean;
};

export function VVMark({ className, ...rest }: Props) {
  return (
    <svg
      className={className}
      viewBox={VV_VIEWBOX_ATTR}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={V1} fill="var(--text)" />
      <path d={V2} fill="none" stroke="var(--bg)" strokeWidth={VV_GAP} strokeLinejoin="miter" />
      <path d={V2} fill="var(--energy)" />
    </svg>
  );
}
