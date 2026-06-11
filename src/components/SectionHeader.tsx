type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export function SectionHeader({ eyebrow, title, intro }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.12em] text-clay">{eyebrow}</p> : null}
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">{title}</h1>
      {intro ? <p className="mt-5 text-lg leading-8 text-ink/70">{intro}</p> : null}
    </div>
  );
}
