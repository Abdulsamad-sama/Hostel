"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield, Calendar, Camera } from "lucide-react";

export default function ProfileClient({ user }: { user: any }) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your personal information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-border">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer">
                <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground break-all">{user.email}</p>
              
              <div className="mt-4 flex gap-2 justify-center flex-wrap">
                <Badge variant="secondary" className="flex items-center gap-1 capitalize">
                  <Shield className="h-3 w-3" />
                  {user.role.toLowerCase()}
                </Badge>
                {user.emailVerified && (
                  <Badge className="bg-green-500/10 text-green-600 border-none hover:bg-green-500/20">
                    Verified
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Full Name
                </Label>
                <Input id="name" defaultValue={user.name || ""} disabled />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <Input id="email" type="email" defaultValue={user.email || ""} disabled />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  Account Role
                </Label>
                <Input id="role" defaultValue={user.role} disabled className="capitalize" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="joined" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Joined
                </Label>
                <Input id="joined" defaultValue={joinDate} disabled />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button disabled>Save Changes</Button>
              </div>
              <p className="text-xs text-muted-foreground text-right mt-2">
                Contact an administrator to update your profile information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
