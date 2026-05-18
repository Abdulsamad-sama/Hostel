import type { Metadata } from "next";
import PropertyDetailClient from "@/components/property/Property-detail-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Hostel Details — HostelHub`,
    description: `View full details, images, pricing, and location for this hostel listing on HostelHub.`,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <PropertyDetailClient propertyId={id} />
    </div>
  );
}
