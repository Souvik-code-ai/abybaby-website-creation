export default function InfoCard({ icon, label, children }) {
  return (
    <div className="rounded-xl p-3 mb-2 last:mb-0">
      <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-[color:var(--foreground)]">
        <span className="text-[#579F63]">{icon}</span>
        {label}
      </div>
      <div className="text-xs text-[color:var(--muted-foreground)] leading-[1.65]">
        {children}
      </div>
    </div>
  );
}
