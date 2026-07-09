import { I, ICON_SIZE } from "@/components/Icon";
import { WA_GENERAL, type Faq, faqJsonLd } from "./site";

// FAQ accordion — native <details>/<summary> per client brief ("use details/accordion
// for mobile"), with the direct answer as the first sentence for GEO/SEO.
export function FaqSection({
  title = "Frequently Asked Questions",
  faqs,
  withCta = true,
}: {
  title?: string;
  faqs: Faq[];
  withCta?: boolean;
}) {
  return (
    <section aria-label={title} className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-6 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 py-1">
            <summary className="tap-target flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-left text-base font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <I.chevronDown
                size={ICON_SIZE.md}
                aria-hidden
                className="shrink-0 text-[var(--fg-mute)] transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="pb-4 text-[15px] leading-relaxed text-[var(--fg-soft)]">{f.a}</p>
          </details>
        ))}
      </div>
      {withCta && (
        <p className="mt-5 text-sm text-[var(--fg-soft)]">
          Still have questions?{" "}
          <a href={WA_GENERAL} className="font-semibold text-[#0a4290] underline underline-offset-2">
            Ask us on WhatsApp
          </a>{" "}
          — we reply fast.
        </p>
      )}
    </section>
  );
}

// Homepage FAQ — two-column layout per client reference:
// left intro + "Talk to us Directly" CTA card, right accordion.
export function HomeFaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section aria-label="Questions travellers ask" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        {/* Left column: intro + CTA card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0a4290]">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Questions Travellers Ask
          </h2>
          <p className="mt-4 max-w-sm text-[var(--fg-soft)]">
            Everything you need to know before booking. Still not sure? Message us
            directly.
          </p>

          <div className="mt-6 rounded-2xl bg-[#0a4290] p-6 text-white">
            <h3 className="text-lg font-bold">Talk to us Directly</h3>
            <p className="mt-1.5 text-sm text-white/80">
              Get a quick reply on WhatsApp — usually within minutes.
            </p>
            <a
              href={WA_GENERAL}
              className="tap-target mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-bold text-white transition hover:brightness-95"
            >
              <I.message size={ICON_SIZE.md} aria-hidden />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Right column: accordion */}
        <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="tap-target flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-base font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <I.plus
                  size={ICON_SIZE.md}
                  aria-hidden
                  className="shrink-0 text-[#0a4290] transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="pb-4 text-[15px] leading-relaxed text-[var(--fg-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "light";
}) {
  // "light" is for use over dark photo overlays where brand blue lacks contrast
  const color = tone === "light" ? "text-[#9cc4ff]" : "text-[#0a4290]";
  return <p className={`font-script text-2xl sm:text-3xl ${color}`}>{children}</p>;
}

// Small disclaimer required under every price table (client brief)
export function PriceNote() {
  return (
    <p className="mt-3 text-xs leading-relaxed text-[var(--fg-mute)]">
      Prices are per adult, one way, and may change without notice. Contact us on
      WhatsApp to confirm today's rate. Booking direct with My Day Gili gets a better
      rate than online travel agents.
    </p>
  );
}

export function WaButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "navy";
}) {
  const styles =
    variant === "solid"
      ? "bg-[#25D366] text-white hover:brightness-95"
      : variant === "navy"
        ? "bg-[#08265a] text-white hover:opacity-90"
        : "bg-white text-[#08265a] ring-1 ring-[var(--border-strong)] hover:bg-[var(--bg-mute)]";
  return (
    <a
      href={href}
      className={`tap-target inline-flex items-center justify-center gap-2 rounded-full px-6 text-sm font-bold shadow-sm transition ${styles}`}
    >
      <I.message size={ICON_SIZE.md} aria-hidden />
      {children}
    </a>
  );
}
