import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

// Only authenticated users can create a booking
router.post("/", requireAuth, BookingController.createBooking);

// Get logged-in user's bookings
router.get("/my", requireAuth, BookingController.getMyBookings);

export default router;
