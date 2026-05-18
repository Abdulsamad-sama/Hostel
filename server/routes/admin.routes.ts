import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";

const router = Router();

// All admin routes require ADMIN role
router.use(requireAuth, requireRole("ADMIN"));

/**
 * @route   GET /api/admin/properties
 * @desc    Get all properties (including unapproved)
 * @access  Private (ADMIN)
 */
router.get("/properties", AdminController.getProperties);

/**
 * @route   PATCH /api/admin/properties/:id/approve
 * @desc    Approve a property
 * @access  Private (ADMIN)
 */
router.patch("/properties/:id/approve", AdminController.approveProperty);

/**
 * @route   PATCH /api/admin/properties/:id/reject
 * @desc    Reject (unapprove) a property
 * @access  Private (ADMIN)
 */
router.patch("/properties/:id/reject", AdminController.rejectProperty);

export default router;
