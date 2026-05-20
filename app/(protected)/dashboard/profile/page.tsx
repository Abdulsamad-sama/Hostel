import { requireServerAuth } from "@/lib/server-auth";
import ProfileClient from "./Profile-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | HostelHub",
  description: "View and manage your profile",
};

export default async function ProfilePage() {
  const user = await requireServerAuth();

  return (
    <div className="min-h-screen bg-background">
      <ProfileClient user={user} />
    </div>
  );
}
