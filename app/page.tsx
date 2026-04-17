"use client";
import SearchForm from "@/components/Search-form";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CreditCard,
  Construction,
  Shield,
  Clock,
  Users2,
  MessageSquareIcon,
  Receipt,
} from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});
export default function Home() {
  const features = [
    {
      icon: CreditCard,
      title: "Easy Payment",
      desc: "Rent a room oniline securely with multiple payment options available",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      desc: "Your data and payments are protected with bank-level security.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      desc: "Get help anytime with our round-the-clock customer support team.",
    },
    {
      icon: Users2,
      title: "Community",
      desc: "Connect with fellow residents and stay updated on hostel events.",
    },
    {
      icon: Construction,
      title: "Track Payments",
      desc: "View your payment history and upcoming dues in one convenient dashboard.",
    },
    {
      icon: MessageSquareIcon,
      title: "File Complaints",
      desc: "Report maintenance issues and track theirresolution status in real-time.",
    },
  ];

  return (
    <div className=" min-h-screen flex flex-col mt-4">
      {/* Search section */}
      <section className="p-8">
        <SearchForm />
      </section>

      {/* Everything you need */}
      <section className=" py-20 bg-muted">
        <div className=" flex flex-col justify-center items-center ">
          <div className="text-center pb-3">
            <h1 className={cn("font-bold  text-3xl", font.className)}>
              EveryThing You Need
            </h1>
            <p className="text-muted-foreground  font-extralight text-sm text-center p-2">
              Manage your hostel property effortlessly with our comprehensive
              platform
            </p>
          </div>
          <div className="flex flex-wrap justify-center mt-2 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="w-90">
                  <CardHeader className={cn("font-bold", font.className)}>
                    <IconComponent />
                    {feature.title}
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {feature.desc}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
