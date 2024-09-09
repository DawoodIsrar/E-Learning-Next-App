"use client";
import { useWindowWidth } from "@/utils/windowWidthHook";
import Divider from "../Blogs/Divider";
import "./style.scss";

const BlogWrapper = ({ backgroundColor, children }) => {
  const { width } = useWindowWidth();
  return (
    <div
      style={{
        backgroundColor: `${width < 500 ? backgroundColor : "transparent"}`,
      }}
      className="main-wrapper-blog-category"
    >
      {children}
      {width > 500 ? <Divider /> : ""}
    </div>
  );
};

export default BlogWrapper;
