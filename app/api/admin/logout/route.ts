import { NextResponse } from "next/server";
import { clearAdminAuth } from "@/lib/admin-auth";

export async function POST(req: Request) {
  await clearAdminAuth();
  const url = new URL(req.url);
  const back = url.searchParams.get("back") ?? "/";
  return NextResponse.redirect(new URL(back, url));
}
