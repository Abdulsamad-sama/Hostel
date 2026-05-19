"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, MapPin, CreditCard, ChevronRight, Home, ShieldAlert, Sparkles, MessageSquare } from "lucide-react";

type Booking = {
  id: string;
  reference: string;
  roomType: string;
  startDate: string;
  totalAmount: number;
  paymentStatus: string;
  property: {
    title: string;
    city: string;
    state: string;
  };
};

export default function StudentDashboardClient({ user }: { user: any }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/my");
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error("Error loading bookings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-600 text-white border-none text-[10px]">Paid</Badge>;
      case "PARTIAL":
        return <Badge className="bg-orange-500 text-white border-none text-[10px]">Partially Paid</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500 text-white border-none text-[10px]">Unpaid</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px]">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const activeBooking = bookings[0];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Dynamic welcome header */}
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/10 relative overflow-hidden">
        <div className="absolute right-4 top-4 text-primary/20">
          <Sparkles className="h-16 w-16" />
        </div>
        <div className="space-y-2 max-w-lg">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground text-sm">
            {bookings.length > 0
              ? "Keep track of your active hostel leases, schedules, and rent payment transactions."
              : "Find and book premium student hostels near your campus instantly."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (2/3 width on desktop) */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Active Leases</h2>
            {bookings.length > 0 && (
              <Link href="/student/bookings" className="text-sm font-semibold text-primary flex items-center hover:underline">
                Manage Bookings <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {bookings.length === 0 ? (
            <Card className="border-dashed py-12 text-center">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">No Hostel Leases Found</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Reserve a room today and get premium features like student role verification and installment plans.
                </p>
                <Link href="/explore">
                  <Button className="mt-2">Browse Hostels</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">{activeBooking.property.title}</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{activeBooking.property.city}, {activeBooking.property.state}</span>
                    </div>
                  </div>
                  {getPaymentBadge(activeBooking.paymentStatus)}
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm bg-muted/20 p-4 rounded-lg border border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Move-in Date</p>
                    <p className="font-semibold mt-0.5">
                      {new Date(activeBooking.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Room Style</p>
                    <p className="font-semibold mt-0.5 capitalize">{activeBooking.roomType.toLowerCase()} Room</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Rent Amount</p>
                    <p className="font-bold text-lg text-primary">{formatPrice(activeBooking.totalAmount)}</p>
                  </div>
                  <Link href="/student/bookings">
                    <Button variant="outline" size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column (Quick Actions & Support) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Quick Actions</h2>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Services & Support</CardTitle>
              <CardDescription className="text-xs">Access student resources instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/explore" className="block">
                <Button className="w-full justify-start text-xs font-semibold" variant="outline">
                  <Home className="h-4 w-4 mr-2 text-primary" />
                  Explore Campuses
                </Button>
              </Link>
              <Link href="/student/bookings" className="block">
                <Button className="w-full justify-start text-xs font-semibold" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2 text-primary" />
                  Installment Schedules
                </Button>
              </Link>
              <Button className="w-full justify-start text-xs font-semibold" variant="outline" disabled>
                <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                Contact Property Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
