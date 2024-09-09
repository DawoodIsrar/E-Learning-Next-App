import Accordion from "../Accordion";
import "./style.scss";

const SideBar = ({ topicData, chapters }) => {
  return (
    <>
      <div className="sidebar">
        <h4>
          {topicData?.course?.breadcrumb_name ??
            topicData?.details?.course_breadcrumb_name}
        </h4>
        <Accordion
          FAQ={chapters}
          key="topic"
          accordionHeight={508}
          accordionWidth={295}
          defaultOpen={topicData?.details?.short_title}
        />
      </div>
    </>
  );
};

export default SideBar;
