import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
    const pathname = request.nextUrl.pathname;
    if (
        !request.auth &&
        (pathname.startsWith("/dashboard") ||
            pathname.startsWith("/guias/staff"))
    ) {
        return NextResponse.redirect(
            new URL("/auth/sign-in", request.nextUrl.origin)
        );
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
