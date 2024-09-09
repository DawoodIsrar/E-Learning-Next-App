import Course from "@/components/Course";
import { getData } from "@/services";
import { getAllCourses } from "@/services/course";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata({ params }) {
  const { props } = await getData(params?.slug);

  return generateMetaTags(
    props?.data?.meta_title.split("|")[0],
    props?.data?.meta_description,
    props?.data?.tags?.join?.(", "),
    props?.data?.meta_description,
    `course/${props?.courseSlugData?.course_slug}/`,
    props?.data?.og_image_url
  );
}

export async function generateStaticParams() {
  const courses = await getAllCourses();

  return courses?.map((course) => {
    return {
      slug: course?.course_slug,
    };
  });
}

const CoursePage = async ({ params }) => {
  const { slug } = params;
  const { props } = await getData(slug);

  return (
    <Course
      courseDetails={props?.data}
      bookmarkedTopics={props?.bookmarkedTopics}
      recentlyViewedTopics={props?.recentlyViewedTopics}
      courseGuide={props?.data?.course_guide}
    />
  );
};

export default CoursePage;
