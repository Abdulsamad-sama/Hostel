import { Router } from "express";
import { settingsRouter } from "./settings.routes";
import propertyRouter from "./property.routes";

import adminRouter from "./admin.routes";
import bookingRouter from "./booking.routes";
import paymentRouter from "./payment.routes";
import complaintRouter from "./complaint.routes";

export const apiRouter = Router();

// Mount sub-routers
apiRouter.use("/settings", settingsRouter);
apiRouter.use("/properties", propertyRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/bookings", bookingRouter);
apiRouter.use("/payments", paymentRouter);
apiRouter.use("/complaints", complaintRouter);

apiRouter.get("/", (_req, res) => {
  res.json({ message: "HostelHub API v1" });
});
