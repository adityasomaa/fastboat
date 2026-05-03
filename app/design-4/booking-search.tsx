"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import type { Route } from "@/lib/types";
import { I, ICON_SIZE } from "@/components/Icon";

type Variant = "tevily" | "travo";

const TONE = {
  tevily: { primary: "bg-[#ff5946] hover:bg-[#e04733]", text: "Find now" },
  travo:  { primary: "bg-[#ff6b3d] hover:bg-[#e0552c]", text: "Search" },
};

export function BookingSearch({ routes, variant }: { routes: Route[]; variant: Variant }) {
  const router = useRouter();
  const tone = TONE[variant];
  const designSlug = variant === "tevily" ? "design-4" : "design-5";

  const ids = {
    route: useId(),
    date: useId(),
    type: useId(),
  };

  const [routeId, setRouteId] = useState(routes[0]?.id ?? "");
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams({ route: routeId, date, adults: "2", children: "0" });
        router.push(`/${designSlug}/booking?${q.toString()}`);
      }}
      className="grid grid-cols-1 gap-0 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 sm:grid-cols-[1.4fr_1fr_1fr_auto]"
      aria-label="Search fastboat tickets"
    >
      <Field labelId={ids.route} label="Where to">
        <select
          id={ids.route}
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          className="tap-target w-full appearance-none bg-transparent text-base font-semibold text-[#0f1f2e] outline-none"
        >
          {routes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.origin} → {r.destination}
            </option>
          ))}
        </select>
      </Field>
      <Field labelId={ids.date} label="When">
        <input
          id={ids.date}
          type="date"
          value={date}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setDate(e.target.value)}
          className="tap-target w-full bg-transparent text-base font-semibold text-[#0f1f2e] outline-none"
        />
      </Field>
      <Field labelId={ids.type} label="Type">
        <select
          id={ids.type}
          defaultValue="adventure"
          className="tap-target w-full appearance-none bg-transparent text-base font-semibold text-[#0f1f2e] outline-none"
        >
          <option value="adventure">Adventure</option>
          <option value="charter">Private charter</option>
          <option value="day">Day trip</option>
        </select>
      </Field>
      <button
        type="submit"
        className={`tap-target inline-flex items-center justify-center gap-2 px-8 text-sm font-bold uppercase tracking-widest text-white ${tone.primary}`}
      >
        {tone.text}
        <I.arrowRight size={ICON_SIZE.md} aria-hidden />
      </button>
    </form>
  );
}

function Field({
  label,
  labelId,
  children,
}: {
  label: string;
  labelId: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={labelId} className="block px-6 py-4 sm:border-r sm:border-[var(--border)] sm:last-of-type:border-r-0">
      <span className="block text-xs font-medium uppercase tracking-wider text-[var(--fg-mute)]">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
