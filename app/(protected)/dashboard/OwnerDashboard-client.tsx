"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Home, Users, DollarSign, Key, CheckCircle, Clock, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Property = {
  id: string;
  title: string;
  price: number;
  priceType: "PER_MONTH" | "PER_YEAR";
  totalRooms: number;
  availableRooms: number;
  roomType: "SINGLE" | "SHARED";
  isApproved: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  images: { url: string[] }[];
};

type Booking = {
  id: string;
  reference: string;
  roomType: string;
  quantity: number;
  startDate: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "PENDING" | "PARTIAL" | "PAID" | "FAILED" | "REFUNDED";
  user: {
    name: string;
    email: string;
  };
  property: {
    title: string;
  };
};

type Analytics = {
  totalRevenue: number;
  activeBookings: number;
  occupiedRooms: number;
  totalRooms: number;
  totalListings: number;
};

export default function OwnerDashboardClient() {
  const [data, setData] = useState<{
    properties: Property[];
    bookings: Booking[];
    analytics: Analytics;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/properties/owner/dashboard");
        if (!res.ok) {
          throw new Error("Failed to load dashboard data");
        }
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-center">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-xl font-semibold mb-2">Could Not Load Dashboard</h2>
        <p className="mb-4">{error || "Something went wrong"}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const { properties, bookings, analytics } = data;

  const occupancyRate = analytics.totalRooms > 0
    ? Math.round((analytics.occupiedRooms / analytics.totalRooms) * 100)
    : 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Owner Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your listings, track occupant bookings, and monitor hostelling revenue.
          </p>
        </div>
        <Link href="/property/create">
          <Button className="shrink-0 bg-primary hover:bg-primary/90 transition-all font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Analytics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(analytics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">Sum of all confirmed payments</p>
          </CardContent>
        </Card>

        {/* Active Bookings */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Active Bookings
            </CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently confirmed tenants</p>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Occupancy Rate
            </CardTitle>
            <Key className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.occupiedRooms} of {analytics.totalRooms} rooms filled
            </p>
          </CardContent>
        </Card>

        {/* Total Listings */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Properties
            </CardTitle>
            <Home className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalListings}</div>
            <p className="text-xs text-muted-foreground mt-1">Total listings registered</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listings Section (Left & Center) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">My Properties</h2>
            <Link href="/property" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
              View All <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {properties.length === 0 ? (
            <Card className="border-dashed py-12 text-center">
              <CardContent className="space-y-3">
                <Home className="h-8 w-8 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-bold">No Properties Registered</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Get started by listing your hostel to start receiving occupant bookings.
                </p>
                <Link href="/property/create">
                  <Button className="mt-2">List Your First Hostel</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {properties.map((property) => {
                const img = property.images?.[0]?.url?.[0] || "/placeholder-hostel.jpg";
                return (
                  <Card key={property.id} className="overflow-hidden border-border flex flex-col justify-between">
                    <div>
                      <div className="relative h-40 w-full bg-muted">
                        <Image
                          src={img}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {property.isApproved ? (
                            <Badge className="bg-green-600 border-none text-white">Approved</Badge>
                          ) : (
                            <Badge className="bg-yellow-500 border-none text-white">Pending Moderation</Badge>
                          )}
                          <Badge variant="secondary" className="capitalize">{property.status.toLowerCase()}</Badge>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base line-clamp-1">{property.title}</CardTitle>
                        <CardDescription className="text-xs font-semibold text-primary mt-1">
                          {formatPrice(property.price)} / {property.priceType === "PER_MONTH" ? "month" : "year"}
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <CardContent className="px-4 pb-4 pt-0 text-xs text-muted-foreground flex justify-between items-center border-t border-border mt-auto pt-3">
                      <span>Room: <strong className="text-foreground">{property.roomType}</strong></span>
                      <span>Rooms: <strong className="text-foreground">{property.availableRooms}/{property.totalRooms}</strong></span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Bookings Section (Right) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Recent Bookings</h2>

          {bookings.length === 0 ? (
            <Card className="border-dashed py-12 text-center">
              <CardContent className="space-y-3">
                <Users className="h-8 w-8 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-bold">No Bookings Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Bookings will show up here once students reserve your listings.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => {
                const isPaid = booking.paymentStatus === "PAID";
                const isPartial = booking.paymentStatus === "PARTIAL";

                return (
                  <Card key={booking.id} className="border-border">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-bold text-sm line-clamp-1">{booking.property.title}</h4>
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">{booking.reference}</p>
                        </div>
                        {isPaid ? (
                          <Badge className="bg-green-600 border-none text-white text-[10px] px-2 py-0.5">Paid</Badge>
                        ) : isPartial ? (
                          <Badge className="bg-orange-500 border-none text-white text-[10px] px-2 py-0.5">Partial</Badge>
                        ) : (
                          <Badge className="bg-yellow-500 border-none text-white text-[10px] px-2 py-0.5">Unpaid</Badge>
                        )}
                      </div>

                      <Separator className="bg-border/50" />

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Tenant</p>
                          <p className="font-semibold text-foreground truncate mt-0.5">{booking.user.name}</p>
                          <p className="text-muted-foreground truncate text-[10px]">{booking.user.email}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Details</p>
                          <p className="font-semibold text-foreground mt-0.5 capitalize">{booking.roomType.toLowerCase()} Room</p>
                          <p className="text-muted-foreground text-[10px]">Qty: {booking.quantity}</p>
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
    </div>
  );
}
