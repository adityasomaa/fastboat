import Link from "next/link";
import { dataSourceLabel } from "@/lib/data/queries";
import { I, ICON_SIZE } from "@/components/Icon";

const designs = [
  { slug: "design-1", title: "BaliFast (Tourvisor)",   desc: "Glass card hero, navy + orange, white search card overlapping.",   tone: "Landing only",        ref: "Tourvisor",   accent: "from-orange-500 to-amber-500", booking: false },
  { slug: "design-2", title: "Tourex Bali (Tourex)",   desc: "Cinematic hero with carousel, multi-tab booking row, indigo + orange.", tone: "Landing only",   ref: "Tourex",      accent: "from-violet-600 to-orange-500", booking: false },
  { slug: "design-3", title: "Tripix (Tripix)",        desc: "Dark utility bar + adventure photo, navy + amber, 'Let's plan' CTA.", tone: "Landing only",      ref: "Tripix",      accent: "from-amber-500 to-amber-400",  booking: false },
  { slug: "design-4", title: "Tevily (Tevily)",        desc: "Big handwritten coral headline + circle nav icons. Booking + admin.", tone: "Booking + admin",  ref: "Tevily",      accent: "from-[#ff5946] to-[#ff8a78]",  booking: true },
  { slug: "design-5", title: "Travo (Travo)",          desc: "Orange utility bar, script tagline + bold headline. Booking + admin.", tone: "Booking + admin",  ref: "Travo",       accent: "from-[#ff6b3d] to-[#ffa178]",  booking: true },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-soft)] text-[var(--fg)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-mute)]">
            Bali fastboat · client previews
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Five directions. Pick a feel.
          </h1>
          <p className="mt-4 text-lg text-[var(--fg-soft)]">
            Each design is inspired by a real Envato Elements travel template.
            Three landing-only concepts and two with a full booking engine + admin dashboard.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-[var(--fg-soft)] ring-1 ring-[var(--border)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Data source: {dataSourceLabel()}
          </div>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/${d.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-[var(--border)] transition duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${d.accent}`} />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-mute)]">
                    {d.slug}
                  </span>
                  {d.booking && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-mute)] px-2 py-0.5 text-[11px] font-semibold text-[var(--fg-soft)]">
                      <I.ticket size={ICON_SIZE.sm} aria-hidden /> booking
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{d.title}</h2>
                <p className="mt-2 flex-1 text-sm text-[var(--fg-soft)]">{d.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-sm text-[var(--fg-soft)]">{d.tone}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--fg)] transition-transform group-hover:translate-x-0.5">
                    Open
                    <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-12 grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-[var(--border)] sm:grid-cols-3">
          <Note icon="globe"  title="Marketing"
            body="Designs 1–3 are landing-only. Pair with a WhatsApp/phone CTA." />
          <Note icon="ticket" title="Booking"
            body="Designs 4 & 5 create real Xendit invoices and persist bookings to Supabase." />
          <Note icon="shield" title="Admin"
            body={<>
              <Link href="/design-4/admin" className="font-medium underline underline-offset-2">/design-4/admin</Link>
              {" + "}
              <Link href="/design-5/admin" className="font-medium underline underline-offset-2">/design-5/admin</Link>
              {" "}— password from <code className="text-[var(--fg)]">ADMIN_PASSWORD</code>.
            </>} />
        </section>
      </div>
    </main>
  );
}

function Note({ icon, title, body }: { icon: keyof typeof I; title: string; body: React.ReactNode }) {
  const Icon = I[icon];
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--bg-mute)] text-[var(--fg)]">
        <Icon size={ICON_SIZE.md} aria-hidden />
      </span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <p className="mt-1 text-sm text-[var(--fg-soft)]">{body}</p>
      </div>
    </div>
  );
}
