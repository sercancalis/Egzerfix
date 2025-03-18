import NextAuth from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes, apiAuthPrefix } from "./route";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
    const { nextUrl } = req;
    var isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            const searchParams = new URLSearchParams(nextUrl.searchParams);
            const nextPage = searchParams.get("nextPage");
            return Response.redirect(new URL(nextPage ?? DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set("nextPage", nextUrl.pathname);

        return Response.redirect(new URL(`/login?${searchParams}`, nextUrl))
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};