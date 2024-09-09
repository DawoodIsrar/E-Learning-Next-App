import { isProduction } from "@/utils/common";
import PrismClient from "@/components/common/Prism";
import InsertAds from "@/components/common/InsertAds";
import "./style.scss";

const PostContent = ({ data }) => {
  return (
    <>
      <PrismClient />
      <div
        className="editor-content"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      {isProduction && <InsertAds ChildComppnent="BlogPostPageInContentATF" />}
    </>
  );
};

export default PostContent;
