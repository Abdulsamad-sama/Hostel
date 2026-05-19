import db from "@/lib/db";
import { RoomType } from "@/lib/generated/prisma/client";

export type CreateBookingInput = {
  reference: string;
  userId: string;
  propertyId: string;
  roomType: RoomType;
  quantity: number;
  startDate: Date;
  endDate?: Date;
  price: number;
  totalAmount: number;
  expiresAt?: Date;
  isInstallment?: boolean;
  installments?: {
    amount: number;
    dueDate: Date;
  }[];
};

export class BookingRepository {
  /**
   * Create a booking and decrease available rooms in a transaction.
   * Throws if not enough rooms.
   */
  static async createWithReservation(data: CreateBookingInput) {
    return db.$transaction(async (prisma) => {
      // 1. Lock the property or at least verify it exists and has enough rooms
      const property = await prisma.property.findUnique({
        where: { id: data.propertyId },
        select: { availableRooms: true, isApproved: true },
      });

      if (!property) {
        throw new Error("Property not found");
      }

      if (!property.isApproved) {
        throw new Error("Property is not approved for booking");
      }

      if (property.availableRooms < data.quantity) {
        throw new Error("Not enough rooms available");
      }

      // 2. Decrease available rooms
      await prisma.property.update({
        where: { id: data.propertyId },
        data: {
          availableRooms: {
            decrement: data.quantity,
          },
        },
      });

      // 3. Create booking
      const { installments, ...bookingData } = data;
      
      const booking = await prisma.booking.create({
        data: {
          ...bookingData,
          status: "PENDING",
          paymentStatus: "PENDING",
          installments: installments && installments.length > 0 ? {
            create: installments
          } : undefined
        },
      });

      return booking;
    });
  }

  static async findById(id: string) {
    return db.booking.findUnique({
      where: { id },
      include: { property: true, user: { select: { id: true, name: true, email: true } } },
    });
  }

  static async findByReference(reference: string) {
    return db.booking.findUnique({
      where: { reference },
      include: { property: true },
    });
  }
}
