import Link from "next/link";
import { I, ICON_SIZE } from "@/components/Icon";

type SP = Promise<{ code?: string; stub?: string }>;

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#ff6b3d",
  ["--primary" as string]: "#1a1c2c",
  ["--primary-fg" as string]: "#ffffff",
};

export default async function Success({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const code = sp.code ?? "—";
  const isStub = sp.stub === "1";

  return (
    <main className="min-h-screen bg-[var(--bg-soft)]" style={ACCENT}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-[var(--border)] sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#ff6b3d] text-white">
            <I.checkCircle size={36} aria-hidden />
          </div>
          <p className="font-script mt-5 text-3xl text-[#ff6b3d]">All set</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Booking confirmed</h1>
          <p className="mt-2 text-[var(--fg-soft)]">
            We've sent your e-ticket by email. Show the booking code at the harbour.
          </p>

          <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl border border-dashed border-[#ff6b3d]/40 bg-[#ff6b3d]/5 px-6 py-4">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b3d]">
              <I.ticket size={ICON_SIZE.sm} aria-hidden />
              Booking code
            </div>
            <div className="font-mono text-2xl font-extrabold tabular-nums text-[#1a1c2c]">{code}</div>
          </div>

          {isStub && (
            <p className="mx-auto mt-6 max-w-md rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
              <b>Demo mode:</b> Xendit is not configured, so no real payment was processed.
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/design-5" className="tap-target inline-flex items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold ring-1 ring-[var(--border-strong)] hover:bg-[var(--bg-mute)]">
              Back to home
            </Link>
            <Link href="/design-5/admin" className="tap-target inline-flex items-center gap-2 rounded-full bg-[#1a1c2c] px-5 text-sm font-semibold text-white hover:opacity-90">
              <I.shield size={ICON_SIZE.md} aria-hidden />
              View in admin
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
