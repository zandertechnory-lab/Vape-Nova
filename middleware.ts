import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/shop(.*)",
  "/blog(.*)",
  "/about",
  "/contact",
  "/faqs",
  "/privacy",
  "/terms",
  "/refund",
  "/shipping",
  "/track-order(.*)",
  "/compare(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/products(.*)",
  "/api/search(.*)",
  "/api/track-order(.*)",
  "/api/auth(.*)",
  "/sitemap.xml",
  "/robots.txt",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
