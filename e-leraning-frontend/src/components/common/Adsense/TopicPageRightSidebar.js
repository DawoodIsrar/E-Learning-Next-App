const TopicPageRightSidebar = ({ adRef }) => {
  return (
    // <!-- Topic Page Right sidebar -->
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      data-ad-slot="8084757895"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default TopicPageRightSidebar;
