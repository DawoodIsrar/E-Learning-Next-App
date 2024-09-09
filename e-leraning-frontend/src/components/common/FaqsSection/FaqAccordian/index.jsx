"use client";
import { useState } from "react";
import AccordianIcon from "@/assets/icons/AccordianIcon";
import "./style.scss";

const FaqAccordian = ({ FAQ, accordionHeight, accordionWidth }) => {
  const [openTab, setOpenTab] = useState(null);
  const [iconColor, setIconColor] = useState("black");

  const handleIconClick = () => {
    setIconColor((prev) => (prev === "black" ? "black" : "black"));
  };
  const handleTabClick = (index) => {
    setOpenTab((prevOpenTab) => (prevOpenTab === index ? null : index));
  };

  return (
    <div
      className="accordion"
      style={{
        height: accordionHeight === 508 ? `${accordionHeight}` : "auto",
        width: accordionWidth === 508 ? `${accordionWidth}` : "auto",
      }}
    >
      {FAQ?.map((faq, index) => (
        <div className="tab" key={index}>
          <input
            type="checkbox"
            id={`tab${index}`}
            className="tab-input"
            checked={openTab === index}
            onChange={() => handleTabClick(index)}
          />
          <label
            htmlFor={`tab${index}`}
            className="tab-label"
            style={{ width: accordionWidth === 508 ? "295px" : "auto" }}
          >
            <h4> {faq.title}</h4>

            <AccordianIcon
              handleIconClick={handleIconClick}
              iconColor={iconColor}
              className="icon"
              isRotated={openTab === index}
            />
          </label>
          <div className="tab-content">
            {faq.faqs.map((item, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordian;
