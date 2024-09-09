import React, { Suspense } from "react";
import ChapterTopicCard from "./ChapterTopicCard";
import dynamic from "next/dynamic";

const ReuseableCarousel = dynamic(() =>
  import("../../common/ReuseableCarousel")
);
import { AccordionItem, AccordionRoot } from "../CoursesAccordion";
import CircularLoading from "@/components/common/Loading";
import "./style.scss";

const Chapter = ({ title, chapterDetails }) => {
  return (
    <div className={"chapter-container"}>
      <AccordionRoot>
        <AccordionItem
          content={chapterDetails?.details}
          title={title}
          lessons={chapterDetails.topics.length}
          value={title + "1"}
          triggerClass={"accordion-trigger"}
          triggerContainerClass={"accordion-trigger-container"}
          titleClass={"title"}
          chapterInfo={"Chapter Information"}
          recentlyViewedPage={true}
        />
      </AccordionRoot>

      <Suspense fallback={<CircularLoading />}>
        <ReuseableCarousel cls={"chapter "}>
          {chapterDetails?.topics?.map((topic, index) => {
            const isMemberOnlyTopic =
              topic?.visibility_status === "member_only";
            return (
              <React.Fragment key={index}>
                <ChapterTopicCard
                  isMemberOnlyTopic={isMemberOnlyTopic}
                  topicSlug={topic?.topic_slug}
                  key={topic?.short_title}
                  title={topic?.short_title}
                  imageUrl={topic?.main_figure_url}
                  topicId={topic?.id}
                  imageAlt={topic.img_alt}
                  needPopup={true}
                />
              </React.Fragment>
            );
          })}
        </ReuseableCarousel>
      </Suspense>
    </div>
  );
};
export default Chapter;
