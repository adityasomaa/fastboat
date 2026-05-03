import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url      = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const svcKey   = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return (
    url.length > 0 &&
    anonKey.length > 0 &&
    !url.includes("placeholder") &&
    !anonKey.includes("placeholder")
  );
}

export function getBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createClient(url, anonKey);
}

export function getServerClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export function getServiceClient(): SupabaseClient | null {
  if (!url || !svcKey || url.includes("placeholder") || svcKey.includes("placeholder")) {
    return null;
  }
  return createClient(url, svcKey, { auth: { persistSession: false } });
}
