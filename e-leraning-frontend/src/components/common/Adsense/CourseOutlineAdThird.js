const CourseOutlineAdThird = ({ adRef }) => {
  return (
    // <!-- Course Outline Ad 3 -->
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="2634656489"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default CourseOutlineAdThird;
