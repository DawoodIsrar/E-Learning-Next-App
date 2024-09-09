import "./style.scss";
import AuthButtons from "@/components/Home/NonMember/AuthButtons";
import Section from "@/components/shared/Section";

const UnlockPotential = () => {
  return (
    <Section
      widthHandlerDivClasses={"semi-unlockpotential-container"}
      sectionClasses={"section-background"}
    >
      <h2 className="unlockpotential-h2">Unlock Your Potential</h2>
      <p className="unlockpotential-b1">Study Together with Us</p>
      <AuthButtons />
    </Section>
  );
};

export default UnlockPotential;
