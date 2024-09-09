import LearningChallengesContainer from "./LearningChallengesContainer";
import Section from "@/components/shared/Section";
import "./style.scss";

const LearningChallenges = () => {
  return (
    <Section
      sectionClasses={"learning-challenges"}
      widthHandlerDivClasses={"section-contentCol"}
    >
      <div className="challenges-heading">
        <h2>Typical Learning Challenges</h2>
      </div>
      <div className="container-wrapper">
        <div>
          <p className="paragraph">
            From beginner to master of web design, coding, infrastructure
            operation, business development and marketing
          </p>
          <div className="cards-row">
            <LearningChallengesContainer />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LearningChallenges;
