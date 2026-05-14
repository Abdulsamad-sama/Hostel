import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // 1. Update Supabase session (handles cookies)
  const response = await updateSession(request);

  // 2. Add current path to request headers so Server Components can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-path", pathname);

  // 3. Create a new response that merges both:
  // We need to return a response that has the Supabase cookies AND the new request headers.
  // NextResponse.next can take request headers.
  const finalResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Copy cookies from the Supabase response to the final response
  response.cookies.getAll().forEach((cookie) => {
    finalResponse.cookies.set(cookie.name, cookie.value);
  });

  return finalResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
