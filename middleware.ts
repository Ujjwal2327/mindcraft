import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return withAuth(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard'],
}