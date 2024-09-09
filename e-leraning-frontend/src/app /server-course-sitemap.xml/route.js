// app/server-sitemap-index.xml/route.ts
import { makeApiRequest } from "@/utils/api_helper";
import { getServerSideSitemap } from "next-sitemap";

export async function GET() {
  const courses = await makeApiRequest(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sitemap-courses`
  );

  const newsSitemaps = courses?.data?.map?.((course) => ({
    loc: `${process.env.NEXTAUTH_URL}/course/${course?.slug}/`,
    lastmod: course?.updated_at,
  }));

  return getServerSideSitemap(newsSitemaps);
}
