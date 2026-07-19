import { Trophy } from "lucide-react";
export default function AwardCard({ award }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-[color-mix(in_srgb,var(--accent)_3%,var(--background))] ">
      <div className="aspect-[2/1] relative bg-[var(--muted)]">
        <img
          src={award.image}
          alt={award.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_68%,transparent)]">
          <Trophy size={32} className="text-white" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[var(--accent)] font-bold tracking-[0.06em] uppercase ">
            {award.year}
          </span>
        </div>
        <h4 className="text-[13px] font-semibold text-[var(--foreground)] leading-[1.4] mb-1.5 ">
          {award.title}
        </h4>
        <p className="text-xs text-[var(--muted-foreground)] leading-[1.5] font-[var(--font-family-body)] text-justify">
          {award.description}
        </p>
      </div>
    </div>
  );
}
