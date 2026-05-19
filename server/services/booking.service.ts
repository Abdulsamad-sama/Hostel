import { PropertyRepository } from "../repositories/property.repository";
import { BookingRepository } from "../repositories/booking.repository";
import { randomUUID } from "crypto";
import db from "@/lib/db";

export type CreateBookingPayload = {
  propertyId: string;
  userId: string;
  startDate: string | Date;
  quantity?: number;
  duration?: number; // e.g. 1 (year) or 12 (months)
  isInstallment?: boolean;
};

export class BookingService {
  static async createBooking(payload: CreateBookingPayload) {
    const { propertyId, userId, startDate, quantity = 1, duration = 1, isInstallment = false } = payload;

    // 1. Fetch property to get price and rules
    const property = await PropertyRepository.findById(propertyId);
    if (!property) {
      const err = new Error("Property not found");
      (err as any).statusCode = 404;
      throw err;
    }

    if (!property.isApproved) {
      const err = new Error("Property is not available for booking");
      (err as any).statusCode = 400;
      throw err;
    }

    if (property.availableRooms < quantity) {
      const err = new Error(`Only ${property.availableRooms} rooms available`);
      (err as any).statusCode = 400;
      throw err;
    }

    // 2. Calculate dates and amounts
    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      const err = new Error("Invalid start date");
      (err as any).statusCode = 400;
      throw err;
    }

    let endDate = new Date(start);
    let totalAmount: number;

    if (property.priceType === "PER_YEAR") {
      endDate.setFullYear(endDate.getFullYear() + duration);
      totalAmount = property.price * quantity * duration;
    } else {
      endDate.setMonth(endDate.getMonth() + duration);
      totalAmount = property.price * quantity * duration;
    }

    // Installment logic
    let installments: { amount: number; dueDate: Date }[] = [];
    if (isInstallment) {
      if (property.priceType !== "PER_YEAR" && duration < 6) {
        const err = new Error("Installment plans are only available for annual rentals or 6+ months");
        (err as any).statusCode = 400;
        throw err;
      }
      
      // Standard 40% / 30% / 30% split
      const amt1 = Math.round(totalAmount * 0.4);
      const amt2 = Math.round(totalAmount * 0.3);
      const amt3 = totalAmount - amt1 - amt2; // To avoid rounding errors

      const date1 = new Date(start); // Due immediately / on start date
      const date2 = new Date(start);
      date2.setMonth(date2.getMonth() + 3); // 3 months later
      const date3 = new Date(start);
      date3.setMonth(date3.getMonth() + 6); // 6 months later

      installments = [
        { amount: amt1, dueDate: date1 },
        { amount: amt2, dueDate: date2 },
        { amount: amt3, dueDate: date3 },
      ];
    }

    // 3. Generate reference
    const reference = `BKG-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;

    // 4. Set expiration for pending booking (e.g. 1 hour to complete payment)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // 5. Create via repository
    const booking = await BookingRepository.createWithReservation({
      reference,
      userId,
      propertyId,
      roomType: property.roomType,
      quantity,
      startDate: start,
      endDate,
      price: property.price,
      totalAmount,
      expiresAt,
      isInstallment,
      installments: isInstallment ? installments : undefined,
    });

    return booking;
  }

  static async getUserBookings(userId: string) {
    return db.booking.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            images: true,
          },
        },
        installments: {
          orderBy: { dueDate: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
