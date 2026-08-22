import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value
    const refreshToken = req.cookies.get("refresh_token")?.value

    console.log("[middleware] accessToken:", !!accessToken)
    console.log("[middleware] refreshToken:", !!refreshToken)

    // No refresh token means the user cannot refresh their session.
    if (!refreshToken) {
        console.warn("[middleware] No refresh token found")

        return NextResponse.redirect(new URL("/login", req.url))
    }

    // We have an access token, so allow the request.
    //
    // IMPORTANT:
    // Middleware does not know whether the access token is expired
    // unless you explicitly verify/decode it.
    if (accessToken) {
        return NextResponse.next()
    }

    // No access token, but we have a refresh token.
    // Ask the backend to refresh the session.
    console.warn("[middleware] No access token found")
    console.warn("[middleware] Attempting to refresh access token...")

    try {
        const refreshResponse = await fetch(
            `${API_URL}/api/auth/refresh`,
            {
                method: "POST",
                headers: {
                    Cookie: `refresh_token=${refreshToken}`,
                },
                cache: "no-store",
            }
        )

        if (!refreshResponse.ok) {
            console.error(
                "[middleware] Refresh failed:",
                refreshResponse.status,
                await refreshResponse.text()
            )

            const loginResponse = NextResponse.redirect(
                new URL("/login", req.url)
            )

            // Remove stale cookies when refresh fails.
            loginResponse.cookies.delete("access_token")
            loginResponse.cookies.delete("refresh_token")

            return loginResponse
        }

        /*
         * Your NestJS backend sets the cookies with Set-Cookie.
         *
         * We need to forward those cookies to the browser.
         */
        const setCookies = refreshResponse.headers.getSetCookie()

        if (!setCookies.length) {
            console.error(
                "[middleware] Refresh succeeded but no Set-Cookie headers were returned"
            )

            const loginResponse = NextResponse.redirect(
                new URL("/login", req.url)
            )

            loginResponse.cookies.delete("access_token")
            loginResponse.cookies.delete("refresh_token")

            return loginResponse
        }

        console.log("[middleware] Refresh successful")

        const response = NextResponse.next()

        for (const cookie of setCookies) {
            response.headers.append("Set-Cookie", cookie)
        }

        return response
    } catch (error) {
        console.error("[middleware] Refresh error:", error)

        const loginResponse = NextResponse.redirect(
            new URL("/login", req.url)
        )

        loginResponse.cookies.delete("access_token")
        loginResponse.cookies.delete("refresh_token")

        return loginResponse
    }
}

export const config = {
    matcher: ["/home/:path*"],
}