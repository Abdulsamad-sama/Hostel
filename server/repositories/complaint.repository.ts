import db from "@/lib/db";
import { ComplaintStatus } from "@/lib/generated/prisma/client";

export type CreateComplaintInput = {
  userId: string;
  propertyId: string;
  subject: string;
  description: string;
};

export class ComplaintRepository {
  static async create(data: CreateComplaintInput) {
    return db.complaint.create({
      data,
      include: {
        property: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  static async findManyByUserId(userId: string) {
    return db.complaint.findMany({
      where: { userId },
      include: {
        property: {
          select: {
            title: true,
            city: true,
            state: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findManyByOwnerId(ownerId: string) {
    return db.complaint.findMany({
      where: {
        property: {
          ownerId,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        property: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(id: string) {
    return db.complaint.findUnique({
      where: { id },
      include: {
        property: {
          select: {
            ownerId: true,
          },
        },
      },
    });
  }

  static async updateStatus(id: string, status: ComplaintStatus) {
    return db.complaint.update({
      where: { id },
      data: { status },
    });
  }
}
