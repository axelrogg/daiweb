import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [
        "/",
        "/blog",
        "/contacto",
        "/prestamo-de-material",
        "/prestamo-de-portatiles",
        "/quejas-y-sugerencias",
        "/reserva-de-espacios",
        "/reserva-de-taquillas",
        "/sign-in",
        "/sign-up",
    ],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
