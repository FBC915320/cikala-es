type Feature = {
  title: string;
  text: string;
};

type FeatureGridProps = {
  items: Feature[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
          <p className="mt-3 text-sm leading-6 text-ink/70">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
