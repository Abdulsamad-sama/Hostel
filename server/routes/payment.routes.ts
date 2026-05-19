import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { PaymentController } from "../controllers/payment.controller";

const router = Router();

// Initialize Paystack transaction
router.post("/initialize", requireAuth, PaymentController.initializePayment);

// Verify Paystack transaction
router.post("/verify", requireAuth, PaymentController.verifyPayment);

export default router;
