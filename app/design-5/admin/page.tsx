import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLogin } from "@/components/AdminLogin";

export const metadata = { title: "Admin · Travo" };

export default async function Design5Admin() {
  const authed = await isAdminAuthed();
  if (!authed) return <AdminLogin variant="travo" designSlug="design-5" />;
  return <AdminDashboard variant="travo" designSlug="design-5" />;
}
