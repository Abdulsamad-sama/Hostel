"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import { Socials } from "@/components/auth/Socials";
import { BackButton } from "@/components/auth/Back-button";
import { AuthHeader } from "./auth-header";

interface CardWrapperProps {
  children: React.ReactNode;
  header: string;
  headerlabel: string;
  backbuttonlabel: string;
  backbuttonref: string;
  showsocial?: boolean;
}

export function CardWrapper({
  children,
  header,
  headerlabel,
  backbuttonlabel,
  backbuttonref,
  showsocial,
}: CardWrapperProps) {
  return (
    <Card className=" w-80 shadow-md">
      <CardHeader>
        <AuthHeader header={header} label={headerlabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showsocial && (
        <CardFooter className="bg-muted/0">
          <Socials />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backbuttonlabel} href={backbuttonref} />
      </CardFooter>
    </Card>
  );
}
