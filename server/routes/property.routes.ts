import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { requireAuth, requireRole, requireAgentsEnabled } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route   POST /api/properties
 * @desc    Create a new property listing
 * @access  Private (OWNER, AGENT)
 * @checks  Agents disabled toggle
 */
router.post(
  "/",
  requireAuth,
  requireRole("OWNER", "AGENT"),
  requireAgentsEnabled,
  PropertyController.createProperty
);

/**
 * @route   GET /api/properties/:id
 * @desc    Get property details
 * @access  Public
 */
router.get("/:id", PropertyController.getProperty);

export default router;
