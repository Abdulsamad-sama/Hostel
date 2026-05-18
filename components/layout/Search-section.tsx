"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const LAUTECH_ZONES = [
  "Under G",
  "Adenike",
  "Stadium",
  "Aroje",
  "Ogbomosho South",
  "Ogbomosho North",
  "Other"
];

export default function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (location && location !== "all") params.append("location", location);
    
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative flex flex-col justify-center items-center p-6 my-8 w-full max-w-3xl mx-auto bg-card rounded-2xl shadow-xl border border-border">
      <CardHeader className={cn("text-xl md:text-2xl font-bold py-2 w-full text-center", font.className)}>
        Find your perfect student accommodation
      </CardHeader>
      <form onSubmit={handleSearch} className="w-full">
        <CardContent className="flex flex-col sm:flex-row gap-3 w-full p-4">
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hostels..." 
            className="flex-1"
          />
          <div className="w-full sm:w-[200px]">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Location</SelectItem>
                {LAUTECH_ZONES.map(zone => (
                  <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Search</Button>
        </CardContent>
      </form>
    </section>
  );
}
