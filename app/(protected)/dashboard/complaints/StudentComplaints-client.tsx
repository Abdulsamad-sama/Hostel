"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, AlertCircle, PlusCircle, CheckCircle, HelpCircle, Clock, Search, ShieldAlert } from "lucide-react";

type Booking = {
  id: string;
  propertyId: string;
  property: {
    title: string;
  };
};

type Complaint = {
  id: string;
  subject: string;
  description: string;
  status: "PENDING" | "INVESTIGATING" | "RESOLVED" | "DISMISSED";
  createdAt: string;
  property: {
    title: string;
    city: string;
    state: string;
  };
};

export default function StudentComplaintsClient() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form fields
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch user's complaints
      const complaintsRes = await fetch("/api/complaints/my");
      if (!complaintsRes.ok) throw new Error("Failed to load complaints");
      const complaintsData = await complaintsRes.json();
      setComplaints(complaintsData);

      // Fetch user's bookings (to get lists of properties to complain about)
      const bookingsRes = await fetch("/api/bookings/my");
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
        if (bookingsData.length > 0) {
          setSelectedPropertyId(bookingsData[0].propertyId);
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropertyId || !subject.trim() || !description.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: selectedPropertyId,
          subject,
          description,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit complaint");
      }

      // Reset form and refresh list
      setSubject("");
      setDescription("");
      setIsOpen(false);
      await fetchData();
    } catch (err: any) {
      alert(err.message || "Failed to submit complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: Complaint["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-red-500 border-none text-white flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "INVESTIGATING":
        return <Badge className="bg-yellow-500 border-none text-white flex items-center gap-1"><ShieldAlert className="h-3 w-3" /> Investigating</Badge>;
      case "RESOLVED":
        return <Badge className="bg-green-600 border-none text-white flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Resolved</Badge>;
      case "DISMISSED":
        return <Badge className="bg-gray-500 border-none text-white flex items-center gap-1"><HelpCircle className="h-3 w-3" /> Dismissed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Support & Complaints</h1>
          <p className="text-muted-foreground mt-1">
            File issues or complaints regarding your booked hostels and track their resolution status.
          </p>
        </div>

        {bookings.length > 0 && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary font-semibold flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Lodge Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>File a New Complaint</DialogTitle>
                  <DialogDescription>
                    Provide detailed information about the issue you are experiencing.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 my-4">
                  {/* Select Property */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Hostel</label>
                    <select
                      value={selectedPropertyId}
                      onChange={(e) => setSelectedPropertyId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      {bookings.map((booking) => (
                        <option key={booking.id} value={booking.propertyId}>
                          {booking.property.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject</label>
                    <Input
                      type="text"
                      placeholder="e.g. Broken plumbing, power failure, room damage"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                    <Textarea
                      placeholder="Describe the issue in details so the hostel owner can assist you as fast as possible."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Ticket"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {error && (
        <Card className="border-destructive/30 bg-destructive/5 text-destructive p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </Card>
      )}

      {/* Main List Area */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets by subject, description or property name..."
            className="pl-9 bg-muted/30 border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredComplaints.length === 0 ? (
          <Card className="border-dashed py-12 text-center">
            <CardContent className="space-y-3">
              <ShieldAlert className="h-10 w-10 mx-auto text-muted-foreground/65" />
              <h3 className="text-lg font-bold">No Complaint Tickets Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {bookings.length === 0
                  ? "You must have an active lease booking before you can lodge support complaints."
                  : "If you have any active issue in your hostel room, click the button above to start."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="border-border hover:border-border/80 hover:bg-muted/5 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-primary">{complaint.property.title}</span>
                      <CardTitle className="text-lg font-bold mt-0.5">{complaint.subject}</CardTitle>
                    </div>
                    <div>{getStatusBadge(complaint.status)}</div>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1 mt-1">
                    <span>Filed on</span>
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
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  {complaint.description}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
