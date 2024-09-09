"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const RemoveAdsense = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("course") || pathname.includes("topic")) {
      const timer = setTimeout(() => {
        // removeEmptyAdsense();
      }, 12000); // 12000 milliseconds = 12 seconds

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const removeEmptyAdsense = () => {
    const adsenseDivs = document.querySelectorAll(`.ad-wrapper`);
    adsenseDivs.forEach((adsenseDiv) => {
      const insChildren = adsenseDiv.querySelectorAll("ins");

      // Check if all <ins> elements inside adsenseDiv have no children
      const allEmpty = Array.from(insChildren).every(
        (ins) => !ins.children.length
      );
      // Check if any <ins> elements have data-ad-status="unfilled"
      const anyUnfilled = Array.from(insChildren).some(
        (ins) => ins.getAttribute("data-ad-status") === "unfilled"
      );

      if (allEmpty || anyUnfilled) {
        adsenseDiv.parentNode.removeChild(adsenseDiv);
      }
    });
  };

  return <div></div>;
};

export default RemoveAdsense;
