const CourseOutlineAdSecond = ({ adRef }) => {
  return (
    // <!-- Course Outline Ad 2 -->
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="4139309844"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default CourseOutlineAdSecond;
