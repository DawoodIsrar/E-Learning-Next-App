import Section from "@/components/shared/Section";
import ButtonArrow from "@/assets/icons/WhiteArrowIcon";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";

const ChapterBanner = ({ courseDetails }) => {
  return (
    <Section
      widthHandlerDivClasses={"course-page-content-container"}
      sectionClasses={"course-main-content-wrapper"}
      widthHandlerDivInlineStyling={{}}
    >
      <div
        className="course-p-banner  course-page-content-wrapper"
        style={{
          backgroundColor: courseDetails?.secondary_color,
        }}
      >
        <div className="course-banner-internal-wrapper">
          <div className="course-banner-content-wrapper">
            <div className="course-title-image">
              <p className="caption same-font-color">
                {courseDetails?.short_title || "No Name"}
              </p>
              <h1 className="heading same-font-color">
                {courseDetails?.header_h1_title || "No Title"}
              </h1>
            </div>
            <div className="mob-view-course-image">
              {courseDetails?.header_image && (
                <Image
                  priority={true}
                  alt={courseDetails?.header_image_alt}
                  src={courseDetails.header_image}
                  className="cover-image"
                  width={495}
                  height={354}
                />
              )}
            </div>
            <div
              className="banner-content-btn"
              style={{
                marginTop: `${
                  !courseDetails?.header_h1_title
                    ? "0px !important"
                    : "21px !important"
                }`,
              }}
            >
              <p className="supporting-text same-font-color">
                {courseDetails?.header_description || " "}
              </p>
              <Link
                className="start-chapter-btn"
                href={
                  courseDetails?.chapters
                    ? `/topic/${
                        courseDetails?.chapters[0]?.topics[0]?.topic_slug ||
                        courseDetails?.chapters[1]?.topics[0]?.topic_slug
                      }`
                    : `/course/${courseDetails?.course_slug}`
                }
              >
                <span className="white">Start Chapter 1</span>
                <ButtonArrow width={20} height={20} />
              </Link>
            </div>
          </div>
          <div className="large-view-course-image">
            {courseDetails?.header_image && (
              <Image
                priority
                alt={courseDetails?.header_image_alt}
                src={courseDetails.header_image}
                className="cover-image"
                width={495}
                height={354}
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ChapterBanner;
