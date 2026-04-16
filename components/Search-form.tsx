import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function SearchForm() {
  return (
    <section about="search" className=" m ">
      <Card className=" ">
        <CardHeader className={cn("text-xl font-bold", font.className)}>
          Looking for a perfect hostel?
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input about="school" type="" placeholder="Choose school" />
          <Input about="location" type="search" placeholder="Location" />
          <Button type="submit">Search</Button>
        </CardContent>
      </Card>
    </section>
  );
}
