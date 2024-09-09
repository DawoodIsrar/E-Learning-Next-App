const TopicPageInArticleInContentEnd = ({ adRef }) => {
  return (
    // <!-- Topic Page in Article in Content End -->
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="5897924702"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default TopicPageInArticleInContentEnd;
