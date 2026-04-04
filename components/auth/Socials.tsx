"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function Socials() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button variant="outline" size="lg" className="w-1/2" onClick={() => {}}>
        <FcGoogle h-5 w-5 />
      </Button>

      <Button variant="outline" size="lg" className="w-1/2" onClick={() => {}}>
        <FaGithub h-5 w-5 />
      </Button>
    </div>
  );
}
