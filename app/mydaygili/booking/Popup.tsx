"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Rect = { top: number; left: number; width: number };

// Floating panel for the custom select and date picker.
//
// Rendered through a portal to <body> and positioned with fixed coords taken
// from the trigger, so it is never clipped by the modal's scrolling body.
// Flips above the trigger when there isn't room below.
export function AnchoredPopup({
  anchor,
  open,
  onClose,
  minWidth = 0,
  children,
  label,
}: {
  anchor: React.RefObject<HTMLElement | null>;
  open: boolean;
  onClose: () => void;
  minWidth?: number;
  children: React.ReactNode;
  label: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Rect | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open) return;

    const place = () => {
      const a = anchor.current;
      if (!a) return;
      const r = a.getBoundingClientRect();
      const width = Math.max(r.width, minWidth);
      const panelH = panel.current?.offsetHeight ?? 320;
      const spaceBelow = window.innerHeight - r.bottom;
      const above = spaceBelow < panelH + 16 && r.top > panelH + 16;
      const left = Math.min(Math.max(8, r.left), window.innerWidth - width - 8);
      // On short screens neither side fits — clamp so the panel is always
      // fully on screen rather than running off the bottom.
      const wanted = above ? r.top - panelH - 8 : r.bottom + 8;
      const top = Math.min(Math.max(8, wanted), Math.max(8, window.innerHeight - panelH - 8));
      setPos({ top, left, width });
    };

    place();
    // Capture phase so scrolling inside the modal body repositions us too.
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, anchor, minWidth, children]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (panel.current?.contains(t) || anchor.current?.contains(t)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation(); // close the popup, not the whole modal
        onClose();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open, onClose, anchor]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={panel}
      aria-label={label}
      style={{
        position: "fixed",
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        width: pos?.width,
        // Last resort on very short screens: let the panel itself scroll.
        maxHeight: "calc(100vh - 16px)",
        zIndex: 90,
      }}
      className="overflow-y-auto overscroll-contain rounded-2xl border border-[var(--border)] bg-white shadow-2xl shadow-[#08265a]/20"
    >
      {children}
    </div>,
    document.body,
  );
}
