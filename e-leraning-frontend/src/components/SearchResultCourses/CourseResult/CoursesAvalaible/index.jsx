import CourseCard from "@/components/common/CourseCard";
import "./style.scss";

const CoursesAvailable = ({ data }) => {
  return (
    <div className={!data?.length ? "main-div" : ""}>
      {!data?.length ? (
        <p className="course-not-found">No Course Found</p>
      ) : (
        <div className="course-search-result-card-wrapper">
          {data?.map((course, index) => (
            <CourseCard key={index} course={course} route="course-search" />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesAvailable;
