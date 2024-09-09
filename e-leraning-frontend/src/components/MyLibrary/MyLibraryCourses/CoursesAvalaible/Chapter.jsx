import {
  AccordionItem,
  AccordionRoot,
} from "@/components/Course/CoursesAccordion";
import ChapterTopicCard from "@/components/Course/Chapter/ChapterTopicCard";
import ReuseableCarousel from "@/components/common/ReuseableCarousel";
import "./style.scss";

const Chapter = ({
  title,
  chapterDetails,
  bookmarkColor,
  islibrary,
  isLibraryCourse,
  onBookmarkChanged,
}) => {
  return (
    <div className={"chapter-container"}>
      <AccordionRoot>
        <AccordionItem
          title={title}
          value={title + "1"}
          triggerClass={"accordion-trigger"}
          triggerContainerClass={"accordion-trigger-container"}
          titleClass={"title"}
          // chapterInfo={`(${chapterDetails.length})`}
          isLibrary={islibrary}
          libraryBookmark={bookmarkColor}
          isLibraryCourse={isLibraryCourse}
        />
      </AccordionRoot>
      {/* <FaqAccordian FAQ={title} /> */}
      <ReuseableCarousel cls={"chapter-carusal"}>
        {chapterDetails?.map((topic, index) => {
          const isMemberOnlyTopic = topic?.visibility_status === "member_only";
          return (
            <ChapterTopicCard
              onBookmarkChanged={onBookmarkChanged}
              isMemberOnlyTopic={isMemberOnlyTopic}
              bookmarkValue={!islibrary && topic.bookmark_list}
              topicSlug={topic?.topic_slug}
              key={topic?.short_title}
              title={topic?.short_title}
              imageUrl={topic?.main_figure_url}
              topicId={topic?.id}
              needPopup={true}
              imageAlt={topic?.img_alt}
            />
          );
        })}
      </ReuseableCarousel>
    </div>
  );
};
export default Chapter;
