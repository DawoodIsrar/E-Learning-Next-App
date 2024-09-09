import SocialButtons from "../AuthButtons";
import RenderVideo from "./RenderVideo";
import Section from "@/components/shared/Section";
import "./style.scss";

const HeroSection = () => {
  const embedUrl = `https://drive.google.com/file/d/1vhksY_YUYJaRC3pmlsS2YPoTVVmbjHQ8/preview`;
  return (
    <Section
      sectionClasses="hero-container-wrapper"
      widthHandlerDivClasses="hero-container"
    >
      <div className="hero-text">
        <h1 className="hero-text-header">
          eBook Library for Web Skill Training
        </h1>
        <p className="hero-text-body">
          Master the web with our beginner-to-expert training in web design,
          coding, infrastructure operation, and business development &
          marketing.
        </p>
        <div className="socialbutton-wrapper">
          <SocialButtons />
        </div>
      </div>
      <RenderVideo />
    </Section>
  );
};

export default HeroSection;
