"use client";
import React, { useState } from "react";
import "./style.scss";
import { categoryTab } from "@/utils/data";

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (e) => {
    setActiveTab(e?.target?.id);
  };

  return (
    <div className="tabs">
      {categoryTab?.map((category, index) => (
        <div
          key={index}
          id={index}
          className={`${"tab"} ${activeTab == index ? "active" : ""}`}
          onClick={handleTabClick}
        >
          {index !== 0 && "Category "}
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
