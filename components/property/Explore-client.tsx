"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, BedDouble, ShieldCheck, Search, SlidersHorizontal } from "lucide-react";
import { Property, Image as PropertyImage } from "@/lib/generated/prisma/client";

type ExploreProperty = Property & {
  images: PropertyImage[];
  owner: { name: string; image: string | null };
};

const LAUTECH_ZONES = [
  "Under G",
  "Adenike",
  "Stadium",
  "Aroje",
  "Ogbomosho South",
  "Ogbomosho North",
  "Other"
];

function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "all";
  const initialMinPrice = searchParams.get("minPrice") || "";
  const initialMaxPrice = searchParams.get("maxPrice") || "";

  const [properties, setProperties] = useState<ExploreProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (location && location !== "all") params.append("location", location);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const res = await fetch(`/api/properties?${params.toString()}`);
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
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (location && location !== "all") params.append("location", location);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hostels by name or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="button" variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button type="submit">Search</Button>
            </div>

            {isFilterOpen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border mt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {LAUTECH_ZONES.map(zone => (
                        <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Price (₦)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 50000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Price (₦)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 250000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-muted rounded-xl border border-border"></div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed border-border">
          <h3 className="text-xl font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria to find what you&apos;re looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border/50">
              {/* Image Gallery */}
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
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold shadow-sm">
                  {property.roomType}
                </div>
                {property.isApproved && (
                  <div className="absolute top-3 right-3 bg-green-500/90 text-white backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 shadow-sm">
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
      )}
    </div>
  );
}

export default function ExplorePropertiesClient() {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-muted rounded-xl"></div>
        ))}
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
