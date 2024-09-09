// deprecated
"use client";
import { useRef, useContext } from "react";
import HorizontalAdsense from "../HorizontalAdsense";
import { useWindowWidth } from "@/utils/windowWidthHook";
import { AdsenseContext } from "@/contexts/adsenseContextProvider";
import useInsObserver from "@/hooks/useInsObserver";

const ResponsiveAd = ({ adWrapperClass, style, dataSlotId }) => {
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
      console.error("AdSense push error: ResponsiveAd", e);
    }
  };

  useInsObserver(adRef, pushAd);

  return (
    <div className={adWrapperClass}>
      <HorizontalAdsense adRef={adRef} style={style} dataSlotId={dataSlotId} />
    </div>
  );
};

const ResponsiveAdWrapper = ({ dataSlotId }) => {
  const { width } = useWindowWidth();
  const { adsenseLoaded } = useContext(AdsenseContext);

  let adWrapperClass;
  let style = {
    marginInline: "auto",
    display: "inline-block",
    width: "300px",
    height: "250px",
  };

  if (width < 580) {
    adWrapperClass = "ad-wrapper chapter-adsense-mobile";
  } else if (width > 650 && width <= 1024) {
    adWrapperClass = "ad-wrapper chapter-adsense-ipad";
  } else {
    adWrapperClass = "ad-wrapper chapter-adsense-desktop";
    style = {
      marginInline: "auto",
      display: "inline-block",
      width: "728px",
      height: "90px",
    };
  }

  if (!width || !adsenseLoaded) return <></>;

  return (
    <ResponsiveAd
      adWrapperClass={adWrapperClass}
      style={style}
      dataSlotId={dataSlotId}
    />
  );
};

export default ResponsiveAdWrapper;
