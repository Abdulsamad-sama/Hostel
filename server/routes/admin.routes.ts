import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";

const router = Router();

// All admin routes require ADMIN role
router.use(requireAuth, requireRole("ADMIN"));

/**
 * @route   GET /api/admin/stats
 * @desc    Get platform-wide aggregate metrics
 * @access  Private (ADMIN)
 */
router.get("/stats", AdminController.getStats);

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

/**
 * @route   GET /api/admin/users
 * @desc    Get all users in the system
 * @access  Private (ADMIN)
 */
router.get("/users", AdminController.getUsers);

/**
 * @route   PATCH /api/admin/users/:id/role
 * @desc    Update a user's role
 * @access  Private (ADMIN)
 */
router.patch("/users/:id/role", AdminController.updateUserRole);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete a user
 * @access  Private (ADMIN)
 */
router.delete("/users/:id", AdminController.deleteUser);

export default router;
