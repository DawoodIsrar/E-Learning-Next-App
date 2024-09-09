"use client";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import ArrowDown from "@/assets/icons/AccordionArrowDown";
import BookmarkIcon from "@/assets/icons/BookMark";
import "./style.scss";
import { usePathname } from "next/navigation";

export const AccordionRoot = ({ children }) => {
  return (
    <Accordion.Root type="single" collapsible className="accordion-root">
      {children}
    </Accordion.Root>
  );
};

export function AccordionItem({
  title,
  value,
  content,
  triggerClass,
  triggerContainerClass,
  titleClass,
  borderBottom,
  lessons,
  chapterInfo,
  isLibrary,
  libraryBookmark,
  isLibraryCourse,
  recentlyViewedPage,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="accordion-item" value={value} onClick={handleToggle}>
      <div
        className={`${triggerClass ?? "accordion-trigger"} ${
          borderBottom ? "accordion-border-bottom" : ""
        }`}
      >
        <div className={triggerContainerClass ?? "accordion-trigger-container"}>
          <div className="accordion-trigger-wrapper">
            <div className="bookmark-and-title">
              {!isLibraryCourse && !isLibrary && !recentlyViewedPage ? (
                <BookmarkIcon
                  color={libraryBookmark}
                  className="library-bookmark"
                />
              ) : (
                <></>
              )}
              <h2 className={!isLibrary ? "" : "title"}>{title}</h2>
            </div>
            {lessons && <p>{lessons} lessons</p>}
          </div>

          <div
            className="chapter-name-div"
            data-state={isOpen ? "open" : "closed"}
          >
            <p className="w_max">{chapterInfo}</p>
            {isLibrary === "course" && isLibrary === "bookmark" ? (
              <></>
            ) : (
              lessons && <ArrowDown className="arrow-icon" isOpen={isOpen} />
            )}
          </div>
        </div>
      </div>
      {pathname !== "/my-recently-viewed/" && pathname !== "/my-library/" && (
        <div className="accordion-content">
          {isOpen && (
            <div
              className="course_details"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      )}
    </div>
  );
}
