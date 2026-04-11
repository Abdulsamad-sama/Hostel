import { Field, FieldContent, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { HomeIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2 shadow-md">
      <span className="flex items-center gap-1">
        <HomeIcon />
        <h1 className="text-xl font-bold">HostelHub</h1>
      </span>
      <nav>
        <Field>
          <FieldDescription></FieldDescription>
          <FieldContent>
            <Input type="search" placeholder="Search" />
          </FieldContent>
        </Field>
      </nav>
    </header>
  );
}
