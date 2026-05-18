import { requireServerAuth } from "@/lib/server-auth";
import DashboardShell from "@/components/dashboard/Dashboard-shell";

/**
 * Protected route group layout.
 * All pages under app/(protected)/ require authentication.
 * Unauthenticated users are redirected to /auth/login.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect to /auth/login if not authenticated
  const user = await requireServerAuth();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
