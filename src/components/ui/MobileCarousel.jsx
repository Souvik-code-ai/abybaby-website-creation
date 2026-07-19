import StoryCircle from "./StoryCircle";
export default function MobileCarousel({ clients, onStoryClick, onDismiss }) {
  return (
    <div className="flex gap-4 py-4 overflow-x-auto px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
      {clients.map((client) => (
        <StoryCircle
          key={client.id}
          client={client}
          onClick={() => onStoryClick(client)}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
