"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, MapPin, CreditCard, ShieldCheck, ShieldAlert, ArrowRight, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Installment = {
  id: string;
  amount: number;
  dueDate: string;
  status: "PENDING" | "PARTIAL" | "PAID" | "FAILED" | "REFUNDED";
  reference?: string;
  paidAt?: string;
};

type Booking = {
  id: string;
  reference: string;
  roomType: string;
  quantity: number;
  startDate: string;
  endDate: string;
  price: number;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "PENDING" | "PARTIAL" | "PAID" | "FAILED" | "REFUNDED";
  isInstallment: boolean;
  installments: Installment[];
  property: {
    id: string;
    title: string;
    address: string;
    city: string;
    state: string;
    images: { url: string[] }[];
  };
};

export default function BookingsClient() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingBookingId, setPayingBookingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/my");
        if (!res.ok) {
          throw new Error("Failed to load bookings");
        }
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handlePayment = async (bookingReference: string) => {
    setPayingBookingId(bookingReference);
    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingReference }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to initialize payment");
      }

      const { authorizationUrl } = await res.json();
      router.push(authorizationUrl);
    } catch (err: any) {
      alert(err.message || "Could not start payment flow. Please try again.");
    } finally {
      setPayingBookingId(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Confirmed</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pending Action</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "COMPLETED":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Completed</Badge>;
    }
  };

  const getPaymentBadge = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-600 text-white border-none">Paid</Badge>;
      case "PARTIAL":
        return <Badge className="bg-orange-500 text-white border-none">Partially Paid</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500 text-white border-none">Pending Payment</Badge>;
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-center">
        <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-xl font-semibold mb-2">Could Not Load Bookings</h2>
        <p className="mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">My Bookings & Payments</h1>
        <p className="text-muted-foreground mt-2">
          Track your active leases, view installment schedules, and make rent payments securely.
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card className="text-center py-12 border-dashed">
          <CardContent className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">No Bookings Found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              You haven't reserved any hostels yet. Explore local options to get started.
            </p>
            <Button onClick={() => router.push("/explore")} className="mt-4">
              Browse Hostels
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => {
            const propertyImage =
              booking.property.images?.[0]?.url?.[0] || "/placeholder-hostel.jpg";

            // Calculate paid amount
            let paidAmount = 0;
            if (booking.isInstallment) {
              paidAmount = booking.installments
                .filter((i) => i.status === "PAID")
                .reduce((acc, curr) => acc + curr.amount, 0);
            } else if (booking.paymentStatus === "PAID") {
              paidAmount = booking.totalAmount;
            }

            const progressPercent = Math.round((paidAmount / booking.totalAmount) * 100);

            return (
              <Card key={booking.id} className="border-border overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardDescription className="text-xs font-mono uppercase tracking-wider">
                        Booking Ref: {booking.reference}
                      </CardDescription>
                      <CardTitle className="text-xl mt-1 font-bold">
                        {booking.property.title}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.paymentStatus)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Property & Dates Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left: Image & Details */}
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-border">
                        <Image
                          src={propertyImage}
                          alt={booking.property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{booking.roomType} Room</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span>{booking.property.city}, {booking.property.state}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium pt-1">
                          ₦{booking.price.toLocaleString()}/month
                        </p>
                      </div>
                    </div>

                    {/* Middle: Lease details */}
                    <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Lease Details
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Move-in Date</p>
                          <p className="font-semibold mt-0.5">
                            {new Date(booking.startDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lease Term</p>
                          <p className="font-semibold mt-0.5">
                            {booking.endDate ? (
                              <>
                                {new Date(booking.endDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </>
                            ) : (
                              "Flexible"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Payment Progress Summary */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline text-sm">
                          <span className="text-muted-foreground">Payment Progress</span>
                          <span className="font-bold text-primary">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden border border-border">
                          <div
                            className="bg-primary h-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-right pt-0.5">
                          Paid {formatPrice(paidAmount)} of {formatPrice(booking.totalAmount)}
                        </p>
                      </div>

                      {booking.paymentStatus !== "PAID" && (
                        <Button
                          className="w-full mt-4"
                          onClick={() => handlePayment(booking.reference)}
                          disabled={payingBookingId === booking.reference}
                        >
                          {payingBookingId === booking.reference ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Redirecting to Paystack...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4 mr-2" />
                              {booking.isInstallment ? "Pay Next Installment" : "Pay Total Rent"}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Installments Table */}
                  {booking.isInstallment && (
                    <div className="border border-border rounded-lg overflow-hidden bg-card/50">
                      <div className="px-4 py-3 bg-muted/20 border-b border-border">
                        <h4 className="text-sm font-semibold flex items-center gap-1.5">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Installment Payment Schedule
                        </h4>
                      </div>
                      <div className="divide-y divide-border">
                        {booking.installments.map((installment, idx) => {
                          const isPaid = installment.status === "PAID";
                          const isPending = installment.status === "PENDING" || installment.status === "FAILED";

                          return (
                            <div
                              key={installment.id}
                              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 text-sm gap-2 transition-colors ${isPaid ? "bg-green-500/5" : ""
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-muted-foreground">
                                  #{idx + 1}
                                </span>
                                <div>
                                  <p className="font-semibold">{formatPrice(installment.amount)}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Due Date:{" "}
                                    {new Date(installment.dueDate).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                {isPaid ? (
                                  <div className="flex items-center gap-1 text-green-600 font-semibold text-xs bg-green-500/10 px-2.5 py-1 rounded-full">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Paid
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-yellow-600 font-semibold text-xs bg-yellow-500/10 px-2.5 py-1 rounded-full">
                                    <HelpCircle className="h-3.5 w-3.5" />
                                    Unpaid
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
