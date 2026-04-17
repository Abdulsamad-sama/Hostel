import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function SearchForm() {
  return (
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
  );
}
