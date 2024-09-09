import { CourseProvider } from "@/components/Course/CourseGuide/GuideContext/CourseGuideContext";
const CourseLayout = ({ children }) => {
  return (
    <div>
      <CourseProvider>{children}</CourseProvider>
    </div>
  );
};

export default CourseLayout;
