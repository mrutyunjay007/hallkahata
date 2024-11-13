import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up(.*)",
  "/api/auth",
  "/api/verify(.*)",
  "/api/save-user",
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId } = await auth();

  const currentUrl = new URL(request.url);
  const isAccessingHome = currentUrl.pathname === "/";

  if (!userId && !isPublicRoute(request)) {
    await auth.protect();
    return;
  }

  if (userId && (isPublicRoute(request) || isAccessingHome)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
