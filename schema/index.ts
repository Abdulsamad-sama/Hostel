import * as z from "zod"

export const LoginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  })
});

export const RegisterSchema = z.object({
  fullname: z.string().min(1,{
    message: "Please enter your fullname"
  }),
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  })
})