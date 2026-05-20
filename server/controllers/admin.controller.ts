import type { Request, Response } from "express";
import { PropertyService } from "../services/property.service";
import { UserService } from "../services/user.service";
import db from "@/lib/db";
import type { UserRole } from "@/types";

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

  /**
   * GET /api/admin/users
   * List all users
   */
  static async getUsers(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const users = await UserService.getUsers(req.user.role);
      return res.json(users);
    } catch (error: any) {
      console.error("[AdminController] Error fetching users:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch users" });
    }
  }

  /**
   * PATCH /api/admin/users/:id/role
   * Update a user's role
   */
  static async updateUserRole(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const id = req.params.id as string;
      const { role } = req.body;

      if (!role) {
        return res.status(400).json({ error: "Role is required" });
      }

      const updatedUser = await UserService.updateUserRole(req.user.role, id, role as UserRole);
      return res.json({ message: "User role updated successfully", user: updatedUser });
    } catch (error: any) {
      console.error("[AdminController] Error updating user role:", error);
      return res.status(500).json({ error: error.message || "Failed to update user role" });
    }
  }

  /**
   * GET /api/admin/stats
   * Return platform-wide aggregate metrics for the admin overview.
   */
  static async getStats(_req: Request, res: Response) {
    try {
      const [totalUsers, totalProperties, pendingProperties, approvedProperties, totalBookings, bookings] =
        await Promise.all([
          db.user.count(),
          db.property.count(),
          db.property.count({ where: { isApproved: false } }),
          db.property.count({ where: { isApproved: true } }),
          db.booking.count(),
          db.booking.findMany({
            where: { paymentStatus: { in: ["PAID", "PARTIAL"] } },
            select: { totalAmount: true },
          }),
        ]);

      const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

      return res.json({
        totalUsers,
        totalProperties,
        pendingProperties,
        approvedProperties,
        totalBookings,
        totalRevenue,
      });
    } catch (error) {
      console.error("[AdminController] Error fetching stats:", error);
      return res.status(500).json({ error: "Failed to fetch platform stats" });
    }
  }

  /**
   * DELETE /api/admin/users/:id
   * Delete a user
   */
  static async deleteUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const id = req.params.id as string;
      await UserService.deleteUser(req.user.role, id);
      return res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      console.error("[AdminController] Error deleting user:", error);
      return res.status(500).json({ error: error.message || "Failed to delete user" });
    }
  }
}
