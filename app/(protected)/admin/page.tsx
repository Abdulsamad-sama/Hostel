import { requireServerRole } from "@/lib/server-auth";
import PlatformSettingsToggle from "@/components/admin/Platform-settings";

/**
 * Admin dashboard — only accessible to users with ADMIN role.
 * Full admin features will be built in Unit 23.
 */
export default async function AdminPage() {
  const user = await requireServerRole("ADMIN");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Signed in as <span className="font-semibold text-foreground">{user.name}</span> (ADMIN).
          </p>
        </div>

        <PlatformSettingsToggle />

        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            More admin features (approve listings, manage users) will be built in Unit 23.
          </p>
        </div>
      </div>
    </div>
  );
}
