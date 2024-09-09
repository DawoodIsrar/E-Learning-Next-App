"use client";
import React from "react";
import dynamic from "next/dynamic";
import { isProduction } from "@/utils/common";
import { useWindowWidth } from "@/utils/windowWidthHook";
const InsertAds = dynamic(() => import("@/components/common/InsertAds"));

const DesktopAds = ({ adToRender }) => {
  const { width } = useWindowWidth();
  return (
    isProduction &&
    width > 1359 && (
      <InsertAds
        ChildComppnent={adToRender}
        className="ad-sense-wrapper-desktop"
      />
    )
  );
};

export default DesktopAds;
