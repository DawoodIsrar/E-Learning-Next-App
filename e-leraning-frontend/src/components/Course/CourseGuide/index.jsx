"use client";
import { useCourseContext } from "./GuideContext/CourseGuideContext";
import ArrowHeadDown from "@/assets/icons/ArrowHeadDown";
import "./style.scss";

const CourseGuideMember = () => {
  const { isOpenCourseDetails, toggleGuideDetails } = useCourseContext();

  return (
    <button className={"course-show-guide"} onClick={toggleGuideDetails}>
      <p>Course Guide</p>
      <ArrowHeadDown
        width="16"
        height="16"
        className={isOpenCourseDetails ? "rotate" : "rotate-reverse"}
      />
    </button>
  );
};

export default CourseGuideMember;
