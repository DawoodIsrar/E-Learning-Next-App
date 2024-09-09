"use client";
import { useEffect, useRef } from "react";

const useSliderPosition = () => {
  let key = "d-libro";
  const ref = useRef(null);

  useEffect(() => {
    const element = ref?.current;
    const scrollPos = localStorage.getItem(key);

    if (element && scrollPos) {
      element.scrollLeft = parseInt(scrollPos);
    }

    const updateScrollPos = () => {
      if (element) {
        localStorage.setItem(key, element.scrollLeft.toString());
      }
    };

    element?.addEventListener("scroll", updateScrollPos);

    return () => element?.removeEventListener("scroll", updateScrollPos);
  }, [key]);

  return ref;
};

export default useSliderPosition;
