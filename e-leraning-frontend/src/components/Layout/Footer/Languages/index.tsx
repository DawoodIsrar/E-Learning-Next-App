"use client";
import Image from "next/image";
import Globe from "@/assets/images/globe.png";
import React, { useState } from "react";
import CrossIcon from "@/assets/images/crossIcon.png";
import { Languages } from "@/Utils/data";
import "./style.scss";

const LanguagesModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowLanguages = () => {
    setShowModal((prev) => !prev);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(false);
  };

  return (
    <div className="langueages-btn" onClick={handleShowLanguages}>
      <Image src={Globe} alt="globe-img" />
      <p id="english">English</p>
      {showModal && (
        <div className="languages-modal" onClick={handleShowLanguages}>
          <div
            className="languages-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="choose-languages">
              <h3>Choose languages</h3>
              <Image
                src={CrossIcon}
                alt="cross-icon"
                onClick={handleCloseModal}
              />
            </div>
            <div className="languages">
              <div className="languages-column">
                {Languages.slice(0, 5).map((item) => (
                  <p key={item.id}>{item.title}</p>
                ))}
              </div>
              <div className="languages-column">
                {Languages.slice(5, 9).map((item) => (
                  <p key={item.id}>{item.title}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagesModal;
