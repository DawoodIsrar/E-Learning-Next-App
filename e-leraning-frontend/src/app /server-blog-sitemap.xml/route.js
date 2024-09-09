import { makeApiRequest } from "@/utils/api_helper";
import { getServerSideSitemap } from "next-sitemap";

export const GET = async () => {
  const blogs = await makeApiRequest(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/sitemap-blogs`
  );
  const newsSitemaps = blogs?.data?.map?.((blog) => ({
    loc: `${process.env.NEXTAUTH_URL}/blog/${blog?.slug}/`,
    lastmod: blog?.lastmod_date,
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(fields);
};
