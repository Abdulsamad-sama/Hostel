import { UserRepository } from "../repositories/user.repository";
import type { UserRole } from "@/types";

export class UserService {
  /**
   * Get all users in the system. Requires ADMIN role.
   */
  static async getUsers(adminRole: string) {
    if (adminRole !== "ADMIN") {
      throw new Error("Forbidden: Admin access required");
    }
    return UserRepository.findMany();
  }

  /**
   * Update a user's role. Requires ADMIN role.
   */
  static async updateUserRole(adminRole: string, userId: string, newRole: UserRole) {
    if (adminRole !== "ADMIN") {
      throw new Error("Forbidden: Admin access required");
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Safety checks: do not allow changing an admin's role to prevent accidental lockout
    if (user.role === "ADMIN" && newRole !== "ADMIN") {
      throw new Error("Cannot change role of an ADMIN user");
    }

    return UserRepository.update(userId, { role: newRole });
  }

  /**
   * Delete a user. Requires ADMIN role.
   */
  static async deleteUser(adminRole: string, userId: string) {
    if (adminRole !== "ADMIN") {
      throw new Error("Forbidden: Admin access required");
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Safety checks: do not allow deleting an ADMIN
    if (user.role === "ADMIN") {
      throw new Error("Cannot delete an ADMIN user");
    }

    return UserRepository.delete(userId);
  }
}
