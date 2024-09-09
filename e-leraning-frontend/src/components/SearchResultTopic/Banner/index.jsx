import Section from "../../shared/Section";
import HomeIcon from "@/assets/icons/HomeIcon";
import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import "./style.scss";
import Link from "next/link";

const Banner = () => {
  return (
    <Section
      sectionClasses="topic-search-container"
      widthHandlerDivClasses="topic-search-banner"
    >
      <Link href="/">
        <HomeIcon width="16" height="16" />
      </Link>
      <HeaderRightArrow width="16" height="16" />
      <p>Search</p>
      <HeaderRightArrow width="16" height="16" />
      <p>Chapter Result</p>
    </Section>
  );
};

export default Banner;
