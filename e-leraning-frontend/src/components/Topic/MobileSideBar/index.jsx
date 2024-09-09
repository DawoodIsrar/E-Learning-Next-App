"use client";
import { useEffect, useRef, useState } from "react";
import Accordion from "../Accordion";
import "./style.scss";

const MobileSideBar = ({
  chapters,
  setShowSideBarFalse,
  showSideBar,
  spaceAvailable,
  topicData,
}) => {
  const dropdownWrapperRef = useRef(null);

  const [touchPosition, setTouchPosition] = useState(null);

  const handleClickOutside = (event) => {
    if (
      dropdownWrapperRef.current &&
      !dropdownWrapperRef.current.contains(event.target)
    ) {
      setShowSideBarFalse();
    }
  };
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;
    if (diff > 0) {
      setShowSideBarFalse();
    }
  };

  useEffect(() => {
    if (showSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideBar]);

  useEffect(() => {
    if (showSideBar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showSideBar]);

  return (
    <div
      id="myModal"
      className={`mobile-view-modal ${showSideBar ? "h-100" : "h-0"}`}
    >
      <div
        className={`mobile-view-nav-menu ${
          showSideBar
            ? "mobile-view-nav-menu-height"
            : "mobile-view-nav-menu-zero-height "
        }`}
      >
        <div
          ref={dropdownWrapperRef}
          className={`mobile-view-menu-dropdown-wrapper ${
            spaceAvailable ? "b-64" : "b-0"
          }`}
        >
          {showSideBar && (
            <div className="mobile-sidebar-cross-btn">
              <div
                className="mobile-sidebar-cross-btn-span "
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              ></div>
              <div className="mobile-view-menu-cross-icon"></div>
            </div>
          )}
          <aside className="mobile-view-mobile-sidebar">
            <Accordion
              showSideBar={showSideBar}
              setShowSideBarFalse={setShowSideBarFalse}
              FAQ={chapters}
              key="topic"
              accordionHeight={506}
              accordionWidth={270}
              defaultOpen={topicData?.details?.short_title}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
