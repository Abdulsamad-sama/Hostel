import type { Request, Response } from "express";
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

      // 3. Create property via service (handles role promotion)
      const { PropertyService } = await import("../services/property.service");
      const property = await PropertyService.createProperty(req.user, {
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
   * Returns a single property. Public users only see approved properties.
   */
  static async getProperty(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { PropertyService } = await import("../services/property.service");
      const property = await PropertyService.getPropertyById(id);

      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      return res.json(property);
    } catch (error) {
      console.error("[PropertyController] Error fetching property:", error);
      return res.status(500).json({ error: "Failed to fetch property" });
    }
  }

  static async getProperties(req: Request, res: Response) {
    try {
      const { search, location, minPrice, maxPrice } = req.query;
      
      const options: any = {};
      
      if (typeof search === 'string' && search.trim() !== '') {
        options.search = search.trim();
      }
      
      if (typeof location === 'string' && location.trim() !== '') {
        options.location = location.trim();
      }
      
      if (typeof minPrice === 'string' && !isNaN(Number(minPrice))) {
        options.minPrice = Number(minPrice);
      }
      
      if (typeof maxPrice === 'string' && !isNaN(Number(maxPrice))) {
        options.maxPrice = Number(maxPrice);
      }

      const { PropertyService } = await import("../services/property.service");
      const properties = await PropertyService.getProperties(options);
      return res.json(properties);
    } catch (error) {
      console.error("[PropertyController] Error fetching properties:", error);
      return res.status(500).json({ error: "Failed to fetch properties" });
    }
  }
}
