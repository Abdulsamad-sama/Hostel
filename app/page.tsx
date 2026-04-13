"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className=" min-h-screen flex justify-center  ">
      <h1 className="text-lg p-4">hello {session?.user?.name || "Guest"}</h1>
    </div>
  );
}
