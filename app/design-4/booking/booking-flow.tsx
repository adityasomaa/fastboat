"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { Route, Schedule } from "@/lib/types";
import { formatIDR } from "@/lib/format";
import { I, ICON_SIZE } from "@/components/Icon";

type Variant = "tevily" | "travo";

const TONE = {
  tevily: { primary: "bg-[#ff5946] hover:bg-[#e04733]", accent: "text-[#ff5946]", border: "border-[#ff5946]" },
  travo:  { primary: "bg-[#ff6b3d] hover:bg-[#e0552c]", accent: "text-[#ff6b3d]", border: "border-[#ff6b3d]" },
};

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

type Props = {
  routes: Route[];
  schedules: Schedule[];
  initialRouteId: string;
  initialDate?: string;
  initialAdults: number;
  initialChildren: number;
  variant: Variant;
};

export function BookingFlow({
  routes,
  schedules: initialSchedules,
  initialRouteId,
  initialDate,
  initialAdults,
  initialChildren,
  variant,
}: Props) {
  const tone = TONE[variant];
  const designSlug = variant === "tevily" ? "design-4" : "design-5";

  const [routeId, setRouteId]       = useState(initialRouteId);
  const [schedules, setSchedules]   = useState<Schedule[]>(initialSchedules);
  const [scheduleId, setScheduleId] = useState(initialSchedules[0]?.id ?? "");
  const [date, setDate]             = useState(
    initialDate ?? new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [adults, setAdults]     = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nameRef  = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const ids = {
    route: useId(),
    date: useId(),
    adults: useId(),
    children: useId(),
    name: useId(),
    nameHelp: useId(),
    email: useId(),
    emailHelp: useId(),
    phone: useId(),
    phoneHelp: useId(),
    summary: useId(),
  };

  const route    = useMemo(() => routes.find((r) => r.id === routeId), [routes, routeId]);
  const schedule = useMemo(() => schedules.find((s) => s.id === scheduleId), [schedules, scheduleId]);
  const total    = useMemo(() => {
    if (!route) return 0;
    return route.base_price_idr * adults + Math.round(route.base_price_idr * 0.6) * children;
  }, [route, adults, children]);

  async function changeRoute(newRouteId: string) {
    setRouteId(newRouteId);
    try {
      const res = await fetch(`/api/schedules?route=${newRouteId}`);
      if (res.ok) {
        const data = (await res.json()) as Schedule[];
        setSchedules(data);
        setScheduleId(data[0]?.id ?? "");
      }
    } catch {/* keep existing */}
  }

  // ---- Validation (rule: inline-validation, error-clarity) ----
  const validators: Record<keyof Errors, (v: string) => string | null> = {
    name:  (v) => (v.trim().length < 2 ? "Please enter the lead passenger's full name." : null),
    email: (v) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? "Enter a valid email so we can send your e-ticket."
        : null,
    phone: (v) =>
      v.trim().replace(/[^\d]/g, "").length < 7
        ? "Include country code, e.g. +62 812 3456 7890."
        : null,
  };
  function validateField(field: keyof Errors, value: string) {
    const err = validators[field](value);
    setErrors((prev) => ({ ...prev, [field]: err ?? undefined }));
    return err === null;
  }
  function validateAll() {
    const next: Errors = {};
    if (validators.name(name))   next.name = validators.name(name) ?? undefined;
    if (validators.email(email)) next.email = validators.email(email) ?? undefined;
    if (validators.phone(phone)) next.phone = validators.phone(phone) ?? undefined;
    setErrors(next);
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const fieldErrors = validateAll();
    if (Object.keys(fieldErrors).length > 0) {
      // Auto-focus first invalid field (rule: focus-management)
      const order = ["name", "email", "phone"] as const;
      const refs = { name: nameRef, email: emailRef, phone: phoneRef };
      const first = order.find((f) => fieldErrors[f]);
      if (first) refs[first].current?.focus();
      return;
    }
    if (!route || !schedule) {
      setSubmitError("Please pick a route and departure.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route_id: routeId,
          schedule_id: scheduleId,
          travel_date: date,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          adult_count: adults,
          child_count: children,
          total_amount_idr: total,
          design: designSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Booking failed");
        setSubmitting(false);
        return;
      }
      window.location.href = data.stub
        ? `/${designSlug}/booking/success?code=${data.booking_code}&stub=1`
        : data.invoice_url;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Network error");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Left column: form */}
      <div className="space-y-6">
        {/* Trip details */}
        <Section title="Trip details" stepIndex={1}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field labelId={ids.route} label="Route">
              <div className="relative">
                <I.pin size={ICON_SIZE.md} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-mute)]" aria-hidden />
                <select
                  id={ids.route}
                  value={routeId}
                  onChange={(e) => changeRoute(e.target.value)}
                  className="tap-target w-full appearance-none rounded-lg border border-[var(--border-strong)] bg-white pl-10 pr-9 text-sm font-medium"
                >
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>{r.origin} → {r.destination}</option>
                  ))}
                </select>
                <I.chevronDown size={ICON_SIZE.md} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg-mute)]" aria-hidden />
              </div>
            </Field>

            <Field labelId={ids.date} label="Travel date">
              <div className="relative">
                <I.calendar size={ICON_SIZE.md} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-mute)]" aria-hidden />
                <input
                  id={ids.date}
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDate(e.target.value)}
                  className="tap-target w-full rounded-lg border border-[var(--border-strong)] bg-white pl-10 pr-3 text-sm font-medium"
                />
              </div>
            </Field>

            <Field labelId={ids.adults} label="Adults">
              <Stepper id={ids.adults} value={adults} onChange={(v) => setAdults(Math.max(1, v))} min={1} max={20} icon="users" />
            </Field>

            <Field labelId={ids.children} label="Children (under 12)">
              <Stepper id={ids.children} value={children} onChange={(v) => setChildren(Math.max(0, v))} min={0} max={20} />
            </Field>
          </div>
        </Section>

        {/* Departures */}
        <Section title="Pick a departure" stepIndex={2}>
          {schedules.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[var(--border-strong)] p-6 text-center text-sm text-[var(--fg-mute)]">
              No schedules for this route.
            </div>
          ) : (
            <ul role="radiogroup" aria-label="Available departures" className="grid gap-3 sm:grid-cols-2">
              {schedules.map((s) => {
                const selected = s.id === scheduleId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setScheduleId(s.id)}
                      className={`tap-target flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                        selected
                          ? `${tone.border} bg-white shadow-sm`
                          : "border-[var(--border)] bg-white hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <span>
                        <span className="block text-base font-bold tabular-nums">
                          {s.departure_time}
                          <span className="px-1 text-[var(--fg-mute)]">→</span>
                          {s.arrival_time}
                        </span>
                        <span className="block text-xs text-[var(--fg-mute)]">
                          {s.boat_name} · capacity {s.capacity}
                        </span>
                      </span>
                      <span aria-hidden>
                        {selected ? (
                          <I.checkCircle size={ICON_SIZE.lg} className={tone.accent} />
                        ) : (
                          <span className="block h-5 w-5 rounded-full border-2 border-[var(--border-strong)]" />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        {/* Lead passenger */}
        <Section title="Lead passenger" stepIndex={3}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field labelId={ids.name} label="Full name" full helpId={ids.nameHelp} help="As shown on your ID. We'll print this on the e-ticket." error={errors.name}>
              <input
                id={ids.name}
                ref={nameRef}
                value={name}
                autoComplete="name"
                onChange={(e) => { setName(e.target.value); if (errors.name) validateField("name", e.target.value); }}
                onBlur={(e) => validateField("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={`${ids.nameHelp}${errors.name ? ` ${ids.name}-err` : ""}`}
                className={`tap-target w-full rounded-lg bg-white px-3 text-sm font-medium ${errors.name ? "border-2 border-rose-500" : "border border-[var(--border-strong)]"}`}
              />
            </Field>

            <Field labelId={ids.email} label="Email" helpId={ids.emailHelp} help="E-ticket will be sent here." error={errors.email}>
              <div className="relative">
                <I.mail size={ICON_SIZE.md} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-mute)]" aria-hidden />
                <input
                  id={ids.email}
                  ref={emailRef}
                  type="email"
                  value={email}
                  autoComplete="email"
                  inputMode="email"
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) validateField("email", e.target.value); }}
                  onBlur={(e) => validateField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={`${ids.emailHelp}${errors.email ? ` ${ids.email}-err` : ""}`}
                  className={`tap-target w-full rounded-lg bg-white pl-10 pr-3 text-sm font-medium ${errors.email ? "border-2 border-rose-500" : "border border-[var(--border-strong)]"}`}
                />
              </div>
            </Field>

            <Field labelId={ids.phone} label="Phone (with country code)" helpId={ids.phoneHelp} help="So we can reach you about pickups." error={errors.phone}>
              <div className="relative">
                <I.phone size={ICON_SIZE.md} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-mute)]" aria-hidden />
                <input
                  id={ids.phone}
                  ref={phoneRef}
                  type="tel"
                  value={phone}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+62 …"
                  onChange={(e) => { setPhone(e.target.value); if (errors.phone) validateField("phone", e.target.value); }}
                  onBlur={(e) => validateField("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={`${ids.phoneHelp}${errors.phone ? ` ${ids.phone}-err` : ""}`}
                  className={`tap-target w-full rounded-lg bg-white pl-10 pr-3 text-sm font-medium ${errors.phone ? "border-2 border-rose-500" : "border border-[var(--border-strong)]"}`}
                />
              </div>
            </Field>
          </div>
        </Section>
      </div>

      {/* Right column: summary */}
      <aside aria-labelledby={ids.summary} className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
          <h3 id={ids.summary} className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-mute)]">
            Summary
          </h3>
          {route && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-base font-bold">
                <I.ship size={ICON_SIZE.md} className={tone.accent} aria-hidden />
                <span>{route.origin} → {route.destination}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1 text-sm text-[var(--fg-soft)]">
                <span className="inline-flex items-center gap-1.5"><I.calendar size={ICON_SIZE.sm} aria-hidden /> {date}</span>
                <span className="inline-flex items-center gap-1.5 tabular-nums"><I.clock size={ICON_SIZE.sm} aria-hidden /> {schedule?.departure_time ?? "—"}</span>
                <span className="col-span-2 inline-flex items-center gap-1.5 truncate"><I.anchor size={ICON_SIZE.sm} aria-hidden /> {schedule?.boat_name ?? "—"}</span>
              </div>
            </div>
          )}
          <dl className="mt-6 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
            <Row label={`Adults × ${adults}`}     value={formatIDR((route?.base_price_idr ?? 0) * adults)} />
            <Row label={`Children × ${children}`} value={formatIDR(Math.round((route?.base_price_idr ?? 0) * 0.6) * children)} />
          </dl>
          <div className="mt-3 flex items-baseline justify-between border-t border-[var(--border)] pt-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-mute)]">Total</span>
            <span className={`text-2xl font-bold tabular-nums ${tone.accent}`}>{formatIDR(total)}</span>
          </div>

          {submitError && (
            <p role="alert" className="mt-4 inline-flex items-start gap-1.5 text-sm text-rose-700">
              <I.shield size={ICON_SIZE.sm} className="mt-0.5" aria-hidden />
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !route || !schedule}
            className={`tap-target mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg ${tone.primary} px-4 text-sm font-bold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-lg`}
          >
            {submitting ? (
              <>
                <I.loader size={ICON_SIZE.md} className="animate-spin" aria-hidden />
                Creating invoice…
              </>
            ) : (
              <>
                <I.card size={ICON_SIZE.md} aria-hidden />
                Pay with Xendit
              </>
            )}
          </button>
          <p className="mt-3 inline-flex items-center justify-center gap-1.5 text-center text-xs text-[var(--fg-mute)]">
            <I.shield size={ICON_SIZE.sm} aria-hidden />
            Cards, VA, QRIS, e-wallets
          </p>
        </div>
      </aside>
    </form>
  );
}

/* ----------------------- helpers ----------------------- */

function Section({
  title,
  children,
  stepIndex,
}: {
  title: string;
  children: React.ReactNode;
  stepIndex?: number;
}) {
  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-[var(--border)] sm:p-6">
      <header className="flex items-center gap-3">
        {stepIndex && (
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--fg)] text-xs font-bold tabular-nums text-white">
            {stepIndex}
          </span>
        )}
        <h2 className="text-base font-bold tracking-tight sm:text-lg">{title}</h2>
      </header>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  labelId,
  help,
  helpId,
  error,
  full,
  children,
}: {
  label: string;
  labelId: string;
  help?: string;
  helpId?: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={labelId} className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-mute)]">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {help && !error && (
        <p id={helpId} className="mt-1.5 text-xs text-[var(--fg-mute)]">
          {help}
        </p>
      )}
      {error && (
        <p id={`${labelId}-err`} role="alert" className="mt-1.5 inline-flex items-start gap-1.5 text-xs text-rose-700">
          <I.shield size={12} className="mt-0.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[var(--fg-soft)]">
      <dt>{label}</dt>
      <dd className="font-medium tabular-nums text-[var(--fg)]">{value}</dd>
    </div>
  );
}

function Stepper({
  id,
  value,
  onChange,
  min,
  max,
  icon,
}: {
  id: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  icon?: keyof typeof I;
}) {
  const Icon = icon ? I[icon] : null;
  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border border-[var(--border-strong)] bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease"
        className="tap-target px-3 text-[var(--fg-soft)] hover:bg-[var(--bg-mute)] disabled:opacity-30"
        disabled={value <= min}
      >
        <I.minus size={ICON_SIZE.md} aria-hidden />
      </button>
      {Icon && (
        <span className="grid place-items-center border-x border-[var(--border)] px-2 text-[var(--fg-mute)]">
          <Icon size={ICON_SIZE.sm} aria-hidden />
        </span>
      )}
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (!Number.isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
        inputMode="numeric"
        className="tap-target w-full bg-transparent text-center text-sm font-bold tabular-nums"
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase"
        className="tap-target px-3 text-[var(--fg-soft)] hover:bg-[var(--bg-mute)] disabled:opacity-30"
        disabled={value >= max}
      >
        <I.plus size={ICON_SIZE.md} aria-hidden />
      </button>
    </div>
  );
}
