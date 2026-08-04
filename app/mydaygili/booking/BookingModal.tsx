"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { I, ICON_SIZE } from "@/components/Icon";
import { CONTACT_EMAIL, emailComposeUrl, waComposeUrl } from "../site";
import { DateField, formatDisplayDate } from "./DateField";
import { SelectField } from "./SelectField";
import type { BookingForm, Field, FieldValues } from "./forms";

function initialValues(form: BookingForm): FieldValues {
  const v: FieldValues = {};
  for (const f of form.fields) v[f.name] = f.type === "counter" ? String(f.initial) : "";
  return v;
}

function Counter({
  id, label, value, min, max, onChange,
}: {
  id: string; label: string; value: number; min: number; max: number; onChange: (n: number) => void;
}) {
  const step = (d: number) => onChange(Math.min(max, Math.max(min, value + d)));
  return (
    <div
      id={id}
      className="flex items-center justify-between rounded-xl border border-[var(--border-strong)] bg-white px-2 py-2"
    >
      <button
        type="button"
        aria-label={`Fewer ${label.toLowerCase()}`}
        onClick={() => step(-1)}
        disabled={value <= min}
        className="grid h-9 w-9 place-items-center rounded-lg text-[#0a4290] transition hover:bg-[#e8effc] disabled:pointer-events-none disabled:opacity-30"
      >
        <I.minus size={18} aria-hidden />
      </button>
      <span aria-live="polite" className="min-w-8 text-center text-[15px] font-bold tabular-nums text-[#08265a]">
        {value}
      </span>
      <button
        type="button"
        aria-label={`More ${label.toLowerCase()}`}
        onClick={() => step(1)}
        disabled={value >= max}
        className="grid h-9 w-9 place-items-center rounded-lg text-[#0a4290] transition hover:bg-[#e8effc] disabled:pointer-events-none disabled:opacity-30"
      >
        <I.plus size={18} aria-hidden />
      </button>
    </div>
  );
}

