"use client";
import { useState } from "react";
import SideBar from "../SideBar";
import ChevronRight from "@/assets/icons/ChevronRight";
import "./style.scss";

const SideBarWrapper = ({ data }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="mobile-sidebar-wrapper">
      <div className="mobile-button-wrapper">
        <div onClick={handleClick} className="mobile-button">
          <SideBar
            data={data}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
          />
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default SideBarWrapper;
