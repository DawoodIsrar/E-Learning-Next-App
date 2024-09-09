const BlogMobileAdhesion = ({ adRef }) => {
  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "inline-block", width: "320px", height: "50px" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="8862330516"
    ></ins>
  );
};

export default BlogMobileAdhesion;
