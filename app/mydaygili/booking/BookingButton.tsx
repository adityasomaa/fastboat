"use client";

import { useState } from "react";
import { I, ICON_SIZE } from "@/components/Icon";
import { BookingModal } from "./BookingModal";
import { BOOKING_FORMS, type BookingFormKey } from "./forms";

// Drop-in replacement for <WaButton> on booking CTAs: same look, but opens
// the details popup first and only then hands the filled-in message to
// WhatsApp — with the CTA's 🔖 Ref line intact for tracking.
export function BookingButton({
  form,
  children,
  variant = "solid",
}: {
  form: BookingFormKey;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "navy";
}) {
  const [open, setOpen] = useState(false);
  const config = BOOKING_FORMS[form];

  const styles =
    variant === "solid"
      ? "bg-[#25D366] text-white hover:brightness-95"
      : variant === "navy"
        ? "bg-[#08265a] text-white hover:opacity-90"
        : "bg-white text-[#08265a] ring-1 ring-[var(--border-strong)] hover:bg-[var(--bg-mute)]";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`tap-target inline-flex items-center justify-center gap-2 rounded-full px-6 text-sm font-bold shadow-sm transition ${styles}`}
      >
        <I.message size={ICON_SIZE.md} aria-hidden />
        {children}
      </button>
      <BookingModal form={config} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
