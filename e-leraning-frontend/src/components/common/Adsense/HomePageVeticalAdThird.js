const HomePageVeticalAdThird = ({ adRef }) => {
  return (
    // <!-- Homepage Vertical Ads 3rd -->
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="3543224104"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default HomePageVeticalAdThird;
