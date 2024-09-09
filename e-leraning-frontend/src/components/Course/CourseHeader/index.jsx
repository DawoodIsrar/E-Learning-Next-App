import CourseNameLogoWrapper from "../CourseNameLogoWrapper";
import "./style.scss";

const CourseHeader = ({ courseDetails, courseGuide }) => {
  return (
    <div className="courses-with-bookmark-header">
      <CourseNameLogoWrapper
        courseIcon={courseDetails?.icon_url}
        courseName={courseDetails?.short_title}
        color={courseDetails.primary_color}
        courseSecondaryIcon={courseDetails?.secondary_icon}
        courseGuide={courseGuide}
        courseDetails={courseDetails}
      />
    </div>
  );
};

export default CourseHeader;
