"use client";
import { useEffect, useState } from "react";
import FooterAccordion from "../../Topic/Footer/index";
import "./style.scss";

const Footer = ({ postContentId }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const postContentElement = document.getElementById(postContentId);
    if (postContentElement) {
      const h2Elements = postContentElement.querySelectorAll("h2");
      const h2TextArray = Array.from(h2Elements).map((h2) => h2.textContent);
      setHeadings(h2TextArray);
    }
  }, [postContentId]);

  return (
    <div className="blog-detail-mobile-footer">
      <FooterAccordion chapters={headings} />
    </div>
  );
};

export default Footer;
