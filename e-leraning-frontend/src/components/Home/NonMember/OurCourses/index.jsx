import CoursesAvailable from "./CoursesAvalaible";
import Section from "@/components/shared/Section";
import "./style.scss";

const OurCourses = ({ courses }) => {
  return (
    <Section
      sectionClasses={"main-container-wrapper"}
      widthHandlerDivClasses={"main-container-ourcourses"}
    >
      <h2 className="main-container-ourcourses-h2">
        Our Digital Skills Courses
      </h2>
      <div className="ourCourse-wrapper">
        <CoursesAvailable courses={courses} />
      </div>
    </Section>
  );
};

export default OurCourses;
