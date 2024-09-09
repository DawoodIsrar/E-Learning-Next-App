import { makeApiRequest } from "@/utils/api_helper";
import { getServerSideSitemap } from "next-sitemap";

export const GET = async () => {
  const topics = await makeApiRequest(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sitemap-topics`
  );
  const newsSitemaps = topics?.data?.map?.((topic) => ({
    loc: `${process.env.NEXTAUTH_URL}/topic/${topic?.slug}/`,
    lastmod: topic?.lastmod_date,
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(fields);
};
