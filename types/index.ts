/**
 * Shared type definitions used across frontend and backend.
 * See: context/code-standards.md §1 (prefer `type` over `interface`)
 */

// ─── Roles ───

export type UserRole = "STUDENT" | "OWNER" | "AGENT" | "ADMIN";

// ─── Authenticated User (attached to request after auth middleware) ───

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
};

export type AuthSession = {
  user: AuthUser;
  session: {
    id: string;
    token: string;
    expiresAt: Date;
  };
};

// ─── API Error Response ───

export type ApiErrorResponse = {
  error: string;
  code: string;
};
