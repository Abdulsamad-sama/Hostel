import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters are needed",
  }),
});

export const RegisterSchema = z.object({
  fullname: z.string().min(1, {
    message: "Please enter your fullname",
  }),
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters are needed",
  }),
});

export const propertySchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(10, { message: "Description too short" }),

  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),

  price: z.number().min(1, { message: "Price must be greater than 0" }),
  priceType: z.enum(["PER_ROOM", "PER_YEAR"]),

  totalRooms: z.number().min(1),
  availableRooms: z.number().min(0),

  roomType: z.enum(["SINGLE", "SHARED"]),
  bookingType: z.enum(["INSTANT_BOOK", "INSPECTION_REQUIRED"]),

  images: z
    .array(z.string())
    .min(1, { message: "At least one image required" }),
});
