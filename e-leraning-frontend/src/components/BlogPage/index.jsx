import Banner from "./Banner";
import BlogBanner from "./BlogBanner/BlogBanner";
import BlogWrapper from "./Wrapper";

const BlogPage = ({ blog }) => {
  const { category, ...blogPost } = blog;

  return (
    <>
      <Banner category={blog?.category} />
      <BlogBanner blogPost={blogPost} />
      <BlogWrapper blogPost={blogPost} />
    </>
  );
};

export default BlogPage;
