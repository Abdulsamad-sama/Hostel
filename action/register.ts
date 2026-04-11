"use server"

import { RegisterSchema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcrypt"
import db from "@/lib/db"

export async function register  (values: z.infer<typeof RegisterSchema>){

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success){
        return {error:"Invalid fields"}
    }

    const {fullname,email,password} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
        where:{
            email
        }
    })
    if (existingUser){
        return {error:"User already exists"}
    }

    await db.user.create({
        data:{
            name: fullname,
            email,
            password: hashedPassword
        }
    })

    return{success:"Email Sent"}
}