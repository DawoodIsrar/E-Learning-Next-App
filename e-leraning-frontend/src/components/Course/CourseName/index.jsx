import Image from "next/image";
import "./style.scss";

const CourseName = ({ courseIcon, courseName, courseSecondaryIcon }) => {
  return (
    <div className="course-bookmarks-name">
      <div className="course-icon-container">
        <div className="image-div">
          <Image src={courseIcon} width={32} height={32} alt="course logo1" />
        </div>
        {courseSecondaryIcon && (
          <div className="image-div">
            <Image
              src={courseSecondaryIcon}
              width={32}
              height={32}
              alt="course logo2"
            />
          </div>
        )}
      </div>
      <div className="course-page-name-heading">
        <h2>{courseName}</h2>
      </div>
    </div>
  );
};

export default CourseName;
