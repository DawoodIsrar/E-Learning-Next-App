import CourseEdit from "@/components/CourseEdit";
import {
  getCourseEditorById,
  getEditCourseCategories,
} from "@/services/course";
import { getAccessTokenCookies } from "@/services/server-action-cookies";

export const metadata = {
  title: "Edit Course - D-Libro | Digital Book Library for Web Skill Training",
};

export default async function CourseEditPage({ params }) {
  const slug = params.slug;
  const accessToken = await getAccessTokenCookies();
  const data = await getCourseEditorById(accessToken, slug);
  const categories = await getEditCourseCategories(accessToken);
  return (
    <CourseEdit
      data={slug === "new" ? "" : data}
      categories={categories}
      token={accessToken}
      id={slug === "new" ? "" : slug}
    />
  );
}
