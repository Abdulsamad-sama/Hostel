import { Router } from "express";
import { settingsRouter } from "./settings.routes";
import propertyRouter from "./property.routes";

export const apiRouter = Router();

// Mount sub-routers
apiRouter.use("/settings", settingsRouter);
apiRouter.use("/properties", propertyRouter);

apiRouter.get("/", (_req, res) => {
  res.json({ message: "HostelHub API v1" });
});
