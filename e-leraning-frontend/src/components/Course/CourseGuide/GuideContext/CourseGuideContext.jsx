"use client";
import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [isOpenCourseDetails, setIsOpenCourseDetails] = useState(false);

  const toggleGuideDetails = () => {
    setIsOpenCourseDetails((prevState) => !prevState);
  };

  return (
    <CourseContext.Provider value={{ isOpenCourseDetails, toggleGuideDetails }}>
      {children}
    </CourseContext.Provider>
  );
};
