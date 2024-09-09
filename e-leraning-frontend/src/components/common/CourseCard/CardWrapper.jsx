"use client";
import Link from "next/link";
import CourseButtonArrow from "@/assets/icons/CourseDetailButtonArrow";
import "./style.scss";

const CardWrapper = ({ route, children, course }) => {
  const handleHover = (e) => {
    if (route === "course-search") return;
    if (window.innerWidth >= 1000) {
      const hoverCard = e.currentTarget.querySelector(".hover-card-wrapper");
      const cardRect = e.currentTarget.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      const rightSpace = cardRect.right + 300;
      const bottomSpace = cardRect.bottom + 200;

      if (rightSpace > windowWidth) {
        hoverCard?.classList.add(`${"reverse"}`);
      } else if (bottomSpace > window.innerHeight) {
        hoverCard?.classList.add(`${"reverse-height"}`);
      } else {
        hoverCard.classList.remove(`${"reverse"}`);
        hoverCard.classList.remove(`${"reverse-height"}`);
      }
      hoverCard.style.display = "block";

      if (e.currentTarget.getElementsByTagName("ul")[0])
        hoverCard.style.top = `-${Math.ceil(hoverCard?.offsetHeight / 3)}px`;
    }
  };

  const handleLeave = (e) => {
    const hoverCard = e.currentTarget.querySelector(`.${"hover-card-wrapper"}`);
    hoverCard.style.display = "none";
    hoverCard.style.top = "-20px";
    hoverCard.classList.remove(`${"reverse"}`);
    hoverCard.classList.remove(`${"reverse-height"}`);
  };

  return (
    <div
      className="main-card-wrapper"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onScroll={handleLeave}
      style={{ backgroundColor: course?.primary_color }}
    >
      {children}
      <div className={`hover-card-wrapper ${course?.unique_identifier}`}>
        <h5 className="hover-card-header"> {course?.short_title}</h5>
        <div
          className="hover-card-description"
          dangerouslySetInnerHTML={{ __html: course?.popup_description }}
        />
        <Link className="chapter-button" href={`course/${course?.course_slug}`}>
          Start {course?.details?.chapter}
          <CourseButtonArrow />
        </Link>
      </div>
    </div>
  );
};

export default CardWrapper;
