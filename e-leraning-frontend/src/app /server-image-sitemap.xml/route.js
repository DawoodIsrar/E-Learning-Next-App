import { makeApiRequest } from "@/utils/api_helper";
import { getServerSideSitemap } from "next-sitemap";

export const GET = async () => {
  const topics = await makeApiRequest(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sitemap-images`
  );

  const imageInsertSiteMap = topics?.data?.map((image) => ({
    loc: image.page_url,
    images: image.image_urls.map((url) => ({ loc: { href: url } })),
    lastmod: image?.updated_at,
  }));

  const fields = [...imageInsertSiteMap];

  return getServerSideSitemap(fields);
};

// export default function Site() {}
