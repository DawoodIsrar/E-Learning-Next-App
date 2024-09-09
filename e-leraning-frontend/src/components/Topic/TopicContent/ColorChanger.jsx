"use client";
import { useEffect } from "react";
import "./style.scss";

const ColorChanger = ({ topicData }) => {
  const addH2HeadingStyle = () => {
    if (typeof window !== "undefined") {
      const isDarkMode = window.__theme !== "light";
      const primaryColor = topicData?.course?.primary_color || "transparent";
      const secondaryColor =
        topicData?.course?.secondary_color || "transparent";

      // Select the .topic-page-content element
      const topicPageContent = document.querySelector(".topic-page-content");

      if (topicPageContent) {
        // Remove existing dynamic style element if present
        let styleElement = topicPageContent.querySelector("#dynamic-styles");
        if (styleElement) {
          styleElement.remove();
        }

        // Create a new style element
        styleElement = document.createElement("style");
        styleElement.id = "dynamic-styles";
        styleElement.innerHTML = `
          .topic-page-content h2 {
            background-color: ${
              isDarkMode ? primaryColor : secondaryColor
            } !important;
          }
        `;

        // Append the style element to the .topic-page-content element
        topicPageContent.appendChild(styleElement);
      }
    }
  };

  useEffect(() => {
    addH2HeadingStyle();
    window.addEventListener("themeChange", addH2HeadingStyle);
    return () => {
      window.removeEventListener("themeChange", addH2HeadingStyle);
    };
  }, []);

  return null;
};

export default ColorChanger;
