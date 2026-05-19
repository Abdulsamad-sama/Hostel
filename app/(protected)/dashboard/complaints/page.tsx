import { requireServerAuth } from "@/lib/server-auth";
import StudentComplaintsClient from "./StudentComplaints-client";
import OwnerComplaintsClient from "./OwnerComplaints-client";

export const metadata = {
  title: "Support Tickets & Complaints | HostelHub",
  description: "File and track support tickets regarding hostel listings.",
};

export default async function ComplaintsPage() {
  const user = await requireServerAuth();

  const isOwnerOrAgent = user.role === "OWNER" || user.role === "AGENT" || user.role === "ADMIN";

  return (
    <div className="min-h-screen">
      {isOwnerOrAgent ? (
        <OwnerComplaintsClient user={user} />
      ) : (
        <StudentComplaintsClient />
      )}
    </div>
  );
}
