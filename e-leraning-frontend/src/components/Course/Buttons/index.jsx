"use client";
import History from "../../Topic/Footer/History";
import MyLibrary from "../../Topic/Footer/Library";
import Rating from "../../Topic/Footer/Rating";
import ShareButton from "../../Topic/Footer/ShareButton";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import DotsHorizantal from "@/assets/icons/DotsHorizontal";
import "./style.scss";

const CourseButtons = ({ courseDetails, ratingModal }) => {
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  const [showDropDown, setShowDropDown] = useState(false);
  const { accessToken, status } = session || {};
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (status !== "loading")
      accessToken ? setAuthenticated(true) : setAuthenticated(false);
  }, [accessToken, status]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };
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
  return (
    <>
      <div className="course-rating-wrapper">
        <div className="dot-menu" ref={dropdownRef}>
          <div className="drop-down">
            {showDropDown && (
              <div className="dropdown-content">
                <History MobileView={true} authenticated={authenticated} />
                <MyLibrary MobileView={true} authenticated={authenticated} />
                {ratingModal && (
                  <Rating
                    topicData={courseDetails}
                    MobileView={true}
                    authenticated={authenticated}
                  />
                )}

                <ShareButton MobileView={true} authenticated={authenticated} />
              </div>
            )}
          </div>
          <div className="icon">
            <button
              className="dot-horizantal-icon"
              onClick={() => {
                setShowDropDown((prev) => !prev);
              }}
            >
              <DotsHorizantal width="24" height="24" />
            </button>
          </div>
        </div>

        <div className="course-buttons-for-share-rating dropdown-content">
          <History MobileView={true} authenticated={authenticated} />
          <MyLibrary MobileView={true} authenticated={authenticated} />
          {ratingModal && (
            <Rating
              topicData={courseDetails}
              MobileView={true}
              authenticated={authenticated}
            />
          )}

          <ShareButton MobileView={true} authenticated={authenticated} />
        </div>
      </div>
    </>
  );
};

export default CourseButtons;
