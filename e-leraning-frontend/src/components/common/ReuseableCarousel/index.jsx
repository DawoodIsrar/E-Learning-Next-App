"use client";
import { useEffect, useState } from "react";
import useSliderPosition from "./Hook";
import "./style.scss";

const ReuseableCarousel = ({ children, className }) => {
  const sliderRef = useSliderPosition();
  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(true);

  const checkSliderPosition = () => {
    const container = sliderRef.current;

    if (container) {
      setIsEnd(
        container.scrollWidth - container.offsetWidth <= container.scrollLeft
      );
      setIsStart(container.scrollLeft === 0);
    }
  };

  useEffect(() => {
    const container = sliderRef?.current;
    if (container) {
      if (container.scrollLeft > 0) {
        setTimeout(() => {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
          checkSliderPosition();
        }, 10);
      }
      container.addEventListener("scroll", checkSliderPosition);
      return () => {
        container.removeEventListener("scroll", checkSliderPosition);
      };
    }
  }, []);

  const scrollLeft = () => {
    const container = sliderRef.current;
    if (container) {
      // * CHANGED THE SCROLL AMOUNT FROM width of slider div to dynamic first child width.
      // * By Dynamic width => as all child will have the save width and we will scroll the children 1 by 1 either left or right
      const scrollAmount = container.offsetWidth * 0.8;
      const scrollLeft = container.scrollLeft - scrollAmount;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      checkSliderPosition();
    }
  };

  const scrollRight = () => {
    const container = sliderRef.current;
    if (container) {
      // * CHANGED THE SCROLL AMOUNT FROM width of slider div to dynamic first child width.
      // * By Dynamic width => as all child will have the save width and we will scroll the children 1 by 1 either left or right
      const scrollAmount = container.offsetWidth * 0.8;
      const scrollRight = container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: scrollRight,
        behavior: "smooth",
      });
      checkSliderPosition();
    }
  };

  return (
    <div className="custom-reuseable-carousel">
      <div className="custom-carousel desktop-carousel">
        {!isStart && (
          <div
            className={`custom-slick-slider wrapper-prev ${className}`}
            onClick={scrollLeft}
          >
            <div className={`custom-slick-arrow custom-slick-prev `}></div>
          </div>
        )}
        {!isEnd && (
          <div
            className={`custom-slick-slider wrapper-next ${className}`}
            onClick={scrollRight}
          >
            <div className={`custom-slick-arrow custom-slick-next`}></div>
          </div>
        )}

        <div className="customOverFlowClass" ref={sliderRef}>
          {children}
        </div>
      </div>
      <div className="hide-scrollbar mobile-carousel">{children}</div>
    </div>
  );
};

export default ReuseableCarousel;
