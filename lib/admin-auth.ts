import { cookies } from "next/headers";

const COOKIE = "fb_admin";

export async function isAdminAuthed(): Promise<boolean> {
  const jar = await cookies();
  const got = jar.get(COOKIE)?.value;
  const expected = process.env.ADMIN_PASSWORD ?? "admin123";
  return got === expected;
}

export async function setAdminAuth(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD ?? "admin123";
  if (password !== expected) return false;
  const jar = await cookies();
  jar.set(COOKIE, password, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8h
  });
  return true;
}

export async function clearAdminAuth(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
