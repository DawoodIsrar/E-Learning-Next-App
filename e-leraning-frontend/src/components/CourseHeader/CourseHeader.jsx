"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CourseGuide from "../CourseGuide";
import { useState } from "react";
import "./CourseHeader.scss";

const CourseHeader = ({ data, accessToken }) => {
  const [open, setOpen] = useState(!Boolean(accessToken));

  const onRedirectToCourseGuide = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="fixed-top-container">
        <div className="course-btn" onClick={onRedirectToCourseGuide}>
          <div className="course-btn-content">
            <span className="title">
              Course Guide
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </span>
          </div>
        </div>
      </div>

      {open && <CourseGuide guide={data?.guide} />}
    </>
  );
};

export default CourseHeader;
