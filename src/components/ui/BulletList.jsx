export default function BulletList({ items }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <span key={item}>• {item}</span>
      ))}
    </div>
  );
}
