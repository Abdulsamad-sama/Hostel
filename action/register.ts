"use server"

import { RegisterSchema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcrypt"
import db from "@/lib/db"
import { get } from "http"
import { getUserByEmail } from "@/data/user"

export async function register  (values: z.infer<typeof RegisterSchema>){

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success){
        return {error:"Invalid fields"}
    }

    const {fullname,email,password} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    
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