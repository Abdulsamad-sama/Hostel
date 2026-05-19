import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { requireAuth, requireAgentsEnabled } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route   POST /api/properties
 * @desc    Create a new property listing (promotes user to OWNER)
 * @access  Private
 * @checks  Agents disabled toggle
 */
router.post(
  "/",
  requireAuth,
  requireAgentsEnabled,
  PropertyController.createProperty
);

/**
 * @route   GET /api/properties/owner/dashboard
 * @desc    Get owner's listings, bookings, and dashboard analytics
 * @access  Private (OWNER/AGENT)
 */
router.get("/owner/dashboard", requireAuth, PropertyController.getOwnerDashboard);

/**
 * @route   GET /api/properties/:id
 * @desc    Get property details
 * @access  Public
 */
router.get("/:id", PropertyController.getProperty);

/**
 * @route   GET /api/properties
 * @desc    Get all approved properties
 * @access  Public
 */
router.get("/", PropertyController.getProperties);

export default router;
