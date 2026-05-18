"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, UserCircle } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// Navigation Component
interface HeaderProps {
  logoText?: string;
  navLinks?: Array<{ text: string; href: string }>;
  showGetStarted?: boolean
}

export default function Header({
  logoText,
  navLinks = [],
  showGetStarted
}: HeaderProps) {

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle Sign Out
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
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">HostelHub {""}</p>
              <span className="text-sm font-extralight">{logoText}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className=" md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">

                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login">Log In/Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/property">Add Property</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/partner">Become Partner</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {showGetStarted && (
              <Button asChild size="sm">
                <Link href="/property" className="">Get Started</Link>
              </Button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {
        mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start text-destructive" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="/auth/login">Log In</Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="/auth/register">Sign Up</Link>
                    </Button>
                  </>
                )}
                <div className="my-2 border-t border-border"></div>
                <Button asChild variant="secondary" className="justify-start">
                  <Link href="/property">Add Property</Link>
                </Button>
                <Button asChild variant="secondary" className="justify-start">
                  <Link href="/partner">Become Partner</Link>
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </header >
  );
};
