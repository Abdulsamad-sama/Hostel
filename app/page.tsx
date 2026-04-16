"use client";

import { authClient } from "@/lib/auth-client";
import SearchForm from "@/components/Search-form";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100"],
});
export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className={" min-h-screen flex flex-col m-4"}>
      <SearchForm />
      <section className="mt-4 flex flex-col items-center bg-gray-50">
        <h1 className={cn("p-4 font-extrabold text-2xl", font.className)}>
          EveryThing You Need
        </h1>
        <p className="text-gray-300 font-extralight text-sm text-center p-2">
          Manage your hostel property effortlessly with our comprehensive
          platform
        </p>
        <div className="flex flex-wrap justify-center mt-2 gap-4">
          <Card className="w-80">
            <CardHeader>
              <CreditCard />
              <h2>Easy Payment</h2>
            </CardHeader>
            <CardContent className="text-wrap">
              Rent a room oniline securely with multiple payment options
              available
            </CardContent>
          </Card>
          <Card className="w-80">
            <CardHeader>
              <CreditCard />
              <h2>Easy Payment</h2>
            </CardHeader>
            <CardContent>
              Rent a room oniline securely with multiple payment options
              available
            </CardContent>
          </Card>
          <Card className="w-80">
            <CardHeader>
              <CreditCard />
              <h2>Easy Payment</h2>
            </CardHeader>
            <CardContent>
              Rent a room oniline securely with multiple payment options
              available
            </CardContent>
          </Card>
          <Card className="w-80">
            <CardHeader>
              <CreditCard />
              <h2>Easy Payment</h2>
            </CardHeader>
            <CardContent>
              Rent a room oniline securely with multiple payment options
              available
            </CardContent>
          </Card>
          <Card className="w-80">
            <CardHeader>
              <CreditCard />
              <h2>Easy Payment</h2>
            </CardHeader>
            <CardContent>
              Rent a room oniline securely with multiple payment options
              available
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
