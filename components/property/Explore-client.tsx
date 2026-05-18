"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, ShieldCheck } from "lucide-react";
import { Property, Image as PropertyImage } from "@/lib/generated/prisma/client";

type ExploreProperty = Property & {
  images: PropertyImage[];
  owner: { name: string; image: string | null };
};

export default function ExplorePropertiesClient() {
  const [properties, setProperties] = useState<ExploreProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
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

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-muted rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed border-border">
        <h3 className="text-xl font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground">Check back later or adjust your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border/50">
          {/* Image Gallery (Just showing first image for now) */}
          <div className="relative h-48 bg-muted">
            {property.images && property.images.length > 0 && property.images[0].url.length > 0 ? (
              <Image
                src={property.images[0].url[0]}
                alt={property.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <BedDouble className="h-8 w-8 opacity-50" />
              </div>
            )}
            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
              {property.roomType}
            </div>
            {property.isApproved && (
              <div className="absolute top-3 right-3 bg-green-500/90 text-white backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Verified
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-4">
              <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
              <div className="text-right whitespace-nowrap">
                <span className="font-bold text-primary">₦{property.price.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground block">
                  /{property.priceType === "PER_MONTH" ? "mo" : "yr"}
                </span>
              </div>
            </div>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{property.address}, {property.city}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" />
                <span>{property.availableRooms} rooms left</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0 flex gap-2">
            <Button asChild className="w-full">
              <Link href={`/explore/${property.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
