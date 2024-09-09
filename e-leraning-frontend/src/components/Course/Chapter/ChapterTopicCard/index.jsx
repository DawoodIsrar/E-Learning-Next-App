import Bookmark from "@/components/common/Bookmark";
import ImageComponent from "./ImageComponent";
import "./style.scss";

const ChapterTopicCard = ({
  imageUrl,
  title,
  topicSlug,
  topicId,
  bookmarkValue,
  needPopup = false,
  onBookmarkChanged,
  imageAlt,
}) => {
  return (
    <div className="chapter-card">
      <ImageComponent
        imageUrl={imageUrl}
        topicSlug={topicSlug}
        imageAlt={imageAlt}
      />

      <div className="flex-center">
        <h4 className="chapter-card-title">{title}</h4>
        {needPopup && (
          <Bookmark
            onBookmarkChanged={onBookmarkChanged}
            topicId={topicId}
            bookmarkValue={bookmarkValue}
          />
        )}
      </div>
    </div>
  );
};

export default ChapterTopicCard;
