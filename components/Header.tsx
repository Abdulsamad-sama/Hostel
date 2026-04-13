"use client";
import { Button } from "./ui/button";
import { Field, FieldContent, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { HomeIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import Link from "next/link";
import { LoginButton } from "./auth/Login-button";

export default function Header() {
  const { data: session } = authClient.useSession();
  console.log("Session in header:", session);

  return (
    <header className="flex items-center justify-between px-6 py-2 shadow-lg">
      <span className="flex items-center gap-1">
        <HomeIcon />
        <h1 className="text-xl font-bold">HostelHub</h1>
      </span>

      <nav className="flex items-center gap-4">
        <Input type="search" placeholder="Search" />
        {!session ? (
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        ) : (
          <Button
            variant="destructive"
            size="lg"
            onClick={() => authClient.signOut()}
          >
            Sign Out
          </Button>
        )}
      </nav>
    </header>
  );
}
