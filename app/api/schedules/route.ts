import { NextResponse } from "next/server";
import { getSchedules } from "@/lib/data/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const route = searchParams.get("route") ?? undefined;
  const data = await getSchedules(route);
  return NextResponse.json(data);
}
