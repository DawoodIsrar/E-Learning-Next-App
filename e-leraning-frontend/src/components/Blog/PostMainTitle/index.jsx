import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import Link from "next/link";
import "./style.scss";
import BlogCategoryTitleWrapper from "./BlogCategoryTitleWrapper";

const PostMainTitle = ({ title, category_slug, backgroundColor }) => {
  return (
    <BlogCategoryTitleWrapper backgroundColor={backgroundColor}>
      <div className="main-title-blog-category-wrapper">
        <div className="main-title">
          <h2>{title}</h2>
          <Link href={`/blog-category/${category_slug}`} className="link-text">
            <p>More article on the topic</p>
            <div className="arrow">
              <HeaderRightArrow />
            </div>
          </Link>
        </div>
      </div>
      <div className="title-divider">
        <div className="title-main-divider"></div>
      </div>
    </BlogCategoryTitleWrapper>
  );
};

export default PostMainTitle;
