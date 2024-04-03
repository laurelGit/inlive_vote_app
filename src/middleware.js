const { NextRequest, NextResponse } = require("next/server");
import { getSession } from "./app/services/lib";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const session = await getSession(request.cookies.sessionId);
  // Redirect to login if there's no session and the request is for a protected route
  if (!session) return NextResponse.redirect(new URL("/home", request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about",
};
