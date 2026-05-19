import type { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/booking.service";
import { createBookingSchema } from "@/schema";

export class BookingController {
  static async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Validate input
      const validation = createBookingSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Validation failed", details: validation.error.issues });
      }

      const booking = await BookingService.createBooking({
        propertyId: validation.data.propertyId,
        userId: user.id,
        startDate: validation.data.startDate,
        quantity: validation.data.quantity,
        duration: validation.data.duration,
        isInstallment: validation.data.isInstallment,
      });

      return res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  }

  static async getMyBookings(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const bookings = await BookingService.getUserBookings(user.id);
      return res.json(bookings);
    } catch (error) {
      next(error);
    }
  }
}
