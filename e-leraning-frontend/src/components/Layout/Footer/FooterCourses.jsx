import Link from "next/link";

const FooterCourses = async ({ coursesAvailible }) => {
  return (
    <div className="course-links">
      <ul>
        <li className="heading">COURSES</li>
        {coursesAvailible?.map((course, index) => (
          <li className="list-item" key={index}>
            <Link href={`/course/${course.course_slug}`}>
              {course?.short_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterCourses;
