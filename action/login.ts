"use server";

import { auth } from "@/lib/auth";
import { LoginSchema } from "@/schema";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    if (!res) {
      return { error: "Invalid email or password" };
    }
    //uncomment this line if you want to show a success message instead of redirecting
    // return { success: "Login successful" };
  } catch (err: any) {
    console.error("Login error:", err);
    return {
      error: err?.body?.message || err?.message || "Something went wrong",
    };
  }
  redirect("/");
}
