"use client";

import { useEffect, useRef, useState } from "react";
import { I, ICON_SIZE } from "@/components/Icon";
import { AnchoredPopup } from "./Popup";

// Dates are handled as local y/m/d only — never as UTC timestamps — so a
// guest in Bali never sees the day shift by one.
const pad = (n: number) => String(n).padStart(2, "0");
export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const startOfToday = () => {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// "Wed, 12 Aug 2026" — also the wording that lands in the WhatsApp message.
export function formatDisplayDate(iso: string): string {
  if (!iso) return "";
  const d = fromISO(iso);
  const weekday = DAYS[(d.getDay() + 6) % 7];
  return `${weekday}, ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

// Days laid out Monday-first, padded with the leading blanks of the month.
function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function DateField({
  id,
  label,
  value,
  placeholder = "Choose a date",
  invalid,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  invalid?: boolean;
  onChange: (iso: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const today = startOfToday();
  const [cursor, setCursor] = useState(() => (value ? fromISO(value) : today));
  const [focusDay, setFocusDay] = useState(() => (value ? fromISO(value) : today));
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const base = value ? fromISO(value) : today;
      setCursor(base);
      setFocusDay(base);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const pick = (d: Date) => {
    onChange(toISO(d));
    setOpen(false);
    trigger.current?.focus();
  };

  const shift = (days: number) => {
    const n = new Date(focusDay);
    n.setDate(n.getDate() + days);
    if (n < today) return;
    setFocusDay(n);
    if (n.getMonth() !== cursor.getMonth() || n.getFullYear() !== cursor.getFullYear()) setCursor(n);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); setOpen(true); }
      return;
    }
    if (e.key === "ArrowLeft") { e.preventDefault(); shift(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); shift(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); shift(-7); }
    else if (e.key === "ArrowDown") { e.preventDefault(); shift(7); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(focusDay); }
    else if (e.key === "Tab") setOpen(false);
  };

  const grid = monthGrid(cursor.getFullYear(), cursor.getMonth());
  const sameDay = (a: Date, b: Date) => toISO(a) === toISO(b);
  const canGoBack = cursor.getFullYear() > today.getFullYear() || cursor.getMonth() > today.getMonth();

  return (
    <>
      {/* The whole field is the trigger — tapping anywhere opens the calendar,
          not just the icon (client request). */}
      <button
        ref={trigger}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-[15px] transition focus:outline-none focus:ring-2 focus:ring-[#0a4290]/30 ${
          invalid ? "border-red-400" : "border-[var(--border-strong)] hover:border-[#0a4290]"
        } ${open ? "border-[#0a4290] ring-2 ring-[#0a4290]/20" : ""}`}
      >
        <span className={value ? "text-[#08265a]" : "text-[var(--fg-mute)]"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <I.calendar size={ICON_SIZE.md} aria-hidden className="shrink-0 text-[#0a4290]" />
      </button>

      <AnchoredPopup anchor={trigger} open={open} onClose={() => setOpen(false)} minWidth={304} label={label}>
        <div role="dialog" aria-label={`${label} calendar`} className="p-3">
          {/* Month navigation */}
          <div className="flex items-center justify-between px-1 pb-2">
            <button
              type="button"
              aria-label="Previous month"
              disabled={!canGoBack}
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              className="grid h-9 w-9 place-items-center rounded-lg text-[#0a4290] transition hover:bg-[#e8effc] disabled:pointer-events-none disabled:opacity-30"
            >
              <I.chevronRight size={18} className="rotate-180" aria-hidden />
            </button>
            <p aria-live="polite" className="text-sm font-bold text-[#08265a]">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              className="grid h-9 w-9 place-items-center rounded-lg text-[#0a4290] transition hover:bg-[#e8effc]"
            >
              <I.chevronRight size={18} aria-hidden />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 px-1 pb-1">
            {DAYS.map((d) => (
              <div key={d} className="py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--fg-mute)]">
                {d[0]}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 px-1">
            {grid.map((d, i) => {
              if (!d) return <div key={`x${i}`} />;
              const past = d < today;
              const selected = !!value && sameDay(d, fromISO(value));
              const isToday = sameDay(d, today);
              const focused = sameDay(d, focusDay);
              return (
                <button
                  key={toISO(d)}
                  type="button"
                  disabled={past}
                  aria-pressed={selected}
                  aria-current={isToday ? "date" : undefined}
                  onClick={() => pick(d)}
                  className={`grid h-10 place-items-center rounded-lg text-sm tabular-nums transition ${
                    past
                      ? "cursor-not-allowed text-[var(--fg-mute)]/40"
                      : selected
                        ? "bg-[#0a4290] font-bold text-white"
                        : focused
                          ? "bg-[#e8effc] font-semibold text-[#0a4290] ring-1 ring-[#0a4290]/30"
                          : "text-[#08265a] hover:bg-[#e8effc]"
                  } ${isToday && !selected ? "font-bold underline decoration-[#0a4290] decoration-2 underline-offset-4" : ""}`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-[var(--border)] px-1 pt-2">
            <button
              type="button"
              onClick={() => pick(today)}
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#0a4290] transition hover:bg-[#e8effc]"
            >
              Today
            </button>
            {value && (
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); trigger.current?.focus(); }}
                className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--fg-mute)] transition hover:bg-[var(--bg-mute)]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </AnchoredPopup>
    </>
  );
}
