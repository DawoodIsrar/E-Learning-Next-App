import BlogCategories from "@/components/BlogCategories";
import { getBlogCategoryBySlug } from "@/services/blog";
import ErrorPage from "@/components/404";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata({ params }) {
  const { slug } = params;
  let blogCategory = await getBlogCategoryBySlug(slug, "category");

  return generateMetaTags(
    blogCategory?.meta_title,
    blogCategory?.meta_description,
    "",
    blogCategory?.meta_description,
    `blog-category/${blogCategory?.category_slug}`,
    null
  );
}

const BlogCategory = async ({ params }) => {
  const slug = params.slug;
  const BlogCategoriesData = await getBlogCategoryBySlug(slug);

  return BlogCategoriesData?.blogs.length ? (
    <BlogCategories BlogCategoriesData={BlogCategoriesData} />
  ) : (
    <ErrorPage
      title="No Content"
      subTitle="Sorry, there's no data available to display."
    />
  );
};

export default BlogCategory;
