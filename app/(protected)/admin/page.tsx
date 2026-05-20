import { requireServerRole } from "@/lib/server-auth";
import AdminDashboardClient from "@/components/admin/AdminDashboard-client";

export const metadata = {
  title: "Admin Dashboard | HostelHub",
  description: "Manage listings, users, and platform settings for HostelHub.",
};

export default async function AdminPage() {
  const user = await requireServerRole("ADMIN");

  return (
    <AdminDashboardClient
      user={{ id: user.id, name: user.name, role: user.role }}
    />
  );
}
