import Footer from "../Footer/Footer";
import PostContent from "./PostContent";
import TableOfContents from "./TableOfContents";
import Section from "@/components/shared/Section";
import DesktopAds from "@/components/common/DesktopAds";
import MobileAds from "@/components/common/MobileAds";
import "./style.scss";

const Wrapper = ({ blogPost }) => {
  return (
    <>
      <Section widthHandlerDivClasses="blog-post-content-wrapper">
        <TableOfContents postContentId="post-content" />
        <div id="post-content" className="detailpage blogdetailpage">
          <PostContent data={blogPost?.content} />
        </div>
        <DesktopAds adToRender="BlogPostPageSidebarDesktop" />
      </Section>
      <MobileAds adToRender="BlogMobileAdhesion" />
      <Footer postContentId={"post-content"} />
    </>
  );
};

export default Wrapper;
