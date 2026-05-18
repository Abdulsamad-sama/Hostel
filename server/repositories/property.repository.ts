import db from "@/lib/db";

export type CreatePropertyInput = {
  hostelName: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  roomType: "SINGLE" | "SHARED";
  price: number;
  priceType: "PER_MONTH" | "PER_YEAR";
  totalRooms: number;
  availableRooms: number;
  bookingType: "INSTANT_BOOK" | "INSPECTION_REQUIRED";
  ownerId: string;
  images?: string[]; // Array of image URLs
};

export class PropertyRepository {
  /**
   * Create a new property in the database.
   */
  static async create(data: CreatePropertyInput) {
    const { images, ...propertyData } = data;

    return db.$transaction(async (prisma) => {
      // Create the property record
      const property = await prisma.property.create({
        data: {
          title: propertyData.hostelName,
          description: propertyData.description,
          address: propertyData.address,
          city: propertyData.city,
          state: propertyData.state,
          country: propertyData.country,
          latitude: propertyData.latitude,
          longitude: propertyData.longitude,
          roomType: propertyData.roomType,
          price: propertyData.price,
          priceType: propertyData.priceType,
          totalRooms: propertyData.totalRooms,
          availableRooms: propertyData.availableRooms,
          bookingType: propertyData.bookingType,
          ownerId: propertyData.ownerId,
          status: "DRAFT", // Listings start as DRAFT
        },
      });

      // If there are images, create one Image record with the URL array
      if (images && images.length > 0) {
        await prisma.image.create({
          data: {
            url: images,
            propertyId: property.id,
          },
        });
      }

      // Return property with images
      return prisma.property.findUnique({
        where: { id: property.id },
        include: { images: true },
      });
    });
  }

  /**
   * Find a property by ID.
   */
  static async findById(id: string) {
    return db.property.findUnique({
      where: { id },
      include: { images: true, owner: true },
    });
  }

  /**
   * Find all properties with optional approval filter.
   */
  static async findMany(options?: { isApproved?: boolean }) {
    const where = options?.isApproved !== undefined 
      ? { isApproved: options.isApproved } 
      : {};
      
    return db.property.findMany({
      where,
      include: { images: true, owner: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Set a property's approval status.
   */
  static async setApprovalStatus(id: string, isApproved: boolean) {
    return db.property.update({
      where: { id },
      data: { isApproved },
    });
  }
}
