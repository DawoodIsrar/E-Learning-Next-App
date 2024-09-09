const AdsenseScript = () => {
  const adsenseScriptPath = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`;

  return (
    <script
      async
      src={adsenseScriptPath}
      crossorigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default AdsenseScript;
