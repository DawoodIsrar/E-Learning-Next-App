import Bookmark from "@/assets/icons/BookMark";
import ChapterTopicCard from "../../Chapter/ChapterTopicCard";
import CircularLoading from "@/components/common/Loading";
import ReuseableCarousel from "../../../common/ReuseableCarousel";
import "./style.scss";
import { Suspense } from "react";

const TopicsWithBookmarks = ({ bookmarkedTopics }) => {
  if (!bookmarkedTopics?.length) {
    return <></>;
  }

  return (
    <>
      <div className="bookmark-courses-wrapper">
        <div className="bookmark-course-header">
          <Bookmark className="bookmark-icon" />
          <h2 className="bookmark-header-h3">Bookmarks</h2>
        </div>
        <Suspense fallback={<CircularLoading />}>
          <ReuseableCarousel className="topic-slider">
            {bookmarkedTopics?.map((topic, index) => {
              return (
                <div className="carosal-wrapper" key={topic?.id}>
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

export default TopicsWithBookmarks;
