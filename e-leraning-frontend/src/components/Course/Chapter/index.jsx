import React, { Suspense } from "react";
import Chapter from "./Chapter";
import Section from "../../shared/Section";
import RecentlyViewedTopics from "@/components/Course/CourseHeader/RecentlyViewedTopics";
import TopicsWithBookmark from "@/components/Course/CourseHeader/TopicsWIthBookmarks";
import CircularLoading from "@/components/common/Loading";
import { isProduction } from "@/utils/common";
import dynamic from "next/dynamic";
const InsertAds = dynamic(() => import("@/components/common/InsertAds"));
import "./style.scss";

function ChapterSlider(componentArray) {
  const adComponents = {
    2: "CourseOutlineAdSecond",
    5: "CourseOutlineAdThird",
  };

  return componentArray.map((component, i) => {
    const chapterComponent = (
      <Chapter
        key={`chapter-${i}`}
        title={component?.name}
        chapterDetails={component}
      />
    );

    if (adComponents[i] && isProduction) {
      return (
        <React.Fragment key={`courseOne-${i}`}>
          {chapterComponent}
          <InsertAds ChildComppnent={adComponents[i]} />
        </React.Fragment>
      );
    }

    return chapterComponent;
  });
}

const ChaptersContainer = async ({
  courseDetails,
  bookmarkedTopics,
  recentlyViewedTopics,
}) => {
  return (
    <Suspense fallback={<CircularLoading />}>
      <Section
        sectionClasses={"chapters-section-most-outer-wrapper"}
        widthHandlerDivClasses={"chapters-section-outer-container"}
      >
        <RecentlyViewedTopics recentlyViewedTopics={recentlyViewedTopics} />
        <TopicsWithBookmark bookmarkedTopics={bookmarkedTopics} />
        <div className="chapter-row-container">
          {ChapterSlider(courseDetails?.chapters)}
        </div>
      </Section>
    </Suspense>
  );
};

export default ChaptersContainer;
