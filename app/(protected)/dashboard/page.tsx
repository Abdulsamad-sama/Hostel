import { requireServerAuth } from "@/lib/server-auth";

/**
 * Dashboard page — only accessible to authenticated users.
 * The (protected) layout handles the auth check; this is an
 * example of reading the user object on a protected page.
 */
export default async function DashboardPage() {
  const user = await requireServerAuth();

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Welcome, <span className="font-semibold text-foreground">{user.name}</span>.
        Your role is <span className="font-mono text-primary">{user.role}</span>.
      </p>
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Dashboard content will be built in Phase 4 (Units 20–23).
        </p>
      </div>
    </div>
  );
}
