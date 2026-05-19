import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

export class PaymentController {
  static async initializePayment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { reference } = req.body;

      if (!reference) {
        res.status(400).json({ error: "Booking reference is required" });
        return;
      }

      const result = await PaymentService.initializePayment(reference, userId);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("[Payment Initialize Error]:", error);
      res.status(400).json({ error: error.message || "Failed to initialize payment" });
    }
  }

  static async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { reference } = req.body;

      if (!reference) {
        res.status(400).json({ error: "Booking reference is required" });
        return;
      }

      const booking = await PaymentService.verifyPayment(reference, userId);
      res.status(200).json({
        message: "Payment verified successfully",
        booking,
      });
    } catch (error: any) {
      console.error("[Payment Verify Error]:", error);
      res.status(400).json({ error: error.message || "Failed to verify payment" });
    }
  }
}
