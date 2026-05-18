import db from "@/lib/db";
import type { UserRole } from "@/types";

export class UserRepository {
  /**
   * Promote a user's role if their current role is lower in the hierarchy.
   * Hierarchy: GUEST → OCCUPANT → OWNER (ADMIN is not promotable).
   *
   * Returns the updated user, or the unchanged user if no promotion occurred.
   */
  static async promoteRole(userId: string, newRole: UserRole) {
    const roleHierarchy: Record<string, number> = {
      GUEST: 0,
      OCCUPANT: 1,
      OWNER: 2,
      AGENT: 2,
      ADMIN: 99,
    };

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    const currentLevel = roleHierarchy[user.role] ?? 0;
    const newLevel = roleHierarchy[newRole] ?? 0;

    // Only promote — never demote. ADMIN is never changed.
    if (user.role === "ADMIN" || newLevel <= currentLevel) {
      return user;
    }

    return db.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
  }

  /**
   * Find a user by ID.
   */
  static async findById(userId: string) {
    return db.user.findUnique({ where: { id: userId } });
  }
}
