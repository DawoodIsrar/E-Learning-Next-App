import parse from "html-react-parser";

const CourseHeaderContent = ({ content }) => {
  return parse(content);
};

export default CourseHeaderContent;