export function BookingModal({
  form,
  open,
  onClose,
}: {
  form: BookingForm;
  open: boolean;
  onClose: () => void;
}) {
  const [values, setValues] = useState<FieldValues>(() => initialValues(form));
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const focusOnError = useRef<string | null>(null);

  useEffect(() => setMounted(true), []);

  // Jump to the first missing field once the error state has rendered —
  // on a long form the failing field is often scrolled out of view.
  useEffect(() => {
    const name = focusOnError.current;
    if (!name) return;
    focusOnError.current = null;
    const el = document.getElementById(`bf-${name}`);
    el?.scrollIntoView({ block: "center" });
    el?.focus();
  }, [errors]);

  // Fresh form each time it opens; lock the page behind the modal.
  useEffect(() => {
    if (!open) return;
    setValues(initialValues(form));
    setErrors({});
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open, form]);

  // Escape closes; Tab stays inside the card.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !card.current) return;
      const items = card.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const visible = useMemo(
    () => form.fields.filter((f) => !f.showIf || f.showIf(values)),
    [form, values],
  );

  const set = (name: string, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    setErrors((e) => (e[name] ? { ...e, [name]: false } : e));
  };

  // Validates, then hands the finished message to the chosen channel.
  const submit = (channel: "whatsapp" | "email") => {
    const missing: Record<string, boolean> = {};
    for (const f of visible) {
      if (f.required && !values[f.name]?.trim()) missing[f.name] = true;
    }
    if (Object.keys(missing).length) {
      focusOnError.current = visible.find((f) => missing[f.name])?.name ?? null;
      setErrors(missing);
      return;
    }

    // Dates go into the message human-readable ("Wed, 12 Aug 2026"), and only
    // fields still visible are sent — a hidden return date never leaks through.
    const out: FieldValues = {};
    for (const f of visible) {
      out[f.name] = f.type === "date" ? formatDisplayDate(values[f.name]) : values[f.name];
    }
    const lines = form.toLines(out);

    if (channel === "email") {
      // mailto: must be a same-tab navigation — window.open leaves a blank tab.
      window.location.href = emailComposeUrl(form.ref, `${form.title} — ${form.ref}`, form.opening, lines);
    } else {
      window.open(waComposeUrl(form.ref, form.opening, lines), "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-[#08265a]/60 backdrop-blur-sm"
      />

      <div
        ref={card}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-[var(--border)] bg-[#0a4290] px-5 py-4 text-white sm:px-6">
          <div className="flex-1">
            <h2 id="booking-title" className="text-lg font-bold leading-snug">{form.title}</h2>
            <p className="mt-1 text-sm text-white/80">{form.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/90 transition hover:bg-white/15"
          >
            <I.close size={20} aria-hidden />
          </button>
        </div>

        {/* Fields */}
        <div className="grid flex-1 gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
          {visible.map((f: Field) => {
            const id = `bf-${f.name}`;
            const invalid = !!errors[f.name];
            const span = f.type === "counter" ? "sm:col-span-1" : "sm:col-span-2";
            return (
              <div key={f.name} className={span}>
                <label
                  htmlFor={id}
                  className="mb-1.5 block text-sm font-semibold text-[#08265a]"
                >
                  {f.label}
                  {f.required && <span className="ml-1 text-[#e0673f]">*</span>}
                </label>

                {f.type === "text" && (
                  <input
                    id={id}
                    type="text"
                    value={values[f.name] ?? ""}
                    placeholder={f.placeholder}
                    aria-invalid={invalid || undefined}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#08265a] transition placeholder:text-[var(--fg-mute)] focus:border-[#0a4290] focus:outline-none focus:ring-2 focus:ring-[#0a4290]/20 ${
                      invalid ? "border-red-400" : "border-[var(--border-strong)]"
                    }`}
                  />
                )}

                {f.type === "textarea" && (
                  <textarea
                    id={id}
                    rows={3}
                    value={values[f.name] ?? ""}
                    placeholder={f.placeholder}
                    aria-invalid={invalid || undefined}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-[15px] text-[#08265a] transition placeholder:text-[var(--fg-mute)] focus:border-[#0a4290] focus:outline-none focus:ring-2 focus:ring-[#0a4290]/20 ${
                      invalid ? "border-red-400" : "border-[var(--border-strong)]"
                    }`}
                  />
                )}

                {f.type === "select" && (
                  <SelectField
                    id={id}
                    label={f.label}
                    value={values[f.name] ?? ""}
                    options={f.options}
                    placeholder={f.placeholder}
                    invalid={invalid}
                    onChange={(v) => set(f.name, v)}
                  />
                )}

                {f.type === "date" && (
                  <DateField
                    id={id}
                    label={f.label}
                    value={values[f.name] ?? ""}
                    invalid={invalid}
                    onChange={(v) => set(f.name, v)}
                  />
                )}

                {f.type === "counter" && (
                  <Counter
                    id={id}
                    label={f.label}
                    value={Number(values[f.name] || f.initial)}
                    min={f.min}
                    max={f.max}
                    onChange={(n) => set(f.name, String(n))}
                  />
                )}

                {invalid && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    Please fill this in.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] bg-[var(--bg-soft)] px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => submit("whatsapp")}
            className="tap-target flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-sm transition hover:brightness-95"
          >
            <I.message size={ICON_SIZE.md} aria-hidden />
            {form.submitLabel}
          </button>

          {/* Email is the second option, only once an inbox is configured */}
          {CONTACT_EMAIL && (
            <button
              type="button"
              onClick={() => submit("email")}
              className="tap-target mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#08265a] ring-1 ring-[var(--border-strong)] transition hover:bg-[var(--bg-mute)]"
            >
              <I.mail size={ICON_SIZE.md} aria-hidden />
              Or send by email
            </button>
          )}

          <p className="mt-2.5 text-center text-xs leading-relaxed text-[var(--fg-mute)]">
            {CONTACT_EMAIL
              ? "Your details are written out for you — just press send."
              : "Opens WhatsApp with your details already written out — you just press send."}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
