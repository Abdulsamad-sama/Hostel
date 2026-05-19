import { requireServerAuth } from "@/lib/server-auth";
import ComplaintsClient from "./Complaints-client";

export const metadata = {
  title: "Student Support Tickets | HostelHub",
  description: "Lodge and track support complaints regarding your hostel accommodations.",
};

export default async function StudentComplaintsPage() {
  // Enforce server-side authentication check
  await requireServerAuth();

  return <ComplaintsClient />;
}
