"use client";

import { useState, useEffect, useRef } from "react";
import DotsHorizantal from "@/assets/icons/DotsHorizontal";
import RightArrow from "@/assets/icons/ChevronRight";
import LeftArrow from "@/assets/icons/ChevronLeft";
import ListIcon from "@/assets/icons/ListIcon";
import MobileSideBar from "../MobileSideBar";
import ShareButton from "./ShareButton";
import Rating from "./Rating";
import History from "./History";
import Library from "./Library";
import { useSession } from "next-auth/react";
import { useWindowWidth } from "@/utils/windowWidthHook";
import "./style.scss";
import { useRouter } from "next/navigation";

const Footer = ({ topicData, chapters, className }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [spaceAvailable, setSpaceAvailable] = useState(true);
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { width } = useWindowWidth();

  const { data: session, status } = useSession();
  const { accessToken } = session || {};

  const previousDetails = topicData?.details?.previous_topic?.topic_slug;
  const nextDetails = topicData?.details?.next_topic?.topic_slug;

  const handlePrevious = async () => {
    const previousDetails = topicData?.details?.previous_topic?.topic_slug;
    setDisable(true);
    router.push(`/topic/${previousDetails}`);
  };

  const handleNext = async () => {
    const nextDetails = topicData?.details?.next_topic?.topic_slug;
    setDisable(true);
    router.push(`/topic/${nextDetails}`);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  const handleScroll = () => {
    const myDiv = document.getElementById("dot-menu");
    if (myDiv) {
      const rect = myDiv.getBoundingClientRect();
      setSpaceAvailable(rect.top - 80 > 500);
    }
  };

  const handleShowSidebar = (e) => {
    const element = e.currentTarget;
    const targetDiv = document.querySelector(".main-footer-container");
    if (targetDiv && targetDiv.classList.contains("in-view")) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    setShowSideBar(true);
  };

  const setShowSideBarFalse = () => {
    setShowSideBar(false);
  };

  useEffect(() => {
    if (accessToken && status !== "loading") {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (showSideBar) {
      document.body.style.overflowY = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflowY = "auto";
      document.body.classList.remove("modal-open");
    }
  }, [showSideBar]);

  useEffect(() => {
    accessToken ? setAuthenticated(true) : false;
  }, [accessToken]);

  useEffect(() => {
    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropDown]);

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`topic-page-footer ${className}`}>
      <div className="topic-page-footer-wrapper">
        <div className="dot-menu" ref={dropdownRef}>
          <div className="drop-down">
            {showDropDown && (
              <div className="dropdown-content">
                <History MobileView={true} authenticated={authenticated} />
                <Library MobileView={true} authenticated={authenticated} />
                <Rating
                  topicData={topicData}
                  MobileView={true}
                  authenticated={authenticated}
                />
                <ShareButton MobileView={true} authenticated={authenticated} />
              </div>
            )}
          </div>
          <div className="icon">
            <button
              className="dot-horizantal-icon"
              aria-label="three dot for more options"
              onClick={() => {
                setShowDropDown((prev) => !prev);
              }}
            >
              <DotsHorizantal width="24" height="24" />
            </button>
          </div>
        </div>
        {width >= 1000 && (
          <div className="icons">
            <History MobileView={false} authenticated={authenticated} />
            <Library MobileView={false} authenticated={authenticated} />
            <Rating
              topicData={topicData}
              MobileView={false}
              authenticated={authenticated}
            />
            <ShareButton MobileView={false} authenticated={authenticated} />
          </div>
        )}
        {topicData && (
          <div className="courses">
            <button
              id="previous-button"
              className={`${"footer-button-1"} ${
                !previousDetails ? "footer-disabled" : ""
              }`}
              onClick={handlePrevious}
              disabled={disable || !previousDetails}
            >
              <span className="footer-arrow-div" id="previous-button">
                {" "}
                <LeftArrow width="20" height="20" id="previous-button" />
              </span>
              <span className="footer-link" id="previous-button">
                <h5 id="previous-button">
                  {topicData?.details?.previous_topic?.short_title ||
                    "No Previous Topic"}
                </h5>
              </span>
            </button>

            <button
              id="next-button"
              className={`footer-button-2 ${
                !nextDetails ? "footer-disabled" : ""
              }`}
              onClick={handleNext}
              disabled={disable || !nextDetails}
            >
              <span className="footer-link" id="next-button">
                <h5 id="next-button">
                  {topicData?.details?.next_topic?.short_title ||
                    "No Next Topic"}
                </h5>
              </span>

              <div className="footer-arrow-div" id="next-button">
                <RightArrow width="20" height="20" id="next-button" />
              </div>
            </button>
          </div>
        )}

        <div className="dot-menu">
          <div className="drop-down">
            <MobileSideBar
              topicData={topicData}
              chapters={chapters}
              showSideBar={showSideBar}
              setShowSideBarFalse={setShowSideBarFalse}
              spaceAvailable={spaceAvailable}
              handleScroll={handleScroll}
            />
          </div>
          <div
            id="dot-menu"
            className={`${showSideBar ? "three-dot-button" : "icon"}`}
          >
            <button
              aria-label="sidebar menu"
              className="dot-menu-button"
              onClick={handleShowSidebar}
            >
              <ListIcon width="16" height="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
