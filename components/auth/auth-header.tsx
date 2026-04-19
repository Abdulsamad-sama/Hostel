import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  header: string;
  label: string;
}

export function AuthHeader({ label, header }: HeaderProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-2">
      <h1 className={cn("text-2xl font-semibold text-nowrap", font.className)}>
        {header}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
