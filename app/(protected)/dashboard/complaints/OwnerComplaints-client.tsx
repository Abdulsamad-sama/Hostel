"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertCircle, CheckCircle, HelpCircle, Clock, Search, ShieldAlert, ArrowUpDown, User } from "lucide-react";

type Complaint = {
  id: string;
  subject: string;
  description: string;
  status: "PENDING" | "INVESTIGATING" | "RESOLVED" | "DISMISSED";
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  property: {
    title: string;
  };
};

export default function OwnerComplaintsClient({ user }: { user: any }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/complaints/owner");
      if (!res.ok) {
        throw new Error("Failed to load complaints data");
      }
      const data = await res.json();
      setComplaints(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading complaints.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (complaintId: string, newStatus: string) => {
    try {
      setUpdatingId(complaintId);
      const res = await fetch(`/api/complaints/${complaintId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update complaint status");
      }

      // Update state locally
      setComplaints((prev) =>
        prev.map((c) => (c.id === complaintId ? { ...c, status: newStatus as any } : c))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update ticket status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-red-500 text-white";
      case "INVESTIGATING":
        return "bg-yellow-500 text-white";
      case "RESOLVED":
        return "bg-green-600 text-white";
      case "DISMISSED":
        return "bg-gray-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Manage Support Tickets</h1>
        <p className="text-muted-foreground mt-1">
          Review and resolve complaints submitted by students residing in your listed hostels.
        </p>
      </div>

      {error && (
        <Card className="border-destructive/30 bg-destructive/5 text-destructive p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </Card>
      )}

      {/* Main List Area */}
      <div className="space-y-4">
        {/* Search & Actions Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets by subject, description, hostel title, student name or email..."
            className="pl-9 bg-muted/30 border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredComplaints.length === 0 ? (
          <Card className="border-dashed py-12 text-center">
            <CardContent className="space-y-3">
              <CheckCircle className="h-10 w-10 mx-auto text-green-500" />
              <h3 className="text-lg font-bold">No Support Tickets Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Excellent! There are no outstanding student complaints regarding your property listings.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredComplaints.map((complaint) => {
              const isUpdating = updatingId === complaint.id;

              return (
                <Card key={complaint.id} className="border-border hover:border-border/80 hover:bg-muted/5 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-primary">{complaint.property.title}</span>
                        <CardTitle className="text-lg font-bold mt-0.5">{complaint.subject}</CardTitle>
                      </div>
                      <Badge className={`${getStatusColor(complaint.status)} border-none text-xs capitalize py-1 px-3 shrink-0`}>
                        {complaint.status.toLowerCase()}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs flex items-center gap-1 mt-1">
                      <span>Submitted on</span>
                      <strong className="text-foreground">
                        {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Complaint Details */}
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap bg-muted/20 p-4 rounded-lg border border-border/40">
                      {complaint.description}
                    </div>

                    <Separator className="bg-border/60" />

                    {/* Tenant Info & Status Management Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Left: Tenant profile */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-foreground">{complaint.user.name}</p>
                          <p className="text-muted-foreground">{complaint.user.email}</p>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">Update Status:</span>
                        <select
                          disabled={isUpdating}
                          value={complaint.status}
                          onChange={(e) => handleUpdateStatus(complaint.id, e.target.value)}
                          className="text-xs font-semibold h-8 rounded-md border border-input bg-background px-2 py-1 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="INVESTIGATING">Investigating</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="DISMISSED">Dismissed</option>
                        </select>
                        {isUpdating && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
