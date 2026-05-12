import { Router } from "express";
import { PlatformSettingsController } from "../controllers/platform-settings.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";

export const settingsRouter = Router();

/**
 * Publicly accessible to check platform status (e.g. if agents are allowed)
 */
settingsRouter.get("/", PlatformSettingsController.getSettings);

/**
 * Only Admins can update platform settings
 */
settingsRouter.patch(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  PlatformSettingsController.updateSettings
);
