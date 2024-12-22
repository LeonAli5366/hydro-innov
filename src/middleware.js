// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher(["/dashboard"]);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect();

// });


export default function middleware(req) {
  // Only run the middleware for API routes (excluding static assets)
  if (req.nextUrl.pathname.startsWith("/api")) {
    // Here you can add more logic like authentication, logging, etc.
    // For now, we just pass the request through.
    return NextResponse.next();
  }

  // For all other requests, continue without changes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Always run for API routes, except for static assets and Next.js internals
    "/api/:path*", // Match all API routes
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", // Skip static files
  ],
};

