import { PropertyRepository, CreatePropertyInput } from "../repositories/property.repository";
import { UserRepository } from "../repositories/user.repository";
import type { AuthUser } from "@/types";

export class PropertyService {
  /**
   * Create a new property and promote the user to OWNER.
   *
   * Business rules:
   * - Any authenticated user can create a property.
   * - After successful creation, the user's role is promoted to OWNER
   *   (if they are currently GUEST or OCCUPANT).
   * - ADMIN role is never modified.
   * - OWNER users keep their role (no change needed).
   */
  static async createProperty(user: AuthUser, data: Omit<CreatePropertyInput, "ownerId">) {
    // 1. Create the property
    const property = await PropertyRepository.create({
      ...data,
      ownerId: user.id,
    });

    // 2. Promote user role to OWNER (only upgrades, never downgrades)
    await UserRepository.promoteRole(user.id, "OWNER");

    return property;
  }

  static async getProperties(options: { 
    isAdmin?: boolean;
    search?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {}) {
    const queryOptions: any = {};
    
    if (!options.isAdmin) {
      queryOptions.isApproved = true;
    }
    
    if (options.search) queryOptions.search = options.search;
    if (options.location) queryOptions.location = options.location;
    if (options.minPrice !== undefined) queryOptions.minPrice = options.minPrice;
    if (options.maxPrice !== undefined) queryOptions.maxPrice = options.maxPrice;

    return PropertyRepository.findMany(queryOptions); 
  }

  /**
   * Admin: Approve a property so it appears publicly.
   */
  static async approveProperty(id: string) {
    return PropertyRepository.setApprovalStatus(id, true);
  }

  /**
   * Admin: Reject (unapprove) a property so it is hidden publicly.
   */
  static async rejectProperty(id: string) {
    return PropertyRepository.setApprovalStatus(id, false);
  }

  /**
   * Get a single property by ID.
   * Public users can only view approved properties.
   * Returns null if property not found or not approved.
   */
  static async getPropertyById(id: string, options: { isAdmin?: boolean } = {}) {
    const property = await PropertyRepository.findById(id);

    if (!property) {
      return null;
    }

    // Enforce invariant: unapproved listings must not appear publicly
    if (!options.isAdmin && !property.isApproved) {
      return null;
    }

    return property;
  }
}
