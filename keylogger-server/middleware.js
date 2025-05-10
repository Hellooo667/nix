import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Allow open access to the API route
  if (pathname.startsWith('/api/data')) {
    return NextResponse.next();
  }

  // 🔒 Example auth logic for other routes (optional)
  // const token = req.cookies.get("auth_token");
  // if (!token) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  return NextResponse.next();
}
export const config = {
  matcher: ["/api/:path*"],
};

