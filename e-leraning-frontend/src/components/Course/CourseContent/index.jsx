import Section from "@/components/shared/Section";
import ChapterBanner from "@/components/common/ChapterBanner";
import { getAccessTokenCookies } from "@/services/server-action-cookies";
import ChaptersContainer from "../Chapter";
import CourseGuide from "../Chapter/CourseGuide";
import AuthenticatedCourseHeader from "../CourseHeader";
import "./style.scss";
import dynamic from "next/dynamic";
const InsertAds = dynamic(() => import("@/components/common/InsertAds"));
import { isProduction } from "@/utils/common";

const CourseContent = async ({
  courseDetails,
  courseGuide,
  bookmarkedTopics,
  recentlyViewedTopics,
}) => {
  const token = await getAccessTokenCookies();
  return (
    <>
      {!token ? (
        <>
          <ChapterBanner courseDetails={courseDetails} />
          <Section
            sectionClasses={"course-main-content-wrapper-non-member"}
            widthHandlerDivClasses={"mpx-10"}
          >
            <div className="course-page-content-wrapper">
              <CourseGuide
                secondaryColor={courseDetails?.secondary_color}
                courseGuide={courseGuide}
              />
              {isProduction && <InsertAds ChildComppnent="CourseOutlineATF" />}
            </div>
          </Section>
        </>
      ) : (
        <>
          <Section
            sectionClasses={"course-main-content-wrapper"}
            widthHandlerDivClasses={"course-page-content-container"}
          >
            <div className="course-page-content-wrapper ">
              <AuthenticatedCourseHeader
                courseDetails={courseDetails}
                courseGuide={courseGuide}
              />
            </div>
          </Section>
        </>
      )}
      <ChaptersContainer
        courseDetails={courseDetails}
        isAuthenticated={Boolean(token)}
        bookmarkedTopics={bookmarkedTopics}
        recentlyViewedTopics={recentlyViewedTopics}
      />
    </>
  );
};

export default CourseContent;
