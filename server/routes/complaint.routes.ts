import { Router } from "express";
import { ComplaintController } from "../controllers/complaint.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route   POST /api/complaints
 * @desc    Submit a new complaint regarding a hostel/room
 * @access  Private (Student)
 */
router.post("/", requireAuth, ComplaintController.submitComplaint);

/**
 * @route   GET /api/complaints/my
 * @desc    Get all complaints filed by the logged-in student
 * @access  Private (Student)
 */
router.get("/my", requireAuth, ComplaintController.getMyComplaints);

/**
 * @route   GET /api/complaints/owner
 * @desc    Get all complaints filed against properties owned by the logged-in owner
 * @access  Private (Owner/Agent)
 */
router.get("/owner", requireAuth, ComplaintController.getOwnerComplaints);

/**
 * @route   PATCH /api/complaints/:id/status
 * @desc    Update complaint status
 * @access  Private (Owner/Agent/Admin)
 */
router.patch("/:id/status", requireAuth, ComplaintController.updateComplaintStatus);

export default router;
