import type { Request, Response, NextFunction } from "express";
import { auth } from "@/lib/auth";
import type { AuthUser, UserRole } from "@/types";


/**
 * Middleware: verify that the request has a valid better-auth session.
 * Reads the session cookie from the incoming request headers.
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers as Record<string, string>),
    });

    if (!session || !session.user) {
      res.status(401).json({ error: "Unauthorized", code: "AUTH_REQUIRED" });
      return;
    }

    // Attach authenticated user to request
    req.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: (session.user as unknown as AuthUser).role ?? "GUEST",
      image: session.user.image,
    };

    next();
  } catch (err) {
    console.error("[auth] Session verification failed:", err);
    res.status(401).json({ error: "Invalid session", code: "AUTH_INVALID" });
  }
};

/**
 * Factory: returns middleware that checks the authenticated user
 * has one of the allowed roles.
 * Must be used AFTER requireAuth.
 */
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized", code: "AUTH_REQUIRED" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: `Role '${req.user.role}' is not authorized for this action`,
        code: "ROLE_DENIED",
      });
      return;
    }

    next();
  };
};

/**
 * Middleware: Check if the platform currently allows agent-related actions.
 */
export const requireAgentsEnabled = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { PlatformSettingsRepository } = await import(
      "../repositories/platform-settings.repository"
    );
    const settings = await PlatformSettingsRepository.getSettings();

    // Only enforce for AGENT role
    if (req.user?.role === "AGENT" && !settings.allowAgents) {
      res.status(403).json({
        error: "Agent activities are currently disabled by the administrator.",
        code: "AGENTS_DISABLED",
      });
      return;
    }

    next();
  } catch (err) {
    console.error("[auth] Failed to check platform settings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
