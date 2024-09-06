import React, { ReactChild, ReactNode } from "react";
interface SectionProps {
  widthHandler: string;
  sectionWrapper: string;
  children: ReactChild;
  bgColor: string;
}
import "./style.scss";

const Section = (props: SectionProps) => {
  return (
    <div
      className={`${props.sectionWrapper}`}
      style={{ backgroundColor: `${props.bgColor}` }}
    >
      <div className={`width_handle_basic ${props.widthHandler}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Section;
