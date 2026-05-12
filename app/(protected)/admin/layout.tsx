import { requireServerRole } from "@/lib/server-auth";

/**
 * Admin-only route group layout.
 * Requires ADMIN role. Non-admin users are redirected to home.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireServerRole("ADMIN");

  return <>{children}</>;
}
