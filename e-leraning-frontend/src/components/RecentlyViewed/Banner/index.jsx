import HomeIcon from "@/assets/icons/HomeIcon";
import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import Link from "next/link";
import "./style.scss";
import Section from "../../shared/Section";

const Banner = () => {
  return (
    <Section widthHandlerDivClasses="recently-viewed-courses-banner">
      {" "}
      <Link href="/">
        <HomeIcon width="16" height="16" />
      </Link>
      <HeaderRightArrow width="16" height="16" />
      <p>Recently Viewed</p>
    </Section>
  );
};

export default Banner;
