"use client";
import React, { useEffect } from "react";

const HideFooter = () => {
  useEffect(() => {
    if (typeof window !== undefined) {
      const footerContainer = document.querySelector(".main-container-footer");
      if (footerContainer) {
        footerContainer.style.display = "none";
      }
    }
    return () => {
      const footerContainer = document.querySelector(".main-container-footer");
      if (footerContainer) {
        footerContainer.style.display = ""; // Reset display property
      }
    };
  }, []);

  return <></>;
};

export default HideFooter;
