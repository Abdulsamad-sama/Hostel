"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Building2 } from "lucide-react";
import { Property, User } from "@/lib/generated/prisma/client";

type PropertyWithDetails = Property & {
  owner: Pick<User, "id" | "name" | "image">;
};

export default function AdminPropertiesList() {
  const [properties, setProperties] = useState<PropertyWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/admin/properties");
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/properties/${id}/approve`, {
        method: "PATCH",
      });
      if (res.ok) {
        fetchProperties();
      }
    } catch (error) {
      console.error("Failed to approve property:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/properties/${id}/reject`, {
        method: "PATCH",
      });
      if (res.ok) {
        fetchProperties();
      }
    } catch (error) {
      console.error("Failed to reject property:", error);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading properties...</div>;
  }

  if (properties.length === 0) {
    return <div className="text-sm text-muted-foreground">No properties found.</div>;
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id}>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {property.title}
              </CardTitle>
              <CardDescription>
                {property.city}, {property.state} • By {property.owner.name}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${property.isApproved ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                {property.isApproved ? "Approved" : "Pending"}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{property.roomType} • {property.bookingType.replace("_", " ")}</p>
                <p className="font-semibold text-primary">₦{property.price.toLocaleString()} / {property.priceType === "PER_MONTH" ? "mo" : "yr"}</p>
              </div>
              <div className="flex gap-2">
                {!property.isApproved ? (
                  <Button size="sm" onClick={() => handleApprove(property.id)} className="bg-green-600 hover:bg-green-700 text-white">
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleReject(property.id)}>
                    <X className="w-4 h-4 mr-1" /> Revoke
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
