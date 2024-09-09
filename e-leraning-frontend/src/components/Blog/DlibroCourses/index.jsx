import "./style.scss";
import Section from "../../shared/Section";
import CarouselCard from "../../common/CarouselCard";
import Carousel from "../../common/ReuseableCarousel";
import React from "react";
import ChapterTopicCard from "@/components/Course/Chapter/ChapterTopicCard";

const ExploreMore = ({ title, subTitle, coursesAndTopics, topic }) => {
  coursesAndTopics = coursesAndTopics.sort((a, b) => a.position - b.position);
  return (
    <>
      <div className={!coursesAndTopics?.length && "main-div"}>
        <Section sectionClasses="blog-course-slider">
          <div className="slider-title-container">
            {title && <h2>{title}</h2>}
            {subTitle && <p>{subTitle}</p>}
          </div>

          {!coursesAndTopics?.length ? (
            <p className="course-not-found">
              No {topic ? "Topic" : "Course"} Found
            </p>
          ) : (
            <Carousel className={topic ? "blogTopic" : ""}>
              {coursesAndTopics?.map((data, index) =>
                topic ? (
                  <React.Fragment key={index}>
                    <ChapterTopicCard
                      topicSlug={data?.topic_slug}
                      key={data?.short_title}
                      title={data?.short_title}
                      imageUrl={data?.main_figure_url}
                      topicId={data?.id}
                      needPopup={true}
                    />
                  </React.Fragment>
                ) : (
                  <div className="carosal-wrapper" key={index}>
                    <CarouselCard card={data} bgColor={data?.primary_color} />
                  </div>
                )
              )}
            </Carousel>
          )}
        </Section>
      </div>
    </>
  );
};

export default ExploreMore;
