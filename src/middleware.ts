import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/blog",
        "/contacto",
        "/auth/sign-in",
        "/auth/sign-up",
        "/api/webhook(.*)",
        "/docs",
        "/docs/(.*)",
    ],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
