import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from "@/utils/cookies";
import api from "./utils/axios";



// Step 1: Define route patterns
const publicRoutes: string[] = ["/login", "/register", "/", "/forgot-password", "/reset-password/:path*, /verify-email/:path*"];
const publicApiRoutes: string[] = ["/api/v1/auth/:path*"];

interface JWTCustomPayload extends JWTPayload {
    role?: string;
}

export default async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;

    // Step 2: Check if the request is for a static asset
    const isStaticAsset: boolean =
        pathname.startsWith("/_next/static") ||
        pathname.endsWith(".svg") ||
        pathname.endsWith(".png") ||
        pathname.endsWith(".jpeg") ||
        pathname.endsWith(".jpg");

    // Step 3: Check if the current route is public
    const isPublicRoute: boolean = publicRoutes.some(
        (route) => pathname === route
    );

    // Step 4: Check if the current route is a public API route
    const isPublicApiRoute: boolean = publicApiRoutes.some((route) => {
        const regex = new RegExp(`^${route.replace(":path*", ".*")}$`);
        return regex.test(pathname);
    });

    // Step 5: Allow access to public routes, public API routes, and static assets
    if (isPublicRoute || isPublicApiRoute || isStaticAsset) {
        return NextResponse.next();
    }

    // Step 7: Retrieve the access token and refresh token from cookies
    const accessToken: string | undefined = req.cookies.get('accessToken')?.value;
    const refreshToken: string | undefined = req.cookies.get("refreshToken")?.value;
    // Step 8: Function to verify the access token
    const verifyAccessToken = async (
        token: string
    ): Promise<JWTCustomPayload | null> => {
        try {
            const { payload } = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
            );
            return payload as JWTCustomPayload;
        } catch (error) {
            return null;
        }
    };

    // Step 9: Check if the user is authenticated by verifying the access token
    let payload: JWTCustomPayload | null = null;
    if (accessToken) {
        payload = await verifyAccessToken(accessToken);
    }

    // Step 10: If access token is invalid, try to refresh
    if (!payload && refreshToken) {
        try {
            const refreshUrl: string = `${origin}/api/v1/auth/refresh-token`;
            const response = await api.post(
                refreshUrl,
                { refreshToken },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            const { data } = response.data;
            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            } = data;

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            payload = await verifyAccessToken(newAccessToken);
        } catch (error) {
            // console.error(`Error refreshing token: ${error}`);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // Step 11: If still no valid payload, redirect to login
    if (!payload) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Step 13: If we've made it this far, the user is authenticated
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/api/v1/:path*",
    ],
};
