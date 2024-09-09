import { useRef, useContext } from "react";
import { AdsenseContext } from "@/contexts/adsenseContextProvider";
import useInsObserver from '@/hooks/useInsObserver';

const DesktopAdsense = () => {
  const adRef = useRef(null);
  const hasAdBeenPushed = useRef(false);

  const pushAd = () => {
    if (hasAdBeenPushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log('pushing ad...');
      hasAdBeenPushed.current = true;
    } catch (e) {
      console.error('AdSense push error: DesktopAdsense', e);
    }
  };

  useInsObserver(adRef, pushAd);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="8084757895"
      data-ad-format="vertical"
      data-full-width-responsive="true"
    ></ins>
  );
};

const DesktopAdsenseWrapper = () => {
  const { adsenseLoaded } = useContext(AdsenseContext);

  if(!adsenseLoaded) return <></>;

  return <DesktopAdsense />;
}

export default DesktopAdsenseWrapper;
