import { Suspense } from "react";
import { requireServerAuth } from "@/lib/server-auth";
import ExplorePropertiesClient from "@/components/property/Explore-client";

export default async function ExplorePage() {
  // We don't require auth to view properties, it's public.
  // But if we want to show user-specific UI (like saved properties), we can check session.
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Hostels</h1>
          <p className="text-muted-foreground mt-2">
            Find the perfect student accommodation in your area.
          </p>
        </div>

        <Suspense fallback={<div className="text-muted-foreground">Loading properties...</div>}>
          <ExplorePropertiesClient />
        </Suspense>
      </div>
    </div>
  );
}
