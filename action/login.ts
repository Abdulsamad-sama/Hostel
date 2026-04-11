"use server"

// import { authClient } from "@/lib/auth-client";
// import { LoginSchema } from "@/schema"
// import * as z from "zod"
// export async function login  (values: z.infer<typeof LoginSchema>){

//     const validatedFields = LoginSchema.safeParse(values);

//     if (!validatedFields.success){
//         return {error:"Invalid fields"}
//     }

//     const { email, password } = validatedFields.data;

//     const { data, error } = await authClient.signIn.email({
//         /**
//          * The user email
//          */
//         email,
//         /**
//          * The user password
//          */
//         password,
//         /**
//          * A URL to redirect to after the user verifies their email (optional)
//          */
//         callbackURL: "/dashboard",
//         /**
//          * remember the user session after the browser is closed. 
//          * @default true
//          */
//         rememberMe: false
// }, {
//     //callbacks
// })

//     return{success:"Email Sent"}
// }

import { authClient } from "@/lib/auth-client";
import { LoginSchema } from "@/schema";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
        const { data, error } = await authClient.signIn.email(
            {
            email,
            password,
            callbackURL: "/dashboard",
            rememberMe: false,
            },
            {}
        );

       

        if (error) {
            if (error.code === "INVALID_CREDENTIALS") {
                return { error: "Invalid email or password" };
            }
        }
        if (!error) {
            redirect("/dashboard");
        }
        return { success: "Login successful" };

    } catch (err) {
        console.error("Login error:", err);
        return { error: "Something went wrong" };
    }
}