import Member from "./Member";
import NonMember from "./NonMember";

const Home = ({ userId, courses, recentlyViewedCourses, bookmarkCourses }) => {
  return userId ? (
    <Member
      courses={courses}
      recentlyViewedCourses={recentlyViewedCourses}
      bookmarkCourses={bookmarkCourses}
    />
  ) : (
    <NonMember courses={courses} />
  );
};

export default Home;
