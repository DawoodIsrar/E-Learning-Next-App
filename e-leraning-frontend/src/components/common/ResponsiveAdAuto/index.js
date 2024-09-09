// deprecated
"use client";
import { useRef, useContext } from "react";
import HorizontalAdsense from "../HorizontalAdsense";
import { useWindowWidth } from "@/utils/windowWidthHook";
import { AdsenseContext } from "@/contexts/adsenseContextProvider";
import useInsObserver from "@/hooks/useInsObserver";

const ResponsiveAdAuto = ({ style, dataSlotId }) => {
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
      console.error("AdSense push error: ResponsiveAdAuto", e);
    }
  };

  useInsObserver(adRef, pushAd);

  return (
    <div className="chapter-adsense-horizontal ad-wrapper">
      <HorizontalAdsense adRef={adRef} style={style} dataSlotId={dataSlotId} />
    </div>
  );
};

const ResponsiveAdAutoWrapper = ({
  hideforLargerWidth = false,
  dataSlotId,
}) => {
  const { width } = useWindowWidth();
  const { adsenseLoaded } = useContext(AdsenseContext);

  if (!width || !adsenseLoaded || (hideforLargerWidth && width > 1460))
    return <></>;

  let style =
    width < 768
      ? {
          marginInline: "auto",
          display: "inline-block",
          width: "300px",
          height: "250px",
        }
      : {
          marginInline: "auto",
          display: "inline-block",
          width: "728px",
          height: "90px",
        };

  return <ResponsiveAdAuto style={style} dataSlotId={dataSlotId} />;
};

export default ResponsiveAdAutoWrapper;
