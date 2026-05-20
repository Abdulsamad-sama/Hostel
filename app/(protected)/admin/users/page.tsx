import { requireServerRole } from "@/lib/server-auth";
import UserManagement from "@/components/admin/User-management";

export const metadata = {
  title: "User Management | HostelHub Admin",
  description: "Manage HostelHub platform members, adjust roles, and moderate access.",
};

export default async function AdminUsersPage() {
  const user = await requireServerRole("ADMIN");

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Platform User Management</h1>
        <p className="text-muted-foreground">
          Welcome back, <span className="font-semibold text-foreground">{user.name}</span>. You can review all members and change their permission levels here.
        </p>
      </div>

      <UserManagement currentUser={{ id: user.id, role: user.role }} />
    </div>
  );
}
