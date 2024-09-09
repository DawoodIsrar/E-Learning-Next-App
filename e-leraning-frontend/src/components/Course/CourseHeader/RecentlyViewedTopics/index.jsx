import ChapterTopicCard from "../../Chapter/ChapterTopicCard";
import ReuseableCarousel from "../../../common/ReuseableCarousel";
import RecentlyCourseIcon from "@/assets/icons/RecentlyCourseIcon";
import CircularLoading from "@/components/common/Loading";
import { Suspense } from "react";
import "./style.scss";

const RecentlyViewedTopics = ({ recentlyViewedTopics }) => {
  if (!recentlyViewedTopics?.length) {
    return <></>;
  }
  return (
    <>
      <div className="recently-courses-wrapper">
        <div className="recently-course-header">
          <RecentlyCourseIcon className="recently-viewed-icon" />
          <h2 className="recent-course-header-h3">Recently Viewed Topics</h2>
        </div>
        <Suspense fallback={<CircularLoading />}>
          <ReuseableCarousel className="topic-slider">
            {recentlyViewedTopics?.map((topic, index) => {
              return (
                <div className="carosal-wrapper" key={`${topic?.id}-${index}`}>
                  <ChapterTopicCard
                    title={topic?.short_title}
                    imageUrl={topic?.main_figure_url}
                    topicSlug={topic?.topic_slug}
                    topicId={topic?.id}
                    bookmarkValue={topic?.bookmark_list}
                    needPopup={true}
                    imageAlt={topic?.img_alt}
                  />
                </div>
              );
            })}
          </ReuseableCarousel>
        </Suspense>
      </div>
    </>
  );
};

export default RecentlyViewedTopics;
