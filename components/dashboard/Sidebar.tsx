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
  ShieldCheck,
  PlusSquare,
  X,
  MessageSquare,
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
    href: "/student/bookings",
    icon: Calendar,
    roles: ["OCCUPANT", "GUEST"],
  },
  {
    title: "My Properties",
    href: "/dashboard/properties",
    icon: Building2,
    roles: ["OWNER", "AGENT"],
  },
  {
    title: "Add Property",
    href: "/property/create",
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
    title: "Admin Dashboard",
    href: "/admin",
    icon: ShieldCheck,
    roles: ["ADMIN"],
  },
  {
    title: "Support Tickets",
    href: "/dashboard/complaints",
    icon: MessageSquare,
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

type SidebarProps = {
  userRole: UserRole;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ userRole, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const filteredLinks = sidebarLinks.filter(
    (link) => !link.roles || link.roles.includes(userRole)
  );

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">HostelHub</span>
        </div>
        {/* Close button visible only on mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
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
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Slide-in panel */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border flex flex-col md:hidden animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
