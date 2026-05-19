"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

function VerifyPaymentInner({ reference }: { reference: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trxref = searchParams.get("reference") || searchParams.get("trxref") || reference;

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: trxref }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to verify payment");
        }

        setStatus("success");
        setMessage("Your payment was successful and your booking is confirmed!");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "We could not verify your payment.");
      }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference]);

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <Card className="border-border">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            {status === "loading" && (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="h-16 w-16 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === "loading" && "Verifying Payment"}
            {status === "success" && "Payment Successful!"}
            {status === "error" && "Payment Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <p className="text-muted-foreground mb-6">{message}</p>

          <div className="space-y-3">
            {status === "success" ? (
              <Button
                className="w-full"
                onClick={() => router.push("/student/dashboard")}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : status === "error" ? (
              <Button
                className="w-full"
                variant="default"
                onClick={() => router.push("/explore")}
              >
                Return to Explore
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPaymentClient({ reference }: { reference: string }) {
  return (
    <Suspense fallback={<div className="p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>}>
      <VerifyPaymentInner reference={reference} />
    </Suspense>
  );
}
