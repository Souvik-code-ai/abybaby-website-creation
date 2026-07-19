export default function ClauseCard({ label, children }) {
  return (
    <div className="rounded-xl p-3 mb-2 last:mb-0">
      {label && (
        <div className="text-[11px] font-semibold text-[#579F63] mb-1 uppercase tracking-[0.04em]">
          {label}
        </div>
      )}
      <div className="text-xs text-[color:var(--muted-foreground)] leading-[1.65]">
        {children}
      </div>
    </div>
  );
}
