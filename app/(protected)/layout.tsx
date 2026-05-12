import { requireServerAuth } from "@/lib/server-auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole={user.role} />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
