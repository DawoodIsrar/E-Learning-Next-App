import Image from "next/image";
import heroImage from "@/assets/images/About.svg";
import Section from "@/components/shared/Section";
import aboutLogo from "@/assets/images/AboutLogo.svg";
import "./style.scss";

const Hero = () => {
  return (
    <Section
      sectionClasses={"section-bg-wrapper"}
      widthHandlerDivClasses={"width-handler-div"}
    >
      {" "}
      {/* left */}
      <div className="about-wrapper">
        <div className="left-div">
          <Image
            className="image"
            src={heroImage}
            alt="hero-image"
            width={299}
            height={301}
          />
        </div>
        {/* right */}
        <div className="right-dev">
          <Image src={aboutLogo} alt="libro logo" width={250} height={53} />
          <h1>eBook Library for Digital Skill Development</h1>
          <p>
            Master the web with our beginner-to-expert training in web design,
            coding, infrastructure operation, and business development &
            marketing.
          </p>
        </div>
      </div>
    </Section>
  );
};
export default Hero;
