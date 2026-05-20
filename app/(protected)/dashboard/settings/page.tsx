import { requireServerAuth } from "@/lib/server-auth";
import SettingsClient from "./Settings-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | HostelHub",
  description: "Manage your account settings",
};

export default async function SettingsPage() {
  const user = await requireServerAuth();

  return (
    <div className="min-h-screen bg-background">
      <SettingsClient user={user} />
    </div>
  );
}
