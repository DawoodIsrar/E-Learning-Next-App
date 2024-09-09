import Prism from "@/components/common/Prism";
import EventBinder from "./EventBinder";
import { getAccessTokenCookies } from "@/services/server-action-cookies";
import "./style.scss";

const CourseGuide = async ({ secondaryColor, courseGuide }) => {
  const token = await getAccessTokenCookies();
  const isAuthenticated = !!token;

  return (
    <div className="detailpage">
      <Prism />
      <EventBinder secondaryColor={secondaryColor} />
      {courseGuide && (
        <div
          className={`editor-course-guide ${isAuthenticated ? "p-50" : ""}`}
          dangerouslySetInnerHTML={{
            __html: courseGuide,
          }}
        />
      )}
    </div>
  );
};

export default CourseGuide;
