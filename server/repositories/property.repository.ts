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

  static async findMany(options?: { 
    isApproved?: boolean;
    search?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const where: any = {};
    
    if (options?.isApproved !== undefined) {
      where.isApproved = options.isApproved;
    }
    
    if (options?.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } }
      ];
    }
    
    if (options?.location) {
      where.city = { contains: options.location, mode: 'insensitive' };
    }
    
    if (options?.minPrice !== undefined || options?.maxPrice !== undefined) {
      where.price = {};
      if (options?.minPrice !== undefined) where.price.gte = options.minPrice;
      if (options?.maxPrice !== undefined) where.price.lte = options.maxPrice;
    }
      
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

  /**
   * Delete a property by ID and all its related data.
   */
  static async delete(id: string) {
    return db.$transaction(async (prisma) => {
      // 1. Delete images
      await prisma.image.deleteMany({ where: { propertyId: id } });
      
      // 2. Delete complaints
      await prisma.complaint.deleteMany({ where: { propertyId: id } });

      // 3. Find associated bookings to delete their installments
      const bookings = await prisma.booking.findMany({ 
        where: { propertyId: id }, 
        select: { id: true } 
      });
      const bookingIds = bookings.map(b => b.id);
      
      if (bookingIds.length > 0) {
        await prisma.installment.deleteMany({ 
          where: { bookingId: { in: bookingIds } } 
        });
      }

      // 4. Delete bookings
      await prisma.booking.deleteMany({ where: { propertyId: id } });

      // 5. Delete the property itself
      return prisma.property.delete({
        where: { id },
      });
    });
  }
}
