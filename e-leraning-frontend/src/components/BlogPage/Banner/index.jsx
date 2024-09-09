import Section from "../../shared/Section";
import HomeIcon from "@/assets/icons/HomeIcon";
import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import "./style.scss";
import Link from "next/link";

const Banner = ({ category }) => {
  return (
    <Section
      sectionClasses="blog-post-banner-container"
      widthHandlerDivClasses="blog-post-banner"
    >
      <Link href="/">
        <HomeIcon width="16" height="16" />
      </Link>

      <HeaderRightArrow width="16" height="16" />
      <Link href="/blogs">
        <p>Blogs</p>
      </Link>
      <HeaderRightArrow width="16" height="16" />
      <Link href={`/blog-category/${category?.category_slug}`}>
        <p>{category?.category_title}</p>
      </Link>
    </Section>
  );
};

export default Banner;
