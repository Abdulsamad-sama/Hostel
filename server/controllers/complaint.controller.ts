import type { Request, Response } from "express";
import { ComplaintService } from "../services/complaint.service";
import { ComplaintStatus } from "@/lib/generated/prisma/client";

export class ComplaintController {
  /**
   * POST /api/complaints
   * Submit a new student complaint for a specific property.
   */
  static async submitComplaint(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { propertyId, subject, description } = req.body;

      if (!propertyId || !subject || !description) {
        return res.status(400).json({ error: "Missing required fields: propertyId, subject, and description are required" });
      }

      const complaint = await ComplaintService.createComplaint({
        userId: req.user.id,
        propertyId,
        subject,
        description,
      });

      return res.status(201).json({
        message: "Complaint submitted successfully",
        complaint,
      });
    } catch (error: any) {
      console.error("[ComplaintController] Error submitting complaint:", error);
      return res.status(500).json({ error: error.message || "Failed to submit complaint" });
    }
  }

  /**
   * GET /api/complaints/my
   * Retrieve complaints submitted by the authenticated student.
   */
  static async getMyComplaints(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const complaints = await ComplaintService.getStudentComplaints(req.user.id);
      return res.json(complaints);
    } catch (error: any) {
      console.error("[ComplaintController] Error fetching student complaints:", error);
      return res.status(500).json({ error: "Failed to fetch complaints" });
    }
  }

  /**
   * GET /api/complaints/owner
   * Retrieve complaints received by properties owned by the authenticated owner.
   */
  static async getOwnerComplaints(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (req.user.role !== "OWNER" && req.user.role !== "AGENT" && req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Access denied: Owners/agents only" });
      }

      const complaints = await ComplaintService.getOwnerComplaints(req.user.id);
      return res.json(complaints);
    } catch (error: any) {
      console.error("[ComplaintController] Error fetching owner complaints:", error);
      return res.status(500).json({ error: "Failed to fetch complaints" });
    }
  }

  /**
   * PATCH /api/complaints/:id/status
   * Update the status of a complaint (e.g., from PENDING to INVESTIGATING or RESOLVED).
   */
  static async updateComplaintStatus(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const id = req.params.id as string;
      const { status } = req.body;

      if (!status || !Object.values(ComplaintStatus).includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      const complaint = await ComplaintService.updateComplaintStatus(
        id,
        status as ComplaintStatus,
        req.user.id,
        req.user.role
      );

      return res.json({
        message: "Complaint status updated successfully",
        complaint,
      });
    } catch (error: any) {
      console.error("[ComplaintController] Error updating complaint status:", error);
      return res.status(500).json({ error: error.message || "Failed to update complaint status" });
    }
  }
}
