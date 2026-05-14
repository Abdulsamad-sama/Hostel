"use client";

import { useRouter } from "next/navigation";
import { LogOut, Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { AuthUser } from "@/types";

export default function Topbar({ user }: { user: AuthUser }) {
  const router = useRouter();

  const handleSignOut = async (): Promise<void> => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <header className="h-16 border-b border-border bg-card sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="flex-col items-end hidden sm:flex">
            <span className="text-sm font-medium leading-none">{user.name}</span>
            <span className="text-xs text-muted-foreground mt-1 capitalize">
              {user.role.toLowerCase()}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
