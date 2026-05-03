import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLogin } from "@/components/AdminLogin";

export const metadata = { title: "Admin · Tevily" };

export default async function Design4Admin() {
  const authed = await isAdminAuthed();
  if (!authed) return <AdminLogin variant="tevily" designSlug="design-4" />;
  return <AdminDashboard variant="tevily" designSlug="design-4" />;
}
