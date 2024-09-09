"use client";
import VideoPlayer from "@/components/common/VideoPlayer";
import { explainerVideo } from "@/utils/data";
import { useWindowWidth } from "@/utils/windowWidthHook";
import Section from "@/components/shared/Section";
import "./style.scss";

const WhatIsDLibro = () => {
  const { width } = useWindowWidth();
  const video = width < 767 ? explainerVideo.mobile : explainerVideo.desktop;
  return (
    <Section
      sectionClasses="dlibro-container-wrapper"
      widthHandlerDivClasses="dlibro-container"
    >
      <div className="dlibro-text">
        <h2 className="dlibro-text-header">What is D-Libro?</h2>
      </div>

      <VideoPlayer src={video} />
    </Section>
  );
};

export default WhatIsDLibro;
