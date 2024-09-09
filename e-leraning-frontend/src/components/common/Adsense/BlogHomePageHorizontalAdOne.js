const BlogHomePageHorizontalAdOne = ({ adRef }) => {
  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="5970004481"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default BlogHomePageHorizontalAdOne;
