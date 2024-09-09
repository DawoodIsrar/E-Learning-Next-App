import BadgeCard from "./BadgeCard";
import { cardsData } from "@/utils/data";
import Section from "@/components/shared/Section";
import "./style.scss";

const LearnDiv = () => {
  return (
    <Section
      sectionClasses="learn-div-wrapper"
      widthHandlerDivClasses="main-wrapper"
    >
      <div className="text">
        <h2 className="text-header">What You Can Learn</h2>
        <p className="text-body">
          You can learn everything related <br /> to web skills including:
        </p>
        <p className="text-body2">
          From beginner to master of web design, coding, infrastructure
          operation, business development and marketing
        </p>
      </div>
      <div className="card-container">
        {cardsData?.map((card, index) => (
          <BadgeCard key={index} card={card} />
        ))}
      </div>
    </Section>
  );
};

export default LearnDiv;
