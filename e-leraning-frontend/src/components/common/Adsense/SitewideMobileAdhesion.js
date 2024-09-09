const SitewideMobileAdhesion = ({ adRef }) => {
  return (
    // <!-- Sitewide Mobile Adhesion -->
    <ins
      ref={adRef}
      class="adsbygoogle"
      style={{ display: "inline-block", width: "320px", height: "50px" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="5180675183"
    ></ins>
  );
};

export default SitewideMobileAdhesion;
