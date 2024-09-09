import CourseBreadcrumbs from "./CourseBreadcrumbs";
import CourseContent from "./CourseContent";
import Buttons from "./Buttons";

const Course = ({
  courseDetails,
  courseGuide,
  bookmarkedTopics,
  recentlyViewedTopics,
}) => {
  return (
    <div>
      <CourseBreadcrumbs courseDetails={courseDetails} />
      <CourseContent
        courseDetails={courseDetails}
        courseGuide={courseGuide}
        bookmarkedTopics={bookmarkedTopics}
        recentlyViewedTopics={recentlyViewedTopics}
      />
      <Buttons courseDetails={courseDetails} ratingModal={true} />
    </div>
  );
};

export default Course;
