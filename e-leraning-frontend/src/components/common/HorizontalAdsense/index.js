// deprecated
const HorizontalAdsense = ({ adRef, style, dataSlotId }) => {
  return (
    <>
      {/* <!-- Horizontal adsense --> */}
      <ins
        ref={adRef}
        class="adsbygoogle responsive-ad"
        style={
          style || { display: "inline-block", width: "100%", height: "auto" }
        }
        data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        data-ad-slot={dataSlotId}
      ></ins>
    </>
  );
};

export default HorizontalAdsense;
