import Divider from "@/components/shared/Divider";
import ChapterTopicCard from "@/components/Course/Chapter/ChapterTopicCard";
import ReuseableCarousel from "@/components/common/ReuseableCarousel";
import {
  AccordionItem,
  AccordionRoot,
} from "@/components/Course/CoursesAccordion";
import "./style.scss";

const Chapter = ({ title, topicsDetail, islibrary }) => {
  return (
    <div className={"chapter-container"}>
      <AccordionRoot>
        <AccordionItem
          title={title}
          value={title + "1"}
          triggerClass={"accordion-trigger"}
          triggerContainerClass={"accordion-trigger-container"}
          titleClass={"title"}
          isLibrary={islibrary}
        />
      </AccordionRoot>
      <ReuseableCarousel cls={"chapter-carusal"}>
        {topicsDetail.length === 0 ? (
          <h4>No history for {title}</h4>
        ) : (
          topicsDetail?.map((topic) => {
            const isMemberOnlyTopic =
              topic?.visibility_status === "member_only";
            return (
              <ChapterTopicCard
                isMemberOnlyTopic={isMemberOnlyTopic}
                topicSlug={topic?.topic_slug}
                key={topic?.short_title}
                title={topic?.short_title}
                imageUrl={topic?.main_figure_url}
                topicId={topic?.id}
                imageAlt={topic?.img_alt}
              />
            );
          })
        )}
      </ReuseableCarousel>
      <div className="recently-viewed-divider">
        {title === "Today" ? <Divider /> : ""}
      </div>
    </div>
  );
};
export default Chapter;
