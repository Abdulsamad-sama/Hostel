"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type Property = {
  id: string;
  title: string;
};

export default function SettingsClient({ user }: { user: any }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties/owner/dashboard");
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties);
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user.role === "OWNER" || user.role === "AGENT" || user.role === "ADMIN") {
      fetchProperties();
    } else {
      setIsLoading(false);
    }
  }, [user.role]);

  const handleDelete = async () => {
    if (!selectedProperty) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/properties/${selectedProperty.id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
      
      setProperties((prev) => prev.filter((p) => p.id !== selectedProperty.id));
      setDeleteConfirmation("");
      setSelectedProperty(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting property");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and property settings.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Your account details and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Name</label>
              <Input disabled value={user.name || ""} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input disabled value={user.email || ""} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Contact administrator to update your profile information.
            </p>
          </CardContent>
        </Card>

        {(user.role === "OWNER" || user.role === "AGENT" || user.role === "ADMIN") && (
          <Card className="border-red-500/20 shadow-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : properties.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  You do not have any properties to delete.
                </p>
              ) : (
                <div className="divide-y divide-border border rounded-md">
                  {properties.map((property) => (
                    <div key={property.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm">{property.title}</h4>
                        <p className="text-xs text-muted-foreground">Once you delete a property, there is no going back.</p>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              setSelectedProperty(property);
                              setDeleteConfirmation("");
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete 
                              <strong> {property.title}</strong> and remove its data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Please type <strong>{property.title}</strong> to confirm.
                            </p>
                            <Input 
                              value={deleteConfirmation} 
                              onChange={(e) => setDeleteConfirmation(e.target.value)}
                              placeholder={property.title}
                            />
                          </div>
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                              variant="destructive" 
                              disabled={deleteConfirmation !== property.title || isDeleting}
                              onClick={handleDelete}
                            >
                              {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                              I understand the consequences, delete this property
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
