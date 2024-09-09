"use client";
import { useState, useEffect, useRef } from "react";
import AccordianIcon from "@/assets/icons/AccordianIcon";
import { useWindowWidth } from "@/utils/windowWidthHook";
import Link from "next/link";
import "./style.scss";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Accordion = ({
  showSideBar,
  FAQ,
  accordionWidth,
  defaultOpen,
  setShowSideBarFalse,
}) => {
  const tabRefs = useRef([]);
  const { width } = useWindowWidth();

  const findDefaultOpenIndex = (defaultOpenName) => {
    for (let i = 0; i < FAQ?.length; i++) {
      const course = FAQ[i];
      const index = course?.topics?.findIndex(
        (topic) => topic.short_title === defaultOpenName
      );
      if (index !== -1) {
        return i;
      }
    }
    return -1;
  };

  const [openTab, setOpenTab] = useState(findDefaultOpenIndex(defaultOpen));
  const [iconColor] = useState("var(--text_primary)");

  useEffect(() => {
    setOpenTab(findDefaultOpenIndex(defaultOpen));
  }, [defaultOpen]);

  useEffect(() => {
    if (openTab !== null && tabRefs.current[openTab]) {
      tabRefs.current[openTab].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [openTab]);

  const handleTabClick = (index) => {
    setOpenTab((prevOpenTab) => (prevOpenTab === index ? null : index));
    const element = document.getElementById(`tab ${index}`);
    if (element)
      element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const element = document.getElementsByClassName("active-topic")[0];
    if (element)
      element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [defaultOpen]);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const id = params.get("id");
  const handleScroll = (e) => {
    router.push(`${pathname}?id=${convertHeadingInSlug(e.target.textContent)}`);
    setShowSideBarFalse();
  };
  const convertHeadingInSlug = (originalString) => {
    return originalString.toLowerCase().replace(/\s+/g, "-");
  };
  return (
    <div
      className={`accordion ${
        width >= 1000
          ? "accordion-max-height"
          : showSideBar
          ? "accordion-height"
          : ""
      }`}
    >
      {FAQ?.map((faq, index) => (
        <div
          className={`tab ${index}`}
          key={index}
          ref={(el) => (tabRefs.current[index] = el)}
        >
          <input
            type="checkbox"
            id={`tab${index}`}
            className="tab-input"
            checked={openTab === index}
            onChange={() => {
              handleTabClick(index);
            }}
          />
          <label
            htmlFor={`tab${index}`}
            className="tab-label"
            style={{ width: accordionWidth === 508 ? "295px" : "auto" }}
          >
            <p onClick={faq.name ? "" : handleScroll}>
              {faq.name ? faq.name : faq}
            </p>
            {faq.name && (
              <button
                onClick={() => {
                  handleTabClick(index);
                }}
              >
                <AccordianIcon
                  iconColor={iconColor}
                  className="topic-accordion-icon"
                  isRotated={openTab === index}
                />
              </button>
            )}
          </label>
          {faq?.topics && (
            <div className="tab-content">
              {faq?.topics?.map((item, i) => (
                <Link
                  className="topic-link"
                  href={`/topic/${item.topic_slug}`}
                  key={i}
                >
                  <p
                    className={`${
                      item.short_title === defaultOpen
                        ? "active-topic"
                        : "unactive-topic"
                    }`}
                  >
                    {item.short_title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
