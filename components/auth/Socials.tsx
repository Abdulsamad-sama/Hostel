"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function Socials() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-1/2"
        onClick={async () => {
          await authClient.signIn.social({ provider: "google" });
        }}
      >
        <FcGoogle className=" h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="w-1/2"
        onClick={async () => {
          await authClient.signIn.social({ provider: "github" });
        }}
      >
        <FaGithub className=" h-5 w-5" />
      </Button>
    </div>
  );
}
