"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  BedDouble,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Home,
  Users,
  Building,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import type {
  Property,
  Image as PropertyImage,
} from "@/lib/generated/prisma/client";

// ─── Types ───

type PropertyOwner = {
  id: string;
  name: string;
  image: string | null;
};

type PropertyDetail = Property & {
  images: PropertyImage[];
  owner: PropertyOwner;
};

// ─── Helper Functions ───

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG").format(price);
}

function formatPriceType(type: string): string {
  return type === "PER_MONTH" ? "month" : "year";
}

function formatRoomType(type: string): string {
  return type === "SINGLE" ? "Single Occupancy" : "Shared Room";
}

function formatBookingType(type: string): string {
  return type === "INSTANT_BOOK" ? "Instant Book" : "Inspection Required";
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Image Gallery Component ───

function ImageGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = useCallback((): void => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback((): void => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <BedDouble className="h-12 w-12 mx-auto opacity-40 mb-2" />
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted group">
        <Image
          src={images[activeIndex]}
          alt={`Property image ${activeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500"
          priority={activeIndex === 0}
          sizes="(max-width: 768px) 100vw, 60vw"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/95 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/95 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === activeIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-transparent hover:border-border opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Loading Skeleton ───

function DetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 animate-pulse">
      <div className="h-6 w-32 bg-muted rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <div className="aspect-[16/10] bg-muted rounded-xl" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-14 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-32 bg-muted rounded-xl" />
          <div className="h-12 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Error State ───

function ErrorState({ message }: { message: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed border-border">
        <AlertTriangle className="h-12 w-12 mx-auto text-warning mb-4" />
        <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Button asChild variant="outline">
          <Link href="/explore">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Explore
          </Link>
        </Button>
      </div>
    </div>
  );
}

// ─── Main Component ───

type PropertyDetailClientProps = {
  propertyId: string;
};

export default function PropertyDetailClient({
  propertyId,
}: PropertyDetailClientProps) {
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/properties/${propertyId}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError(
              "This property doesn't exist or hasn't been approved yet."
            );
          } else {
            setError("Something went wrong. Please try again later.");
          }
          return;
        }

        const data: PropertyDetail = await res.json();
        setProperty(data);
      } catch (err) {
        setError("Failed to load property details. Check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !property) {
    return (
      <ErrorState
        message={error ?? "This property could not be found."}
      />
    );
  }

  // Flatten all image URLs from all Image records
  const allImages = property.images.flatMap((img) => img.url);

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Back Link */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Explore
      </Link>

      {/* Main Grid: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-3">
          <ImageGallery images={allImages} />
        </div>

        {/* Right Column: Key Info + CTA */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title + Badges */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
                {property.title}
              </h1>
              {property.isApproved && (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 flex-shrink-0 mt-1">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">
                {property.address}, {property.city}, {property.state}
              </span>
            </div>
          </div>

          {/* Price Card */}
          <Card className="border-primary/20 bg-primary-50/50">
            <CardContent className="pt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  ₦{formatPrice(property.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {formatPriceType(property.priceType)}
                </span>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <BedDouble className="h-4 w-4 text-primary" />
                  <span>{formatRoomType(property.roomType)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    {property.availableRooms}/{property.totalRooms} avail.
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formatBookingType(property.bookingType)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-primary" />
                  <span>{property.totalRooms} total rooms</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking CTA — placeholder for Unit 16 */}
          <div className="space-y-3">
            {property.availableRooms > 0 ? (
              <Button size="lg" className="w-full text-base font-semibold" disabled>
                <Home className="h-5 w-5 mr-2" />
                Book This Hostel
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full text-base"
                variant="secondary"
                disabled
              >
                No Rooms Available
              </Button>
            )}
            <p className="text-xs text-center text-muted-foreground">
              Booking functionality coming soon
            </p>
          </div>

          {/* Owner Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Listed by
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
                  {property.owner.image ? (
                    <Image
                      src={property.owner.image}
                      alt={property.owner.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-sm">
                      {property.owner.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{property.owner.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Property Owner
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About This Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Property Details Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DetailCard
          icon={<MapPin className="h-5 w-5 text-primary" />}
          label="Location"
          value={`${property.address}, ${property.city}`}
          subValue={`${property.state}, ${property.country}`}
        />
        <DetailCard
          icon={<BedDouble className="h-5 w-5 text-primary" />}
          label="Room Type"
          value={formatRoomType(property.roomType)}
          subValue={`${property.availableRooms} of ${property.totalRooms} rooms available`}
        />
        <DetailCard
          icon={<Calendar className="h-5 w-5 text-primary" />}
          label="Booking Type"
          value={formatBookingType(property.bookingType)}
          subValue={`Listed on ${formatDate(property.createdAt.toString())}`}
        />
      </div>
    </div>
  );
}

// ─── Detail Card Sub-component ───

function DetailCard({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary-50 flex-shrink-0">
            {icon}
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="font-semibold text-sm">{value}</p>
            {subValue && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {subValue}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
