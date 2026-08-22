import { ExternalLink } from "lucide-react";
export default function CaseStudyCard({ caseStudy }) {
  return (
    <div className="rounded-2xl overflow-hidden ">
      <div className="aspect-video relative bg-[var(--muted)]">
        <img
          src={caseStudy.thumbnail}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,transparent_50%)]" />
      </div>
      <div className="pt-3 pb-4 px-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden w-6 h-6 text-[9px] font-bold ">
            <img src={caseStudy.clientlogo} alt={caseStudy.clientName} loading="lazy" />
          </div>
          <span className="text-[11px] text-[var(--muted-foreground)] font-[var(--font-family-body)]">
            {caseStudy.clientName}
          </span>
        </div>
        <h4 className="text-[13px] font-semibold text-[var(--foreground)] leading-[1.4] mb-1.5 ">
          {caseStudy.title}
        </h4>
        <p className="text-xs text-[var(--muted-foreground)] leading-[1.5] mb-3 font-[var(--font-family-body)] text-justify">
          {caseStudy.summary}
        </p>
      </div>
    </div>
  );
}
