import React, { createContext, useEffect, useState } from "react";

export const AdsenseContext = createContext({});

const AdsenseContextProvider = ({ children }) => {

    const [adsenseLoaded, setAdsenseLoaded] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
          if (window.adsbygoogle && window.adsbygoogle.push) {
            console.log('AdSense script loaded')
            setAdsenseLoaded(true);
            clearInterval(intervalId);
            clearTimeout(timeoutId);
          }
        }, 100); // Check every 100 milliseconds
    
        // Timeout to clear the interval after 5 seconds (30000 milliseconds)
        const timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          console.error('AdSense script did not load within 5 seconds');
        }, 30000); // 5 seconds
    
        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };
    }, []);

    return (
        <AdsenseContext.Provider value={{ adsenseLoaded }}>
            {children}
        </AdsenseContext.Provider>
    );
};

export default AdsenseContextProvider;