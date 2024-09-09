import CarouselCard from "../../../common/CarouselCard";
import Carousel from "../../../common/ReuseableCarousel";
import RecentlyCourseIcon from "@/assets/icons/RecentlyCourseIcon";
import Section from "@/components/shared/Section";
import "./style.scss";

const RecentlyViewedCourses = ({ recentlyViewedCourses }) => {
  if (!recentlyViewedCourses?.length) {
    return <></>;
  }
  return (
    <>
      <Section
        sectionClasses={"recent-main-wrapper"}
        widthHandlerDivClasses={"Recent-courses-wrapper"}
      >
        <div className="recent-course-header">
          <RecentlyCourseIcon className="recently-viewed-icon" />
          <h2 className="recent-course-header-h3">Recently Viewed Courses</h2>
        </div>
        <Carousel className="topic-slider">
          {recentlyViewedCourses?.map((data, index) => (
            <div className="carosal-wrapper" key={index}>
              <CarouselCard card={data} bgColor={data.primary_color} />
            </div>
          ))}
        </Carousel>
      </Section>
    </>
  );
};

export default RecentlyViewedCourses;
