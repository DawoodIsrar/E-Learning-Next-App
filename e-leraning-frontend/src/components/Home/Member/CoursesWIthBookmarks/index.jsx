import "./style.scss";
import CarouselCard from "../../../common/CarouselCard";
import Carousel from "../../../common/ReuseableCarousel";
import BookmarkIcon from "@/assets/icons/BookMark";
import Section from "@/components/shared/Section";

const CoursesWithBookmarks = ({ bookmarkCourses }) => {
  if (!bookmarkCourses?.length) {
    return <></>;
  }
  return (
    <>
      <Section
        sectionClasses={"main-bookmark-courses-wrapper"}
        widthHandlerDivClasses="bookmark-courses-wrapper"
      >
        <div className="bookmark-course-header">
          <BookmarkIcon />
          <h2 className="bookmark-header-h3"> Courses With Bookmarks</h2>
        </div>
        <Carousel className="topic-slider">
          {bookmarkCourses?.map((data, index) => (
            <div key={index} className="carosal-wrapper">
              <CarouselCard card={data} bgColor={data?.primary_color} />
            </div>
          ))}
        </Carousel>
      </Section>
    </>
  );
};

export default CoursesWithBookmarks;
