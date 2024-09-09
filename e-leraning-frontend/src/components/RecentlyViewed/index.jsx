import Section from "./../shared/Section";
import Banner from "./Banner";
import RecentlyViewedDetails from "./RecentlyViewedDetails";
import RecentlyViewedIcon from "@/assets/icons/ClockRewind";
import CourseButtons from "./../Course/Buttons";
import "./style.scss";

const RecentlyViewed = () => {
  return (
    <>
      <Banner />
      <Section widthHandlerDivClasses="recently-viewed-main-wrapper">
        <div className="recently-viewed-wrapper">
          {" "}
          <div className="recently-viewed-banner-title">
            <RecentlyViewedIcon
              className="recently-viewed-logo"
              width={45}
              height={45}
            />
            <h1>Recently Viewed Topics</h1>
          </div>
          <RecentlyViewedDetails />
        </div>
      </Section>
      <CourseButtons ratingModal={false} />
    </>
  );
};

export default RecentlyViewed;
