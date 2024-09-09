import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import HomeIcon from "@/assets/icons/HomeIcon";
import Link from "next/link";
import "./style.scss";

function getFirstTopic(chapters, chapter_breadcrumb_name) {
  for (const obj of chapters) {
    if (obj.name === chapter_breadcrumb_name) {
      return (obj.topics[0] && obj.topics[0]?.topic_slug) || "";
    }
  }
  return "";
}

const TopicBreadcrumbs = ({ topicData }) => {
  let firstTopicSlug = "";
  firstTopicSlug = getFirstTopic(
    topicData.course.chapters,
    topicData.details.chapter_breadcrumb_name
  );

  return (
    <div className="topic-page-banner">
      <Link aria-label="home page" href="/">
        <HomeIcon width="16" height="16" />
      </Link>

      <HeaderRightArrow width="16" height="16" />

      <Link
        aria-label={`${topicData?.course?.name} page`}
        href={`/course/${topicData?.course?.course_slug}`}
        className="p1 link-to-p "
      >
        {topicData?.course?.breadcrumb_name ??
          topicData?.details?.course_breadcrumb_name}
      </Link>
      {topicData?.details ? (
        <>
          <HeaderRightArrow width="16" height="16" />
          <Link
            className="p2"
            aria-label={`${topicData?.course?.name} chapter`}
            href={`/topic/${firstTopicSlug}`}
          >
            {topicData?.details?.chapter_breadcrumb_name}
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopicBreadcrumbs;
