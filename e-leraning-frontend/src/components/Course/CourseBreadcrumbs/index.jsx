import Link from "next/link";
import HomeIcon from "@/assets/icons/HomeIcon";
import ArrowHeadRight from "@/assets/icons/ChevronRightLight";
import Section from "../../shared/Section";
import "./style.scss";

const CourseBanner = (courseDetails) => {
  return (
    <Section
      sectionClasses={"course-page-wrapper"}
      widthHandlerDivClasses="course-main-banner-container"
    >
      <div className="course-main-banner">
        <Link href="/">
          <HomeIcon width={20} height={20} />
        </Link>
        <ArrowHeadRight width={16} height={16} />
        <p>{courseDetails?.courseDetails?.breadcrumb_name}</p>
      </div>
    </Section>
  );
};

export default CourseBanner;
