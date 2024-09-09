import { useEffect } from "react";

// utility functions
function isElementInView(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

const scrollToContent = (event) => {
  const header = event.currentTarget;

  const accordion = header.closest(".cg-accordion");

  if (accordion) {
    const accordionItem = accordion.querySelector(".cg-accordion-item");

    if (accordionItem) {
      if (!isElementInView(accordionItem)) {
        const offset = 70;
        // Get the position of the accordion item
        const itemTop =
          accordionItem.getBoundingClientRect().top + window.pageYOffset;
        const scrollToPosition = itemTop - offset;

        // Scroll to the position smoothly
        window.scrollTo({
          top: scrollToPosition,
          behavior: "smooth",
        });
      }
    }
  }
};

const handleAccordionClick = (event) => {
  const accordionItem = event.currentTarget;
  const isActive = accordionItem.classList.contains("active");
  const arrow = accordionItem.querySelector("svg");

  // Remove active class and reset rotation for all accordions
  document.querySelectorAll(".cg-accordion-item-header").forEach((item) => {
    item.classList.remove("active");
    const svg = item.querySelector("svg");
    if (svg) {
      svg.style.transform = "rotate(0deg)";
      svg.style.transition = "all 0.5s ease-in-out";
    }
  });

  // Toggle active class for the clicked accordion item
  if (!isActive) {
    accordionItem.classList.add("active");
    if (arrow) {
      arrow.style.transform = "rotate(180deg)";
    }
  } else {
    accordionItem.classList.remove("active");
    if (arrow) {
      arrow.style.transform = "rotate(0deg)";
    }
  }

  scrollToContent(event);
};

// main functions
const useAccordion = ({ secondaryColor }) => {
  const bindEvents = () => {
    const accordions = document.querySelectorAll(".cg-accordion-item-header");

    if (accordions.length) {
      accordions.forEach((accordion) => {
        accordion.addEventListener("click", handleAccordionClick);
      });
    }
  };

  useEffect(() => {
    const accordions = document.querySelectorAll(".cg-accordion-item-header");
    document.documentElement.style.setProperty(
      "--cg-course-color",
      secondaryColor
    );
    return () => {
      if (accordions.length) {
        accordions.forEach((accordion) => {
          accordion.removeEventListener("click", handleAccordionClick);
        });
      }
    };
  }, []);

  return { bindEvents };
};

export default useAccordion;
