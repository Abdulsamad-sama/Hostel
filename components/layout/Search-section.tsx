import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function SearchForm() {
  return (
    <section className="relative flex flex-col  justify-center items-center p-6 my-8">
      {/* <Card className="  border-none"> */}
      <CardHeader className={cn("text-xl font-bold py-2 w-full", font.className)}>
        Looking for a perfect hostel?
      </CardHeader>
      <CardContent className="flex gap-2 w-full">
        <Input about="school" type="" placeholder="Choose school" />
        <Input about="location" type="search" placeholder="Location" />
        <Button type="submit">Search</Button>
      </CardContent>
      {/* </Card> */}
    </section>
  );
}
