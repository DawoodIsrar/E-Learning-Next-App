import BlogPage from "@/components/BlogPage";
import { getBlogDetailBySlug } from "@/services/blog";
import ErrorPage from "@/components/404";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata({ params }) {
  const { slug } = params;
  let blog = await getBlogDetailBySlug(slug);
  return generateMetaTags(
    blog?.meta_title,
    blog?.meta_description,
    "",
    blog?.meta_description,
    `blog/${blog?.slug}`,
    blog?.og_image
  );
}

export default async function Blog({ params }) {
  const { slug } = params;
  let blog = await getBlogDetailBySlug(slug);

  return blog ? (
    <BlogPage blog={blog} />
  ) : (
    <ErrorPage
      title="No Content"
      subTitle="Sorry, there's no data available to display."
    />
  );
}
