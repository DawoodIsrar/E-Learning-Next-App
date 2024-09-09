import CourseCard from "@/components/common/CourseCard";
import "./style.scss";

const CoursesAvailable = async ({ courses }) => {
  return (
    <div className={!courses?.length ? "main-div" : ""}>
      {!courses?.length ? (
        <p className="course-not-found">No Course Found</p>
      ) : (
        <div className="course-card-wrapper">
          {courses?.map((course, index) => (
            <CourseCard key={index} course={course} route="non-member-page" />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesAvailable;
