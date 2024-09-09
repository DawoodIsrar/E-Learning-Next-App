import Hero from "./Hero";
import LearningChallenges from "../common/LearningChallenges";
import LearnDiv from "../common/LearnDiv";
import Dlibro from "../common/Dlibro";
import FaqSection from "../common/FaqsSection";
import UnlockPotential from "../common/UnlockPotential";
import WhatIsDLibro from "./WhatIsDLibro";
import "./style.scss";

const About = () => {
  return (
    <div className="About-wrapper">
      <Hero />
      <WhatIsDLibro />
      <LearnDiv />
      <LearningChallenges />
      <Dlibro />
      <FaqSection />
      <UnlockPotential />
    </div>
  );
};
export default About;
