import "./style.scss";
import CoursesAvailable from "../../NonMember/OurCourses/CoursesAvalaible";

const AvailaibleCourses = () => {
  return (
    <div className="main-container-availablecourses">
      <h3 className="main-container-ourcourses-h2">Available Courses </h3>
      <div className="availablecourse-wrapper">
        <CoursesAvailable />
      </div>
    </div>
  );
};

export default AvailaibleCourses;
