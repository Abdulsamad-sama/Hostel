"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { AuthHeader } from "@/components/auth/Header";
import { Socials } from "@/components/auth/Socials";
import { BackButton } from "@/components/auth/Back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerlabel: string;
  backbuttonlabel: string;
  backbuttonref: string;
  showsocial?: boolean;
}

export function CardWrapper({
  children,
  headerlabel,
  backbuttonlabel,
  backbuttonref,
  showsocial,
}: CardWrapperProps) {
  return (
    <Card className="w-100 shadow-md">
      <CardHeader>
        <AuthHeader label={headerlabel} />
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
