const HomePageSecondHorizontal = ({ adRef }) => {
  return (
    // <!-- Homepage 2nd Horizontal -->
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="6169387441"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default HomePageSecondHorizontal;
