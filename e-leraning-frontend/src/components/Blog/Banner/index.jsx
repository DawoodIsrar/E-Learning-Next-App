import Section from "../../shared/Section";
import HomeIcon from "@/assets/icons/HomeIcon";
import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import Link from "next/link";
import "./style.scss";

const Banner = () => {
  return (
    <Section
      sectionClasses="blog-all-banner-wrapper"
      widthHandlerDivClasses="blog-main-banner"
    >
      {" "}
      <Link href="/">
        <HomeIcon width="16" height="16" />
      </Link>
      <HeaderRightArrow width="16" height="16" />
      <p>Blog</p>
    </Section>
  );
};

export default Banner;
