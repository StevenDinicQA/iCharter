import { NextRequest, NextResponse } from "next/server";

const signInRedirect = (pathname: string): boolean => {
  return pathname === '/auth/sign-in'
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const userType = req.cookies.get("userType")?.value;

  if(signInRedirect(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (
    token &&
    req.url.includes("auth") &&
    !req.url.includes("reset-password")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && req.url.includes("home")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if(token && userType && userType === 'charter' && req.url.includes("market") && !req.url.includes("charter")){
    return NextResponse.redirect(new URL("/", req.url));
  }

  if(token && userType && userType === 'customer' && (req.url.includes("home/listings") || req.url.includes("home/onboarding"))){
    return NextResponse.redirect(new URL("/", req.url));
  }

}

export const config = {
  matcher: ["/auth/:path*", "/home/:path*", "/market/:path*", "/home/listings/:path*", "/home/onboarding"],
};
