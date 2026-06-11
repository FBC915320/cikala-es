import { type Dictionary } from "@/lib/i18n";

type ContactFormProps = {
  dictionary: Dictionary;
};

export function ContactForm({ dictionary }: ContactFormProps) {
  const form = dictionary.contact.form;

  return (
    <form className="grid gap-4 rounded-lg border border-ink/10 bg-white p-5 shadow-soft" action="mailto:fabiano@cikala.com.br" method="post" encType="text/plain">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          {form.company}
          <input className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="company" autoComplete="organization" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          {form.name}
          <input className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="name" autoComplete="name" required />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          {form.email}
          <input className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          {form.phone}
          <input className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium text-ink">
          {form.market}
          <input className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="market" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          {form.need}
          <input className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="need" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          {form.volume}
          <input className="rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="volume" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-ink">
        {form.message}
        <textarea className="min-h-36 rounded-md border border-ink/15 px-3 py-3 font-normal outline-none focus:border-forest" name="message" required />
      </label>
      <button className="w-full rounded-md bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink md:w-auto md:justify-self-start" type="submit">
        {form.submit}
      </button>
    </form>
  );
}
