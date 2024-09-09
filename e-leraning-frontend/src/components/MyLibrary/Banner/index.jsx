import Section from "../../shared/Section";
import HomeIcon from "@/assets/icons/HomeIcon";
import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import "./style.scss";
import Link from "next/link";

const Banner = () => {
  return (
    <Section
      sectionClasses="library-container"
      widthHandlerDivClasses="library-banner"
    >
      {" "}
      <Link href="/">
        <HomeIcon width="16" height="16" />
      </Link>
      <HeaderRightArrow width="16" height="16" />
      <p>My Library</p>
    </Section>
  );
};

export default Banner;
