import { NextResponse } from "next/server";
import { soft404Urls } from "./utils/data";
import {
  getAccessTokenCookies,
  getUserCookies,
} from "@/services/server-action-cookies";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search;
  const requestHeaders = new Headers(request.headers);
  if (!pathname.includes("static"))
    requestHeaders.set("x-next-pathname", pathname);

  requestHeaders.set("open-modal", searchParams === "?login=first");

  // Regex pattern for 12 digit number
  const regex = /\d{12}/;

  // // Test the URL against the regex pattern
  const isUniqueIdentifier = regex.test(pathname);
  const isNotValidPath = pathname.includes("/opic-search-result/");
  const isCourseUrl = soft404Urls.includes(pathname);

  if (isUniqueIdentifier || isCourseUrl || isNotValidPath) {
    return NextResponse.rewrite(new URL("/not-found", request.url), {
      status: 404,
    });
  }
  if (
    pathname?.includes("/my-library/") ||
    pathname?.includes("/my-recently-viewed/")
  ) {
    const accessToken = await getAccessTokenCookies();
    const user = await getUserCookies();
    if (!accessToken && !user)
      return NextResponse.rewrite(
        new URL(`/login/?redirect=${pathname}`, request.url)
      );
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
