import Blog from "@/components/Blog";
import { getFeatureLandingPageCoursesAndTopics } from "@/services/blog";
import ErrorPage from "@/components/404";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata() {
  let meta = await getFeatureLandingPageCoursesAndTopics("meta");

  return generateMetaTags(
    meta?.meta_title,
    meta?.meta_description,
    "HTML,CSS,Git,GitHub,Linux,Django,Figma,Web application,Coding Tutorial",
    meta?.meta_description,
    `blogs`,
    null
  );
}

export default async function BlogPage() {
  let coursesAndTopics = await getFeatureLandingPageCoursesAndTopics();

  return coursesAndTopics ? (
    <Blog coursesAndTopics={coursesAndTopics} />
  ) : (
    <ErrorPage
      title="No Content"
      subTitle="Sorry, there's no data available to display."
    />
  );
}
