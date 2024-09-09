"use client";
import React from "react";
import { useCourseContext } from "../CourseGuide/GuideContext/CourseGuideContext";

const CourseNameLogoWrapper = ({ children }) => {
  const { isOpenCourseDetails } = useCourseContext();
  return <>{isOpenCourseDetails && children}</>;
};

export default CourseNameLogoWrapper;
