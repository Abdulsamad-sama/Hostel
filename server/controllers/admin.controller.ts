import type { Request, Response } from "express";
import { PropertyService } from "../services/property.service";

export class AdminController {
  /**
   * GET /api/admin/properties
   * List all properties (approved and unapproved)
   */
  static async getProperties(req: Request, res: Response) {
    try {
      const properties = await PropertyService.getProperties({ isAdmin: true });
      return res.json(properties);
    } catch (error) {
      console.error("[AdminController] Error fetching properties:", error);
      return res.status(500).json({ error: "Failed to fetch properties" });
    }
  }

  /**
   * PATCH /api/admin/properties/:id/approve
   */
  static async approveProperty(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const property = await PropertyService.approveProperty(id);
      return res.json({ message: "Property approved", property });
    } catch (error) {
      console.error("[AdminController] Error approving property:", error);
      return res.status(500).json({ error: "Failed to approve property" });
    }
  }

  /**
   * PATCH /api/admin/properties/:id/reject
   */
  static async rejectProperty(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const property = await PropertyService.rejectProperty(id);
      return res.json({ message: "Property rejected", property });
    } catch (error) {
      console.error("[AdminController] Error rejecting property:", error);
      return res.status(500).json({ error: "Failed to reject property" });
    }
  }
}
