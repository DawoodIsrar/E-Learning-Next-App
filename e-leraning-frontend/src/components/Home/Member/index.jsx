import RecentlyViewedCourses from "./RecentlyViewedCourses";
import CoursesWithBookmarks from "./CoursesWIthBookmarks";
import OurCourses from "../NonMember/OurCourses";
import Divider from "@/components/shared/Divider";
import CourseButtons from "@/components/Course/Buttons";
import dynamic from "next/dynamic";
const InsertAds = dynamic(() => import("@/components/common/InsertAds"));
import { isProduction } from "@/utils/common";

const Member = ({ courses, bookmarkCourses, recentlyViewedCourses }) => {
  return (
    <>
      <RecentlyViewedCourses recentlyViewedCourses={recentlyViewedCourses} />
      <CoursesWithBookmarks bookmarkCourses={bookmarkCourses} />
      {isProduction && <InsertAds ChildComppnent="HomePageATF" />}
      <Divider />
      <OurCourses courses={courses} />
      <CourseButtons ratingModal={false} />
    </>
  );
};

export default Member;
