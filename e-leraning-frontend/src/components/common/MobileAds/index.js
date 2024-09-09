"use client";
import dynamic from "next/dynamic";
import { isProduction } from "@/utils/common";
import { useWindowWidth } from "@/utils/windowWidthHook";
const InsertAds = dynamic(() => import("@/components/common/InsertAds"));

const MobileAds = ({ adToRender }) => {
  const { width } = useWindowWidth();
  return (
    isProduction && width < 500 && <InsertAds ChildComppnent={adToRender} />
  );
};

export default MobileAds;
