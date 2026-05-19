import { requireServerAuth } from "@/lib/server-auth";
import OwnerDashboardClient from "./OwnerDashboard-client";
import StudentDashboardClient from "./StudentDashboard-client";

/**
 * Dashboard page — only accessible to authenticated users.
 * Dynamically switches layouts depending on the user's active role.
 */
export default async function DashboardPage() {
  const user = await requireServerAuth();

  const isOwnerOrAgent = user.role === "OWNER" || user.role === "AGENT" || user.role === "ADMIN";

  return (
    <div className="min-h-screen">
      {isOwnerOrAgent ? (
        <OwnerDashboardClient />
      ) : (
        <StudentDashboardClient user={user} />
      )}
    </div>
  );
}
