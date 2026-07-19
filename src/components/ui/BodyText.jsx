export default function BodyText({ children }) {
  return (
    <p className="text-xs text-[color:var(--muted-foreground)] leading-[1.7] m-0 mb-2">
      {children}
    </p>
  );
}
