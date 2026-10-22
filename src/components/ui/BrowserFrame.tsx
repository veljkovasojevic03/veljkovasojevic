type Props = {
  children: React.ReactNode;
  className?: string;
  /** Odnos stranica sadržaja ispod trake sa tačkicama. */
  aspect?: string;
};

/** Minimalni okvir prozora: zaobljen, tanka ivica, tri tačkice, blag sjaj. */
export function BrowserFrame({ children, className, aspect = "16 / 10" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-line-2 bg-bg-2 shadow-glow-frame ${className ?? ""}`}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-line px-3.5" aria-hidden="true">
        <span className="size-2 rounded-full bg-line-2" />
        <span className="size-2 rounded-full bg-line-2" />
        <span className="size-2 rounded-full bg-line-2" />
      </div>
      <div className="relative" style={{ aspectRatio: aspect }}>
        {children}
      </div>
    </div>
  );
}

/** Privremeni kadar dok pravi medij ne stigne. */
export function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`placeholder absolute inset-0 ${className ?? ""}`}>
      <span className="mono px-4 text-center text-muted">{label}</span>
    </div>
  );
}
