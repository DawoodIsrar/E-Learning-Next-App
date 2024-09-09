"use client";
import { useRef, useContext, useEffect } from "react";
import { AdsenseContext } from "@/contexts/adsenseContextProvider";
import useInsObserver from "@/hooks/useInsObserver";
import { adToRender, insertAdDynamically } from "@/utils";
import { centralizeAdsComponents } from "@/utils/data";

const InsertAds = ({ Component, className }) => {
  const AdToRender = adToRender(Component);
  const dynamicAds =
    Component === "TopicPageInContentATF" ||
    Component === "BlogPostPageInContentATF";
  const adsToCentralized = () => {
    return centralizeAdsComponents.includes(Component) ? "center" : "start";
  };
  const adRef = useRef(null);

  const hasAdBeenPushed = useRef(false);

  const pushAd = () => {
    if (hasAdBeenPushed.current) return;
    try {
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("pushing ad...");
        hasAdBeenPushed.current = true;
      }, 1000); // Delay of 1 second
    } catch (e) {
      console.error("AdSense push error: InsertAds", e);
    }
  };

  useInsObserver(adRef, pushAd);

  if (dynamicAds) {
    useEffect(() => {
      insertAdDynamically(adRef, Component);
    }, []);
    return <></>;
  }
  return (
    <div
      className={`mt-10 ${className} ${
        Component === "SitewideMobileAdhesion" ? "SitewideMobileAdhesion" : ""
      }`}
      align={adsToCentralized()}
    >
      <AdToRender adRef={adRef} />
    </div>
  );
};

const InsertAdsWrapper = ({ ChildComppnent, className }) => {
  const { adsenseLoaded } = useContext(AdsenseContext);

  if (!adsenseLoaded) return <></>;

  return <InsertAds Component={ChildComppnent} className={className} />;
};

export default InsertAdsWrapper;
