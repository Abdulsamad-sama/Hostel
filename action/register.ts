"use server";

import { RegisterSchema } from "@/schema";
import * as z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { fullname, email, password } = validatedFields.data;

  try {
    const res = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: fullname,
        email,
        password,
      },
    });

    if (!res) {
      return {
        error: "Registration failed",
      };
    }
  } catch (err: any) {
    console.error("Registration error:", err);
    return {
      error: err?.body?.message || err?.message || "Something went wrong",
    };
  }
  // Redirect to home page after successful registration and login
  redirect("/");
}
