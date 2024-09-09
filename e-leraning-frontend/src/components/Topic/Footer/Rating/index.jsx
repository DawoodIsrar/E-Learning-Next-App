"use client";

import { useEffect, useState } from "react";
import StarIcon from "@/assets/icons/Star";
import RatingModal from "./RatingModal";
import "./style.scss";

const index = ({ topicData, MobileView, authenticated }) => {
  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  const onRatingClick = () => {
    if (!authenticated) {
      return;
    }
    setRatingModalOpen(true);
  };

  useEffect(() => {
    const navBar = document.querySelector(".header-wrapper");
    const footer = document.querySelector(".main-footer-container");
    if (ratingModalOpen) {
      if (window.innerWidth <= 500) {
        navBar.style.display = "none";
        document.body.style.overflowY = "hidden";
        if (footer) footer.style.zIndex = -1;
      } else {
        if (footer) footer.style.zIndex = -1;
        navBar.style.display = "block";
        document.body.style.overflowY = "auto";
      }
    } else {
      if (footer) footer.style.zIndex = 1;
      navBar.style.display = "block";
      document.body.style.overflowY = "auto";
    }
  }, [ratingModalOpen]);

  return (
    <>
      <button
        className={`${!MobileView ? "icon" : "no-border"} ${
          !authenticated ? "disable" : ""
        }`}
        onClick={onRatingClick}
        aria-label={!authenticated ? "disabled rating button" : "rating button"}
      >
        <StarIcon width="24" height="24" />
      </button>

      {ratingModalOpen && (
        <RatingModal
          data={topicData}
          ratingModalOpen={ratingModalOpen}
          setRatingModalOpen={setRatingModalOpen}
        />
      )}
    </>
  );
};

export default index;
