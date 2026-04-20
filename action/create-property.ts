"use server";

import db from "@/lib/db";
import { RoomType, PriceType, BookingType } from "@/lib/generated/prisma/enums";

interface CreateHostelInput {
  hostelName: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  roomType: RoomType;
  price: number;
  priceType: PriceType;
  availableRooms: number;
  totalRooms: number;
  bookingType: BookingType;
  ownerId: string;
  images?: string[];
}

export async function createProperty(data: CreateHostelInput) {
  try {
    // Validate required fields
    if (
      !data.hostelName?.trim() ||
      !data.address?.trim() ||
      !data.ownerId?.trim()
    ) {
      return {
        success: false,
        error: "Missing required fields: hostelName, address, ownerId",
      };
    }

    if (data.availableRooms > data.totalRooms) {
      return {
        success: false,
        error: "Available rooms cannot exceed total rooms",
      };
    }

    const hostel = await db.property.create({
      data: {
        title: data.hostelName,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,

        price: data.price,
        priceType: data.priceType,

        roomType: data.roomType,
        totalRooms: data.totalRooms,
        availableRooms: data.availableRooms,

        bookingType: data.bookingType,

        ownerId: data.ownerId,

        images: {
          create:
            data.images && data.images.length > 0
              ? {
                  url: data.images,
                }
              : undefined,
        },
      },
      include: {
        images: true,
      },
    });

    return { success: true, hostel };
  } catch (error) {
    console.error("Failed to create hostel:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create hostel",
    };
  }
}
