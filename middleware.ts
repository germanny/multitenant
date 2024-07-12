import { NextRequest, NextResponse } from "next/server";
import { getHostnameDataOrDefault } from "@/manifest";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
export default async function middleware(req: NextRequest) {
  const { pathname, origin, locale } = req.nextUrl;
  const hostname = req.headers.get("host");

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname?.replace(`.jengermann.design`, "")
      : hostname?.replace(`.localhost:3000`, "");

  console.log(currentHost);
  const subdomainData = await getHostnameDataOrDefault(currentHost);
  console.log(subdomainData);
  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }
  if (
    !pathname.includes(".") && // exclude all files in the public folder
    !pathname.startsWith("/api") // exclude all API routes
  ) {
    const response = NextResponse.next();
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/sites/index.tsx

    return NextResponse.rewrite(`${origin}/_sites/${currentHost}${pathname}`);
  }
}
