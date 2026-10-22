/**
 * VV znak (privremeni, iz design/stil-poredjenje.html).
 * Drugo V je pomereno za 54 jedinice i u boji struje; "rez" u boji pozadine
 * oko drugog V daje utisak preplitanja. Konačan oblik se dorađuje u fazi 3.
 */
const V1 = "M0 0H26L55 92L84 0H110L68 140H42Z";
const V2 = "M54 0H80L109 92L138 0H164L122 140H96Z";

type Props = {
  className?: string;
};

export function VVMark({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="-4 -4 172 148"
      aria-hidden="true"
      focusable="false"
    >
      <path d={V1} fill="var(--text)" />
      <path
        d={V2}
        fill="none"
        stroke="var(--bg)"
        strokeWidth={9}
        strokeLinejoin="miter"
      />
      <path d={V2} fill="var(--energy)" />
    </svg>
  );
}
