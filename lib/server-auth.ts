import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthUser, UserRole } from "@/types";

/**
 * Get the current authenticated session in a Next.js Server Component or
 * Server Action. Returns null if not authenticated.
 */
export async function getServerSession(): Promise<{ user: AuthUser } | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) return null;

    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: ((session.user as Record<string, unknown>).role as UserRole) ?? "GUEST",
        image: session.user.image,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Require authentication in a Server Component.
 * Redirects to /auth/login if not authenticated, preserving the original
 * destination URL so the user lands there after signing in.
 */
export async function requireServerAuth(): Promise<AuthUser> {
  const session = await getServerSession();
  if (!session) {
    // Read the path from the proxy header to build the redirect URL
    const headerList = await headers();
    const currentPath = headerList.get("x-current-path") || "/dashboard";
    redirect(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
  }
  return session.user;
}

/**
 * Require a specific role in a Server Component.
 * Redirects to /auth/login if not authenticated,
 * or to / (home) if the role doesn't match.
 */
export async function requireServerRole(
  ...allowedRoles: UserRole[]
): Promise<AuthUser> {
  const user = await requireServerAuth();
  if (!allowedRoles.includes(user.role)) {
    redirect("/");
  }
  return user;
}
