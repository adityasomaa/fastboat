"use client";
import { useState } from "react";
import { I, ICON_SIZE } from "@/components/Icon";

type Variant = "tevily" | "travo";
const TONE = {
  tevily: { primary: "bg-[#ff5946] hover:bg-[#e04733]", ring: "#ff5946" },
  travo:  { primary: "bg-[#ff6b3d] hover:bg-[#e0552c]", ring: "#ff6b3d" },
};

export function AdminLogin({ variant, designSlug }: { variant: Variant; designSlug: "design-4" | "design-5" }) {
  const tone = TONE[variant];
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed");
      setLoading(false);
      return;
    }
    window.location.href = `/${designSlug}/admin`;
  }

  return (
    <main
      className="grid min-h-screen place-items-center bg-[var(--bg-soft)] px-4"
      style={{ ["--ring" as string]: tone.ring }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[var(--border)]"
        aria-labelledby="login-title"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: tone.ring }}>
          <I.shield size={ICON_SIZE.lg} aria-hidden />
        </span>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--fg-mute)]">Admin</p>
        <h1 id="login-title" className="mt-1 text-2xl font-bold tracking-tight">Sign in to dashboard</h1>
        <p className="mt-2 text-sm text-[var(--fg-soft)]">
          Enter the admin password set in <code className="rounded bg-[var(--bg-mute)] px-1.5 py-0.5 text-[var(--fg)]">ADMIN_PASSWORD</code>.
        </p>

        <label htmlFor="pw" className="mt-6 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-mute)]">
          Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="pw"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
            aria-invalid={!!error}
            aria-describedby={error ? "pw-err" : undefined}
            className={`tap-target w-full rounded-lg bg-white px-3 pr-12 text-sm font-medium ${
              error ? "border-2 border-rose-500" : "border border-[var(--border-strong)]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="tap-target absolute right-1 top-1/2 -translate-y-1/2 rounded-md px-2 text-[var(--fg-mute)] hover:text-[var(--fg)]"
          >
            {show ? <I.eyeOff size={ICON_SIZE.md} aria-hidden /> : <I.eye size={ICON_SIZE.md} aria-hidden />}
          </button>
        </div>
        {error && (
          <p id="pw-err" role="alert" className="mt-2 inline-flex items-start gap-1.5 text-xs text-rose-700">
            <I.shield size={12} className="mt-0.5" aria-hidden />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`tap-target mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg ${tone.primary} px-4 text-sm font-bold uppercase tracking-widest text-white shadow-md transition disabled:opacity-50 hover:shadow-lg`}
        >
          {loading ? (
            <>
              <I.loader size={ICON_SIZE.md} className="animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <I.arrowRight size={ICON_SIZE.md} aria-hidden />
            </>
          )}
        </button>
      </form>
    </main>
  );
}
