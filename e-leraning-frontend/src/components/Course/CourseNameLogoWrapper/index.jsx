import React from "react";
import CourseName from "../CourseName";
import ShowHideWrapper from "./ShowHideWrapper";
import CourseGuideMember from "../CourseGuide";
import CourseGuide from "../Chapter/CourseGuide";
import "./style.scss";

const CourseNameLogoWrapper = ({
  courseIcon,
  courseName,
  color,
  courseGuide,
  courseSecondaryIcon,
  courseDetails,
}) => {
  return (
    <>
      <div
        className="course-name-logo-wrapper"
        style={{ backgroundColor: `${color}` }}
      >
        <CourseName
          courseIcon={courseIcon}
          courseName={courseName}
          color={color}
          courseSecondaryIcon={courseSecondaryIcon}
        />
        <CourseGuideMember courseGuide={courseGuide} />
      </div>
      <ShowHideWrapper>
        <div className="course-guide-wrapper">
          <CourseGuide
            secondaryColor={courseDetails?.secondary_color}
            courseGuide={courseGuide}
          />
        </div>
      </ShowHideWrapper>
    </>
  );
};

export default CourseNameLogoWrapper;
