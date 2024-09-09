import Card from "./Card";
import CardWrapper from "./CardWrapper";

const CourseCard = ({ course }) => {
  return (
    <CardWrapper course={course}>
      <Card course={course} />
    </CardWrapper>
  );
};

export default CourseCard;
