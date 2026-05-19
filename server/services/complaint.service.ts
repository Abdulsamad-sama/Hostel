import { ComplaintRepository, CreateComplaintInput } from "../repositories/complaint.repository";
import { ComplaintStatus } from "@/lib/generated/prisma/client";

export class ComplaintService {
  static async createComplaint(data: CreateComplaintInput) {
    if (!data.subject.trim()) {
      throw new Error("Complaint subject is required");
    }
    if (!data.description.trim()) {
      throw new Error("Complaint description is required");
    }
    return ComplaintRepository.create(data);
  }

  static async getStudentComplaints(userId: string) {
    return ComplaintRepository.findManyByUserId(userId);
  }

  static async getOwnerComplaints(ownerId: string) {
    return ComplaintRepository.findManyByOwnerId(ownerId);
  }

  static async updateComplaintStatus(complaintId: string, status: ComplaintStatus, actorId: string, actorRole: string) {
    const complaint = await ComplaintRepository.findById(complaintId);
    if (!complaint) {
      throw new Error("Complaint not found");
    }

    // Verify permission: Only ADMIN, or the owner/agent of the associated property can update the status
    const isOwner = complaint.property.ownerId === actorId;
    const isAdmin = actorRole === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw new Error("Access denied: You do not have permission to update this complaint");
    }

    return ComplaintRepository.updateStatus(complaintId, status);
  }
}
