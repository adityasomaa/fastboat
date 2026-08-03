"use client";

import { useEffect, useRef, useState } from "react";
import { I, ICON_SIZE } from "@/components/Icon";
import { AnchoredPopup } from "./Popup";

// Custom dropdown — deliberately not a native <select>, so it can be styled
// to match the brand on every browser. Behaves like an ARIA listbox:
// arrows move, Enter/Space select, Escape closes, type-ahead jumps.
export function SelectField({
  id,
  label,
  value,
  options,
  placeholder = "Select an option",
  invalid,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  invalid?: boolean;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });

  // Open with the current value highlighted.
  useEffect(() => {
    if (open) setActive(Math.max(0, options.indexOf(value)));
  }, [open, options, value]);

  // Keep the highlighted option in view while arrowing.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (i: number) => {
    onChange(options[i]);
    setOpen(false);
    trigger.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % options.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + options.length) % options.length); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Tab") { setOpen(false); }
    else if (e.key.length === 1) {
      // type-ahead
      const now = Date.now();
      typed.current.text = now - typed.current.at > 800 ? e.key : typed.current.text + e.key;
      typed.current.at = now;
      const hit = options.findIndex((o) => o.toLowerCase().startsWith(typed.current.text.toLowerCase()));
      if (hit >= 0) setActive(hit);
    }
  };

  return (
    <>
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
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
          {value || placeholder}
        </span>
        <I.chevronDown
          size={ICON_SIZE.md}
          aria-hidden
          className={`shrink-0 text-[#0a4290] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnchoredPopup anchor={trigger} open={open} onClose={() => setOpen(false)} label={label}>
        <ul ref={listRef} role="listbox" aria-label={label} className="max-h-64 overflow-y-auto py-1.5">
          {options.map((o, i) => {
            const selected = o === value;
            return (
              <li
                key={o}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-[15px] ${
                  i === active ? "bg-[#e8effc] text-[#0a4290]" : "text-[#08265a]"
                } ${selected ? "font-semibold" : ""}`}
              >
                {o}
                {selected && <I.check size={16} className="shrink-0 text-[#0a4290]" aria-hidden />}
              </li>
            );
          })}
        </ul>
      </AnchoredPopup>
    </>
  );
}
