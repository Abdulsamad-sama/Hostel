import type { Request, Response } from "express";
import { PropertyRepository } from "../repositories/property.repository";
import { propertySchema } from "@/schema";

export class PropertyController {
  /**
   * POST /properties
   * Create a new property listing.
   */
  static async createProperty(req: Request, res: Response) {
    try {
      // 1. Validate input
      const validation = propertySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: validation.error.format(),
        });
      }

      // 2. Ensure user is attached (by requireAuth)
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // 3. Create property via repository
      const property = await PropertyRepository.create({
        hostelName: validation.data.title,
        description: validation.data.description,
        address: validation.data.address,
        city: validation.data.city,
        state: validation.data.state,
        country: validation.data.country,
        price: validation.data.price,
        priceType: validation.data.priceType,
        totalRooms: validation.data.totalRooms,
        availableRooms: validation.data.availableRooms,
        roomType: validation.data.roomType,
        bookingType: validation.data.bookingType,
        ownerId: req.user.id,
        images: validation.data.images,
      });

      return res.status(201).json({
        message: "Property created successfully",
        property,
      });
    } catch (error) {
      console.error("[PropertyController] Error creating property:", error);
      return res.status(500).json({ error: "Failed to create property" });
    }
  }

  /**
   * GET /properties/:id
   */
  static async getProperty(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const property = await PropertyRepository.findById(id);

      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      return res.json(property);
    } catch (error) {
      console.error("[PropertyController] Error fetching property:", error);
      return res.status(500).json({ error: "Failed to fetch property" });
    }
  }
}
