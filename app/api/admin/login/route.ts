import { NextResponse } from "next/server";
import { setAdminAuth, clearAdminAuth } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  const ok = await setAdminAuth(body.password ?? "");
  if (!ok) return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminAuth();
  return NextResponse.json({ ok: true });
}
