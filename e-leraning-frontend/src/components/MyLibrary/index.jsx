import Banner from "./Banner";
import MyLibraryCourses from "./MyLibraryCourses";
import CourseButtons from "./../Course/Buttons";

const MyLibrary = () => {
  return (
    <>
      <Banner />
      <MyLibraryCourses />
      <CourseButtons ratingModal={false} />
    </>
  );
};

export default MyLibrary;
