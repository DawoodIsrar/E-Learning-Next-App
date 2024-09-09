import AddChapter from "@/components/AddChapter";

import { getChapterDetail, getCourseDetails } from "@/services";
import { getAccessTokenCookies } from "@/services/server-action-cookies";

export const metadata = {
  title: "Add Chapter - D-Libro | Digital Book Library for Web Skill Training",
};

const AddChapterPage = async ({ params }) => {
  let chapterDetails = null;
  if (params.chapterId !== "new") {
    chapterDetails = await getChapterDetail(params.chapterId);
  }
  const courseDetails = await getCourseDetails(params.courseId);
  const token = await getAccessTokenCookies();

  return (
    <AddChapter
      adminChapterIdProps={chapterDetails?.adminChapterId ?? ""}
      adminCourseIdProps={courseDetails?.adminCourseId ?? ""}
      chapterTitleProps={chapterDetails?.chapterTitle ?? ""}
      chapterAccessProps={chapterDetails?.chapterAccess ?? "public"}
      courseDetailsProps={courseDetails?.courseDetails ?? {}}
      token={token}
    />
  );
};

export default AddChapterPage;
