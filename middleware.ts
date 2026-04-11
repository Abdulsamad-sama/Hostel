import { auth } from "./lib/auth";
import { NextRequest } from "next/server";

export default function auth(req: NextRequest, ev: any) {
    console.log("Route" , req.nextUrl.pathname)
}
