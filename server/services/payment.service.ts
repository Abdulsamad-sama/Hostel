import db from "@/lib/db";

export class PaymentService {
  /**
   * Initializes a transaction with Paystack using the Booking Reference.
   */
  static async initializePayment(bookingReference: string, userId: string) {
    const booking = await db.booking.findUnique({
      where: { reference: bookingReference },
      include: { user: true, installments: { orderBy: { dueDate: 'asc' } } },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.userId !== userId) {
      throw new Error("Unauthorized to pay for this booking");
    }

    if (booking.paymentStatus === "PAID") {
      throw new Error("Booking is already fully paid");
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      throw new Error("Payment gateway is not configured");
    }

    let amountToPay = booking.totalAmount;
    let paystackRef = booking.reference;
    let metadata: any = {
      bookingId: booking.id,
      userId: booking.userId,
      propertyId: booking.propertyId,
    };

    if (booking.isInstallment) {
      const nextInstallment = booking.installments.find(i => i.status === "PENDING" || i.status === "FAILED");
      if (!nextInstallment) {
        throw new Error("No pending installments found");
      }

      amountToPay = nextInstallment.amount;
      paystackRef = nextInstallment.reference || `INST-${nextInstallment.id.slice(0,8)}-${Date.now()}`;
      
      if (!nextInstallment.reference) {
        await db.installment.update({
          where: { id: nextInstallment.id },
          data: { reference: paystackRef },
        });
      }

      metadata.installmentId = nextInstallment.id;
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: booking.user.email,
          amount: amountToPay * 100, // Paystack expects amount in lowest denomination (kobo)
          reference: paystackRef,
          callback_url: `${
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
          }/student/bookings/${booking.reference}/verify`, // Always redirect back to booking verify page
          metadata,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to initialize payment");
    }

    return {
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      reference: data.data.reference,
    };
  }

  /**
   * Verifies the payment with Paystack and updates the Booking status.
   */
  static async verifyPayment(reference: string, userId: string) {
    let booking = await db.booking.findUnique({ where: { reference } });
    let installment = await db.installment.findUnique({ where: { reference }, include: { booking: true } });

    if (!booking && !installment) {
      throw new Error("Transaction reference not found");
    }

    const actualBooking = booking || installment?.booking;

    if (!actualBooking || actualBooking.userId !== userId) {
      throw new Error("Unauthorized to verify this payment");
    }

    if (installment && installment.status === "PAID") {
      return actualBooking;
    }

    if (!installment && actualBooking.paymentStatus === "PAID") {
      return actualBooking;
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      throw new Error("Payment gateway is not configured");
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to verify payment");
    }

    if (data.data.status === "success") {
      if (installment) {
        // Update installment
        await db.installment.update({
          where: { id: installment.id },
          data: { status: "PAID", paidAt: new Date() },
        });

        // Check if all installments are paid
        const allInstallments = await db.installment.findMany({
          where: { bookingId: actualBooking.id },
        });

        const allPaid = allInstallments.every((i) => i.status === "PAID" || i.id === installment?.id);

        await db.booking.update({
          where: { id: actualBooking.id },
          data: {
            paymentStatus: allPaid ? "PAID" : "PARTIAL",
            status: "CONFIRMED", // Booking is confirmed on first payment
          },
        });
      } else {
        await db.booking.update({
          where: { id: actualBooking.id },
          data: {
            paymentStatus: "PAID",
            status: "CONFIRMED",
          },
        });
      }
      return actualBooking;
    } else {
      if (installment) {
        await db.installment.update({
          where: { id: installment.id },
          data: { status: "FAILED" },
        });
      } else {
        await db.booking.update({
          where: { id: actualBooking.id },
          data: { paymentStatus: "FAILED" },
        });
      }
      throw new Error(`Payment verification failed: ${data.data.gateway_response}`);
    }
  }
}
