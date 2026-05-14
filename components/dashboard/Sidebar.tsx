"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Calendar,
  User,
  Settings,
  Building2,
  Users,
  ShieldCheck,
  PlusSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

type SidebarLink = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: UserRole[];
};

const sidebarLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Bookings",
    href: "/dashboard/bookings",
    icon: Calendar,
    roles: ["OCCUPANT"],
  },
  {
    title: "My Properties",
    href: "/dashboard/properties",
    icon: Building2,
    roles: ["OWNER", "AGENT"],
  },
  {
    title: "Add Property",
    href: "/property",
    icon: PlusSquare,
    roles: ["OWNER", "AGENT"],
  },
  {
    title: "Search Hostels",
    href: "/property",
    icon: Home,
    roles: ["OCCUPANT", "GUEST"],
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    title: "Platform Settings",
    href: "/admin",
    icon: ShieldCheck,
    roles: ["ADMIN"],
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();

  const filteredLinks = sidebarLinks.filter(
    (link) => !link.roles || link.roles.includes(userRole)
  );

  return (
    <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border flex items-center gap-2">
        <Home className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">HostelHub</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-accent/50 rounded-lg p-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Current Role
          </p>
          <p className="text-sm font-medium text-foreground">{userRole}</p>
        </div>
      </div>
    </aside>
  );
}
