import type { RichText } from "@/content/types";

/** Tekst sa istaknutim delovima iz src/content. */
export function Rich({ text }: { text: RichText }) {
  return text.map((segment, i) =>
    typeof segment === "string" ? (
      segment
    ) : (
      <strong key={i} className="font-semibold text-text">
        {segment.strong}
      </strong>
    ),
  );
}
