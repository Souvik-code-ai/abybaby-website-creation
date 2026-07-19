export default function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[var(--accent)]" />
      <span className="text-xs font-bold text-[var(--foreground)] tracking-[0.06em] uppercase ">
        {label}
      </span>
    </div>
  );
}
