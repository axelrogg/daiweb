import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAuthRoute = createRouteMatcher(["/auth(.*)"])

export default clerkMiddleware((auth, req) => {
    // Restrict dashboard routes to logged in users
    if (isDashboardRoute(req) || isAuthRoute(req)) {
        auth().protect();
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
